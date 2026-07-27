<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('familles', function (Blueprint $table) {
            $table->string('code_famille', 20)->primary();
            $table->string('nom_fr', 100);
            $table->string('nom_ar', 100)->nullable();
            $table->text('description')->nullable();
            $table->unsignedInteger('id_statut')->nullable();
            
            $table->foreign('id_statut')->references('id_statut')->on('statuts');
            
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('familles'); }
};
