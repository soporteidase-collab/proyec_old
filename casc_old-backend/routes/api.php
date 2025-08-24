<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    AuthController,
    PagoController,
    PapeletaController,
    AbogadoController,
    VotacionController
};

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user() ?? response()->json(null, 401);
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // Pagos
    Route::post('/pagos/procesar', [PagoController::class, 'procesarPago']);
    Route::get('/pagos/historial', [PagoController::class, 'historial']);

    // Papeletas
    Route::get('/papeletas/estado', [PapeletaController::class, 'verificarEstado']);

    // Votaciones
    Route::get('/votaciones', [VotacionController::class, 'index']);
    Route::post('/votaciones/votar', [VotacionController::class, 'votar']);

    Route::apiResource('abogados', AbogadoController::class)->parameters([
        'abogados' => 'abogado'
    ]);


    Route::get('/abogados', [AbogadoController::class, 'index']);
    Route::post('/abogados', [AbogadoController::class, 'store']);
    Route::get('/abogados/{id}', [AbogadoController::class, 'show']);
    Route::put('/abogados/{id}', [AbogadoController::class, 'update']);
    Route::delete('/abogados/{id}', [AbogadoController::class, 'destroy']);





});
