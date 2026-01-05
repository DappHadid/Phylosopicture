<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Movie;
use Illuminate\Support\Facades\Auth;

class MovieController extends Controller
{
    /**
     * Display the specified movie details.
     *
     * @param string $slug
     * @return \Inertia\Response
     */
    public function show($slug)
    {
        $movie = Movie::where('slug', $slug)->with('genre')->firstOrFail();

        return Inertia::render('User/MovieDetailPage', [
            'movie' => $movie,
            'auth' => Auth::user() ? ['user' => Auth::user()] : null,
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
        $movie = Movie::where('slug', $slug)->with('genre')->firstOrFail();

        return Inertia::render('User/Watching', [
            'movie' => $movie,
            'auth' => Auth::user() ? ['user' => Auth::user()] : null,
        ]);
    }
}