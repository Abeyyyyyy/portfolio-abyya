<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CvDownload extends Model
{
    protected $fillable = [
        'name',
        'email',
        'status',
        'company',
        'reason',
    ];
}
