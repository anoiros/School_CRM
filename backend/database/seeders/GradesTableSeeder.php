<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Grade;
use Faker\Factory as Faker;

class GradesTableSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $students = Student::all();

        foreach ($students as $student) {
            $subjects = Subject::where('class_id', $student->class_id)->get();
            foreach ($subjects as $subject) {
                Grade::create([
                    'student_id' => $student->id,
                    'subject_id' => $subject->id,
                    'grade' => $faker->randomFloat(2, 0, 20),
                ]);
            }
        }
    }
}
