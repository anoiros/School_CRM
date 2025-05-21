<?php

use App\Http\Controllers\Pages\StatsController;
use App\Http\Controllers\Pages\SelectController;
use App\Http\Controllers\Pages\TeacherPageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\TeacherController;
use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\ClassController;
use App\Http\Controllers\API\SubjectController;
use App\Http\Controllers\API\NoteController;
use App\Http\Controllers\API\UsersController;
use App\Http\Controllers\Pages\StudentPageController;
use App\Models\Student;

// Routes protégées
Route::middleware('auth:api','is_admin')->group(function () {
    Route::apiResource('users', UsersController::class);
    Route::apiResource('teachers', TeacherController::class);
    Route::apiResource('students', StudentController::class);
    Route::apiResource('classes', ClassController::class);
    Route::apiResource('subjects', SubjectController::class);
});

// Routes Statistiques
Route::middleware(['auth:api','is_admin'])->group(function () {
    Route::get('/stats', [StatsController::class, 'stats']);
    Route::get('/stats/grades', [StatsController::class, 'gradesDistribution']);

    Route::get('/select/userTeachers', [SelectController::class, 'userTeachers']);
    Route::get('/select/teachers', [SelectController::class, 'teachers']);
    Route::get('/select/classes', [SelectController::class, 'classes']);
    Route::get('/select/students', [SelectController::class, 'userStudents']);
});

Route::middleware(['auth:api','is_teacher'])->group(function() {
    Route::get('/stats/teacher', [StatsController::class, 'teacherClassCount']);
    Route::get('/teacher/classes', [TeacherPageController::class, 'MyClasses']);
    Route::get('/teacher/students/{Class_id}', [TeacherPageController::class, 'MyStudents']);
    Route::get('/teacher/subjects', [TeacherPageController::class, 'MySubjects']);
    Route::put('/teacher/grades', [TeacherPageController::class, 'StoreGrade']);
    Route::get('/teacher/notes', [TeacherPageController::class, 'MyNotes']);
    Route::get('/teacher/MyStudents', [TeacherPageController::class, 'AllMyStudents']);
});

Route::middleware(['auth:api','is_student'])->group(function() {
    Route::get('/student/classes', [StudentPageController::class, 'MyClasses']);
    Route::get('/student/moyenne',[StudentPageController::class, 'MyAverage']);
    Route::get('/student/subjects', [StudentPageController::class, 'MySubjects']);
    Route::get('/student/notes', [StudentPageController::class, 'MyNotes']);
});


Route::middleware(['auth:api','is_admin_or_teacher'])->apiResource('notes', NoteController::class);


Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:api')->post('/logout', [AuthController::class, 'logout']);
