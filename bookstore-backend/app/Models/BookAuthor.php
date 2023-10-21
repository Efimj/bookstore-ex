<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class BookAuthor extends Model
{
    use HasFactory;

    protected $primaryKey = 'book_author_id';

    public function author(): HasOne
    {
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }

    public function book(): HasOne
    {
        return $this->hasOne(Book::class, 'book_id', 'book_id');
    }
}
