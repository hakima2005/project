<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('exercice_type_mts', function (Blueprint $table) {
            $table->string('n_compte')->nullable()->after('id_type_categorie');
        });
    }

    public function down(): void
    {
        Schema::table('exercice_type_mts', function (Blueprint $table) {
            $table->dropColumn('n_compte');
        });
    }
};