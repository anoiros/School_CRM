<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Grade;
use App\Models\Note;
use App\Models\User;

class AdminPageController extends Controller
{
    public function auditLogs()
    {
        $logs = AuditLog::latest()->with('user')->get();

        $data = $logs->map(function($log){
            return [
                'id' => $log->id,
                'user' => $log->user->name ?? '',
                'action' => $log->action ?? '',
                'target_type' => $log->target_type ?? '',
                'target_id' => $log->target_id ?? '',
                'created_at' => $log->created_at->format('Y-m-d H:i:s') ?? '',
            ];
        });

        return response()->json($data);
    }

    public function latestAuditLogs()
    {
        $logs = AuditLog::latest()->with('user')->limit(15)->get();

        $data = $logs->map(function($log){
            return [
                'id' => $log->id,
                'user' => $log->user->name ?? '',
                'action' => $log->action ?? '',
                'target_type' => $log->target_type ?? '',
                'target_id' => $log->target_id ?? '',
                'created_at' => $log->created_at->format('Y-m-d H:i:s') ?? '',
            ];
        });

        return response()->json($data);
    }

    public function StudentGrade($studentId)
    {
        $grades = Grade::where('student_id', $studentId)->with('subject.class.teacher.user')->get();
        $notes = Note::where('student_id', $studentId)->with('teacher.user')->get();

        $dataGrade = $grades->map(function($grade) {
            return [
                'subject' => $grade->subject->name ?? '',
                'teacher' => $grade->subject->class->teacher->user->name ?? '',
                'classe' => $grade->subject->class->name ?? '',
                'section' => $grade->subject->class->section ?? '',
                'grade' => $grade->grade ?? '',
                'statue' => $grade->grade >= 10 ? 'validé' : 'non validé',
            ];
        });

        $dataNote = $notes->map(function($note) {
            return [
                'teacher' => $note->teacher->user->name ?? '',
                'content' => $note->content ?? '',
                'category' => $note->category ?? '',
            ];
        });

        $data = [
            'grades' => $dataGrade,
            'notes' => $dataNote,
        ];

        return response()->json($data);
    }

    public function studentsList()
    {
        $students = User::where('role', 'student')->get();
        $data = $students->map(function($student) {
            return [
                'id' => $student->id,
                'name' => $student->name,
            ];
        });
        return response()->json($data);
    }
}