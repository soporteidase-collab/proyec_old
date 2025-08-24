<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Votacion;
use App\Models\Voto;

class VotacionController extends Controller
{
    public function index()
    {
        return response()->json(
            Votacion::where('activa', true)->get()
        );
    }

    public function votar(Request $request)
    {
        $request->validate([
            'votacion_id' => 'required|exists:votaciones,id',
            'opcion' => 'required'
        ]);

        $voto = Voto::create([
            'abogado_id' => $request->user()->id,
            'votacion_id' => $request->votacion_id,
            'opcion' => $request->opcion
        ]);

        return response()->json($voto, 201);
    }
}