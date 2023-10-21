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
        Schema::create('book_authors', function (Blueprint $table) {
            $table->id('book_author_id');
            $table->foreignId('book_id')->constrained(
                table: 'books', column: 'book_id', indexName: 'book_book_id'
            );
            $table->foreignId('user_id')->constrained(
                table: 'users',  column: 'user_id', indexName: 'book_user_id'
            );
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_authors');
    }
};
