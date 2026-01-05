<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Movie extends Model
{
    use HasFactory;
protected $primaryKey = 'movie_id';
    protected $fillable = [
        'genre_id',
        'slug',
        'title',
        'description',
        'producer',
        'director',
        'price',
        'duration',
        'release_year',
        'storage_url',
        'thumbnail_url',
    ];

    protected $casts = [
        'price' => 'integer',
    ];

    public function getRouteKeyName()
{
    return 'slug';
}
    public function genre(): BelongsTo
    {
        return $this->belongsTo(Genre::class, 'genre_id', 'genre_id');
    }

    public function purchaseRecords()
    {
        // Parameter kedua: 'foreign_key' di tabel purchased_movies
        // Parameter ketiga: 'local_key' di tabel movies (tabel ini sendiri)
        return $this->hasMany(PurchasedMovie::class, 'movie_id', 'movie_id');
    }

    // Helper method untuk rata-rata rating (sekarang akan berfungsi)
    public function averageRating()
    {
        return $this->purchaseRecords() // DIGANTI DARI purchasedMovies()
            ->whereNotNull('rating')
            ->avg('rating');
    }

    // Helper method untuk jumlah rating (sekarang akan berfungsi)
    public function ratingCount()
    {
        return $this->purchaseRecords() 
            ->whereNotNull('rating')
            ->count();
    }
}