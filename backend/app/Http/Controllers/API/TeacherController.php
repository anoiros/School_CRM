<?php

namespace App\Http\Controllers\API;

use App\Models\Teacher;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\AuditLogger;

class TeacherController extends Controller
{
    // Afficher tous les enseignants
    public function index()
    {
        $teachers = Teacher::with(['user'])->get();

        $data = $teachers->map(function ($teacher) {
            return [
                "id" => $teacher->id,
                "name" => $teacher->user->name ?? '',
                "email" => $teacher->user->email ?? '',
                "specialization" => $teacher->subject_specialization ?? '',
                "hireDate" => $teacher->hire_date ?? '',
            ];
        });

        return response()->json($data);
    }

    // Afficher un seul enseignant par ID
    public function show($id)
    {
        //
    }

    // Créer un nouvel enseignant
    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|exists:users,id',
            'specialization' => 'required|string',
            'hireDate' => 'required|date',
        ]);

        $teacher = Teacher::create([
            'user_id' => $validated['name'],
            'subject_specialization' => trim($validated['specialization']),
            'hire_date' => $validated['hireDate'],
        ]);

        if($teacher) {
            AuditLogger::onCreate('teacher', $teacher->id);
            return response()->json(['message' => 'Enseignant crée avec succés'], 201);
        } else {
            return response()->json(['message' => 'Erreur lors de la création de l\'enseignant'], 500);
        }
    }

    // Mettre à jour un enseignant existant
    public function update(Request $request, $id)
    {
        $teacher = Teacher::find($id);

        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }

        if ($request->has('updateAll') && $request->input('updateAll') == true) {
            $teacher->subject_specialization = trim($request->input('specialization'));
            $teacher->hire_date = $request->input('hireDate');
            $teacher->save();
            AuditLogger::onUpdate('teacher', $teacher->id);
            return response()->json(['message' => 'Enseignant mis à jour avec succès']);
        }

        return response()->json(['messsage' => 'Aucun modification apportée'], 400);
    }

    // Supprimer un enseignant
    public function destroy($id)
    {
        $teacher = Teacher::find($id);

        if (!$teacher) {
            return response()->json(['message' => 'Enseignant introuable'], 404);
        }

        $teacher->delete();
        AuditLogger::onDelete('teacher', $teacher->id);

        return response()->json(['message' => 'Enseignant supprimé avec succès']);
    }
}
