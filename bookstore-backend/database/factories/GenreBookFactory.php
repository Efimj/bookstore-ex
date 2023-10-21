<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GenreBook>
 */
class GenreBookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'book_id' => DB::table('books')->inRandomOrder()->first()->book_id,
            'genre_id' => DB::table('genres')->inRandomOrder()->first()->genre_id,
        ];
    }
}
