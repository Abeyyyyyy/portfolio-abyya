<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = [
        'name',
        'issuer',
        'date',
        'image',
        'credential_url',
    ];
}