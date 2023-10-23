<?php

use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Route::get('/getBook:{book_id}', function () {
//    //return
//});

Route::get('/books', [BookController::class, 'all_books']);
//Route::get('/book', [BookController::class, 'bookByName']);
Route::get('/book', [BookController::class, 'book']);
Route::get('/book_authors', [BookController::class, 'bookAuthors']);
Route::get('/book_offer', [BookController::class, 'bookOffer']);
Route::get('/book_discount', [BookController::class, 'bookDiscount']);

Route::get('/check-database-connection', function () {
    try {
        DB::connection()->getPdo();
        return 'Соединение с базой данных установлено!';
    } catch (\Exception $e) {
        return 'Ошибка подключения к базе данных: ' . $e->getMessage();
    } finally {
       return "dwd";
    }
});
