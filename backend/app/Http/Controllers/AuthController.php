<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Services\AuditLogger;
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

    public function profil(Request $request)
    {
        $user = Auth::user();
        // Validation des données
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|confirmed',
            'photo' => 'nullable|file|image',
        ]);

        $user = User::find($user->id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        if ($request->hasFile('photo')) {
            $photo = file_get_contents($request->file('photo')->getRealPath());
            $user->profile_photo = $photo;
        }

        if ($user->save()) {
            AuditLogger::onCustomAction('update profile', 'user', $user->id);
        } else {
            return response()->json(['message' => 'Erreur lors de la mise à jour du profil'], 500);
        }
    }
}