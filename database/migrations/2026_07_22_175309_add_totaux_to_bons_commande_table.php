<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bons_commande', function (Blueprint $table) {

            $table->decimal('montant_ht', 15, 2)
                  ->default(0)
                  ->after('montant_estimatif');

            $table->decimal('montant_tva', 15, 2)
                  ->default(0)
                  ->after('montant_ht');

        });
    }

    public function down(): void
    {
        Schema::table('bons_commande', function (Blueprint $table) {

            $table->dropColumn([
                'montant_ht',
                'montant_tva',
            ]);

        });
    }
};