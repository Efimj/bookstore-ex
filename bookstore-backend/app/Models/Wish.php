<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Wish extends Model
{
    use HasFactory;

    protected $primaryKey = 'wish_id';

    protected $fillable = [
        'book_id',
        'user_id',
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }

    public function book(): HasOne
    {
        return $this->hasOne(Book::class, 'book_id', 'book_id');
    }
}
