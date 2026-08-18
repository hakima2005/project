<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('code_nat_prest', 50)
                ->nullable()
                ->after('code_categorie');

            $table->foreign('code_nat_prest')
                ->references('code_nat_prest')
                ->on('nature_prestations')
                ->onDelete('set null');

            $table->unique([
                'id_exercice',
                'code_nat_prest',
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropForeign([
                'code_nat_prest',
            ]);

            $table->dropUnique([
                'categories_id_exercice_code_nat_prest_unique',
            ]);

            $table->dropColumn('code_nat_prest');
        });
    }
};