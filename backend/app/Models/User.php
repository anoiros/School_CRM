<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;


class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Un utilisateur peut être lié à un étudiant
    public function student()
    {
        return $this->hasOne(Student::class);
    }

    // Un utilisateur peut être lié à un enseignant
    public function teacher()
    {
        return $this->hasOne(Teacher::class);
    }

    // Un utilisateur peut avoir plusieurs actions dans les logs
    public function auditLogs()
    {
        return $this->hasMany(AuditLog::class);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}