<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subject_specialization',
        'hire_date',
    ];

    // Un enseignant appartient à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Un enseignant peut enseigner plusieurs classes
    public function classes()
    {
        return $this->hasMany(Classe::class);
    }

    // Un enseignant peut avoir plusieurs matières
    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }
}
