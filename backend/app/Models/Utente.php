<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Utente extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $table = 'utenti';

    protected $fillable = [
        'nominativo',
        'email',
        'password',
        'telefono',
        'ruolo',
        'stato',
        'foto',
    ];

    protected $hidden = [
        'password',
    ];

    // Implementazione JWT
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
