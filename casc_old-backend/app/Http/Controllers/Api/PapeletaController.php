<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Papeleta;

class PapeletaController extends Controller
{
    public function verificarEstado(Request $request)
    {
        $papeleta = Papeleta::where('abogado_id', $request->user()->id)
            ->latest()
            ->first();

        return response()->json([
            'habilitado' => $papeleta && $papeleta->fecha_fin > now(),
            'detalle' => $papeleta
        ]);
    }
}