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
        Schema::create('kondisi_air', function (Blueprint $table) {
            $table->id();
            $table->string('perangkat_id');
            $table->float('ketinggian');
            $table->enum('status', [1, 2, 3])->comment('1: aman, 2: siaga, 3: bahaya');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kondisi_air');
    }
};
