<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bons_commande', function (Blueprint $table) {

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
            $table->dropColumn([
                'nombre_devis',
                'justificatif_caution',
            ]);
        });
    }
};