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
        Schema::create('books', function (Blueprint $table) {
            $table->id('book_id');
            $table->foreignId('age_restriction_id')->constrained(
                table: 'age_restrictions', column: 'age_restriction_id', indexName: 'book_age_restriction_id'
            );
            $table->text('title');
            $table->text('description');
            $table->integer('page_count');
            $table->string('image')->nullable();
            $table->date('publication_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
