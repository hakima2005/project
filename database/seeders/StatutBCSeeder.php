<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\StatutBC;

class StatutBCSeeder extends Seeder
{
    public function run(): void
    {
        $statuts = [
            ['nom_fr' => 'Brouillon',             'nom_ar' => 'مسودة',              'couleur' => '#6b7280', 'ordre' => 1],
            ['nom_fr' => 'Annulé',                'nom_ar' => 'ملغى',               'couleur' => '#ef4444', 'ordre' => 2],
            ['nom_fr' => 'Publié',                'nom_ar' => 'منشور',              'couleur' => '#3b82f6', 'ordre' => 3],
            ['nom_fr' => 'En cours d\'exécution', 'nom_ar' => 'قيد التنفيذ',        'couleur' => '#f97316', 'ordre' => 4],
            ['nom_fr' => 'Terminé',               'nom_ar' => 'منتهي',              'couleur' => '#22c55e', 'ordre' => 5],
        ];

        foreach ($statuts as $statut) {
            StatutBC::create($statut);
        }
    }
}
