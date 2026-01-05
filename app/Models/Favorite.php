<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Favorite extends Model
{
    protected $primaryKey = 'favorite_id'; // Kunci utama kustom dari migrasi
    protected $fillable = [
        'user_id',
        'movie_id',
    ];
    public $timestamps = false; // Opsional, jika tidak perlu created_at/updated_at

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class, 'movie_id', 'movie_id');
    }
}