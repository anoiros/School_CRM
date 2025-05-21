<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsTeacher
{
    public function handle(Request $request, Closure $next): Response
    {
        // Si l'utilisateur n'est pas connecté ou n'est pas teacher
        if (!$request->user() || $request->user()->role !== 'teacher') {
            return response()->json(['error' => 'Accès refusé'], 403);
        }


        return $next($request);
    }
}