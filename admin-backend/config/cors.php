<?php

// return [

//     'paths' => ['api/*', 'sanctum/csrf-cookie'],

//     'allowed_methods' => ['*'],

//     'allowed_origins' => [
//     'http://localhost:5173',
//     'http://127.0.0.1:5173',
//     'http://localhost:5174',
//     'http://127.0.0.1:5174',
//     'http://localhost:3000',
//     'http://10.0.0.64:3000',
//     ],

//     'allowed_origins_patterns' => [],

//     'allowed_headers' => ['*'],

//     'exposed_headers' => [],

//     'max_age' => 0,

//     // You are using a Bearer token header, not cookies → better false
//     'supports_credentials' => false,
// ];

// config/cors.php
return [

    'paths' => [
        'api/*',
        'sanctum/csrf-cookie',
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:3000',
        'http://localhost:8000',
        'http://127.0.0.1:3000',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5174',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // If you are NOT using cookies (just Bearer tokens), keep this false
    'supports_credentials' => false,
];

