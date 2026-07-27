<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('participes', function (Blueprint $table) {
            $table->string('reference_bc', 50);
            $table->unsignedInteger('id_fournisseur');
            $table->primary(['reference_bc', 'id_fournisseur']);
            $table->foreign('reference_bc')->references('reference_bc')->on('bons_commande');
            $table->foreign('id_fournisseur')->references('id_fournisseur')->on('fournisseurs');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('participes'); }
};
