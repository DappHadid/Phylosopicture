<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\Auth\LoginRequest;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     * Untuk modal login, GET login diarahkan saja ke homepage.
     */
    public function create()
    {
        return Inertia::render('User/Dashboard/HomePage');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        Log::debug('Login attempt started', [
            'input' => $request->all(),
            'ip' => $request->ip(),
            'timestamp' => now(),
        ]);

        $captcha = $request->input('g-recaptcha-response');

        if (!$captcha) {
            Log::warning('No captcha provided', [
                'input' => $request->all(),
                'ip' => $request->ip(),
                'timestamp' => now(),
            ]);
            return back()->withErrors(['captcha' => 'Captcha is required.']);
        }

        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => config('recaptcha.secret_key'),
            'response' => $captcha,
            'remoteip' => $request->ip(),
        ]);

        $data = $response->json();

        // ✅ v3: Simple success check only (no score validation)
        if (!($data['success'] ?? false)) {
            Log::warning('reCAPTCHA verification failed', [
                'response_data' => $data,
                'ip' => $request->ip(),
                'email' => $request->input('email'),
                'user_agent' => $request->userAgent(),
                'timestamp' => now(),
            ]);
            return back()->withErrors(['g-recaptcha-response' => 'Captcha validation failed.']);
        }

        // Log successful verification (no score checking)
        Log::info('reCAPTCHA verification successful', [
            'ip' => $request->ip(),
            'email' => $request->input('email'),
            'user_agent' => $request->userAgent(),
            'timestamp' => now(),
        ]);

        $request->authenticate();
        $request->session()->regenerate();

        return $request->user()->hasRole('admin')
            ? redirect()->route('admin.dashboard')->with('success', 'Welcome Admin!')
            : redirect()->route('home')->with('success', 'Login successful!');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/')
            ->with('success', 'You have been logged out.');
    }
}