<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'title', 'tag', 'excerpt',
        'content', 'read_time', 'status',
    ];
}