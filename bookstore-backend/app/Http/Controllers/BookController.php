<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\JsonResponse;
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

    public function bookEvaluations(Request $request): ?JsonResponse
    {
        $book_id = $request->query('id');
        $book = Book::find($book_id);

        if (!$book) {
            return null;
        }

        $book_reviews = $book->reviews;

        if ($book_reviews->isEmpty()) {
            return null;
        }

        $average_rating = round($book_reviews->avg('rating'), 2);
        $review_count = $book_reviews->count();
        $one_star_rating = $book_reviews->where('rating', 1)->count();
        $two_star_rating = $book_reviews->where('rating', 2)->count();
        $three_star_rating = $book_reviews->where('rating', 3)->count();
        $four_star_rating = $book_reviews->where('rating', 4)->count();
        $five_star_rating = $book_reviews->where('rating', 5)->count();
        $result = [
            'book_id' => $book_id,
            'review_count' => $review_count,
            'average_rating' => $average_rating,
            'one_star_rating' => $one_star_rating,
            'two_star_rating' => $two_star_rating,
            'three_star_rating' => $three_star_rating,
            'four_star_rating' => $four_star_rating,
            'five_star_rating' => $five_star_rating,
        ];

        return response()->json($result);
    }

    public function bookReviews(Request $request)
    {
        $book_id = $request->query('id');
        $startFrom = $request->query('start_from', 1);
        $limit = $request->query('limit', 10);
        $book = Book::find($book_id);
        $reviews = $book->reviews()->skip($startFrom)->take($limit)->get();

        if (!$reviews) {
            return null;
        }

        return $reviews->map(function ($review) {
            $user = $review->user;
            $review['user'] = $user;

            return $review;
        });
    }
}
