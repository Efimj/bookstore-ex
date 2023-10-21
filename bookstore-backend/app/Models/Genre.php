<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Genre extends Model
{
    use HasFactory;

    protected $primaryKey = 'genre_id';
    public $timestamps = false;

    public function book(): HasMany
    {
        return $this->hasMany(GenreBook::class, 'book_id', 'book_id');
    }
}
