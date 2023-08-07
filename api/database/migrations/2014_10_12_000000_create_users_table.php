<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('telepon');
            $table->text('alamat')->nullable();
            $table->enum('role', ['1', '2', '3'])->comment('1: admin, 2: petugas, 3: korban')->default('3');
            $table->enum('status', ['0', '1', '2'])->comment('0: pending, 1: terverifikasi, 2: tertolak')->default('0');
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
