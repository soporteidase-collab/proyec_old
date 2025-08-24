<?php

// app/Http/Requests/UpdateAbogadoRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAbogadoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $abogado = $this->route('abogado'); // model binding
        $abogadoId = $abogado?->id;
        $userId    = $abogado?->user_id;

        return [
            // ----- USER (edición opcional; email único ignorando su propio user_id)
            'user.name'     => ['sometimes', 'required', 'string', 'max:255'],
            'user.email'    => ['sometimes', 'required', 'email', 'max:255', Rule::unique('users','email')->ignore($userId)],
            'user.password' => ['nullable', 'string', 'min:6'], // si viene, se cambia
            'user.role'     => ['sometimes', 'required', 'in:admin,editor,colaborador,abogado'],

            // ----- ABOGADO
            'numero_colegiatura' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('abogados','numero_colegiatura')->ignore($abogadoId)],
            'dni'                => ['sometimes', 'required', 'string', 'max:255', Rule::unique('abogados','dni')->ignore($abogadoId)],
            'nombres'            => ['sometimes', 'required', 'string', 'max:255'],
            'apellidos'          => ['sometimes', 'required', 'string', 'max:255'],
            'especialidad'       => ['nullable', 'string', 'max:255'],
            'email'              => ['sometimes', 'required', 'email', 'max:255', Rule::unique('abogados','email')->ignore($abogadoId)],
            'habilitado_hasta'   => ['sometimes', 'required', 'date'],
            'activo'             => ['sometimes', 'boolean'],
        ];
    }
}
