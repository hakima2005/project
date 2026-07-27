<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('type_actions', function (Blueprint $table) {
            $table->increments('id_action');
            $table->string('libelle', 100);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('type_actions'); }
};
