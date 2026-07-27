import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function BonCommandeIndex({ bons_commande }) {
    const statutColors = {
        'Brouillon':             'bg-gray-100 text-gray-700',
        'Annulé':                'bg-red-100 text-red-700',
        'Publié':                'bg-blue-100 text-blue-700',
        'En cours d\'exécution': 'bg-orange-100 text-orange-700',
        'Terminé':               'bg-green-100 text-green-700',
    };

    return (
        <AppLayout title="Bons de commande">
            <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-md font-semibold text-gray-700">Liste des bons de commande</h3>
                    <Link href="/bons-commande/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                        + Nouveau BC
                    </Link>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600">
                            <th className="text-left p-3">Référence</th>
                            <th className="text-left p-3">Objet</th>
                            <th className="text-left p-3">Exercice</th>
                            <th className="text-left p-3">Montant</th>
                            <th className="text-left p-3">Date mise en ligne</th>
                            <th className="text-left p-3">Date limite</th>
                            <th className="text-left p-3">Statut</th>
                            <th className="text-left p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bons_commande?.length > 0 ? bons_commande.map((bc) => (
                            <tr key={bc.reference_bc} className="border-t hover:bg-gray-50">
                                <td className="p-3 font-mono text-blue-600">{bc.reference_bc}</td>
                                <td className="p-3 max-w-xs truncate">{bc.objet}</td>
                                <td className="p-3">{bc.exercice?.annee}</td>
                                <td className="p-3 font-medium">{Number(bc.montant_estimatif).toLocaleString()} MAD</td>
                                <td className="p-3">{bc.date_mise_en_ligne || '—'}</td>
                                <td className="p-3">{bc.date_limite_devis || '—'}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${statutColors[bc.statut_b_c?.nom_fr] || 'bg-gray-100 text-gray-600'}`}>
                                        {bc.statut_b_c?.nom_fr || 'N/A'}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-2">
                                    <Link href={`/bons-commande/${bc.reference_bc}`} className="text-blue-600 hover:underline">Voir</Link>
                                    <Link href={`/bons-commande/${bc.reference_bc}/edit`} className="text-orange-600 hover:underline">Modifier</Link>
                                    <Link href={`/bons-commande/${bc.reference_bc}`} method="delete" as="button"
                                        className="text-red-600 hover:underline"
                                        onClick={(e) => { if (!confirm('Supprimer ?')) e.preventDefault(); }}>
                                        Supprimer
                                    </Link>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="8" className="p-6 text-center text-gray-400">Aucun bon de commande</td></tr>}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
