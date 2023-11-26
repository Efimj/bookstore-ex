<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use Database\Factories\ImageHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class BookController extends BaseController
{
    public function all_books(Request $request): array
    {
        $startFrom = $request->query('start_from', 1);
        $limit = $request->query('limit', 10);

        return Book::skip($startFrom)->take($limit)->get()->map(function ($book) {
            return $this->getBookInformation($book);
        })->toArray();
    }

    public function book(Request $request)
    {
        $book_id = $request->query('id');
        $book = Book::find($book_id);

        if (!$book) {
            return null;
        }

        $book['image'] = (new ImageHandler())->getImageFromStore($book->image);
        return $book;
    }

    public function bookState(Request $request)
    {
        $book_id = $request->query('id');
        $book = Book::find($book_id);
        $user = Auth::user();

        if (!$book) {
            return null;
        }

        $wish = User::find($user->user_id)->wishes->where('book_id', $book_id)->first();
        $review = User::find($user->user_id)->reviews->where('book_id', $book_id)->first();
        $check = User::find($user->user_id)->checks->where('book_id', $book_id)->first();

        return [
            'book_id' => $book_id,
            'review' => $review,
            'check' => $check,
            'wish' => $wish,
        ];
    }

    public function bookByName(Request $request)
    {
        $title = $request->query('title');
        $books = Book::where('title', 'like', '%' . $title . '%')->get();

        if ($books->isEmpty()) {
            return null;
        }

        return $books->map(function ($book) {
            $book['image'] = (new ImageHandler())->getImageFromStore($book->image);
            return $book;
        });
    }

    public function bookAuthors(Request $request)
    {
        $book_id = $request->query('id');
        $book = Book::find($book_id);
        $book_authors = $book->bookAuthors;

        $authors = [];
        foreach ($book_authors as $author) {
            $user = $author->author;
            $user['image'] = (new ImageHandler())->getImageFromStore($user->image);
            $authors[] = $user;
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

        $result = $this->getEvaluations($book_reviews, $book_id);

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
            $user['user_type_name'] = $user->userType->name;
            $user['image'] = (new ImageHandler())->getImageFromStore($user->image);
            $review['user'] = $user;

            return $review;
        });
    }

    /**
     * @param $book_reviews
     * @param array|string|null $book_id
     * @return array
     */
    public function getEvaluations($book_reviews, array|string|null $book_id): array
    {
        if ($book_reviews->isEmpty()) {
            return [];
        }

        $average_rating = round($book_reviews->avg('rating'), 2);
        $review_count = $book_reviews->count();
        $one_star_rating = $book_reviews->where('rating', 1)->count();
        $two_star_rating = $book_reviews->where('rating', 2)->count();
        $three_star_rating = $book_reviews->where('rating', 3)->count();
        $four_star_rating = $book_reviews->where('rating', 4)->count();
        $five_star_rating = $book_reviews->where('rating', 5)->count();
        return [
            'book_id' => $book_id,
            'review_count' => $review_count,
            'average_rating' => $average_rating,
            'one_star_rating' => $one_star_rating,
            'two_star_rating' => $two_star_rating,
            'three_star_rating' => $three_star_rating,
            'four_star_rating' => $four_star_rating,
            'five_star_rating' => $five_star_rating,
        ];
    }

    /**
     * @param $book
     * @return array
     */
    function getBookInformation($book): array
    {
        $book->image = (new ImageHandler())->getImageFromStore($book->image);
        $authors = $book->bookAuthors->map(function ($author) {
            $user = $author->author;
            $user['image'] = (new ImageHandler())->getImageFromStore($user->image);
            return $user;
        });
        $offer = $book->offer;
        $discount = $offer?->discount;
        $evaluations = $this->getEvaluations($book->reviews, $book->id);

        return [
            'book' => $book,
            'authors' => $authors,
            'discount' => $discount,
            'offer' => $offer,
            'evaluations' => $evaluations,
        ];
    }
}
