<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bons_commande', function (Blueprint $table) {
            $table->boolean('garanti')->default(false)->after('id_statut_bc');
            $table->text('motif_annulation')->nullable()->after('garanti');
            $table->boolean('caution_restituee')->nullable()->after('motif_annulation');
            $table->date('date_annulation')->nullable()->after('caution_restituee');
        });
    }

    public function down(): void
    {
        Schema::table('bons_commande', function (Blueprint $table) {
            $table->dropColumn([
                'garanti',
                'motif_annulation',
                'caution_restituee',
                'date_annulation',
            ]);
        });
    }
};
