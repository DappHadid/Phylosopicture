<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\Movie;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;


class MovieController extends Controller
{
    /**
     * Display the specified movie details.
     *
     * @param string $slug
     * @return \Inertia\Response
     */

        public function index()
    {
        $movies = Movie::orderBy('created_at', 'desc')
            ->withAvg('purchaseRecords', 'rating') // Menggunakan nama relasi yang disarankan
            ->get();

        // Tambahkan properti 'average_rating' ke setiap film agar mudah digunakan di frontend
        $movies->each(function ($movie) {
            $movie->average_rating = $movie->purchase_records_avg_rating ?? 0;
        });
        return Inertia::render('User/Dashboard/Movies', [
            'movies' => $movies,
        ]);
    }
    public function show($slug)
    {
        // Cari film berdasarkan slug, persis seperti cara Anda
        $movie = Movie::where('slug', $slug)->firstOrFail();
        
        // Muat relasi genre
        $movie->load('genre');

        // Gunakan helper method dari model Movie untuk mendapatkan data rating
        $average_rating = $movie->averageRating();
        $rating_count = $movie->ratingCount();

        // Siapkan variabel default
        $user_has_purchased = false;
        $user_rating = null;

        // Cek hanya jika user sedang login
        if (Auth::check()) {
            // Cek apakah ada record pembelian film ini oleh user yang login
            $purchase = $movie->purchaseRecords()
                ->where('user_id', Auth::id())
                ->first();

            if ($purchase) {
                $user_has_purchased = true;
                $user_rating = $purchase->rating;
            }
        }

        return Inertia::render('User/Dashboard/MovieDetail', [
            'movie' => $movie,
            'average_rating' => $average_rating ?? 0,
            'rating_count' => $rating_count ?? 0,
            'user_has_purchased' => $user_has_purchased,
            'user_rating' => $user_rating,
        ]);
    }

    /**
     * Handle the movie purchase process.
     *
     * @param string $slug
     * @return \Inertia\Response
     */
public function buy($slug)
    {
        $movie = Movie::with('genre')->where('slug', $slug)->firstOrFail();
        return Inertia::render('User/MovieDetailPage', [
            'movie' => $movie,
            'auth' => Auth::user() ? ['user' => Auth::user()] : null,
        ]);
    }

    public function play($slug)
    {
        $movie = Movie::with('genre')->where('slug', $slug)->firstOrFail();
        return Inertia::render('User/Dashboard/MoviePlayPage', [
            'movie' => $movie,
            'auth' => Auth::user(),
        ]);
    }
}

