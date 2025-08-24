<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Usuario Administrador
        User::create([
            'name' => 'Niltol Castro',
            'email' => 'nilton@colegioabogados.pe',
            'password' => Hash::make('Password123'), // Contraseña fácil para desarrollo
            'role' => 'admin', // Asumiendo que tienes un campo 'role'
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Carmen Huertas',
            'email' => 'editor@colegioabogados.pe',
            'password' => Hash::make('Password123'),
            'role' => 'editor',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Juan Perez',
            'email' => 'colaborador@colegioabogados.pe',
            'password' => Hash::make('Password123'),
            'role' => 'colaborador',
            'email_verified_at' => now(),
        ]);

        // Usuario Abogado
        User::create([
            'name' => 'Pedro Neruda',
            'email' => 'pedro@colegioabogados.pe',
            'password' => Hash::make('Password123'),
            'role' => 'abogado',
            'email_verified_at' => now(),
        ]);
    }
}