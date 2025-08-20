<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movie;
use App\Models\Genre;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create genres first (only if they don't exist)
        $genres = [
            ['name' => 'Action', 'slug' => 'action'],
            ['name' => 'Comedy', 'slug' => 'comedy'],
            ['name' => 'Drama', 'slug' => 'drama'],
            ['name' => 'Horror', 'slug' => 'horror'],
            ['name' => 'Sci-Fi', 'slug' => 'sci-fi'],
            ['name' => 'Romance', 'slug' => 'romance'],
        ];

        foreach ($genres as $genre) {
            Genre::firstOrCreate(['slug' => $genre['slug']], $genre);
        }
        
        // Clear existing movies to avoid duplicates
        Movie::truncate();

        // Create featured movie
        $featuredMovie = Movie::create([
            'title' => 'The Quantum Paradox',
            'slug' => 'the-quantum-paradox',
            'description' => 'A mind-bending sci-fi thriller that explores the boundaries of reality and consciousness.',
            'duration' => 148,
            'release_date' => '2024-03-15',
            'price' => 9.99,
            'rating' => 4.8,
            'is_featured' => true,
            'trailer_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'poster_url' => '/images/movies/quantum-paradox.jpg',
            'backdrop_url' => '/images/movies/quantum-paradox-backdrop.jpg',
            'status' => 'published',
        ]);

        $featuredMovie->genres()->attach([1, 5]); // Action, Sci-Fi

        // Create additional movies
        $movies = [
            [
                'title' => 'Love in Paris',
                'slug' => 'love-in-paris',
                'description' => 'A romantic journey through the streets of Paris.',
                'duration' => 120,
                'release_date' => '2024-02-14',
                'price' => 7.99,
                'rating' => 4.5,
                'is_featured' => false,
                'trailer_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'poster_url' => '/images/movies/love-paris.jpg',
                'backdrop_url' => '/images/movies/love-paris-backdrop.jpg',
                'status' => 'published',
            ],
            [
                'title' => 'The Last Stand',
                'slug' => 'the-last-stand',
                'description' => 'An action-packed thriller about survival and redemption.',
                'duration' => 135,
                'release_date' => '2024-01-20',
                'price' => 8.99,
                'rating' => 4.3,
                'is_featured' => false,
                'trailer_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'poster_url' => '/images/movies/last-stand.jpg',
                'backdrop_url' => '/images/movies/last-stand-backdrop.jpg',
                'status' => 'published',
            ],
            [
                'title' => 'Comedy Nights',
                'slug' => 'comedy-nights',
                'description' => 'A hilarious comedy about friendship and adventure.',
                'duration' => 110,
                'release_date' => '2024-04-01',
                'price' => 6.99,
                'rating' => 4.2,
                'is_featured' => false,
                'trailer_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'poster_url' => '/images/movies/comedy-nights.jpg',
                'backdrop_url' => '/images/movies/comedy-nights-backdrop.jpg',
                'status' => 'published',
            ],
            [
                'title' => 'Dark Shadows',
                'slug' => 'dark-shadows',
                'description' => 'A spine-chilling horror experience.',
                'duration' => 125,
                'release_date' => '2024-03-30',
                'price' => 7.99,
                'rating' => 4.1,
                'is_featured' => false,
                'trailer_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'poster_url' => '/images/movies/dark-shadows.jpg',
                'backdrop_url' => '/images/movies/dark-shadows-backdrop.jpg',
                'status' => 'published',
            ],
            [
                'title' => 'Space Odyssey',
                'slug' => 'space-odyssey',
                'description' => 'An epic space adventure across galaxies.',
                'duration' => 160,
                'release_date' => '2024-05-15',
                'price' => 9.99,
                'rating' => 4.6,
                'is_featured' => false,
                'trailer_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'poster_url' => '/images/movies/space-odyssey.jpg',
                'backdrop_url' => '/images/movies/space-odyssey-backdrop.jpg',
                'status' => 'published',
            ],
            [
                'title' => 'Drama Queen',
                'slug' => 'drama-queen',
                'description' => 'A powerful drama about love and loss.',
                'duration' => 140,
                'release_date' => '2024-02-28',
                'price' => 8.49,
                'rating' => 4.4,
                'is_featured' => false,
                'trailer_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'poster_url' => '/images/movies/drama-queen.jpg',
                'backdrop_url' => '/images/movies/drama-queen-backdrop.jpg',
                'status' => 'published',
            ],
        ];

        foreach ($movies as $index => $movie) {
            $movieModel = Movie::create($movie);
            $movieModel->genres()->attach([($index % 6) + 1, (($index + 1) % 6) + 1]);
        }
    }
}
