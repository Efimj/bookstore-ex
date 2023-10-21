<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class GenreBook extends Model
{
    use HasFactory;

    protected $primaryKey = 'genre_book_id';
    public $timestamps = false;

    public function book(): HasOne
    {
        return $this->hasOne(Book::class, 'book_id', 'book_id');
    }

    public function genre(): HasOne
    {
        return $this->hasOne(Genre::class, 'genre_id', 'genre_id');
    }
}
