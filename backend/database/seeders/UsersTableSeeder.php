<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {

        $faker = Faker::create();
        // Admin
        User::create([
            'name' => 'Admin',
            'email' => 'admin@classnet.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        for($i=0; $i<5; $i++){
            User::create([
                'name' => 'Student ' . $faker->name(),
                'email' => $faker->unique()->safeEmail(),
                'password' => Hash::make('password'),
                'role' => 'student',
            ]);
        }

        for($i=0; $i<5; $i++){
            User::create([
                'name' => 'Teacher ' . $faker->name(),
                'email' => $faker->unique()->safeEmail(),
                'password' => Hash::make('password'),
                'role' => 'teacher',
            ]);
        }
    }
}
