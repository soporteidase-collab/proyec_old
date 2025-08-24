<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Abogado extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'numero_colegiatura',
        'dni',
        'nombres',
        'apellidos',
        'especialidad',
        'email',
        'habilitado_hasta',
        'activo',
    ];

    protected $casts = [
        'habilitado_hasta' => 'datetime',
        'activo' => 'boolean',
    ];

    /**
     * Relación: el abogado pertenece a un usuario.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scopes útiles (opcionales)
     */
    public function scopeActivos($query)
    {
        return $query->where('activo', true);
    }

    public function scopeHabilitado($query)
    {
        return $query->where('habilitado_hasta', '>=', now());
    }
}
