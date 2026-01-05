<?php

namespace App\Http\Requests\Admin\Movie;

use Illuminate\Foundation\Http\FormRequest;

class Update extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Sesuaikan dengan otorisasi admin
    }

    public function rules(): array
    {
        $movieId = $this->route('movie')->movie_id;
        return [
            'genre_id' => 'required|exists:genres,genre_id',
            'slug' => 'required|string|unique:movies,slug,' . $movieId . ',movie_id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'producer' => 'nullable|string|max:255',
            'director' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'release_year' => 'required|integer|min:1888|max:' . (date('Y') + 1),
            'video_file'   => 'required|mimes:mp4|max:512000',
            'thumbnail_url' => 'nullable|image|mimes:jpg,jpeg,png|max:51200',
        ];
    }
}