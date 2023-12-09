<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Check extends Model
{
    use HasFactory;

    protected $primaryKey = 'check_id';

    protected $fillable = [
        'book_id',
        'user_id',
        'price',
        'date',
    ];

    public function book(): HasOne
    {
        return $this->hasOne(Book::class, 'book_id', 'book_id');
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }
}
