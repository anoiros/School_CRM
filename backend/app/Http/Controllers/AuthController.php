<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Routing\Controller;

class AuthController extends Controller
{
    // Appliquer le middleware auth:sanctum uniquement à la méthode logout
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only('logout');
    }

    // Méthode pour se connecter
    public function login(Request $request)
    {
        // Validation des données
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Recherche de l'utilisateur par email
        $user = User::where('email', $request->email)->first();

        // Vérification du mot de passe
        if ($user && Hash::check($request->password, $user->password)) {
            // Création du token Sanctum
            $token = $user->createToken('SchoolCRM')->plainTextToken;

            // Retourner le token dans la réponse
            return response()->json(['token' => $token]);
        }

        // Si la connexion échoue
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Méthode pour se déconnecter
    public function logout(Request $request)
    {
        // Supprimer tous les tokens de l'utilisateur
        $request->user()->tokens->each(function ($token) {
            $token->delete();
        });

        return response()->json(['message' => 'Logged out successfully']);
    }
}
