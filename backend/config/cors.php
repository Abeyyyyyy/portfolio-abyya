<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'https://aby-arteezy.vercel.app', 
        'https://aby-arteezyvercel-2tuwzpcp1-abeyyyyyys-projects.vercel.app', // Domain preview vercel kamu
        'http://localhost:5173'
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // Ubah ke false jika menggunakan '*'
];