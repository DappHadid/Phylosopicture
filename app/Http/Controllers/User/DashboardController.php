<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Movie;

class DashboardController extends Controller
{
    public function index()
    {            
        return Inertia::render('User/Dashboard/HomePage');
    }
}