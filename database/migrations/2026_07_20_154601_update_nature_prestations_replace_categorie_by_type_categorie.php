<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('nature_prestations', function (Blueprint $table) {

            // حذف العلاقة القديمة
            $table->dropForeign(['code_categorie']);
            $table->dropColumn('code_categorie');

            // العلاقة الجديدة
            $table->unsignedBigInteger('id_type_categorie')->after('description');

            $table->foreign('id_type_categorie')
                ->references('id_type_categorie')
                ->on('type_categories');
        });
    }

    public function down(): void
    {
        Schema::table('nature_prestations', function (Blueprint $table) {

            $table->dropForeign(['id_type_categorie']);
            $table->dropColumn('id_type_categorie');

            $table->string('code_categorie',20)->nullable();

            $table->foreign('code_categorie')
                ->references('code_categorie')
                ->on('categories');
        });
    }
};