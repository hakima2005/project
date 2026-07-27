<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('categories', function (Blueprint $table) {
            $table->string('code_categorie', 20)->primary();
            $table->string('nom_fr', 100);
            $table->string('nom_ar', 100)->nullable();
            $table->string('type_budget', 20);
            $table->decimal('montant_affecte', 15, 2)->default(0);
            $table->unsignedInteger('id_tva')->nullable();
            $table->unsignedInteger('id_statut')->nullable();
            $table->string('code_famille', 20)->nullable();
            $table->foreign('id_tva')->references('id_tva')->on('tvas');
            $table->foreign('id_statut')->references('id_statut')->on('statuts');
            $table->foreign('code_famille')->references('code_famille')->on('familles');
            $table->unsignedInteger('id_exercice')->nullable();
            $table->foreign('id_exercice')->references('id_exercice')->on('exercices');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('categories'); }
};
