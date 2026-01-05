<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Carbon;
class UserTableSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin', 
                'password' => bcrypt('password'),
                'email_verified_at' => Carbon::now(),
            ]
        );
        $admin->assignRole(['admin']);

        $user = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'User', 
                'password' => bcrypt('password'),
                'email_verified_at' => Carbon::now(),
            ]
        );
        $user->assignRole(['user']);
    }
}   