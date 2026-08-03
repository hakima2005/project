<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exercice_nature_max', function (Blueprint $table) {
            $table->id();

            $table->unsignedInteger('id_exercice');
            $table->string('code_nat_prest', 20);

            $table->decimal('montant_max', 15, 2)->default(0);

            $table->timestamps();

            $table->foreign('id_exercice')
                ->references('id_exercice')
                ->on('exercices')
                ->onDelete('cascade');

            $table->foreign('code_nat_prest')
                ->references('code_nat_prest')
                ->on('nature_prestations')
                ->onDelete('cascade');

            // Un seul montant max par (exercice, nature de prestation)
            $table->unique(['id_exercice', 'code_nat_prest']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exercice_nature_max');
    }
};