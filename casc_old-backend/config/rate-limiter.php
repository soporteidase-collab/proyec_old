<?php

return [
    'api' => [
        'driver' => 'redis', // o 'cache' si usas otro sistema
        'max_attempts' => 60,
        'decay_minutes' => 1,
        'prefix' => 'api_rate_limit',
    ],
];