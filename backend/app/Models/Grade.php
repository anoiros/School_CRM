<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'subject_id',
        'grade',
    ];

    // Une note appartient à un étudiant
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    // Une note appartient à une matière
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
