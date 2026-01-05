<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * Root template yang digunakan untuk memuat aplikasi Inertia.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Tentukan versi asset aplikasi.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Data default yang dibagikan ke setiap response Inertia.
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [

            'auth' => [
                'user' => fn () => $request->user()
                    ? [
                        'id'    => $request->user()->id,
                        'name'  => $request->user()->name,
                        'email' => $request->user()->email,
                        'roles' => $request->user()->roles
                            ? $request->user()->roles->pluck('name')
                            : [],
                    ]
                    : null,
            ],
        ]);
    }
}
