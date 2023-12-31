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
        Schema::create('offers', function (Blueprint $table) {
            $table->id('offer_id');
            $table->foreignId('book_id')->constrained(
                table: 'books', column: 'book_id', indexName: 'offer_book_id'
            )->on('books')->onDelete('cascade');
            $table->unsignedDouble('price');
            $table->timestamps();

            // indexes
            $table->index('book_id');
            $table->unique('book_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
//        Schema::table('offers', function (Blueprint $table) {
//            $table->dropUnique('book_id');
//            $table->dropIndex('book_id');
//
//        });

        Schema::dropIfExists('offers');
    }
};
