<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('bons_commande', function (Blueprint $table) {
            $table->string('reference_bc', 50)->primary();
            $table->text('objet');
            $table->date('date_creation')->nullable();
            $table->date('date_mise_en_ligne')->nullable();
            $table->date('date_limite_devis')->nullable();
            $table->unsignedInteger('id_statut')->nullable();
            $table->text('observations')->nullable();
            $table->unsignedInteger('id_exercice')->nullable();
            $table->string('code_libelle', 20)->nullable();
            $table->string('code_nat_prest', 20)->nullable();
            $table->decimal('montant_estimatif', 15, 2)->nullable();
            $table->decimal('tva_applicable', 5, 2)->nullable();
            $table->decimal('retenue_applicable', 5, 2)->nullable();
            $table->decimal('montant_ttc', 15, 2)->nullable();
            $table->foreign('id_statut')->references('id_statut')->on('statuts');
            $table->foreign('id_exercice')->references('id_exercice')->on('exercices');
            $table->foreign('code_libelle')->references('code_libelle')->on('libelles');
            $table->foreign('code_nat_prest')->references('code_nat_prest')->on('nature_prestations');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('bons_commande'); }
};
