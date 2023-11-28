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
        Schema::create('user_types', function (Blueprint $table) {
            $table->id('user_type_id');
            $table->string('name');

            // indexes
            $table->fulltext('name');
            $table->unique('name');
        });

        DB::table('user_types')->insert([
            'name' => 'reader',
        ]);
        DB::table('user_types')->insert([
            'name' => 'writer',
        ]);


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
//        Schema::table('user_types', function (Blueprint $table) {
//            $table->dropIndex('name');
//            $table->dropUnique('name');
//        });

        Schema::dropIfExists('user_types');
    }
};
