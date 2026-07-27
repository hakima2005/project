<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('unites', function (Blueprint $table) {
            $table->increments('id_unite');
            $table->string('libelle', 50);
            $table->string('symbole', 10)->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('unites'); }
};
