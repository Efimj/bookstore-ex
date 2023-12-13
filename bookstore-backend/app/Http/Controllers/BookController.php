<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookAuthor;
use App\Models\Check;
use App\Models\Discount;
use App\Models\Offer;
use App\Models\Review;
use App\Models\User;
use App\Models\UserType;
use Database\Factories\ImageHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class BookController extends BaseController
{
    public function all_books(Request $request)
    {
        $startFrom = $request->input('start_from', 0);
        $limit = $request->input('limit', 10);
        $query = $request->input('query', '');
        $authors = json_decode($request->input('authors', []));

        if (!empty($query) && empty($authors)) {
            return Book::where('title', 'LIKE', "%$query%")->skip($startFrom)->take($limit)->get()->map(function ($book) {
                return $this->getBookInformation($book);
            })->toArray();
        }

        if (empty($query) && !empty($authors)) {
            return Book::whereHas('bookAuthors', function ($query) use ($authors) {
                $query->whereIn('user_id', $authors);
            })->skip($startFrom)->take($limit)->get()->map(function ($book) {
                return $this->getBookInformation($book);
            })->toArray();
        }

        if (empty($query) && empty($authors)) {
            return Book::skip($startFrom)->take($limit)->get()->map(function ($book) {
                return $this->getBookInformation($book);
            })->toArray();
        } else {
            return Book::whereHas('bookAuthors', function ($query) use ($authors) {
                $query->whereIn('user_id', $authors);
            })->where('title', 'LIKE', "%$query%")->skip($startFrom)->take($limit)->get()->map(function ($book) {
                return $this->getBookInformation($book);
            })->toArray();
        }
    }

    private function getUserAndBook($request)
    {
        $user = Auth::user();
        $user = User::find($user->user_id);

        $bookId = $request->input('book_id');
        $book = Book::find($bookId);

        $userIsAuthor = $book->bookAuthors->where('user_id', $user->user_id)->first();
        if ($userIsAuthor === null) {
            abort(404, 'Author not found');
        }

        return [$user, $book];
    }


    public function editBookOffer(Request $request)
    {
        $request->validate([
            'book_id' => 'required|integer',
            'price' => 'required|numeric'
        ]);

        $bookId = $request->input('book_id');
        $price = $request->input('price');
        [$user, $book] = $this->getUserAndBook($request);

        $existedOffer = $book->offer;

        if ($existedOffer === null) {
            return Offer::create([
                'book_id' => $bookId,
                'price' => $price,
            ]);
        } else {
            return $existedOffer->update([
                'book_id' => $bookId,
                'price' => $price,
            ]);
        }
    }

    public function editBookDiscount(Request $request)
    {
        $request->validate([
            'book_id' => 'required|integer',
            'price' => 'required|numeric',
            'expiration_date' => 'required|date'
        ]);

        $price = $request->input('price');
        $expirationDate = Carbon::parse($request->input('expiration_date'))->toDateTimeString();

        [$user, $book] = $this->getUserAndBook($request);

        $existedOffer = $book->offer;

        if ($existedOffer === null) abort(404, 'Offer not found');

        $existedDiscount = $existedOffer->discount;

        if ($existedDiscount === null) {
            return Discount::create([
                'offer_id' => $existedOffer->offer_id,
                'price' => $price,
                'expiration_date' => $expirationDate,
            ]);
        } else {
            return $existedDiscount->update([
                'price' => $price,
                'expiration_date' => $expirationDate,
            ]);
        }
    }

    public function deleteBookDiscount(Request $request)
    {
        $bookId = $request->query('id');

        $user = Auth::user();
        $user = User::find($user->user_id);
        $book = Book::find($bookId);

        $userIsAuthor = $book->bookAuthors->where('user_id', $user->user_id)->first();
        if ($userIsAuthor === null) {
            abort(404, 'Author not found');
        }

        $existedOffer = $book->offer;

        if ($existedOffer === null) abort(404, 'Offer not found');

        $existedDiscount = $existedOffer->discount;
        return $existedDiscount->delete();
    }

    public function authorsByEmail(Request $request): array
    {
        $email = $request->query('email', "");
        $startFrom = $request->query('start_from', 1);
        $limit = $request->query('limit', 10);

        $userType = UserType::find(2);
        $users = User::where('user_type_id', $userType->user_type_id)
            ->where(function ($query) use ($email) {
                $query->where('email', 'LIKE', $email . '%') // начинается с указанной почты
                ->orWhere('email', 'LIKE', '%' . $email . '%'); // содержит указанную почту в любом месте
            })
            ->skip($startFrom)
            ->take($limit)
            ->get()->map(function ($user) {
                $user['image'] = (new ImageHandler())->getImageFromStore($user->image);
                return $user;
            })->toArray();

        return $users;
    }

    public function updateBook(Request $request)
    {
        $request->validate([
            'book_id' => 'required|integer',
            'title' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048', // Adjust file type and size as needed
            'pages' => 'required|integer',
            'authors' => 'required|string',
            'ageRestrictions' => 'required|integer',
            'publicationDate' => 'required|date',
        ]);

        $user = Auth::user();

        $image = $request->file('image');

        $imageName = ImageHandler::makeUniqueFileName($image);
        ImageHandler::saveToDisk($imageName, $image, ImageHandler::PathToFolder);

        $book = Book::find($request->input('book_id'));

        if ($book === null) abort(404, 'Book not found');

        $book->update([
            'age_restriction_id' => $request->input('ageRestrictions'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'page_count' => $request->input('pages'),
            'image' => $imageName,
            'publication_date' => Carbon::parse($request->input('publicationDate'))->toDateTimeString(),
        ]);

        $authors = json_decode($request->input('authors'));
        $authors[] = $user->user_id;
        $uniqueAuthors = array_unique($authors);
        $existingAuthors = BookAuthor::where('book_id', $book->book_id)->pluck('user_id')->toArray();

        $authorsToAdd = array_diff($uniqueAuthors, $existingAuthors);
        $authorsToDelete = array_diff($existingAuthors, $uniqueAuthors);

        foreach ($authorsToAdd as $authorId) {
            BookAuthor::create([
                'book_id' => $book->book_id,
                'user_id' => $authorId,
            ]);
        }

        BookAuthor::where('book_id', $book->book_id)->whereIn('user_id', $authorsToDelete)->delete();

        return $book->book_id;
    }

    public function publishBook(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048', // Adjust file type and size as needed
            'pages' => 'required|integer',
            'authors' => 'required|string',
            'ageRestrictions' => 'required|integer',
            'publicationDate' => 'required|date',
        ]);

        $user = Auth::user();

        $image = $request->file('image');

        $imageName = ImageHandler::makeUniqueFileName($image);
        ImageHandler::saveToDisk($imageName, $image, ImageHandler::PathToFolder);

        $book = Book::create([
            'age_restriction_id' => $request->input('ageRestrictions'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'page_count' => $request->input('pages'),
            'image' => $imageName,
            'publication_date' => Carbon::parse($request->input('publicationDate'))->toDateTimeString(),
        ]);

        Check::create([
            'book_id' => $book->book_id,
            'user_id' => $user->user_id,
            'price' => 0,
        ]);

        $authors = json_decode($request->input('authors'));
        $authors[] = $user->user_id;
        $uniqueAuthors = array_unique($authors);
        foreach ($uniqueAuthors as $authorId) {
            BookAuthor::create([
                'book_id' => $book->book_id,
                'user_id' => $authorId,
            ]);
        }

        return $book->book_id;
    }

    public function book(Request $request)
    {
        $book_id = $request->query('id');
        $book = Book::find($book_id);

        if (!$book) {
            return null;
        }

        return $this->getBookInformation($book);
    }

    public function deleteBookReview(Request $request)
    {
        $book_id = $request->query('id');
        $user = Auth::user();

        if (!$user) {
            return null;
        }

        $review = Review::where('user_id', $user->user_id)
            ->where('book_id', $book_id)
            ->first();

        if (!$review) {
            return null;
        }

        $review->delete();
        return true;
    }

    public function publishBookReview(Request $request)
    {
        $request->validate([
            'book_id' => 'required|integer',
            'description' => 'nullable|string',
            'rating' => 'required|integer',
        ]);

        $user = Auth::user();

        if (!$user) {
            return null;
        }

        $review = Review::where('user_id', $user->user_id)
            ->where('book_id', $request->input('book_id'))
            ->first();

        if ($review) {
            $review->update([
                'rating' => $request->input('rating'),
                'description' => $request->input('description') ?? '',
            ]);
            return $review;
        } else {
            $newReview = Review::create([
                'book_id' => $request->input('book_id'),
                'user_id' => $user->user_id,
                'rating' => $request->input('rating'),
                'description' => $request->input('description') ?? '',
            ]);

            return $newReview;
        }
    }

    public function bookState(Request $request)
    {
        $book_id = $request->query('id');
        $book = Book::find($book_id);
        $user = Auth::user();

        if (!$book) {
            return null;
        }
        if (!$user) {
            return [
                'book_id' => $book_id,
                'author' => null,
                'review' => null,
                'check' => null,
                'wish' => null,
            ];
        }

        $user = User::find($user->user_id);

        $wish = $user->wishes->where('book_id', $book_id)->first();
        $review = $user->reviews->where('book_id', $book_id)->first();
        $check = $user->checks->where('book_id', $book_id)->first();
        $isAuthor = $user->bookAuthors->where('book_id', $book_id)->first();

        return [
            'book_id' => $book_id,
            'author' => $isAuthor,
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
