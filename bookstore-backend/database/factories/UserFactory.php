<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
        $email = fake()->unique()->safeEmail();
        $password = fake()->password;

        $filename = (new ImageHandler())->getRandomImage('avatar');

        $this->addRecordToFile($email, $password);
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'birthday' => fake()->dateTimeBetween('-30 years', '-15 years')->format('Y-m-d'),
            'password' => $password,
            'email' => $email,
            'image' => $filename,
            'user_type_id' => DB::table('user_types')->inRandomOrder()->first()->user_type_id,
        ];
    }

    function addRecordToFile($email, $password): void
    {
        $filename = 'users.txt';
        if (!Storage::exists($filename)) {
            Storage::put($filename, '');
        }

        $content = "$email $password";
        Storage::append($filename, $content);

        echo "Запись добавлена: $content";
    }
}
