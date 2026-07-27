<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('devis', function (Blueprint $table) {
            $table->increments('id_devis');
            $table->string('reference_devis', 100)->nullable();
            $table->date('date_devis')->nullable();
            $table->decimal('montant_ht', 15, 2)->nullable();
            $table->decimal('montant_tva', 15, 2)->nullable();
            $table->decimal('montant_ttc', 15, 2)->nullable();
            $table->decimal('montant_retenue', 15, 2)->nullable();
            $table->string('piece_jointe', 255)->nullable();
            $table->unsignedInteger('id_statut')->nullable();
            $table->text('observation')->nullable();
            $table->string('reference_bc', 50)->nullable();
            $table->unsignedInteger('id_fournisseur')->nullable();
            $table->foreign('id_statut')->references('id_statut')->on('statuts');
            $table->foreign('reference_bc')->references('reference_bc')->on('bons_commande');
            $table->foreign('id_fournisseur')->references('id_fournisseur')->on('fournisseurs');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('devis'); }
};
