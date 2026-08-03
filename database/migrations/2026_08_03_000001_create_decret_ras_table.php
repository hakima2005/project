<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('decret_ras', function (Blueprint $table) {
            $table->id();

            $table->date('date');
            $table->string('code_nat_prest', 20);
            $table->decimal('taux', 5, 2);

            $table->timestamps();

            $table->foreign('code_nat_prest')
                ->references('code_nat_prest')
                ->on('nature_prestations')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('decret_ras');
    }
};
