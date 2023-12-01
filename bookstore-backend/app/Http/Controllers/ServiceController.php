<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AgeRestriction;
use App\Models\Book;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function all_age_restrictions(Request $request): array
    {
        return AgeRestriction::get()->toArray();
    }
}
