<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\PaymentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rute untuk pembayaran, dilindungi oleh Sanctum agar hanya user login yang bisa akses
Route::middleware('auth:sanctum')->post('/create-transaction', [PaymentController::class, 'createTransaction']);

// Rute untuk menerima notifikasi dari Midtrans (webhook)
Route::post('/midtrans-webhook', [PaymentController::class, 'webhookHandler']);