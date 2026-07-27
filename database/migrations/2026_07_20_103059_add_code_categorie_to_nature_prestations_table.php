<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('nature_prestations', function (Blueprint $table) {

            $table->string('code_categorie', 20)->nullable();

            $table->foreign('code_categorie')
                  ->references('code_categorie')
                  ->on('categories');

        });
    }

    public function down(): void
    {
        Schema::table('nature_prestations', function (Blueprint $table) {

            $table->dropForeign(['code_categorie']);
            $table->dropColumn('code_categorie');

        });
    }
};