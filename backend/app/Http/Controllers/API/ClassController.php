<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use App\Models\Classe;
use App\Services\AuditLogger;

class ClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $classes = Classe::with('teacher.user')->get();

        $data = $classes->map(function ($class) {
            return [
                "id" => $class->id,
                "name" => $class->name ?? '',
                "section" => $class->section ?? '',
                "teacherName" => 'Nom : ' . ($class->teacher->user->name ?? '') . ' | Spécialité : ' . ($class->teacher->subject_specialization ?? ''),
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
            'teacherName' => 'required|exists:teachers,id',
            'name' => 'required|string',
            'section' => 'required|string',
        ]);

        $class = Classe::create([
            'teacher_id' => $validated['teacherName'],
            'name' => trim($validated['name']),
            'section' => trim($validated['section']),
        ]);

        if ($class) {
            AuditLogger::onCreate('classe', $class->id);
            return response()->json(['message' => 'Classe crée avec succés'], 201);
        } else {
            return response()->json(['message' => 'Erreur lors de la création de la classe'], 500);
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
        $class = Classe::find($id);
        if (!$class) {
            return response()->json(['message' => 'Classe non trouvée'], 404);
        }
        if ($request->has('updateAll') && $request->input('updateAll') == true) {
            $class->name = trim($request->input('name'));
            $class->section = trim($request->input('section'));
            if ($class->save()) {
                AuditLogger::onUpdate('classe', $class->id);
                return response()->json(['message' => 'Classe mise à jour avec succès']);
            } else {
                return response()->json(['message' => 'Erreur lors de la mise à jour de la classe'], 500);
            }
        }

        return response()->json(['messsage' => 'Aucun modification apportée'], 400);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $class = Classe::find($id);
        if (!$class) {
            return response()->json(['message' => 'Classe non trouvée'], 404);
        }
        if ($class->delete()) {
            AuditLogger::onDelete('classe', $class->id);
            return response()->json(['message' => 'Classe supprimée avec succès']);
        } else {
            return response()->json(['message' => 'Erreur lors de la suppression de la classe'], 500);
        }
    }
}
