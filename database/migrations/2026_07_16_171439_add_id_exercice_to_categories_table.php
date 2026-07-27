<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {

            $table->unsignedInteger('id_exercice')->nullable()->after('code_famille');

            $table->foreign('id_exercice')
                  ->references('id_exercice')
                  ->on('exercices');

        });
    }

    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {

            $table->dropForeign(['id_exercice']);
            $table->dropColumn('id_exercice');

        });
    }
};