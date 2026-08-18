<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. حيدي الـforeign key + العمود من bons_commande أولاً
        Schema::table('bons_commande', function (Blueprint $table) {
            $table->dropForeign(['code_libelle']);
            $table->dropColumn('code_libelle');
        });

        Schema::dropIfExists('libelles');
    }

    public function down(): void
    {
    }
};