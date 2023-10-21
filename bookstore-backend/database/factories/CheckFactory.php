<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Check>
 */
class CheckFactory extends Factory
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
            'price' => round(0.99 + (1100 - 99) * rand() / getrandmax(), 2),
        ];
    }
}
