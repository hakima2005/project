import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function FournisseurIndex({ fournisseurs }) {
    return (
        <AppLayout title="Fournisseurs">
            <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-md font-semibold text-gray-700">Liste des fournisseurs</h3>
                    <Link href="/fournisseurs/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">+ Nouveau fournisseur</Link>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600">
                            <th className="text-left p-3">Raison sociale</th>
                            <th className="text-left p-3">ICE</th>
                            <th className="text-left p-3">Téléphone</th>
                            <th className="text-left p-3">Email</th>
                            <th className="text-left p-3">Statut</th>
                            <th className="text-left p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fournisseurs?.length > 0 ? fournisseurs.map((f) => (
                            <tr key={f.id_fournisseur} className="border-t hover:bg-gray-50">
                                <td className="p-3 font-medium">{f.raison_sociale}</td>
                                <td className="p-3 font-mono">{f.ICE}</td>
                                <td className="p-3">{f.telephone}</td>
                                <td className="p-3">{f.email}</td>
                                <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{f.statut?.nom_fr || 'N/A'}</span></td>
                                <td className="p-3 flex gap-2">
                                    <Link href={`/fournisseurs/${f.id_fournisseur}/edit`} className="text-orange-600 hover:underline">Modifier</Link>
                                    <Link href={`/fournisseurs/${f.id_fournisseur}`} method="delete" as="button" className="text-red-600 hover:underline"
                                        onClick={(e) => { if (!confirm('Supprimer ?')) e.preventDefault(); }}>Supprimer</Link>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="6" className="p-6 text-center text-gray-400">Aucun fournisseur</td></tr>}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
