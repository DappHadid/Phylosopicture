<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class NewsFactory extends Factory
{
    public function definition(): array
    {
        // Array kata kunci untuk gambar yang lebih relevan
        $imageKeywords = ['technology', 'business', 'event', 'movie', 'music', 'achievement'];

        return [
            'title' => $this->faker->bs, // Menggunakan bs untuk judul yang lebih mirip judul berita
            // Menghasilkan 2 paragraf deskripsi yang lebih panjang
            'description' => $this->faker->paragraphs(2, true),
            // Mengambil gambar acak dari Unsplash dengan kata kunci yang relevan
            'image' => 'https://source.unsplash.com/400x250/?' . $this->faker->randomElement($imageKeywords),
            'date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'category' => $this->faker->randomElement(['latest', 'achievement', 'newsEvent']),
            'link' => $this->faker->url,
        ];
    }
}