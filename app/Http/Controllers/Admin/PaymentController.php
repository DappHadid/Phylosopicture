<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Inertia\Inertia;

class PaymentController extends Controller
{
public function index()
{
    $query = Payment::with(['user', 'movie']);

    if (request('search')) {
        $search = request('search');
        $query->where(function ($q) use ($search) {
            $q->where('order_id', 'like', "%{$search}%")
              ->orWhereHas('user', fn($u) => $u->where('name', 'like', "%{$search}%"))
              ->orWhereHas('movie', fn($m) => $m->where('title', 'like', "%{$search}%"));
        });
    }

    if (request('status')) {
        $query->where('status', request('status'));
    }

    $payments = $query->latest()->paginate(10)->withQueryString();

    return Inertia::render('Admin/PaymentList', [
        'payments' => $payments,
        'filters' => request()->only(['search', 'status']),
    ]);
}

}
