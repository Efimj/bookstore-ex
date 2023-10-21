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
        Book::factory()->times(25)->create();
        User::factory()->times(25)->create();
        BookAuthor::factory()->times(25)->create();
        Review::factory()->times(100)->create();
        Wish::factory()->times(100)->create();
        Offer::factory()->times(25)->create();
        Check::factory()->times(50)->create();
        Discount::factory()->times(10)->create();
        GenreBook::factory()->times(100)->create();
    }
}
