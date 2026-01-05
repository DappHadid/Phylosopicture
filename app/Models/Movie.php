<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Movie extends Model
{
protected $primaryKey = 'movie_id'; // Kunci utama kustom dari migrasi
    protected $fillable = [
        'genre_id',
        'slug',
        'title',
        'description',
        'scriptwriter',
        'director',
        'price',
        'duration',
        'rating',
        'release_year',
        'storage_url',
        'thumbnail_url',
        'is_featured',
    ];

    protected $casts = [
        'price' => 'float', // Cast price sebagai float
        'rating' => 'float', // Cast rating sebagai float (opsional, untuk konsistensi)
        'is_featured' => 'boolean',
    ];
    public function genre(): BelongsTo
    {
        return $this->belongsTo(Genre::class, 'genre_id', 'genre_id');
    }

    public function favorites(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'favorites', 'movie_id', 'user_id');
    }

    public function purchasedMovies(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'purchased_movies', 'movie_id', 'user_id');
    }
}
