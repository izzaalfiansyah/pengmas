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
            'alamat' => "Jember",
            'role' => '1',
            'status' => '1',
        ]);
    }
}
