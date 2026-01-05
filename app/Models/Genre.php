<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Genre extends Model
{
    protected $primaryKey = 'genre_id'; // Kunci utama kustom dari migrasi
    protected $fillable = [
        'name',
        'slug',
    ];

    public function movies(): HasMany
    {
        return $this->hasMany(Movie::class, 'genre_id', 'genre_id');
    }
}