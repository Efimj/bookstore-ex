<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Offer extends Model
{
    use HasFactory;

    protected $primaryKey = 'offer_id';

    protected $fillable = [
        'book_id',
        'price',
    ];

    public function book(): HasOne
    {
        return $this->hasOne(Book::class, 'book_id', 'book_id');
    }

    public function discount(): HasOne
    {
        return $this->hasOne(Discount::class, 'offer_id', 'offer_id');
    }
}
