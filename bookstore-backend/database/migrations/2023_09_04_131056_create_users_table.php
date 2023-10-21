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
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');
            $table->foreignId('user_type_id')->constrained(
                table: 'user_types', column: 'user_type_id', indexName: 'user_user_type_id'
            );
            $table->tinyText('first_name');
            $table->tinyText('last_name');
            $table->tinyInteger('age');
            $table->string('password');
            $table->tinyText('email');
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
