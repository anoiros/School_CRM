<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use App\Models\AuditLog;

class AuditLogger
{
    public static function onCreate($targetType, $targetId)
    {
        self::log('create', $targetType, $targetId);
    }

    public static function onUpdate($targetType, $targetId)
    {
        self::log('update', $targetType, $targetId);
    }

    public static function onDelete($targetType, $targetId)
    {
        self::log('delete', $targetType, $targetId);
    }

    public static function onCustomAction($action, $targetType, $targetId)
    {
        self::log($action, $targetType, $targetId);
    }

    private static function log($action, $targetType, $targetId)
    {
        AuditLog::create([
            'user_id'     => Auth::id(),
            'action'      => $action,
            'target_type' => $targetType,
            'target_id'   => $targetId,
        ]);
    }
}
