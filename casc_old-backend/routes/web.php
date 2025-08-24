<?php

use Illuminate\Support\Facades\Route;

Route::get('/crear-usuario-test', function() {
    $user = \App\Models\User::create([
        'name' => 'Test User',
        'email' => 'test@test.com',
        'password' => \Illuminate\Support\Facades\Hash::make('password'),
    ]);
    
    return 'Usuario creado: '.$user->email;
});