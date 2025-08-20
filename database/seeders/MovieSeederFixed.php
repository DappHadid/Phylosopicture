<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movie;
use App\Models\Genre;

class MovieSeederFixed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create genres with slugs
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
        
        // Create featured movies
        $featuredMovies = [
            [
                'title' => 'The Quantum Paradox',
                'description' => 'A mind-bending sci-fi thriller that explores the boundaries of reality and consciousness.',
                'genre_id' => Genre::where('slug', 'sci-fi')->first()->genre_id,
                'price' => 9.99,
                'release_year' => 2024,
                'rating' => 4.8,
                'duration' => 135, // dalam menit
                'thumbnail_url' => '/images/featured-1.png',
                'storage_url' => '/movies/quantum-paradox.mp4',
                'scriptwriter' => 'Christopher Nolan',
                'director' => 'Denis Villeneuve',
                'is_featured' => true,
            ],
            [
                'title' => 'Love in Paris',
                'description' => 'A heartwarming romantic journey through the streets of Paris, exploring love and destiny.',
                'genre_id' => Genre::where('slug', 'romance')->first()->genre_id,
                'price' => 7.99,
                'release_year' => 2024,
                'rating' => 4.5,
                'duration' => 105, // dalam menit
                'thumbnail_url' => '/images/featured-2.png',
                'storage_url' => '/movies/love-in-paris.mp4',
                'scriptwriter' => 'Emma Thompson',
                'director' => 'Richard Curtis',
                'is_featured' => true,
            ],
            [
                'title' => 'The Dark Knight Returns',
                'description' => 'An action-packed superhero film featuring the legendary Batman in his most challenging case yet.',
                'genre_id' => Genre::where('slug', 'action')->first()->genre_id,
                'price' => 12.99,
                'release_year' => 2024,
                'rating' => 4.9,
                'duration' => 150, // dalam menit
                'thumbnail_url' => '/images/featured-3.png',
                'storage_url' => '/movies/dark-knight-returns.mp4',
                'scriptwriter' => 'Jonathan Nolan',
                'director' => 'Christopher Nolan',
                'is_featured' => true,
            ],
        ];

        // Create browse movies
        $browseMovies = [
            [
                'title' => 'Meong Golden',
                'description' => 'A horror love story with unexpected twists and supernatural elements.',
                'genre_id' => Genre::where('slug', 'horror')->first()->genre_id,
                'price' => 8.99,
                'release_year' => 2023,
                'rating' => 4.2,
                'duration' => 110, // dalam menit
                'thumbnail_url' => '/images/browse-1.png',
                'storage_url' => '/movies/meong-golden.mp4',
                'scriptwriter' => 'Aca Hasauddin',
                'director' => 'Aca Hasauddin',
                'is_featured' => false,
            ],
            [
                'title' => 'Midnight Chronicles',
                'description' => 'A gripping drama that unfolds in the dark streets of a metropolitan city.',
                'genre_id' => Genre::where('slug', 'drama')->first()->genre_id,
                'price' => 6.99,
                'release_year' => 2023,
                'rating' => 4.4,
                'duration' => 125, // dalam menit
                'thumbnail_url' => '/images/browse-2.png',
                'storage_url' => '/movies/midnight-chronicles.mp4',
                'scriptwriter' => 'Jane Doe',
                'director' => 'John Smith',
                'is_featured' => false,
            ],
            [
                'title' => 'Comedy Central',
                'description' => 'A hilarious comedy that will keep you laughing from start to finish.',
                'genre_id' => Genre::where('slug', 'comedy')->first()->genre_id,
                'price' => 5.99,
                'release_year' => 2024,
                'rating' => 4.3,
                'duration' => 90, // dalam menit
                'thumbnail_url' => '/images/browse-3.png',
                'storage_url' => '/movies/comedy-central.mp4',
                'scriptwriter' => 'Mike Johnson',
                'director' => 'Sarah Williams',
                'is_featured' => false,
            ],
            [
                'title' => 'Action Heroes',
                'description' => 'An explosive action film with non-stop thrills and spectacular stunts.',
                'genre_id' => Genre::where('slug', 'action')->first()->genre_id,
                'price' => 11.99,
                'release_year' => 2024,
                'rating' => 4.6,
                'duration' => 130, // dalam menit
                'thumbnail_url' => '/images/browse-4.png',
                'storage_url' => '/movies/action-heroes.mp4',
                'scriptwriter' => 'David Lee',
                'director' => 'Michael Bay',
                'is_featured' => false,
            ],
            [
                'title' => 'Sci-Fi Odyssey',
                'description' => 'A mind-bending science fiction adventure across galaxies and dimensions.',
                'genre_id' => Genre::where('slug', 'sci-fi')->first()->genre_id,
                'price' => 9.99,
                'release_year' => 2024,
                'rating' => 4.7,
                'duration' => 140, // dalam menit
                'thumbnail_url' => '/images/browse-5.png',
                'storage_url' => '/movies/sci-fi-odyssey.mp4',
                'scriptwriter' => 'Alex Chen',
                'director' => 'Steven Spielberg',
                'is_featured' => false,
            ],
        ];

        // Combine and create all movies
        $allMovies = array_merge($featuredMovies, $browseMovies);
        
        foreach ($allMovies as $movie) {
            Movie::firstOrCreate(
                ['title' => $movie['title']],
                $movie
            );
        }
    }
}
