<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminSeeder extends Seeder {
  public function run(): void {
    User::updateOrCreate(
      ['email' => 'admin@example.com'],
      ['name' => 'Admin','password' => Hash::make('secret123'),'role' => 'admin']
    );
    User::updateOrCreate(
      ['email' => 'support@example.com'],
      ['name' => 'Support','password' => Hash::make('secret123'),'role' => 'support']
    );
  }
}
