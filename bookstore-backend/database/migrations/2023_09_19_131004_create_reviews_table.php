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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id("review_id");
            $table->foreignId('book_id')->constrained(
                table: 'books', column: 'book_id', indexName: 'review_book_id'
            )->on('books')->onDelete('cascade');
            $table->foreignId('user_id')->constrained(
                table: 'users',  column: 'user_id', indexName: 'review_user_id'
            )->on('users')->onDelete('cascade');
            $table->text('description');
            $table->unsignedTinyInteger('rating');
            $table->timestamps();

            // indexes
            $table->index('book_id');
            $table->index('user_id');
            $table->unique(['book_id','user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
//        Schema::table('reviews', function (Blueprint $table) {
//            $table->dropIndex('book_id');
//            $table->dropIndex('user_id');
//            $table->dropUnique(['book_id','user_id']);
//
//        });

        Schema::dropIfExists('reviews');
    }
};
