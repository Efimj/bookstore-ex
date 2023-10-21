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
        Schema::create('age_restrictions', function (Blueprint $table) {
            $table->id("age_restriction_id");
            $table->tinyText("name");
        });

        DB::table('age_restrictions')->insert([
            'name' => 'for adults',
        ]);
        DB::table('age_restrictions')->insert([
            'name' => 'adolescents',
        ]);
        DB::table('age_restrictions')->insert([
            'name' => 'all ages',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('age_restrictions');
    }
};
