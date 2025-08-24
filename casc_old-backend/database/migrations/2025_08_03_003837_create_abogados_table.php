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
        Schema::create('abogados', function (Blueprint $table) {
            $table->id();

            // Relación con tabla users
            $table->foreignId('user_id') // Sintaxis más corta
                  ->constrained('users')
                  ->onDelete('cascade');

            $table->string('numero_colegiatura')->unique();
            $table->string('dni')->unique();
            $table->string('nombres');
            $table->string('apellidos');
            $table->string('especialidad');
            $table->string('email')->unique();
            $table->timestamp('habilitado_hasta');
            $table->boolean('activo')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abogados');
    }
};
