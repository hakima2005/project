<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('bons_commande', function (Blueprint $table) {
            $table->dropForeign(['id_statut']);
            $table->dropColumn('id_statut');
            $table->unsignedInteger('id_statut_bc')->nullable()->after('observations');
            $table->foreign('id_statut_bc')->references('id_statut_bc')->on('statut_bc');
        });
    }
    public function down(): void {
        Schema::table('bons_commande', function (Blueprint $table) {
            $table->dropForeign(['id_statut_bc']);
            $table->dropColumn('id_statut_bc');
            $table->unsignedInteger('id_statut')->nullable();
            $table->foreign('id_statut')->references('id_statut')->on('statuts');
        });
    }
};
