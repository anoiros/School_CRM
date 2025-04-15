<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Les attributs modifiables en masse.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // ajoute ce champ si tu veux gérer les rôles (admin, enseignant, étudiant)
    ];

    /**
     * Les attributs cachés dans les tableaux ou les réponses JSON.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Les attributs castés automatiquement.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
