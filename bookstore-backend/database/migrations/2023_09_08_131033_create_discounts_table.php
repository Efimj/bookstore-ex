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
        Schema::create('discounts', function (Blueprint $table) {
            $table->id('discount_id');
            $table->foreignId('offer_id')->constrained(
                table: 'offers', column: 'offer_id', indexName: 'discount_offer_id'
            )->on('offers')->onDelete('cascade');
            $table->unsignedDouble('price');
            $table->dateTime('expiration_date');
            $table->timestamps();

            // indexes
            $table->index('offer_id');
            $table->unique('offer_id');
        });

        // Create a trigger
        DB::unprepared('
CREATE TRIGGER before_insert_discount
BEFORE INSERT ON discounts
FOR EACH ROW
BEGIN
  DECLARE offer_price DOUBLE;

  -- Получаем цену из предложения (offer) для данной скидки
  SELECT price INTO offer_price FROM offers WHERE offer_id = NEW.offer_id;

  -- Проверяем условие: цена скидки не должна превышать цену предложения
  IF NEW.price > offer_price THEN
    SIGNAL SQLSTATE "45000"
    SET MESSAGE_TEXT = "Цена скидки не может быть выше цены предложения";
  END IF;

END;
        ');

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
