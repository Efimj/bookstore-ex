<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
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

/**
 * Book
 */
Route::get('/books', [BookController::class, 'all_books']);
Route::get('/book', [BookController::class, 'book']);
Route::get('/book_state', [BookController::class, 'bookState']);
Route::get('/book_authors', [BookController::class, 'bookAuthors']);
Route::get('/book_offer', [BookController::class, 'bookOffer']);
Route::get('/book_discount', [BookController::class, 'bookDiscount']);
Route::get('/book_evaluations', [BookController::class, 'bookEvaluations']);
Route::get('/book_reviews', [BookController::class, 'bookReviews']);


/**
 * User
 */
Route::get('/user', [UserController::class, 'user']);
Route::get('/user_wishes', [UserController::class, 'userWishes']);
Route::get('/user_publish', [UserController::class, 'userPublish']);
Route::get('/user_library', [UserController::class, 'userLibrary']);
Route::group([
    'middleware' => 'jwt.auth',
], function ($router) {
    Route::get('/account', [UserController::class, 'account']);
//    Route::get('/my_library', [UserController::class, 'myLibrary']);
});


/**
 * Authentication
 */
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

/**
 * Service
 */
Route::get('all_age_restrictions', [ServiceController::class, 'all_age_restrictions']);

/**
 * DB
 */
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
