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
            )->on('genres')->onDelete('cascade');
            $table->foreignId('book_id')->constrained(
                table: 'books', column: 'book_id', indexName: 'genre_book_book_id'
            )->on('books')->onDelete('cascade');

            // indexes
            $table->index('genre_id');
            $table->index('book_id');
            $table->unique(['genre_id', 'book_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
//        Schema::table('genre_books', function (Blueprint $table) {
//            $table->dropUnique(['genre_id', 'book_id']);
//            $table->dropIndex('book_id');
//            $table->dropIndex('genre_id');
//
//        });

        Schema::dropIfExists('genre_books');
    }
};
