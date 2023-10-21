<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Discount>
 */
class DiscountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'offer_id' => DB::table('offers')->inRandomOrder()->first()->offer_id,
            'price' => round(0.99 + (1100 - 99) * rand() / getrandmax(), 2),
            'expiration_date' => $this->faker->dateTimeThisDecade,
        ];
    }
}
