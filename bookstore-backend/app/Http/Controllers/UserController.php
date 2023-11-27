<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use Database\Factories\ImageHandler;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function account(Request $request): ?Authenticatable
    {
        $user = Auth::user();
        if ($user == null) return null;
        $user['image'] = (new ImageHandler())->getImageFromStore($user->image);
        return $user;
    }

    public function user(Request $request)
    {
        $user_id = $request->query('id');
        $user = User::find($user_id);

        if (!$user) {
            return null;
        }

        $user['user_type_name'] = $user->userType->name;
        $user['image'] = (new ImageHandler())->getImageFromStore($user->image);
        return $user;
    }

    public function userWishes(Request $request)
    {
        $user_id = $request->query('id');
        $startFrom = $request->query('start_from', 1);
        $limit = $request->query('limit', 10);
        $user = User::find($user_id);
        $wishes = $user->wishes()->skip($startFrom)->take($limit)->get();

        if (!$wishes) {
            return null;
        }

        return $wishes->map(function ($wish) {
            $book = $wish->book;
            return $this->getBookInformation($book);
        });
    }

    public function userLibrary(Request $request)
    {
        $user_id = $request->query('id');
        $startFrom = $request->query('start_from', 1);
        $limit = $request->query('limit', 10);
        $user = User::find($user_id);
        $books = $user->checks()->skip($startFrom)->take($limit)->get();

        if (!$books) {
            return null;
        }

        return $books->map(function ($book) {
            $book = $book->book;
            return $this->getBookInformation($book);
        });
    }

    public function myLibrary(Request $request)
    {
        $user = Auth::user();
        if ($user == null) return null;
        $user_id = $user->user_id;
        $startFrom = $request->query('start_from', 1);
        $limit = $request->query('limit', 10);
        $user = User::find($user_id);
        $books = $user->checks()->skip($startFrom)->take($limit)->get();

        if (!$books) {
            return null;
        }

        return $books->map(function ($book) {
            $book = $book->book;
            return $this->getBookInformation($book);
        });
    }

    public function userPublish(Request $request)
    {
        $user_id = $request->query('id');
        $startFrom = $request->query('start_from', 1);
        $limit = $request->query('limit', 10);
        $user = User::find($user_id);
        $books = $user->bookAuthors()->skip($startFrom)->take($limit)->get();

        if (!$books) {
            return null;
        }

        return $books->map(function ($book) {
            $book = $book->book;
            return $this->getBookInformation($book);
        });
    }

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
     * @param mixed $book
     * @return array
     */
    function getBookInformation(mixed $book): array
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
