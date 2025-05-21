<?php

namespace App\Http\Controllers\Pages;

use Illuminate\Support\Facades\Auth;
use App\Models\Classe;
use App\Models\Student;
use App\Http\Controllers\Controller;
use App\Models\Grade;
use App\Models\Note;
use App\Models\Subject;

class StudentPageController extends Controller
{
    public function MyClasses()
    {
        $user = Auth::user();
        $classesId = Student::where('user_id', $user->id)->pluck('class_id');
        $classes = Classe::whereIn('id', $classesId)->with('teacher.user')->get();

        $data = $classes->map(function($classes) use ($user) {
            $student = Student::where('user_id', $user->id)->where('class_id', $classes->id)->first();
            $subjects = Subject::where('class_id', $classes->id)->first();
            $grade = Grade::where('student_id', $student->id)->where('subject_id', $subjects->id)->value('grade') ?? '—';
            return [
                'id' => $classes->id,
                'name' => $classes->name ?? '',
                'section' => $classes->section ?? '',
                'subject' => $subjects->name ?? '',
                'teacher' => $classes->teacher->user->name ?? '',
                'note' => $grade,
            ];
        });

        return response()->json($data);
    }

    public function MyAverage()
    {
        $user = Auth::user();
        $student = Student::where('user_id', $user->id)->pluck('id');
        $average = Grade::whereIn('student_id', $student)->avg('grade');
        $response = [
            "moyenne" => round($average ?? 0, 2),
        ];
        return response()->json($response);

    }

    public function MySubjects()
    {
        $user = Auth::user();
        $classesId = Student::where('user_id', $user->id)->pluck('class_id');
        $classes = Classe::whereIn('id', $classesId)->get();

        $data = $classes->map(function($classes) use ($user) {
            $student = Student::where('user_id', $user->id)->where('class_id', $classes->id)->first();
            $subjects = Subject::where('class_id', $classes->id)->first();
            $grade = Grade::where('student_id', $student->id)->where('subject_id', $subjects->id)->value('grade') ?? '—';
            return [
                'subject' => $subjects->name ?? '',
                'teacher' => $classes->teacher->user->name ?? '',
                'note' => $grade,
                'statue' => $grade >= 10 ? 'validé' : 'non validé',
            ];
        });

        return response()->json($data);
    }

    public function MyNotes()
    {
        $user = Auth::user();
        $student = Student::where('user_id', $user->id)->pluck('id');
        $notes = Note::whereIn('student_id', $student)->with('teacher.user')->get();
        $data = $notes->map(function($note) {
            return [
                'teacher' => $note->teacher->user->name ?? '',
                'content' => $note->content ?? '',
                'category' => $note->category ?? '',
            ];
        });

        return response()->json($data);

    }

}

