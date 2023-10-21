<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UserType extends Model
{
    use HasFactory;

    protected $primaryKey = 'user_type_id';
    public $timestamps = false;

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'user_type_id', 'user_type_id');
    }
}
