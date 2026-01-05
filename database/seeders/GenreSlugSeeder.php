<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Genre;
use Illuminate\Support\Str;

class GenreSlugSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genres = Genre::all();
        
        foreach ($genres as $genre) {
            $genre->slug = Str::slug($genre->name);
            $genre->save();
        }
    }
}
