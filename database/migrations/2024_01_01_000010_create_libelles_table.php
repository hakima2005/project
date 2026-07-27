<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('libelles', function (Blueprint $table) {
            $table->string('code_libelle', 20)->primary();
            $table->string('intitule_fr', 200);
            $table->string('intitule_ar', 200)->nullable();
            $table->decimal('budget_affecte', 15, 2)->default(0);
            $table->decimal('budget_engage', 15, 2)->default(0);
            $table->decimal('budget_consomme', 15, 2)->default(0);
            $table->decimal('budget_disponible', 15, 2)->default(0);
            $table->unsignedInteger('id_statut')->nullable();
            $table->string('code_nat_prest', 20)->nullable();
            $table->foreign('id_statut')->references('id_statut')->on('statuts');
            $table->foreign('code_nat_prest')->references('code_nat_prest')->on('nature_prestations');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('libelles'); }
};
