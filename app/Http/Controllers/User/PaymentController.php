<?php

namespace App\Http\Controllers\User;

use Midtrans\Snap;
use Midtrans\Config;
use App\Models\Movie;
use App\Models\Payment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    /**
     * Set up Midtrans configuration.
     */
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    /**
     * Handle the creation of a new transaction.
     */

        public function buy($slug, Request $request)
    {
        // 1. Pastikan user login
        if (!$request->user()) {
            return redirect()->route('login')->with('error', 'Silakan login untuk membeli film.');
        }

        // 2. Cari movie berdasarkan slug
        $movie = Movie::where('slug', $slug)->firstOrFail();

        // 3. Panggil createTransaction, tapi kita kirim request movie_id
        $fakeRequest = new Request([
            'movie_id' => $movie->movie_id,
        ]);
        $fakeRequest->setUserResolver(fn () => $request->user());

        return $this->createTransaction($fakeRequest);
    }
    public function createTransaction(Request $request)
    {
        // 1. Validasi permintaan dari frontend
        $request->validate([
            'movie_id' => 'required|exists:movies,movie_id',
        ]);

        try {
            // 2. Ambil data user dan film
            $user = $request->user();            
            $movie = Movie::findOrFail($request->movie_id);
            // 3. Buat record baru di tabel 'payments' dengan status 'pending'
            $payment = Payment::create([
                'user_id' => $user->id, // Kolom 'id' untuk user_id sesuai migrasi Anda
                'movie_id' => $movie->movie_id,
                'amount' => $movie->price,
                'status' => 'pending',
                // Membuat Order ID yang unik untuk transaksi ini
                'order_id' => 'ORDER-' . $user->id . '-' . $movie->movie_id . '-' . time(),
            ]);

            // 4. Siapkan parameter yang akan dikirim ke Midtrans
            $params = [
                'transaction_details' => [
                    'order_id' => $payment->order_id,
                    'gross_amount' => (int) $payment->amount,
                ],
                'customer_details' => [
                    'first_name' => $user->name,
                    'email' => $user->email,
                ],
                'item_details' => [[
                    'id' => $movie->movie_id,
                    'price' => (int)$movie->price,
                    'quantity' => 1,
                    'name' => "Pembelian Film: " . $movie->title,
                ]],
            ];

            // 5. Minta Snap Token ke Midtrans
            $snapToken = \Midtrans\Snap::getSnapToken($params);

            // 6. Simpan Snap Token ke record payment kita
            $payment->snap_token = $snapToken; // Asumsikan Anda punya kolom snap_token
            $payment->save();

            // 7. Kirim Snap Token kembali ke frontend
            return response()->json(['snap_token' => $snapToken]);

        } catch (\Exception $e) {
            // Catat error jika terjadi
            Log::error('Payment Creation Error: ' . $e->getMessage());
            return response()->json(['error' => 'Terjadi kesalahan saat memproses pembayaran.'], 500);
        }
    }

    /**
     * Handle Midtrans webhook notifications.
     * (Akan kita isi di langkah berikutnya)
     */
public function webhookHandler(Request $request)
{
    try {
        // 1. Buat instance dari Midtrans Notification untuk memproses data yang masuk
        $notification = new \Midtrans\Notification();

        // 2. Ambil data penting dari notifikasi
        $orderId = $notification->order_id;
        $statusCode = $notification->status_code;
        $grossAmount = $notification->gross_amount;
        $transactionStatus = $notification->transaction_status;

        // 3. Buat signature key versi kita untuk verifikasi keamanan
        $serverKey = config('midtrans.server_key');
        $signatureKey = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);

        // 4. VERIFIKASI SIGNATURE KEY (SANGAT PENTING!)
        // Cocokkan signature key dari Midtrans dengan yang kita buat
        if ($signatureKey !== $notification->signature_key) {
            // Jika tidak cocok, ini mungkin notifikasi palsu atau ada masalah
            Log::warning('Midtrans webhook signature mismatch.', ['order_id' => $orderId]);
            return response()->json(['message' => 'Invalid signature'], 403);
        }

        // 5. Cari transaksi di database kita
        $payment = Payment::where('order_id', $orderId)->first();
        if (!$payment) {
            Log::warning('Transaction not found for order_id.', ['order_id' => $orderId]);
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        // 6. Update status transaksi berdasarkan notifikasi dari Midtrans
        if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
            // Jika statusnya adalah 'capture' (untuk kartu kredit) atau 'settlement' (untuk metode lain)
            // yang berarti pembayaran BERHASIL.
            if ($payment->status === 'pending') {
                $payment->status = 'success';
                $payment->midtrans_transaction_code = $notification->transaction_id;
                $payment->payment_date = now();
                $payment->save();

                // INILAH LOGIKA PAY-PER-VIEW: Berikan akses ke film
                \App\Models\PurchasedMovie::create([
                    'user_id' => $payment->user_id, // user_id dari tabel payments
                    'movie_id' => $payment->movie_id,
                    'payment_id' => $payment->payment_id,
                    'purchased_at' => now(),
                ]);
            }
        } else if (in_array($transactionStatus, ['cancel', 'deny', 'expire'])) {
            // Jika pembayaran gagal, dibatalkan, atau kedaluwarsa
            $payment->status = 'failed';
            $payment->save();
        }

        // Beri respons OK ke Midtrans
        return response()->json(['message' => 'Webhook processed successfully']);

    } catch (\Exception $e) {
        // Catat error jika terjadi masalah saat memproses webhook
        Log::error('Midtrans Webhook Error: ' . $e->getMessage());
        return response()->json(['message' => 'Internal Server Error'], 500);
    }
}
}