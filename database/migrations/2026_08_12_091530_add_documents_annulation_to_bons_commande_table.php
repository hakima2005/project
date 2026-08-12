<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bons_commande', function (Blueprint $table) {

            $table->string('piece_jointe_fournisseur')
                ->nullable()
                ->after('justificatif_caution');

            $table->string('documents_annulation')
                ->nullable()
                ->after('piece_jointe_fournisseur');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bons_commande', function (Blueprint $table) {

            $table->dropColumn([
                'piece_jointe_fournisseur',
                'documents_annulation',
            ]);

        });
    }
};