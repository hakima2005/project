<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('libelles', function (Blueprint $table) {

            $table->dropForeign(['code_nature']);
            $table->dropColumn('code_nature');

            $table->string('code_nat_prest', 20)->nullable();

            $table->foreign('code_nat_prest')
                  ->references('code_nat_prest')
                  ->on('nature_prestations');

        });
    }

    public function down(): void
    {
        Schema::table('libelles', function (Blueprint $table) {

            $table->dropForeign(['code_nat_prest']);
            $table->dropColumn('code_nat_prest');

            $table->string('code_nature', 20)->nullable();

            $table->foreign('code_nature')
                  ->references('code_nature')
                  ->on('natures');

        });
    }
};