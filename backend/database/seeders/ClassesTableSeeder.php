<?php

namespace Database\Seeders;

use App\Models\Classe;
use App\Models\Teacher;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ClassesTableSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // On récupère tous les Teachers
        $TeacherUsers = Teacher::all();

        foreach ($TeacherUsers as $teacher) {
            Classe::create([
                'teacher_id' => $teacher->id,
                'name' => $teacher->subject_specialization.' classe', // ou un autre sujet
                'section' => $faker->randomElement(['Classe A', 'Classe B', 'Classe C'])
            ]);
        }
    }
}
