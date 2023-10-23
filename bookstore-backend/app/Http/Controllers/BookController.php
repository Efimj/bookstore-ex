<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class BookController extends BaseController
{
    public function all_books(): array
    {
        return DB::table('books')->get()->toArray();
    }

    public function book(Request $request)
    {
        $book_id = $request->query('id');
        $book = Book::find($book_id);

        if (!$book) {
            return null;
        }

        return $book;
    }

    public function bookByName(Request $request)
    {
        $title = $request->query('title');
        $books = Book::where('title', 'like', '%' . $title . '%')->get();

//        $books->each(function ($book) {
//            $book->tempTitle = "ВЫФ";
//        });

        if ($books->isEmpty()) {
            return null;
        }

        return $books;
    }

    public function bookAuthors(Request $request)
    {
        $book_id = $request->query('id');
        $book = Book::find($book_id);
        $book_authors = $book->bookAuthors;

        $authors = [];
        foreach ($book_authors as $author) {
            $authors[] = $author->author;
        }

        if (!$authors) {
            return null;
        }

        return $authors;
    }

    public function bookOffer(Request $request)
    {
        $book_id = $request->query('id');
        $book = Book::find($book_id);
        $book_offer = $book->offer;

        if (!$book_offer) {
            return null;
        }

        return $book_offer;
    }

    public function bookDiscount(Request $request)
    {
        $book_id = $request->query('id');
        $book = Book::find($book_id);
        $book_offer = $book->offer;
        $book_discount = $book_offer->discount;

        if (!$book_discount) {
            return null;
        }

        return $book_discount;
    }
}
