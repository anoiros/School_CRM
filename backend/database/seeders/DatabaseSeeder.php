<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            UsersTableSeeder::class,
            TeachersTableSeeder::class,
            ClassesTableSeeder::class,
            StudentsTableSeeder::class,
            SubjectsTableSeeder::class,
            GradesTableSeeder::class,
            NotesTableSeeder::class,
        ]);
    }
}
