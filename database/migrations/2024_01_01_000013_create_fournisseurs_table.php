<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('fournisseurs', function (Blueprint $table) {
            $table->increments('id_fournisseur');
            $table->string('raison_sociale', 200);
            $table->string('identifiant_fiscal', 50)->nullable();
            $table->string('ICE', 15)->nullable()->unique();
            $table->string('RC', 50)->nullable();
            $table->string('CNSS', 50)->nullable();
            $table->unsignedInteger('id_adresse')->nullable();
            $table->string('telephone', 20)->nullable();
            $table->string('email', 100)->nullable();
            $table->string('representation', 150)->nullable();
            $table->string('activite_principale', 200)->nullable();
            $table->unsignedInteger('id_statut')->nullable();
            $table->foreign('id_adresse')->references('id_adresse')->on('adresses');
            $table->foreign('id_statut')->references('id_statut')->on('statuts');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('fournisseurs'); }
};
