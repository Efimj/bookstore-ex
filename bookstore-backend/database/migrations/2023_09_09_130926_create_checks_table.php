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
        Schema::create('checks', function (Blueprint $table) {
            $table->id('check_id');
            $table->foreignId('book_id')->constrained(
                table: 'books', column: 'book_id', indexName: 'check_book_id'
            );
            $table->foreignId('user_id')->constrained(
                table: 'users',  column: 'user_id', indexName: 'check_user_id'
            );
            $table->unsignedDouble('price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checks');
    }
};
