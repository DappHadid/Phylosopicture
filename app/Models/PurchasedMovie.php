<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PurchasedMovie extends Model
{
protected $primaryKey = 'purchased_id';
    protected $fillable = [
        'user_id',
        'movie_id',
        'payment_id',
        'purchased_at',
        'rating',
    ];
    protected $casts = [
    'rating' => 'float',
];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class, 'movie_id', 'movie_id');
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class, 'payment_id', 'payment_id');
    }
}
