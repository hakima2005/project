<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bons_commande', function (Blueprint $table) {

            $table->unsignedBigInteger('id_fournisseur_attribue')
                ->nullable()
                ->after('id_statut_bc');

            $table->foreign('id_fournisseur_attribue')
                ->references('id_fournisseur')
                ->on('fournisseurs')
                ->nullOnDelete();

            $table->unsignedInteger('nombre_devis')
                ->nullable()
                ->after('id_fournisseur_attribue');

            $table->string('justificatif_caution')
                ->nullable()
                ->after('nombre_devis');
        });
    }

    public function down(): void
    {
        Schema::table('bons_commande', function (Blueprint $table) {

            $table->dropForeign(['id_fournisseur_attribue']);

            $table->dropColumn([
                'id_fournisseur_attribue',
                'nombre_devis',
                'justificatif_caution',
            ]);
        });
    }
};