<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Classe;
use App\Models\Student;
use App\Models\User;
use Faker\Factory as Faker;

class StudentsTableSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        // On récupère tous les utilisateurs avec le rôle "student"
        $studentUsers = User::where('role', 'student')->get();
        $Classes = Classe::all();

        foreach ($studentUsers as $user) {
            foreach ($Classes as $classe) {
                Student::create([
                    'user_id' => $user->id,
                    'class_id' => $classe->id,
                    'date_of_birth' => $faker->dateTimeBetween('-20 years', '-10 years')->format('Y-m-d'),
                    'gender' => rand(0, 1) ? 'Homme' : 'Femme',
                    'enrollment_date' => now()->subYears(1)->format('Y-m-d'),
                ]);
            }
        }
    }
}
