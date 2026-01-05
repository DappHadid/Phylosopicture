<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Movie;
use App\Models\Payment;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class DashboardController extends Controller
{
    public function index()
    {
        $totalRevenue = Payment::sum('amount');
        $currentMonth = now()->month;
        $lastMonth = now()->subMonth()->month;

        $revenueThisMonth = Payment::whereMonth('created_at', $currentMonth)->sum('amount');
        $revenueLastMonth = Payment::whereMonth('created_at', $lastMonth)->sum('amount');
        $revenueChange = $revenueLastMonth > 0
            ? (($revenueThisMonth - $revenueLastMonth) / $revenueLastMonth) * 100
            : 0;

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalRevenue'   => $totalRevenue,
                'revenueChange'  => $revenueChange,
                'totalMovies'    => Movie::count(),
                'moviesChange'   => 0,
                'totalUsers'     => User::count(),
                'usersChange'    => 0,
                'totalPayments'  => Payment::count(),
                'paymentsChange' => 0,
            ],
            'chartData' => Payment::selectRaw('MONTH(created_at) as month, SUM(amount) as sales')
                ->groupBy('month')->orderBy('month')->get()
                ->map(fn ($row) => [
                    'name' => date("F", mktime(0, 0, 0, $row->month, 1)),
                    'sales' => (int) $row->sales,
                ]),
            'usersChartData' => User::selectRaw('MONTH(created_at) as month, COUNT(*) as users')
                ->groupBy('month')->orderBy('month')->get()
                ->map(fn ($row) => [
                    'name' => date("F", mktime(0, 0, 0, $row->month, 1)),
                    'users' => (int) $row->users,
                ]),
            'moviesChartData' => DB::table('purchased_movies')
                ->join('movies', 'purchased_movies.movie_id', '=', 'movies.movie_id')
                ->select('movies.title as name', DB::raw('COUNT(purchased_movies.movie_id) as sales'))
                ->groupBy('movies.movie_id', 'movies.title')
                ->orderByDesc('sales')
                ->limit(5)
                ->get()
                ->map(fn($row) => [
                    'name' => $row->name,
                    'sales' => (int) $row->sales,
                ]),
        ]);
    }
}
