<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class GenreController extends Controller
{
    public function index()
    {
        $genres = Genre::paginate(10);
        return Inertia::render('Admin/Genres', [
            'genres' => $genres,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/GenreCreate');
    }

public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255|unique:genres,name',
    ]);

    Genre::create([
        'name' => $request->name,
        'slug' => Str::slug($request->name),
    ]);

    return redirect()
        ->route('admin.movies.index')
        ->with('success', 'Genre created successfully!');
}


    public function edit(Genre $genre)
    {
        return Inertia::render('Admin/GenreEdit', [
            'genre' => $genre,
        ]);
    }

    public function update(Request $request, Genre $genre)
    {
        $request->validate([
            'name' => 'required|string|max:100|unique:genres,name,' . $genre->genre_id . ',genre_id',
        ]);

        $genre->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->route('admin.genres.index')->with('success', 'Genre updated successfully.');
    }

    public function destroy(Genre $genre)
    {
        $genre->delete();
        return redirect()->route('admin.genres.index')->with('success', 'Genre deleted successfully.');
    }
}
