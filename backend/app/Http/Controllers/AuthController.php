<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    /**
     * Connexion utilisateur avec JWT
     */
    public function login(Request $request)
    {
        // Validation
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Récupère les identifiants
        $credentials = $request->only('email', 'password');

        // Tentative de connexion
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['message' => 'Identifiants invalides'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['message' => 'Erreur serveur lors de la connexion'], 500);
        }

        // Récupérer l'utilisateur connecté
        $user = Auth::user();

        // Réponse avec token
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    /**
     * Déconnexion utilisateur
     */
    public function logout(Request $request)
    {
        try {
            // Invalider le token JWT
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json(['message' => 'Déconnexion réussie']);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Erreur de déconnexion'], 500);
        }
    }

    /**
     * Récupérer les infos de l'utilisateur connecté
     */
    public function me()
    {
        return response()->json(Auth::user());
    }
}
