<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\PagoService;
use Illuminate\Http\Request;

class PagoController extends Controller
{
    public function __construct(
        private PagoService $pagoService
    ) {}

    public function procesar(Request $request)
    {
        $request->validate([
            'abogado_id' => 'required|exists:abogados,id',
            'monto' => 'required|numeric|min:0.01',
            'metodo' => 'required|in:culqi,izipay,mercado_pago'
        ]);

        $pago = $this->pagoService->procesarPago(
            $request->abogado_id,
            $request->monto,
            $request->metodo
        );

        return response()->json($pago, 201);
    }
}