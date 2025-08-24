<?php

// app/Http/Controllers/Api/AbogadoController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAbogadoRequest;
use App\Http\Requests\UpdateAbogadoRequest;
use App\Models\Abogado;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AbogadoController extends Controller
{
    public function index(Request $request)
    {
        $q = $request->input('q');
        $perPage = (int)($request->input('per_page', 10));

        $query = Abogado::query()
            ->with('user:id,name,email,role')
            ->when($q, function ($qb) use ($q) {
                $qb->where(function ($inner) use ($q) {
                    $inner->where('nombres', 'like', "%{$q}%")
                          ->orWhere('apellidos', 'like', "%{$q}%")
                          ->orWhere('numero_colegiatura', 'like', "%{$q}%")
                          ->orWhere('dni', 'like', "%{$q}%")
                          ->orWhere('email', 'like', "%{$q}%");
                });
            })
            ->orderBy('id', 'desc');

        return response()->json($query->paginate($perPage));
    }

    public function store(StoreAbogadoRequest $request)
    {
        $validated = $request->validated();

        $abogado = DB::transaction(function () use ($validated) {
            // 1) Crear USER
            $user = User::create([
                'name'     => $validated['user']['name'],
                'email'    => $validated['user']['email'],
                'password' => Hash::make($validated['user']['password']),
                'role'     => $validated['user']['role'], // en tu User model debe existir 'role' en $fillable
            ]);

            // 2) Crear ABOGADO
            $abogado = Abogado::create([
                'user_id'            => $user->id,
                'numero_colegiatura' => $validated['numero_colegiatura'],
                'dni'                => $validated['dni'],
                'nombres'            => $validated['nombres'],
                'apellidos'          => $validated['apellidos'],
                'especialidad'       => $validated['especialidad'] ?? null,
                'email'              => $validated['email'],
                'habilitado_hasta'   => $validated['habilitado_hasta'],
                'activo'             => $validated['activo'] ?? true,
            ]);

            return $abogado->load('user:id,name,email,role');
        });

        return response()->json($abogado, 201);
    }

    public function show(Abogado $abogado)
    {
        return response()->json($abogado->load('user:id,name,email,role'));
    }

    public function update(UpdateAbogadoRequest $request, Abogado $abogado)
    {
        $validated = $request->validated();

        $abogado = DB::transaction(function () use ($validated, $abogado) {
            // 1) Actualizar USER (si llega info)
            if (!empty($validated['user'])) {
                $user = $abogado->user;
                $user->name = $validated['user']['name'] ?? $user->name;
                $user->email = $validated['user']['email'] ?? $user->email;
                if (!empty($validated['user']['password'])) {
                    $user->password = Hash::make($validated['user']['password']);
                }
                if (!empty($validated['user']['role'])) {
                    $user->role = $validated['user']['role'];
                }
                $user->save();
            }

            // 2) Actualizar ABOGADO
            $abogado->update($validated); // gracias a rules(sometimes) sólo afectará lo enviado

            return $abogado->load('user:id,name,email,role');
        });

        return response()->json($abogado);
    }

    public function destroy(Abogado $abogado)
    {
        DB::transaction(function () use ($abogado) {
            $user = $abogado->user;
            $abogado->delete();
            // Si quieres que al eliminar abogado también se elimine el user:
            // $user?->delete();
            // Si NO quieres eliminar el user, comenta la línea anterior.
        });

        return response()->json(['message' => 'Eliminado']);
    }
}
