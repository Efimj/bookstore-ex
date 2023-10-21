<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Discount extends Model
{
    use HasFactory;

    protected $primaryKey = 'discount_id';

    public function book(): HasOne
    {
        return $this->hasOne(Offer::class, 'book_id', 'book_id');
    }
}
