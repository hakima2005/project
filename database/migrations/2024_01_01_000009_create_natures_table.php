<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('natures', function (Blueprint $table) {
            $table->string('code_nature', 20)->primary();
            $table->string('nom_fr', 100);
            $table->string('nom_ar', 100)->nullable();
            $table->text('description')->nullable();
            $table->unsignedInteger('id_statut')->nullable();
            $table->string('code_categorie', 20)->nullable();
            $table->foreign('id_statut')->references('id_statut')->on('statuts');
            $table->foreign('code_categorie')->references('code_categorie')->on('categories');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('natures'); }
};
