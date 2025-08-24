<?php

// app/Http/Requests/StoreAbogadoRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAbogadoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // luego puedes validar permisos
    }

    public function rules(): array
    {
        return [
            // ----- USER (creación)
            'user.name'     => ['required', 'string', 'max:255'],
            'user.email'    => ['required', 'email', 'max:255', 'unique:users,email'],
            'user.password' => ['required', 'string', 'min:6'],
            'user.role'     => ['required', 'in:admin,editor,colaborador,abogado'],

            // ----- ABOGADO
            'numero_colegiatura' => ['required', 'string', 'max:255', 'unique:abogados,numero_colegiatura'],
            'dni'                => ['required', 'string', 'max:255', 'unique:abogados,dni'],
            'nombres'            => ['required', 'string', 'max:255'],
            'apellidos'          => ['required', 'string', 'max:255'],
            'especialidad'       => ['nullable', 'string', 'max:255'],
            'email'              => ['required', 'email', 'max:255', 'unique:abogados,email'],
            'habilitado_hasta'   => ['required', 'date'],
            'activo'             => ['boolean'],
        ];
    }
}
