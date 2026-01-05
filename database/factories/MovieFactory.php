<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class MovieFactory extends Factory
{
    public function definition(): array
    {
        $title = $this->faker->sentence(3);

        return [
            'title' => $title,
            'slug' => Str::slug($title) . '-' . Str::random(5),
            'price' => $this->faker->numberBetween(15000, 75000),
            'thumbnail_url' => 'thumbnails/' . $this->faker->image('storage/app/public/thumbnails', 640, 360, null, false),
            'created_at' => now()->subMonths(rand(0, 6)),
            'updated_at' => now(),
        ];
    }
}
