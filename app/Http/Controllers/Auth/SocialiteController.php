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
     * Redirect user to Google OAuth page
     */
    public function redirect($provider)
    {
        // Validasi provider yang didukung
        if (!in_array($provider, ['google'])) {
            return redirect()->route('login')->with('error', 'Provider not supported');
        }

        return Socialite::driver($provider)->redirect();
    }

    /**
     * Handle callback from Google OAuth
     */
    public function callback($provider)
    {
        try {
            // Validasi provider
            if (!in_array($provider, ['google'])) {
                return redirect()->route('login')->with('error', 'Provider not supported');
            }

            // Ambil user data dari provider
            $socialUser = Socialite::driver($provider)->user();
            
            // Cek apakah user sudah ada berdasarkan email
            $existingUser = User::where('email', $socialUser->getEmail())->first();

            if ($existingUser) {
                $existingUser->update([
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'avatar' => $socialUser->getAvatar(),
                    'email_verified_at' => now(),
                ]);
                
                Auth::login($existingUser);
                return redirect()->intended('/dashboard');
            }

            // Buat user baru
            $newUser = User::create([
                'name' => $socialUser->getName(),
                'email' => $socialUser->getEmail(),
                'provider' => $provider,
                'provider_id' => $socialUser->getId(),
                'avatar' => $socialUser->getAvatar(),
                'email_verified_at' => now(),
                'password' => Hash::make(Str::random(24)), // Random password
            ]);

            Auth::login($newUser);
            return redirect()->intended('/dashboard');

        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }
}