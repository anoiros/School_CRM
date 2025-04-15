<?php

use Illuminate\Routing;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Route de connexion pour l'authentification (Login)
Route::post('login', [AuthController::class, 'login']);

// Route de déconnexion (Logout), nécessite un token valide
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);

Route::get('/', function () {
    return response()->json(['message' => 'API Laravel OK ']);
});



