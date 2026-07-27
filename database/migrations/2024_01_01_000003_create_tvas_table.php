<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('tvas', function (Blueprint $table) {
            $table->increments('id_tva');
            $table->string('montant_tva', 20)->nullable();
            $table->decimal('pourcentage', 5, 2);
            $table->date('date_debut')->nullable();
            $table->date('date_fin')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('tvas'); }
};
