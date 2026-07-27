<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('journals', function (Blueprint $table) {
            $table->increments('id_journal');
            $table->timestamp('date_heure')->useCurrent();
            $table->unsignedInteger('id_action')->nullable();
            $table->text('ancienne_valeur')->nullable();
            $table->text('nouvelle_valeur')->nullable();
            $table->string('adresse_ip', 45)->nullable();
            $table->unsignedInteger('id_utilisateur')->nullable();
            $table->foreign('id_action')->references('id_action')->on('type_actions');
            $table->foreign('id_utilisateur')->references('id_utilisateur')->on('utilisateurs');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('journals'); }
};
