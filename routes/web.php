<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

// Route untuk dashboard pengguna biasa.
// Ini hanya bisa diakses jika pengguna sudah login dan emailnya terverifikasi.
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// --- CONTOH ROUTE DENGAN SPATIE ROLE MIDDLEWARE ---
// Grup ini hanya bisa diakses oleh pengguna yang sudah login DAN memiliki role 'admin'.
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    // Route untuk dashboard admin -> /admin/dashboard
    Route::get('/dashboard', function () {
        // Asumsi Anda akan membuat halaman Admin/Dashboard.jsx
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    // Tambahkan route-route khusus admin lainnya di sini...
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
