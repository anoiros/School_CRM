<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_id',
        'name',
    ];

    // Une matière appartient à une classe
    public function class()
    {
        return $this->belongsTo(Classe::class);
    }

    // Une matière peut avoir plusieurs notes
    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    // Une matière peut avoir
}