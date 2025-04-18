<?php

use Illuminate\Routing;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


// Route de connexion pour l'authentification (Login)
Route::middleware('guest')->post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

