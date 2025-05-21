<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdminOrTeacher
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && ($user->role === 'admin' || $user->role === 'teacher')) {
           return $next($request);
        }

         return response()->json(['error' => 'Accès refusé'], 403);
    }
}
