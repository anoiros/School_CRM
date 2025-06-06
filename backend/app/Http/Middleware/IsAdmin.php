<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        // Si l'utilisateur n'est pas connecté ou n'est pas admin
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json(['error' => 'Accès refusé'], 403);
        }

        return $next($request);
    }
}