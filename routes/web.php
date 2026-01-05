<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\NewsController;
use App\Http\Controllers\Admin\GenreController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\PaymentController;
use App\Http\Controllers\User\RatingController;
use App\Http\Controllers\User\MovieController as UserMovieController;
use App\Http\Controllers\Admin\MovieController as AdminMovieController;
use App\Http\Controllers\Admin\PaymentController as AdminPaymentController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\NewsController as AdminNewsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// ========================
// Public & Core Routes
// ========================

// Homepage (Satu-satunya rute untuk '/')
Route::get('/', [DashboardController::class, 'index'])->name('home');

// News
Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{id}', [NewsController::class, 'show'])->name('news.show');

// Movies (list & detail)
Route::get('/movies', [UserMovieController::class, 'index'])->name('movies.index');
Route::get('/movies/{slug}', [UserMovieController::class, 'show'])->name('movies.show');
// Socialite (login via Google, dll.)
Route::prefix('auth')->name('socialite.')->group(function () {
    Route::get('/{provider}/redirect', [SocialiteController::class, 'redirect'])->name('redirect');
    Route::get('/{provider}/callback', [SocialiteController::class, 'callback'])->name('callback');
});


// ========================
// User Routes (Login Required)
// ========================
Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    // Movie Play (hanya user login bisa nonton/play)
    Route::get('/movie/{slug}/play', [UserMovieController::class, 'play'])->name('movie.play');

    // Payment Routes (hanya login bisa beli movie)
    Route::post('/movie/{slug}/buy', [PaymentController::class, 'buy'])->name('movie.buy');
    Route::post('/payment/webhook', [PaymentController::class, 'webhookHandler'])->name('payment.webhook');
    
    // Rating Routes
    Route::post('/movie/{movie:slug}/rate', [RatingController::class, 'store'])->name('movie.rate');

    // Profile
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('User/Profile/Edit');
        })->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
});


// ========================
// Admin Routes
// ========================
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('/movies', [AdminMovieController::class, 'index'])->name('movies.index');
    Route::get('/movies/create', [AdminMovieController::class, 'create'])->name('movies.create');
    Route::post('/movies', [AdminMovieController::class, 'store'])->name('movies.store');
    Route::get('/movies/{movie}/edit', [AdminMovieController::class, 'edit'])->name('movies.edit');
    Route::put('/movies/{movie}', [AdminMovieController::class, 'update'])->name('movies.update');
    Route::delete('/movies/{movie}', [AdminMovieController::class, 'destroy'])->name('movies.destroy');
    Route::get('/movies/{movie}', [AdminMovieController::class, 'show'])->name('movies.show');
    Route::resource('news', AdminNewsController::class);
    Route::get('/payments', [AdminPaymentController::class, 'index'])->name('payments.index');
    Route::resource('genres', GenreController::class)->except(['show']);
});


// ========================
// Auth Routes (login, register, dll.)
// ========================
require __DIR__ . '/auth.php';