<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $table = 'educations'; // ← tambahkan ini

    protected $fillable = [
        'institution',
        'major',
        'start_year',
        'end_year',
        'accent',
    ];
}