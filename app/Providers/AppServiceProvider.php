<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Register any application services here if needed
        
        // Example: Bind interfaces to implementations
        // $this->app->bind(SomeInterface::class, SomeImplementation::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Authorization Gates
        Gate::define('admin-access', fn($user) => $user->hasRole('admin'));
        Gate::define('user-access', fn($user) => $user->hasRole('user') || $user->hasRole('admin'));
    }
}