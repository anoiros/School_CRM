<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Services\AuditLogger;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

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
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'photo' => $user->photo ? base64_encode($user->photo) : null
            ]
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
            $user->photo = $photo;
        }

        if ($user->save()) {
            AuditLogger::onCustomAction('update profile', 'user', $user->id);

            return response()->json([
                'message' => 'Profil mis à jour avec succès',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'photo' => $user->photo ? base64_encode($user->photo) : null
                ]
            ]);
        } else {
            return response()->json(['message' => 'Erreur lors de la mise à jour du profil'], 500);
        }
    }

    public function verifyEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $code = random_int(100000, 999999);

        DB::table('password_resets_codes')->where('email', $request->email)->delete();
        DB::table('password_resets_codes')->insert([
            'email' => $request->email,
            'code' => $code,
            'created_at' => now(),
        ]);

        Mail::raw("Votre code de réinitialisation est : $code", function ($message) use ($request) {
            $message->to($request->email)->subject('Code de réinitialisation de mot de passe');
        });

        return response()->json(['message' => 'Code envoyé par email'], 200);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $record = DB::table('password_resets_codes')
            ->where('email', $request->email)
            ->where('code', $request->code)
            ->first();

        if (!$record) {
            return response()->json(['error' => 'Code invalide'], 400);
        }

        if (now()->diffInMinutes($record->created_at) > 10) {
            return response()->json(['error' => 'Code expiré'], 400);
        }

        $user = \App\Models\User::where('email', $request->email)->first();
        $user->password = bcrypt($request->password);
        $user->save();

        DB::table('password_resets_codes')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Mot de passe réinitialisé avec succès']);
    }

}