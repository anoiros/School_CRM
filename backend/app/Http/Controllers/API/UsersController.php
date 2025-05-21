<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\utils;
use App\Services\AuditLogger;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        $data = $users->map(function ($user) {
            return [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "role" => $user->role,
            ];
        });

        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = new User();
        $user->name = trim($request->input('name'));
        $user->email = trim($request->input('email'));
        $user->password = bcrypt('password');
        $user->role = trim($request->input('role'));

        if (!utils::IsValidEmail($request->input('email'))){
            return response()->json(['message' => 'le format de l\'email est invalid'], 400);
        }

        if (!utils::IsValidRole($request->input('role') )){
            return response()->json(['message' => 'Role invalid'], 400);
        }

        if ($user->save()) {
            AuditLogger::onCreate('user',$user->id);
            return response()->json(['message' => 'Utilisateur créé avec succès']);
        } else {
            return response()->json(['message' => 'Erreur lors de la création de l\'utilisateur'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // chercher l'utilisateur par son id
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur Introuvable'], 404);
        }

        // Renouveler le mot de passe
        if ($request->has('password')) {
            $user->password = bcrypt($request->input('password'));
            $user->save();
            AuditLogger::onCustomAction('reset password', 'user', $user->id);
            return response()->json(['message' => 'Mot de passe mis à jour avec succès']);
        }

        // Mettre à jour les informations de l'utilisateur
        if ($request->has('updateAll') && $request->input('updateAll') == true) {

            // Validation des données
            if (!utils::IsValidEmail($request->input('email'))){
                return response()->json(['message' => 'le format de l\'email est invalid'], 400);
            }
            if (!utils::IsValidRole($request->input('role') )){
                return response()->json(['message' => 'Role invalid'], 400);
            }
            if (utils::IsPrincipleAdmin($user->id, $user->role) && $request->input('role') != 'admin') {
                return response()->json(['message' => 'Vous ne pouvez pas changer le rôle de l\'administrateur principal'], 403);
            }

            // Mettre à jour les informations de l'utilisateur
            $user->name = trim($request->input('name'));
            $user->email = trim($request->input('email'));
            $newRole = trim($request->input('role'));

            // Vérifier si le rôle a changé
            if ($user->role !== $newRole) {
                if ($user->role === 'teacher') {
                    // Ex : Supprimer ses cours
                    $user->teacher()->delete(); // Exemple relation
                }
                if ($user->role === 'student') {
                    // Ex : Supprimer ses notes
                    $user->student()->delete(); // Exemple relation
                }
            }
            // Mettre à jour le rôle
            $user->role = $request->input('role');

            // Enregistrer les modifications
            $user->save();
            AuditLogger::onUpdate('user', $user->id);
            return response()->json(['message' => 'Utilisateur mis à jour avec succès']);
        }

        return response()->json(['message' => 'Aucune modification apportée'], 400);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur introuvable'], 404);
        }

        if (utils::IsPrincipleAdmin($user->id, $user->role)) {
            return response()->json(['message' => 'Vous ne pouvez pas supprimer l\'administrateur principal'], 403);
        }

        $user->delete();
        AuditLogger::onDelete('user', $user->id);
        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }
}
