<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exercices', function (Blueprint $table) {

            $table->increments('id_exercice');

            $table->integer('annee')->unique();

            // Date de visée
            $table->date('date_visee')->nullable();

            // Statut
            $table->unsignedInteger('id_statut')->nullable();

            // Observations
            $table->text('observations')->nullable();

            $table->foreign('id_statut')
                  ->references('id_statut')
                  ->on('statuts');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exercices');
    }
};