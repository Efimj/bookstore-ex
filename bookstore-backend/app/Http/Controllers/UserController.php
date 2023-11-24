<?php

namespace App\Http\Controllers;

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
            $book['image'] = (new ImageHandler())->getImageFromStore($book->image);
            return $book;
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
            $book['image'] = (new ImageHandler())->getImageFromStore($book->image);
            return $book;
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
            $book['image'] = (new ImageHandler())->getImageFromStore($book->image);
            return $book;
        });
    }

}
