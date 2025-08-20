<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
protected $primaryKey = 'payment_id'; // Kunci utama kustom dari migrasi
    protected $fillable = [
        'user_id',
        'movie_id',
        'midtrans_transaction_id',
        'amount',
        'status',
        'payment_date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class, 'movie_id', 'movie_id');
    }
}
