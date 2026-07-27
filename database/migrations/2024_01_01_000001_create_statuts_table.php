<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('statuts', function (Blueprint $table) {
            $table->increments('id_statut');
            $table->string('nom_fr', 50);
            $table->string('nom_ar', 50)->nullable();
            $table->string('couleur', 10)->nullable();
            $table->integer('ordre')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('statuts'); }
};
