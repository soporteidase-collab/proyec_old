<?php

namespace App\Services;

use App\Models\Pago;
use App\Services\Pasarelas\CulqiService;
use App\Services\Pasarelas\MercadoPagoService;
use Exception;

class PagoService
{
    public function procesarPago(int $abogadoId, float $monto, string $metodo): Pago
    {
        // Validar método de pago
        if (!in_array($metodo, ['culqi', 'izipay', 'mercado_pago'])) {
            throw new Exception('Método de pago no soportado');
        }

        // Procesar según el método
        switch ($metodo) {
            case 'culqi':
                $transaccion = (new CulqiService())->procesar($monto);
                break;
            // case 'mercado_pago':
            //     $transaccion = (new MercadoPagoService())->crearPago($monto);
            //     break;
            default:
                throw new Exception('Método no implementado');
        }

        // Registrar el pago
        return Pago::create([
            'abogado_id' => $abogadoId,
            'monto' => $monto,
            'metodo' => $metodo,
            'codigo_transaccion' => $transaccion->id,
            'estado' => 'completado'
        ]);
    }
}