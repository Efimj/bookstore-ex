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
        Schema::create('discounts', function (Blueprint $table) {
            $table->id('discount_id');
            $table->foreignId('offer_id')->constrained(
                table: 'offers', column: 'offer_id', indexName: 'discount_offer_id'
            );
            $table->unsignedDouble('price');
            $table->dateTime('expiration_date');
            $table->timestamps();

            // indexes
            $table->index('offer_id');
            $table->unique('offer_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

//        Schema::table('discounts', function (Blueprint $table) {
//            $table->dropIndex('offer_id');
//            $table->dropUnique('offer_id');
//
//        });

        Schema::dropIfExists('discounts');
    }
};
