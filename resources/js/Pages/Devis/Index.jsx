import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';

export default function DevisIndex({ devis }) {
    const retenir = (id) => {
        if (confirm('Retenir ce devis et rejeter les autres ?')) {
            router.post(`/devis/${id}/retenir`);
        }
    };
    return (
        <AppLayout title="Devis">
            <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-md font-semibold text-gray-700">Liste des devis</h3>
                    <Link href="/devis/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">+ Nouveau devis</Link>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600">
                            <th className="text-left p-3">Référence</th>
                            <th className="text-left p-3">BC</th>
                            <th className="text-left p-3">Fournisseur</th>
                            <th className="text-left p-3">Montant TTC</th>
                            <th className="text-left p-3">Date</th>
                            <th className="text-left p-3">Statut</th>
                            <th className="text-left p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devis?.length > 0 ? devis.map((d) => (
                            <tr key={d.id_devis} className="border-t hover:bg-gray-50">
                                <td className="p-3 font-mono">{d.reference_devis}</td>
                                <td className="p-3 text-blue-600">{d.reference_bc}</td>
                                <td className="p-3">{d.fournisseur?.raison_sociale}</td>
                                <td className="p-3">{Number(d.montant_ttc).toLocaleString()} MAD</td>
                                <td className="p-3">{d.date_devis}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs ${d.statut?.nom_fr === 'retenu' ? 'bg-green-100 text-green-700' : d.statut?.nom_fr === 'rejeté' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {d.statut?.nom_fr || 'reçu'}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-2">
                                    <Link href={`/devis/${d.id_devis}/edit`} className="text-orange-600 hover:underline">Modifier</Link>
                                    <button onClick={() => retenir(d.id_devis)} className="text-green-600 hover:underline">Retenir</button>
                                    <Link href={`/devis/${d.id_devis}`} method="delete" as="button" className="text-red-600 hover:underline"
                                        onClick={(e) => { if (!confirm('Supprimer ?')) e.preventDefault(); }}>Supprimer</Link>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="7" className="p-6 text-center text-gray-400">Aucun devis</td></tr>}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
