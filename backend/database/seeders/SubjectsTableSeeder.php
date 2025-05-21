<?php

namespace Database\Seeders;

use App\Models\Classe;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectsTableSeeder extends Seeder
{
    public function run(): void
    {

        // On récupère tous les Classes
        $Classes = Classe::all();

        foreach ($Classes as $class) {

            $subjectName = str_replace(' classe', '', $class->name);

            Subject::create([
                'class_id' => $class->id,
                'name' => $subjectName,
            ]);
        }
    }
}
