<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(5)->create();

        User::firstOrCreate(
            ['email' => 'tin@example.com'],
            [
                'name' => 'Tintin',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
    }
}
