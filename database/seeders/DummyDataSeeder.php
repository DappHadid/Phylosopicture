<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Movie;
use App\Models\Payment;
use App\Models\PurchasedMovie;

class DummyDataSeeder extends Seeder
{
    public function run(): void
    {
        // --- Ambil semua user yang punya role "user" ---
        $users = User::whereHas('roles', fn($q) => $q->where('name', 'user'))->get();

        // Kalau belum ada user role:user, bikin minimal 5
        if ($users->isEmpty()) {
            foreach (range(1, 5) as $i) {
                $user = User::create([
                    'name' => "User {$i}",
                    'email' => "user{$i}@example.com",
                    'password' => bcrypt('password'),
                ]);
                $user->assignRole('user');
                $users->push($user);
            }
        }

        // --- Ambil semua movies dari MovieSeeder ---
        $movies = Movie::all();

        if ($movies->isEmpty()) {
            $this->command->warn('❌ Tidak ada movie, jalankan MovieSeeder dulu!');
            return;
        }

        // --- Generate dummy transactions ---
        foreach (range(1, 50) as $i) {
            $user  = $users->random();
            $movie = $movies->random();

            // bikin payment
            $payment = Payment::create([
                'user_id'   => $user->id,
                'movie_id'  => $movie->movie_id,
                'order_id'  => 'ORD-' . uniqid(),
                'midtrans_transaction_code' => 'TRX-' . uniqid(),
                'amount'    => $movie->price,
                'status'    => collect(['pending', 'success', 'failed'])->random(),
                'payment_date' => now()->subMonths(rand(0, 5))->subDays(rand(0, 28)),
            ]);

            // bikin purchased_movie
            PurchasedMovie::create([
                'user_id'     => $user->id,
                'movie_id'    => $movie->movie_id,
                'payment_id'  => $payment->payment_id,
                'purchased_at'=> $payment->payment_date,
            ]);
        }

        $this->command->info('✅ Dummy payments & purchased movies berhasil dibuat!');
    }
}
