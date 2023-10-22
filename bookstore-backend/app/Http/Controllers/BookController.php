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
            return "книги нет";
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
            return "Книги с названием, содержащим текст '$title', не найдено";
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
            return "книги нет, или авторов нет";
        }

        return $authors;
    }
}
