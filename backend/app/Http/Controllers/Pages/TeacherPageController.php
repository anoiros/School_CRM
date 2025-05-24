<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Classe;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\Grade;
use App\Models\Note;
use App\Services\AuditLogger;
use Illuminate\Http\Request;

class TeacherPageController extends Controller
{
    public function MyClasses()
    {
        $teacherId = Teacher::where('user_id', Auth::id())->value('id');
        $classes = Classe::where('teacher_id', $teacherId)->get();

        $data = $classes->map(function($classes) {
            return [
                'id' => $classes->id,
                'name' => $classes->name ?? '',
                'section' => $classes->section ?? '',
                'students_count' => Student::where('class_id', $classes->id)->count() ?? '',
            ];
        });
        return response()->json($data);
    }

    public function MyStudents(string $Class_id)
    {
        $students = Student::where('class_id', $Class_id)->with('user')->get();
        $subjectId = Subject::where('class_id', $Class_id)->value('id');
        $data = $students->map(function($student) use ($subjectId) {
            return [
                'id' => $student->id,
                'name' => $student->user->name ?? '',
                'email' => $student->user->email ?? '',
                'DDN' => $student->date_of_birth ?? '',
                'genre' => $student->gender ?? '',
                'grade' => Grade::where('student_id', $student->id)->where('subject_id', $subjectId)->value('grade') ?? '—',
                'subject_id' => $subjectId ?? '',
            ];
        });
        return response()->json($data);
    }

    public function MySubjects()
    {
        $teacherId = Teacher::where('user_id', Auth::id())->value('id');
        $classesId = Classe::where('teacher_id', $teacherId)->value('id');
        $subjects = Subject::where('class_id', $classesId)->with('class','grades')->get();

        $data = $subjects->map(function($subject) {
            return [
                'id' => $subject->id,
                'name' => $subject->name ?? '',
                'classe_id' => $subject->class_id ?? '',
                'classe_name' => $subject->class->name ?? '',
                'classe_section' => $subject->class->section ?? '',
                'classe_avg' => round($subject->grades->avg('grade'), 2) ?? 0,
            ];
        });
        return response()->json($data);
    }

    public function StoreGrade(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:students,id',
            'subject_id' => 'required|exists:subjects,id',
            'grade' => 'required|numeric|min:0|max:20',
        ]);

        $grade = Grade::updateOrCreate(
            ['student_id' => $validated['id'], 'subject_id' => $validated['subject_id']],
            ['grade' => $validated['grade']],
        );

        if ($grade) {
            AuditLogger::onCustomAction('update or create', 'grade', $grade->id);
            return response()->json(['message' => 'Note enregistrée avec succès'], 200);
        } else {
            return response()->json(['message' => 'Erreur lors de l\'enregistrement de la note'], 500);
        }
    }

    public function MyNotes()
    {
        $teacherId = Teacher::where('user_id', Auth::id())->value('id');
        $classesId = Classe::where('teacher_id', $teacherId)->value('id');
        $studentsId = Student::where('class_id', $classesId)->pluck('id');
        $Notes = Note::whereIn('student_id', $studentsId)->get();

        $data = $Notes->map(function($Notes) {
            return [
                'id' => $Notes->id,
                'student_id' => $Notes->student_id ?? '',
                'student_name' => $Notes->student->user->name ?? '',
                'student_email' => $Notes->student->user->email ?? '',
                'content' => $Notes->content ?? '',
                'category' => $Notes->category ?? '',
            ];
        });
        return response()->json($data);
    }

    public function AllMyStudents(){
        $teacherId = Teacher::where('user_id', Auth::id())->value('id');
        $classes = Classe::where('teacher_id', $teacherId)->pluck('id');
        $students = Student::whereIn('class_id', $classes)->with('user')->get();

        $box = $students->map(function($students) {
            return [
                "id" => $students->id,
                "value" => 'Nom : ' . ($students->user->name ?? '') . ' | Email : ' . ($students->user->email ?? ''),
            ];
        });
        return response()->json($box);
    }

    public function exportData()
    {
        $teacherId = Teacher::where('user_id', Auth::id())->value('id');
        $classes = Classe::where('teacher_id', $teacherId)->get();
        $students = Student::whereIn('class_id', $classes->pluck('id'))->with('user')->get();

        $students = $classes->map(function($student){
            return [
                'id' => $student->id,
                'name' => $student->user->name ?? '',
                'email' => $student->user->email ?? '',
                'DDN' => $student->date_of_birth ?? '',
            ];
        });

        $subjects = Subject::whereIn('class_id', $classes->pluck('id'))->with('grades')->get();
        $subjects = $subjects->map(function($subject) {
            return [
                'id' => $subject->id,
                'name' => $subject->name ?? '',
                'class_id' => $subject->class_id ?? '',
                'class_name' => $subject->class->name ?? '',
                'class_section' => $subject->class->section ?? '',
                'average_grade' => round($subject->grades->avg('grade'), 2) ?? 0,
            ];
        });


        $data = [
            'classes' => $classes,
            'students' => $students,
            'subjects' => $subjects,
        ];

        return response()->json($data);
    }
}