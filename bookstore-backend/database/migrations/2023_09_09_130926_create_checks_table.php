<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Brokenice\LaravelMysqlPartition\Models\Partition;
use Brokenice\LaravelMysqlPartition\Schema\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $table_name = 'checks';

        Schema::create($table_name, function (Blueprint $table) {
            $table->id('check_id');
            $table->foreignId('book_id')->constrained(
                table: 'books', column: 'book_id', indexName: 'check_book_id'
            );
            $table->foreignId('user_id')->constrained(
                table: 'users', column: 'user_id', indexName: 'check_user_id'
            );
            $table->unsignedDouble('price');
            $table->timestamps();
            $table->date('date');

            // indexes
            $table->index('book_id');
            $table->index('user_id');
        });

//        Schema::partitionByRange($table_name, 'YEAR(date)', [
//            new Partition($table_name . '2000', Partition::RANGE_TYPE, 2000),
//            new Partition($table_name . '2005', Partition::RANGE_TYPE, 2005),
//            new Partition($table_name . '2010', Partition::RANGE_TYPE, 2010),
//            new Partition($table_name . '2015', Partition::RANGE_TYPE, 2015),
//            new Partition($table_name . '2020', Partition::RANGE_TYPE, 2020),
//            new Partition($table_name . '2025', Partition::RANGE_TYPE, 2025),
//            new Partition($table_name . '2030', Partition::RANGE_TYPE, 2030),
//            new Partition($table_name . '2035', Partition::RANGE_TYPE, 2035),
//            new Partition($table_name . '2045', Partition::RANGE_TYPE, 2045),
//        ], true);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
//        Schema::table('checks', function (Blueprint $table) {
//            $table->dropIndex('book_id');
//            $table->dropIndex('user_id');
//
//        });

        Schema::dropIfExists('checks');
    }
};
