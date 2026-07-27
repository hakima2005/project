use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class {
    public function up(): void
    {
        Schema::create('nature_prestations', function (Blueprint $table) {

            $table->string('code_nat_prest',20)->primary();

            $table->string('intitule_fr',100);

            $table->string('intitule_ar',100)->nullable();

            $table->text('description')->nullable();

            // العلاقة الجديدة
            $table->string('code_categorie',20);

            $table->foreign('code_categorie')
                  ->references('code_categorie')
                  ->on('categories');

            $table->unsignedInteger('id_statut')->nullable();

            $table->foreign('id_statut')
                  ->references('id_statut')
                  ->on('statuts');

            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nature_prestations');
    }
};