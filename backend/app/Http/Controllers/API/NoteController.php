<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Note;
use App\Models\Teacher;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::id();
        $teacherId = Teacher::where('user_id', $user)->value('id');
        $validated = $request->validate([
            'student_name' => 'required|exists:students,id',
            'content' => 'required|string|max:255',
            'category' => 'required|string|in:positive,neutral,negative',
        ]);

        $note = Note::create([
            'student_id' => $validated['student_name'],
            'teacher_id' => $teacherId,
            'content' => $validated['content'],
            'category' => $validated['category'],
        ]);

        if($note) {
            return response()->json(['message' => 'Remarque ajouté avec succès']);
        }else {
            return response()->json(['message' => 'Erreur lors de l\'ajout de la remarque'], 500);
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
        $note = Note::find($id);
        if (!$note) {
            return response()->json(['message' => 'Remarque non trouvée'], 404);
        }

        $validated = $request->validate([
            'content' => 'required|string|max:255',
            'category' => 'required|string|in:positive,neutral,negative',
        ]);

        $note->content = $validated['content'];
        $note->category = $validated['category'];

        if ($note->save()) {
            return response()->json(['message' => 'Remarque mise à jour avec succès']);
        } else {
            return response()->json(['message' => 'Erreur lors de la mise à jour de la remarque'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $note = Note::find($id);
        if (!$note) {
            return response()->json(['message' => 'Remarque non trouvée'], 404);
        }

        if ($note->delete()) {
            return response()->json(['message' => 'Remarque supprimée avec succès']);
        } else {
            return response()->json(['message' => 'Erreur lors de la suppression de la remarque'], 500);
        }
    }
}
