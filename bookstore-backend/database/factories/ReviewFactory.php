<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => DB::table('users')->inRandomOrder()->first()->user_id,
            'book_id' => DB::table('books')->inRandomOrder()->first()->book_id,
            'description' => $this->faker->paragraph,
            'rating' => rand(1, 5),
        ];
    }
}
