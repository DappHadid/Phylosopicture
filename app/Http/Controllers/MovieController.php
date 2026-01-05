<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class MovieController extends Controller
{
    public function show($slug)
    {
        // Data statis untuk pengujian (ganti dengan query database nanti)
        $movie = [
            'slug' => $slug,
            'name' => 'Sunset Di Pantai Losari',
            'category' => 'Drama',
            'thumbnail' => '/images/featured-1.png',
            'duration' => '1h 30m',
            'price' => '20.000',
            'description' => 'Mario dan Tenri sepakat untuk pulang berkemah bersama keluarga masing-masing...',
            'cast' => 'Siti Arita, Jihan Kler',
            'releaseYear' => '2018',
            'writer' => 'Aca Hasauddin Mt',
            'director' => 'Aca Hasauddin Mt',
            'production' => 'SKY Movie Entertainment',
        ];

        return Inertia::render('MovieDetail', ['movie' => $movie]);
    }

    // Tambahkan method untuk rute /buy (opsional untuk sekarang)
    public function buy($slug)
    {
        // Logika pembelian akan ditambahkan di sini nanti
        return Inertia::render('Buy', ['slug' => $slug]);
    }
}