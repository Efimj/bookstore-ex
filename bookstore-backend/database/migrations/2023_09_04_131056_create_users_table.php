<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

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
            $table->string('first_name');
            $table->string('last_name');
            $table->dateTime('birthday');
            $table->string('password');
            $table->string('email');
            $table->string('image')->nullable();
            $table->timestamps();

            // indexes
            $table->index(['first_name', 'last_name']);
            $table->fullText('email');
            $table->unique('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $usersWithImages = DB::table('users')->whereNotNull('image')->get();

        foreach ($usersWithImages as $user) {
            if ($user->image) {
                Storage::delete($user->image);
            }
        }

//        Schema::table('users', function (Blueprint $table) {
//            $table->dropIndex(['first_name', 'last_name']);
//            $table->dropIndex('email');
//            $table->dropUnique('email');
//        });

        Schema::dropIfExists('users');
    }
};
