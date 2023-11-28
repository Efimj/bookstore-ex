<?php

namespace Database\Factories;

use App\Models\Review;
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
            'user_id' => function () {
                return DB::table('users')->inRandomOrder()->first()->user_id;
            },
            'book_id' => function (array $attributes) {
                // Ensure unique book_id for each user_id
                return DB::table('books')
                    ->whereNotIn('book_id', Review::where('user_id', $attributes['user_id'])->pluck('book_id'))
                    ->inRandomOrder()
                    ->first()
                    ->book_id;
            },
            'description' => $this->faker->paragraph,
            'rating' => rand(1, 5),
        ];
    }
}
