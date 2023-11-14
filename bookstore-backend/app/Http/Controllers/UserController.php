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

        return $user;
    }
}
