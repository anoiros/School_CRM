<?php

namespace Database\Seeders;

use App\Models\Classe;
use Illuminate\Database\Seeder;
use App\Models\Note;
use App\Models\Student;
use App\Models\Teacher;
use Faker\Factory as Faker;

class NotesTableSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $students = Student::all();

        foreach ($students as $student) {
            $teachers = Teacher::where('id',Classe::where('id',$student->class_id)->pluck('teacher_id'))->get();

            foreach ($teachers as $teacher) {
                Note::create([
                    'student_id' => $student->id,
                    'teacher_id' => $teacher->id,
                    'content' => $faker->sentence(),
                    'category' => $faker->randomElement(['positive', 'negative', 'neutral']),
                ]);
            }
        }
    }
}
