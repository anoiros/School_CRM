<?php

namespace App\Http\Controllers;

class utils
{
    public static function IsValidEmail($email)
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    public static function IsValidRole($role)
    {
        $validRoles = ['admin', 'teacher', 'student'];
        return in_array($role, $validRoles);
    }

    public static function IsPrincipleAdmin($id, $role)
    {
        // Assuming the principle admin has a specific ID and role
        $principleAdminId = 1; // Replace with actual principle admin ID
        return $id === $principleAdminId && $role === 'admin';
    }
}