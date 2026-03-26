<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'company',
        'role',
        'description',
        'tags',
        'start_date',
        'end_date',
        'status',
        'type',
    ];

    protected $casts = [
        'tags' => 'array',
    ];
}