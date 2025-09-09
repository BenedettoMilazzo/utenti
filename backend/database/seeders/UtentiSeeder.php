<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UtentiSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        for ($i = 1; $i <= 100; $i++) {
            DB::table('utenti')->insert([
                'nominativo' => $faker->name(),
                'email'      => $faker->unique()->safeEmail(),
                'password'   => Hash::make('password123'), // password di default
                'telefono'   => $faker->phoneNumber(),
                'ruolo'      => $faker->randomElement(['user', 'admin']),
                'stato'      => 'attivo'
            ]);
        }
    }
}
