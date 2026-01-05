<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\User\DashboardController;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/auth/{provider}/redirect', [SocialiteController::class, 'redirect'])
    ->name('socialite.redirect');
    
Route::get('/auth/{provider}/callback', [SocialiteController::class, 'callback'])
    ->name('socialite.callback');

Route::middleware(['auth','verified' ,'role:user'])->prefix('dashboard')->name('user.')->group(function () {
    Route::get('/', [DashboardController::class,'index'])->name('dashboard');
});
// // Dashboard untuk user biasa
// Route::get('/dashboard', function () {
//     return Inertia::render('User/Dashboard/Dashboard'); // Sesuaikan dengan subfolder User/Dashboard
// })->middleware(['auth', 'verified'])->name('dashboard');

// Group untuk admin (asumsi tetap terpisah, sesuaikan jika ada subfolder admin)
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard'); // Akan diubah jika ada subfolder Admin
    })->name('dashboard');
});

Route::get('/movie/{slug}', function () {
    return Inertia::render('User/MovieDetail'); // Sesuaikan dengan subfolder User
})->name('movie.show');

Route::get('/buy/{slug}', function () {
    return Inertia::render('User/Watching'); // Sesuaikan dengan subfolder User untuk halaman pembelian/watching
})->name('movie.buy');

Route::middleware('auth')->group(function () {
    Route::get('/profile', function () {
        return Inertia::render('User/Profile/Edit'); // Sesuaikan dengan subfolder User/Profile
    })->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';