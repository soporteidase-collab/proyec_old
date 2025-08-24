<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // si manejas rol básico en users
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relación 1–1: un usuario puede tener un registro de abogado.
     */
    public function abogado(): HasOne
    {
        return $this->hasOne(Abogado::class);
    }

    /**
     * Helpers (opcionales)
     */
    public function isAbogado(): bool
    {
        return $this->abogado()->exists();
    }

    public function hasRole(string $role): bool
    {
        return ($this->role ?? '') === $role;
    }
}
