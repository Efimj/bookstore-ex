<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $filename = (new ImageHandler())->getRandomImage('literature',500, 750);

        return [
            'age_restriction_id' => DB::table('age_restrictions')->inRandomOrder()->first()->age_restriction_id,
            'title' => $this->faker->sentence(rand(1, 7)),
            'publication_date' => $this->faker->date,
            'page_count' => rand(7, 1080),
            'image' => $filename,
            'description' => $this->faker->paragraph,
        ];
    }
}
