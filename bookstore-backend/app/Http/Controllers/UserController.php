<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function user(Request $request)
    {
        $user_id = $request->query('id');
        $user = User::find($user_id);

        if (!$user) {
            return null;
        }

        $user['user_type_name'] = $user->userType->name;
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
            return $wish->book;
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
            return $book->book;
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
            return $book->book;
        });
    }
}
