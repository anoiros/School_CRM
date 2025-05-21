<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Services\AuditLogger;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::with(['user', 'class'])->get();

        $data = $students->map(function ($student) {
            return [
                "id" => $student->id,
                "username" => $student->user->name ?? '',
                "email" => $student->user->email ?? '',
                "dateNaissance" => $student->date_of_birth ?? '',
                "genre" => $student->gender ?? '',
                "classe" => $student->class->name ?? '',
                "section" => $student->class->section ?? '',
                "dateInscription" => $student->enrollment_date ?? '',
            ];
        });

    return response()->json($data);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|exists:users,id',
            'classe' => 'required|exists:classes,id',
            'dateNaissance' => 'required|date',
            'genre' => 'required|in:Homme,Femme',
            'dateInscription' => 'required|date',
        ]);

        $student = Student::create([
            'user_id' => $validated['username'],
            'class_id' => $validated['classe'],
            'date_of_birth' => $validated['dateNaissance'],
            'gender' => $validated['genre'],
            'enrollment_date' => $validated['dateInscription'],
        ]);

        if ($student) {
            AuditLogger::onCreate('student', $student->id);
            return response()->json(['message' => 'Etudiant crée avec succés'], 201);
        } else {
            return response()->json(['message' => 'Erreur lors de la création de l\'étudiant'], 500);
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
        $student = Student::find($id);
        if(!$student){
            return response()->json(['message' => 'Etudiant introuvable'], 404);
        }
        if ($request->has('updateAll') && $request->input('updateAll') == true) {
            $student->date_of_birth = $request->input('dateNaissance');
            $student->gender = $request->input('genre');
            $student->enrollment_date = $request->input('dateInscription');
            if ($student->save()) {
                AuditLogger::onUpdate('student', $student->id);
                return response()->json(['message' => 'Etudiant mise à jour avec succès']);
            } else {
                return response()->json(['message' => 'Erreur lors de la mise à jour de la Etudiant'], 500);
            }
        }

        return response()->json(['messsage' => 'Aucun modification apportée'], 400);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $student = Student::find($id);
        if(!$student){
            return response()->json(['message' => 'Etudiant introuvable'], 404);
        }
        if ($student->delete())
        {
            AuditLogger::onDelete('student', $student->id);
            return response()->json(['message' => 'Etudiant supprimée avec succès']);
        } else {
            return response()->json(['message' => 'Erreur lors de la suppression de l\'étudiant'], 500);
        }
    }
}
