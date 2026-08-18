<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('situations_budgetaires', function (Blueprint $table) {
            $table->id();

            $table->unsignedInteger('id_exercice');

            $table->string('n_compte', 50);

            $table->unsignedBigInteger('id_type_categorie');

            $table->decimal('montant', 15, 2)->default(0);

            $table->decimal('reste_a_payer', 15, 2)->default(0);

            $table->timestamps();

            $table->foreign('id_exercice')
                ->references('id_exercice')
                ->on('exercices')
                ->onDelete('cascade');

            $table->foreign('id_type_categorie')
                ->references('id_type_categorie')
                ->on('type_categories')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('situations_budgetaires');
    }
};