<?php

namespace App\Services\Pasarelas;

use Culqi\Culqi;

class CulqiService
{
    public function procesar(float $monto)
    {
        $culqi = new Culqi([
            'api_key' => env('CULQI_SECRET_KEY')
        ]);

        return $culqi->charges->create([
            'amount' => $monto * 100, // Culqi usa centimos
            'currency_code' => 'PEN',
            'description' => 'Pago de cuota colegial'
        ]);
    }
}