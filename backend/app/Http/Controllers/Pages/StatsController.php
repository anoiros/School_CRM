<?php

namespace App\Http\Controllers\Pages;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Classe;
use App\Models\Subject;
use App\Models\Grade;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;


class StatsController extends Controller
{
    public function stats(): JsonResponse
    {
        $studentsCount = Student::count();
        $teachersCount = Teacher::count();
        $classesCount = Classe::count();
        $subjectsCount = Subject::count();

        return response()->json([
            'students' => $studentsCount,
            'teachers' => $teachersCount,
            'classes' => $classesCount,
            'subjects' => $subjectsCount
        ]);
    }

    public function gradesDistribution(): JsonResponse
    {
        // Regrouper les notes par intervalles
        $distribution = Grade::select(DB::raw('
                CASE
                    WHEN grade >= 18 THEN "A+"
                    WHEN grade >= 16 THEN "A"
                    WHEN grade >= 14 THEN "B"
                    WHEN grade >= 12 THEN "C"
                    WHEN grade >= 10 THEN "D"
                    ELSE "F"
                END AS grades,
                count(*) as count
            '))
            ->groupBy('grades')
            ->get();

        // Retourner les résultats sous forme de JSON
        return response()->json($distribution);
    }



    public function teacherClassCount(): JsonResponse
    {
        $teacherId = Teacher::where('user_id', Auth::id())->value('id');
        $classIds = Classe::where('teacher_id', $teacherId)->pluck('id');
        $classes = $classIds->count();
        $students = Student::whereIn('class_id', $classIds)->count();
        $subjects = Subject::whereIn('class_id', $classIds)->count();

        return response()->json([
            'MyClasses' => $classes,
            'MyStudents' => $students,
            'MySubjects' => $subjects
        ]);
    }
}
