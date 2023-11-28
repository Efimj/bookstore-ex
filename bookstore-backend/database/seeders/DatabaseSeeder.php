<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\BookAuthor;
use App\Models\Check;
use App\Models\Discount;
use App\Models\Genre;
use App\Models\GenreBook;
use App\Models\Offer;
use App\Models\Review;
use App\Models\User;
use App\Models\Wish;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $MAX_attempts = 10;

        Book::factory()->times(25)->create();
        User::factory()->times(25)->create();

        $attempts = 0;
        while ($attempts < $MAX_attempts && BookAuthor::count() <= 25) {
            $countToCreate = 5;
            try {
                BookAuthor::factory()->times($countToCreate)->create();
            } catch (\Exception $e) {
                $attempts++;
            }
        }

        $attempts = 0;
        while ($attempts < $MAX_attempts && Review::count() <= 100) {
            $countToCreate = 5;
            try {
                Review::factory()->times($countToCreate)->create();
            } catch (\Exception $e) {
                $attempts++;
            }
        }

        $attempts = 0;
        while ($attempts < $MAX_attempts && Wish::count() <= 100) {
            $countToCreate = 5;
            try {
                Wish::factory()->times($countToCreate)->create();
            } catch (\Exception $e) {
                $attempts++;
            }
        }

        $attempts = 0;
        while ($attempts < $MAX_attempts && Offer::count() <= 50) {
            $countToCreate = 5;
            try {
                Offer::factory()->times($countToCreate)->create();
            } catch (\Exception $e) {
                $attempts++;
            }
        }

        $attempts = 0;
        while ($attempts < $MAX_attempts && Check::count() >= 100) {
            $countToCreate = 5;
            try {
                Check::factory()->times($countToCreate)->create();
            } catch (\Exception $e) {
                $attempts++;
            }
        }

        $attempts = 0;
        while ($attempts < $MAX_attempts && Discount::count() >= 15) {
            $countToCreate = 5;
            try {
                Discount::factory()->times($countToCreate)->create();
            } catch (\Exception $e) {
                $attempts++;
            }
        }

        $attempts = 0;
        while ($attempts < $MAX_attempts && GenreBook::count() >= 100) {
            $countToCreate = 5;
            try {
                GenreBook::factory()->times($countToCreate)->create();
            } catch (\Exception $e) {
                $attempts++;
            }
        }
//        Wish::factory()->times(100)->create();
//        Offer::factory()->times(25)->create();
//        Check::factory()->times(50)->create();
//        Discount::factory()->times(10)->create();
//        GenreBook::factory()->times(100)->create();
    }
}
