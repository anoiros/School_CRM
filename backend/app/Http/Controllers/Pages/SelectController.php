<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Teacher;
use App\Models\Classe;
use Illuminate\Http\JsonResponse;



class SelectController extends Controller
{
    public function userTeachers() : JsonResponse
    {
        $user = User::where('role', 'teacher')->get();

        $box = $user->map(function($user){
            return [
                "id" => $user->id,
                "value" => $user->name ?? '',
            ];
        });
        return response()->json($box);
    }

    public function teachers() : JsonResponse
    {
        $teacher = Teacher::with(['user'])->get();

        $box = $teacher->map(function($teacher){
            return[
                "id" => $teacher->id,
                "value" => 'Nom : ' . ($teacher->user->name ?? '') . ' | Spécialité : ' . ($teacher->subject_specialization ?? ''),
            ];
        });
        return response()->json($box);
    }

    public function classes() : JsonResponse
    {
        $classe = Classe::all();

        $box = $classe->map(function($classe){
            return[
                "id" => $classe->id,
                "value" => 'Nom : ' . ($classe->name ?? '') . ' | section : ' . ($classe->section ?? ''),
            ];
        });

        return response()->json($box);
    }

    public function userStudents() : JsonResponse
    {
        $user = User::where('role', 'student')->get();

        $box = $user->map(function($user){
            return [
                "id" => $user->id,
                "value" => $user->name ?? '',
            ];
        });
        return response()->json($box);
    }
}