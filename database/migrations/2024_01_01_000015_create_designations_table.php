<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('designations', function (Blueprint $table) {
            $table->increments('id_designation');
            $table->integer('num_ordre')->nullable();
            $table->text('designation');
            $table->unsignedInteger('id_unite')->nullable();
            $table->decimal('quantite', 10, 2)->nullable();
            $table->decimal('prix_unitaire_ht', 15, 2)->nullable();
            $table->decimal('montant_ht', 15, 2)->nullable();
            $table->decimal('tva', 5, 2)->nullable();
            $table->decimal('montant_ttc', 15, 2)->nullable();
            $table->text('observation')->nullable();
            $table->string('reference_bc', 50)->nullable();
            $table->foreign('id_unite')->references('id_unite')->on('unites');
            $table->foreign('reference_bc')->references('reference_bc')->on('bons_commande');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('designations'); }
};
