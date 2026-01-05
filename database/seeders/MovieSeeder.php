<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movie;
use App\Models\Genre;
use Illuminate\Support\Str;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // --- Buat Genres ---
        $genres = [
            ['name' => 'Action', 'slug' => 'action'],
            ['name' => 'Comedy', 'slug' => 'comedy'],
            ['name' => 'Drama', 'slug' => 'drama'],
            ['name' => 'Horror', 'slug' => 'horror'],
            ['name' => 'Sci-Fi', 'slug' => 'sci-fi'],
            ['name' => 'Romance', 'slug' => 'romance'],
        ];

        foreach ($genres as $genre) {
            // firstOrCreate akan membuat genre jika belum ada, atau mengambil yang sudah ada.
            Genre::firstOrCreate(['slug' => $genre['slug']], $genre);
        }

        // --- Data Movies ---
        $moviesData = [
            [
                'title' => 'Belum Pergi',
                'description' => 'Okta hanya ingin tempat tinggal yang nyaman untuk memulai hidup barunya. Tapi sejak ia tiba di kos itu, semuanya terasa salah. Sepi, dingin, dan terlalu banyak hal yang tidak bisa dijelaskan. Hari ke hari, kejadian-kejadian janggal terus muncul. Samar-samar, sosok yang tak seharusnya ada mulai menunjukkan dirinya. Okta mencoba mengabaikan, hingga ia menemukan kenyataan kelam yang tersembunyi di balik dinding kos ini tentang seorang perempuan yang kehilangan segalanya, kecuali amarahnya. Ketika suara perempuan dibungkam, ada yang akan berbicara untuknya. Namun pertanyaannya, siapakah yang akan mendengar… sebelum semuanya terlambat?',
                'genre_slug' => 'horror',
                'price' => 5000,
                'release_year' => 2025,
                'duration' => 19,
                'thumbnail_url' => 'movies/belum-pergi.png',
                'storage_url' => '/movies/belum-pergi.mp4',
                'producer' => 'Silvia Rosikhah',
                'director' => 'Muhammad Haqul Yaqin',
            ],
        ];

        // --- Simpan semua movies ---
        foreach ($moviesData as $movieData) {
            $genreId = Genre::where('slug', $movieData['genre_slug'])->value('genre_id');
            
            $movieToCreate = $movieData;
            $movieToCreate['slug'] = Str::slug($movieData['title']);
            $movieToCreate['genre_id'] = $genreId;
            unset($movieToCreate['genre_slug']);

            Movie::firstOrCreate(['slug' => $movieToCreate['slug']], $movieToCreate);
        }
    }
}
