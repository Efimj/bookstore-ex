<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Book extends Model
{
    use HasFactory;

    protected $primaryKey = 'book_id';

    protected $fillable = [
        'age_restriction_id',
        'title',
        'description',
        'image',
    ];

    public function bookAuthors(): HasMany
    {
        return $this->hasMany(BookAuthor::class, 'book_id', 'book_id');
    }

    public function checks(): HasMany
    {
        return $this->hasMany(Check::class, 'book_id', 'book_id');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'book_id', 'book_id');
    }

    public function wishes(): HasMany
    {
        return $this->hasMany(Wish::class, 'book_id', 'book_id');
    }

    public function offer(): HasOne
    {
        return $this->hasOne(Offer::class, 'book_id', 'book_id');
    }

    public function genres(): HasMany
    {
        return $this->hasMany(GenreBook::class, 'book_id', 'book_id');
    }

    public function ageRestriction(): HasOne
    {
        return $this->hasOne(AgeRestriction::class, 'age_restriction_id', 'age_restriction_id');
    }
}
