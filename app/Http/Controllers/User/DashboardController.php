<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Movie;

class DashboardController extends Controller
{
    public function index()
    {
        // Get featured movies for carousel
        $featuredMovies = Movie::with('genre')
            ->where('is_featured', true)
            ->orderBy('rating', 'desc')
            ->limit(4)
            ->get()
            ->map(function ($movie) {
                // Ensure rating is a number
                $movie->rating = (float) $movie->rating;
                return $movie;
            });
            
        // Get browse movies for grid display
        $browseMovies = Movie::with('genre')
            ->orderBy('release_year', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($movie) {
                // Ensure rating is a number
                $movie->rating = (float) $movie->rating;
                return $movie;
            });
            
        // Get featured movie for main display (first one)
        $featuredMovie = $featuredMovies->first() ?? Movie::with('genre')->first();
            
        return Inertia::render('User/Dashboard/Dashboard', [
            'featuredMovie' => $featuredMovie,
            'featuredMovies' => $featuredMovies,
            'browseMovies' => $browseMovies,
        ]);
    }

    public function favorites()
    {
        // Get user's favorite movies with genre
        $favoriteMovies = request()->user()->favorites()->with('genre')->get()
            ->map(function ($movie) {
                $movie->rating = (float) $movie->rating;
                return $movie;
            });
            
        return Inertia::render('User/Dashboard/Favorite', [
            'favoriteMovies' => $favoriteMovies,
        ]);
    }
}