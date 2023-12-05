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
            )->on('user_types')->onDelete('cascade');
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

        // Create a trigger
        DB::unprepared('
CREATE TRIGGER before_delete_user
BEFORE DELETE ON users FOR EACH ROW
BEGIN
  DELETE FROM wishes WHERE user_id = OLD.user_id;
  DELETE FROM book_authors WHERE user_id = OLD.user_id;
  DELETE FROM checks WHERE user_id = OLD.user_id;
  DELETE FROM reviews WHERE user_id = OLD.user_id;
END;
        ');

        // Create a procedures
        DB::unprepared('
CREATE PROCEDURE GetTopUsersByPurchases(
    IN p_start_date DATE,
    IN p_end_date DATE,
    IN p_limit INT
)
BEGIN
    SELECT u.*, COUNT(c.check_id) AS total_purchases
    FROM users u
    LEFT JOIN checks c ON u.user_id = c.user_id
    WHERE c.date BETWEEN p_start_date AND p_end_date
    GROUP BY u.user_id
    ORDER BY total_purchases DESC
    LIMIT p_limit;
END;
        ');

//        DB::unprepared('
//CREATE FUNCTION GetPurchaseCountForUser(IN p_user_id BIGINT)
//RETURNS INT
//BEGIN
//    DECLARE purchase_count INT;
//    SELECT COUNT(check_id) INTO purchase_count FROM checks WHERE user_id = p_user_id;
//    RETURN purchase_count;
//END ;
//        ');

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
