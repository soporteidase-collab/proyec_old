<?php

return [
    'paths' => ['*'], // Permite todas las rutas
    'allowed_origins' => ['*'], // Temporal para desarrollo
    'allowed_origins' => ['http://localhost:3000'], // Cambia según tu frontend
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // Desactívalo si no usas cookies
];