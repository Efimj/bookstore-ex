<?php

namespace Database\Factories;

use App\Models\Offer;
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
        $offer = Offer::inRandomOrder()->first();
        return [
            'offer_id' => $offer->offer_id,
            'price' => round(0.99 + ($offer->price - 99) * rand() / getrandmax(), 2),
            'expiration_date' => $this->faker->dateTimeThisDecade,
        ];
    }
}
