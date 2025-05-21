<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'action',
        'target_type',
        'target_id',
    ];

    // Un audit log appartient à un utilisateur (qui a effectué l'action)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
