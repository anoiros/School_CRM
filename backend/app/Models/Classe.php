<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'name',
        'section',
    ];

    // Une classe appartient à un enseignant
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    // Une classe a plusieurs matières
    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    // Une classe a plusieurs étudiants
    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
