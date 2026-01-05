<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\User\DashboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group.
|
*/

Route::get('/', function () {
    return redirect()->route('login');
})->name('root'); // Redirect to login

// Authentication Routes (Socialite)
Route::prefix('auth')->name('socialite.')->group(function () {
    Route::get('/{provider}/redirect', [SocialiteController::class, 'redirect'])
        ->name('redirect'); // Redirect to provider
    Route::get('/{provider}/callback', [SocialiteController::class, 'callback'])
        ->name('callback'); // Handle provider callback
});

Route::middleware(['auth', 'verified', 'role:user'])->prefix('dashboard')->name('user.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard'); // User dashboard
    Route::get('/favorites', [DashboardController::class, 'favorites'])->name('favorite'); // User favorites
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard'); // Admin dashboard
    })->name('dashboard');
});

Route::name('movie.')->group(function () {
    Route::get('/movie/{slug}', [MovieController::class, 'show'])->name('show'); // Show movie details
    Route::get('/buy/{slug}', [MovieController::class, 'buy'])->name('buy'); // Buy movie
});

Route::middleware('auth')->name('profile.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('User/Profile/Edit'); // Edit profile
    })->name('edit');
    Route::patch('/', [ProfileController::class, 'update'])->name('update'); // Update profile
    Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy'); // Delete profile
});

// Include Authentication Routes
require __DIR__ . '/auth.php';