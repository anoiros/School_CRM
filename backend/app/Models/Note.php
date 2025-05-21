<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'teacher_id',
        'content',
        'category',
    ];

    // Une note appartient à un étudiant
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    // Une note appartient à un enseignant
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
