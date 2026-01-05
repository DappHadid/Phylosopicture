<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialiteController extends Controller
{
    /**
     * Mengarahkan pengguna ke halaman otentikasi provider (Google).
     *
     * @param string $provider
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function redirect($provider)
    {
        // Validasi untuk memastikan hanya provider yang didukung yang digunakan
        if (!in_array($provider, ['google'])) {
            return redirect()->route('login')->with('error', 'Provider not supported');
        }

        return Socialite::driver($provider)->redirect();
    }

    /**
     * Menangani callback setelah otentikasi dari provider (Google).
     *
     * @param string $provider
     * @return \Illuminate\Http\RedirectResponse
     */
    public function callback($provider)
    {
        try {
            // Validasi provider sekali lagi
            if (!in_array($provider, ['google'])) {
                return redirect()->route('login')->with('error', 'Provider not supported');
            }

            // Ambil data pengguna dari Google
            $socialUser = Socialite::driver($provider)->user();
            
            // Cari pengguna di database berdasarkan email. Jika tidak ada, buat pengguna baru.
            // Jika sudah ada, perbarui datanya.
            $user = User::updateOrCreate(
                [
                    'email' => $socialUser->getEmail(),
                ],
                [
                    'name' => $socialUser->getName(),
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'email_verified_at' => now(),
                    'password' => Hash::make(Str::random(24)), 
                ]
            );
            
            // BAGIAN PALING PENTING: Berikan role 'user' jika pengguna belum memilikinya.
            // Ini tidak akan menimpa role 'admin' jika pengguna tersebut sudah menjadi admin.
            if (!$user->hasRole('user') && !$user->hasRole('admin')) {
                $user->assignRole('user');
            }
            
            // Login-kan pengguna ke dalam aplikasi
            Auth::login($user);
            
            // Arahkan pengguna ke dashboard yang sesuai
            if ($user->hasRole('admin')) {
                return redirect()->route('admin.dashboard');
            }

            return redirect()->route('user.dashboard');

        } catch (\Exception $e) {
            // Jika terjadi error, kembalikan ke halaman login dengan pesan error
            return redirect()->route('login')->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }
}