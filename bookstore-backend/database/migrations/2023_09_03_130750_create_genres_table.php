<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('genres', function (Blueprint $table) {
            $table->id('genre_id');
            $table->string('name');

            // indexes
            $table->fulltext('name');
            $table->unique('name');
        });

        DB::table('genres')->insert([
            'name' => 'Fantasy',
        ]);
        DB::table('genres')->insert([
            'name' => 'Mystery',
        ]);
        DB::table('genres')->insert([
            'name' => 'Drama',
        ]);
        DB::table('genres')->insert([
            'name' => 'Adventure',
        ]);
        DB::table('genres')->insert([
            'name' => 'Horror',
        ]);
        DB::table('genres')->insert([
            'name' => 'Comedy',
        ]);
        DB::table('genres')->insert([
            'name' => 'Historical',
        ]);
        DB::table('genres')->insert([
            'name' => 'Thriller',
        ]);
        DB::table('genres')->insert([
            'name' => 'Romance',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
//        Schema::table('genres', function (Blueprint $table) {
//            $table->dropIndex('name');
//            $table->dropUnique('name');
//        });

        Schema::dropIfExists('genres');
    }
};
