<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->increments('id_utilisateur');
            $table->string('nom', 100);
            $table->string('prenom', 100)->nullable();
            $table->string('login', 50)->unique();
            $table->string('mot_de_passe', 255);
            $table->unsignedInteger('id_profil')->nullable();
            $table->unsignedInteger('id_statut')->nullable();
            $table->foreign('id_profil')->references('id_profil')->on('profils');
            $table->foreign('id_statut')->references('id_statut')->on('statuts');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('utilisateurs'); }
};
