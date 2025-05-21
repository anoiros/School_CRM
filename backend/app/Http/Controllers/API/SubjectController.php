<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Subject;
use App\Services\AuditLogger;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subjects = Subject::with(['class'])->get();

        $data = $subjects->map(function ($subject) {
            return [
                "id" => $subject->id,
                "name" => $subject->name ?? '',
                "class_name" => $subject->class->name ?? '',
                "class_section" => $subject->class->section ?? '',
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
            'class_name' => 'required|exists:classes,id',
            'name' => 'required|string',
        ]);

        $subject = Subject::create([
            'class_id' => $validated['class_name'],
            'name' => trim($validated['name']),
        ]);

        if ($subject) {
            AuditLogger::onCreate('subject', $subject->id);
            return response()->json(['message' => 'Matière crée avec succés'], 201);
        } else {
            return response()->json(['message' => 'Erreur lors de la création de la matière'], 500);
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
        $subject = Subject::find($id);

        if (!$subject) {
            return response()->json(['message' => 'Matière non trouvée'], 404);
        }

        if ($request->has('updateAll') && $request->input('updateAll') == true) {
            $subject->name = trim($request->input('name'));
            $subject->class_id = $request->input('id');
            if ($subject->save()) {
                AuditLogger::onUpdate('subject', $subject->id);
                return response()->json(['message' => 'Matière mise à jour avec succès']);
            }
        }
        return response()->json(['message' => 'Erreur lors de la mise à jour de la matière'], 500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['message' => 'Matière non trouvée'], 404);
        }

        if ($subject->delete()) {
            AuditLogger::onDelete('subject', $subject->id);
            return response()->json(['message' => 'Matière supprimée avec succès']);
        } else {
            return response()->json(['message' => 'Erreur lors de la suppression de la matière'], 500);
        }
    }
}
