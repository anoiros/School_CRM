<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date_of_birth',
        'gender',
        'enrollment_date',
        'class_id',
    ];

    // Un étudiant appartient à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Un étudiant appartient à une classe
    public function class()
    {
        return $this->belongsTo(Classe::class, 'class_id');
    }

    // Un étudiant peut avoir plusieurs notes
    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    // Un étudiant peut avoir plusieurs commentaires de professeur
    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
