<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('utenti', function (Blueprint $table) {
            $table->id();
            $table->string('nominativo');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('telefono')->nullable();
            $table->string('ruolo')->default('user'); // user, admin, ecc
            $table->enum('stato', ['attivo', 'bloccato'])->default('attivo');
            $table->string('foto')->nullable(); // percorso immagine profilo
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('utenti');
    }
};
