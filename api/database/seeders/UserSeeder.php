<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::create([
            'email' => "superadmin@admin.com",
            'password' => Hash::make('superadmin'),
            'nama' => "Muhammad Izza Alfiansyah",
            'telepon' => '081231921351',
            'alamat' => "Kec. Gumukmas, Kab. Jember 68165, Jatim",
            'role' => '1',
            'status' => '1',
        ]);

        $faker = \Faker\Factory::create('id_ID');

        for ($i = 0; $i < 200; $i++) {
            \App\Models\User::create([
                'email' => $faker->email(),
                'password' => Hash::make('12345678'),
                'nama' => $faker->name(),
                'telepon' => $faker->e164PhoneNumber(),
                'alamat' => $faker->address(),
                'role' => (string) random_int(1, 3),
                'status' => (string) random_int(0, 2),
            ]);
        }
    }
}
