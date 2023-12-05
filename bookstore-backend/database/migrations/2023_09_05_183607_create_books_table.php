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
        Schema::create('books', function (Blueprint $table) {
            $table->id('book_id');
            $table->foreignId('age_restriction_id')->constrained(
                table: 'age_restrictions', column: 'age_restriction_id', indexName: 'book_age_restriction_id'
            )->on('age_restrictions')->onDelete('cascade');
            $table->text('title');
            $table->text('description');
            $table->integer('page_count');
            $table->string('image')->nullable();
            $table->date('publication_date');
            $table->timestamps();

            // indexes
            $table->fullText(['title', 'description']);
            $table->index('age_restriction_id');
            $table->index('page_count');
            $table->index('publication_date');
        });

        // Create a trigger
        DB::unprepared('
CREATE TRIGGER before_delete_book
BEFORE DELETE ON books FOR EACH ROW
BEGIN
  DELETE FROM book_authors WHERE book_id = OLD.book_id;
  DELETE FROM wishes WHERE book_id = OLD.book_id;
  DELETE FROM checks WHERE book_id = OLD.book_id;
  DELETE FROM offers WHERE book_id = OLD.book_id;
  DELETE FROM discounts WHERE offer_id IN (SELECT offer_id FROM offers WHERE book_id = OLD.book_id);
  DELETE FROM reviews WHERE book_id = OLD.book_id;
  DELETE FROM genre_books WHERE book_id = OLD.book_id;
END;
        ');

        // Create a procedure and functions
        DB::unprepared('
CREATE PROCEDURE GetBooksWithDiscountInPeriod(
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    SELECT b.*, d.price AS discount_price
    FROM books b
    LEFT JOIN offers o ON b.book_id = o.book_id
    LEFT JOIN discounts d ON o.offer_id = d.offer_id
    WHERE (o.price < d.price OR d.price IS NULL)
          AND o.created_at BETWEEN p_start_date AND p_end_date;
END;
        ');

        DB::unprepared('
CREATE PROCEDURE GetAverageRatingForBook(
    IN p_book_id BIGINT,
    OUT p_avg_rating DECIMAL(3,2)
)
BEGIN
    SELECT AVG(rating) INTO p_avg_rating
    FROM reviews
    WHERE book_id = p_book_id;
END;
        ');

//        DB::unprepared('
//CREATE FUNCTION GetReviewCountForBook(IN p_book_id BIGINT)
//RETURNS INT
//BEGIN
//    DECLARE review_count INT;
//    SELECT COUNT(review_id) INTO review_count FROM reviews WHERE book_id = p_book_id;
//    RETURN review_count;
//END ;
//        ');

//        DB::unprepared('
//CREATE FUNCTION GetAverageRatingForBook(IN p_book_id BIGINT)
//RETURNS DECIMAL(3,2)
//BEGIN
//    DECLARE avg_rating DECIMAL(3,2);
//    SELECT AVG(rating) INTO avg_rating FROM reviews WHERE book_id = p_book_id;
//    RETURN COALESCE(avg_rating, 0.0);
//END;
//        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $usersWithImages = DB::table('books')->whereNotNull('image')->get();

        foreach ($usersWithImages as $user) {
            if ($user->image) {
                Storage::delete($user->image);
            }
        }

//        Schema::table('books', function (Blueprint $table) {
//            $table->dropIndex(['title', 'description']);
//            $table->dropIndex('age_restriction_id');
//            $table->dropIndex('page_count');
//            $table->dropIndex('publication_date');
//        });

        Schema::dropIfExists('books');
    }
};
