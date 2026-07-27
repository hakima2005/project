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
        Schema::create('type_categories', function (Blueprint $table) {

            $table->id('id_type_categorie');

            $table->string('libelle', 100);

            $table->unsignedInteger('id_statut')->nullable();

            $table->foreign('id_statut')
                  ->references('id_statut')
                  ->on('statuts');

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('type_categories');
    }
};