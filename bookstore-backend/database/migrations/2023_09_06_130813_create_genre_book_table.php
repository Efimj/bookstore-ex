<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('genre_books', function (Blueprint $table) {
            $table->id('genre_book_id');
            $table->foreignId('genre_id')->constrained(
                table: 'genres', column: 'genre_id', indexName: 'genre_book_genre_id'
            );
            $table->foreignId('book_id')->constrained(
                table: 'books', column: 'book_id', indexName: 'genre_book_book_id'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('genre_books');
    }
};
