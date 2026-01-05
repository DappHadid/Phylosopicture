<?php

namespace App\Http\Controllers\Admin;

use App\Models\Genre;
use App\Models\Movie;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Admin\Movie\Store;
use App\Http\Requests\Admin\Movie\Update;
use Inertia\Inertia;

class MovieController extends Controller
{
    public function index()
    {
        $movies = Movie::with('genre')->paginate(10);
        $genres = Genre::all();
        $totalDuration = Movie::sum('duration');


        return Inertia::render('Admin/Movies', [
            'movies' => $movies,
            'genres' => $genres,
            'totalDuration' => $totalDuration,
        ]);
    }

    public function create()
    {
        $genres = Genre::all();
        return Inertia::render('Admin/Create', [
            'genres' => $genres,
        ]);
    }

    public function store(Store $request)
    {
        $data = $request->validated();

        if (empty($data['slug']) && !empty($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }
        // Upload video mp4
        if ($request->hasFile('video_file')) {
            $data['storage_url'] = $request->file('video_file')->store('movies/videos', 'public');
        }
        // Upload thumbnail
        if ($request->hasFile('thumbnail_url')) {
            $data['thumbnail_url'] = $request->file('thumbnail_url')->store('movies', 'public');
        }

        Movie::create($data);

        return redirect()->route('admin.movies.index')
            ->with('success', 'Movie created successfully.');
    }

    public function show(Movie $movie)
    {
        $movie->load('genre');

        return Inertia::render('Admin/Show', [
            'movie' => $movie,
        ]);
    }

    public function edit(Movie $movie)
    {
        $movie->load('genre');
        $genres = Genre::all();

        return inertia('Admin/Edit', [
            'movie'  => $movie,
            'genres' => $genres,
        ]);
    }

    public function update(Update $request, Movie $movie)
    {
        try {
            $data = $request->validated();

            // Auto slug kalau kosong
            if (empty($data['slug']) && !empty($data['title'])) {
                $data['slug'] = Str::slug($data['title']);
            }

            // Upload video baru
            if ($request->hasFile('video_file')) {
                if (
                    $movie->storage_url &&
                    Storage::disk('public')->exists($movie->storage_url)
                ) {
                    Storage::disk('public')->delete($movie->storage_url);
                }

                $data['storage_url'] = $request
                    ->file('video_file')
                    ->store('movies/videos', 'public');
            } else {
                unset($data['storage_url']);
            }
            // Handle upload thumbnail baru
            if ($request->hasFile('thumbnail_url')) {
                // Hapus thumbnail lama jika ada
                if ($movie->thumbnail_url && Storage::disk('public')->exists($movie->thumbnail_url)) {
                    Storage::disk('public')->delete($movie->thumbnail_url);
                }
                $data['thumbnail_url'] = $request->file('thumbnail_url')->store('movies', 'public');
            } else {
                // Kalau tidak upload baru, jangan hapus thumbnail lama
                unset($data['thumbnail_url']);
            }

            $movie->update($data);

            return redirect()
                ->route('admin.movies.index')
                ->with('success', '✅ Movie updated successfully!');

        } catch (\Exception $e) {
            return redirect()
                ->route('admin.movies.index')
                ->with('error', 'Error updating movie: ' . $e->getMessage());
        }
    }

    public function destroy(Movie $movie)
    {
        try {
            // Hapus file thumbnail jika ada
            if ($movie->thumbnail_url && Storage::disk('public')->exists($movie->thumbnail_url)) {
                Storage::disk('public')->delete($movie->thumbnail_url);
            }
            
            $movie->delete();

            return redirect()
                ->route('admin.movies.index')
                ->with('success', '✅ Movie deleted successfully!');

        } catch (\Exception $e) {
            return redirect()
                ->route('admin.movies.index')
                ->with('error', 'Error deleting movie: ' . $e->getMessage());
        }
    }
}