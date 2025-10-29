<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'remarks',
        'amount',
        'account_id',
        'category_id',
    ];

    public function account()
    {
        return $this->belongsTo(Accounts::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

