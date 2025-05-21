<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Teacher;
use App\Models\User;
use Faker\Factory as Faker;

class TeachersTableSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // On récupère tous les utilisateurs avec le rôle "teacher"
        $TeacherUsers = User::where('role', 'teacher')->get();

        foreach ($TeacherUsers as $user) {
            Teacher::create([
                'user_id' => $user->id,
                'subject_specialization' => $faker->randomElement(['Mathématiques','Physique','Informatique','Anglais']), // ou un autre sujet
                'hire_date' => $faker->date(),
            ]);
        }
    }
}
