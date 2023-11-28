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
        Schema::create('wishes', function (Blueprint $table) {
            $table->id('wish_id');
            $table->foreignId('book_id')->constrained(
                table: 'books', column: 'book_id', indexName: 'wish_book_id'
            );
            $table->foreignId('user_id')->constrained(
                table: 'users',  column: 'user_id', indexName: 'wish_user_id'
            );
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
//        Schema::table('wishes', function (Blueprint $table) {
//            $table->dropIndex('book_id');
//            $table->dropIndex('user_id');
//            $table->dropUnique(['book_id','user_id']);
//
//        });

        Schema::dropIfExists('wishes');
    }
};
