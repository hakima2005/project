<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exercice_type_mts', function (Blueprint $table) {
            $table->id();

            $table->unsignedInteger('id_exercice');
            $table->unsignedInteger('id_type_mt');

            $table->decimal('montant', 15, 2);

            $table->timestamps();

            $table->foreign('id_exercice')
                ->references('id_exercice')
                ->on('exercices')
                ->onDelete('cascade');

            $table->foreign('id_type_mt')
                ->references('id_type_mt')
                ->on('type_mts')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exercice_type_mts');
    }
};