<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'birthday' => fake()->dateTimeBetween('-30 years', '-15 years')->format('Y-m-d'),
            'password' => bcrypt('password123'),
            'email' => fake()->unique()->safeEmail(),
            'user_type_id' => DB::table('user_types')->inRandomOrder()->first()->user_type_id,
        ];
    }
}
