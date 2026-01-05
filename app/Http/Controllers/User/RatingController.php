<?php

namespace App\Http\Controllers\User;

use App\Models\Movie;
use App\Models\PurchasedMovie;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    public function store(Request $request, Movie $movie)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $purchase = PurchasedMovie::where('user_id', Auth::id())
            ->where('movie_id', $movie->getKey())
            ->first();

        if (!$purchase) {
            return back()->with('error', '❌ Anda harus membeli film ini sebelum bisa memberi rating.');
        }

        $purchase->update([
            'rating' => $request->rating,
        ]);

        return back()->with('success', '✅ Terima kasih! Rating Anda telah disimpan.');
    }
}
