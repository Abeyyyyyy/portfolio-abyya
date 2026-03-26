<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name'     => 'Abyya Hamdan Nurwandha',
            'email'    => 'hamdanabiyya@gmail.com',
            'password' => bcrypt('Sullivan18091234567890'),
        ]);
    }
}