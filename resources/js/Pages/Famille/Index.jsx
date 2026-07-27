import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function FamilleIndex({ familles }) {
    return (
        <AppLayout title="Familles budgétaires">
            <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-md font-semibold text-gray-700">Liste des familles</h3>
                    <Link href="/familles/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                        + Nouvelle famille
                    </Link>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600">
                            <th className="text-left p-3">Code</th>
                            <th className="text-left p-3">Nom FR</th>
                            <th className="text-left p-3">Nom AR</th>
                            <th className="text-left p-3">Statut</th>
                            <th className="text-left p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {familles?.length > 0 ? familles.map((f) => (
                            <tr key={f.code_famille} className="border-t hover:bg-gray-50">
                                <td className="p-3 font-mono text-blue-600">{f.code_famille}</td>
                                <td className="p-3">{f.nom_fr}</td>
                                <td className="p-3">{f.nom_ar}</td>
                                <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{f.statut?.nom_fr || 'N/A'}</span></td>
                                <td className="p-3 flex gap-2">
                                    <Link href={`/familles/${f.code_famille}/edit`} className="text-orange-600 hover:underline">Modifier</Link>
                                    <Link href={`/familles/${f.code_famille}`} method="delete" as="button"
                                        className="text-red-600 hover:underline"
                                        onClick={(e) => { if (!confirm('Supprimer ?')) e.preventDefault(); }}>
                                        Supprimer
                                    </Link>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5" className="p-6 text-center text-gray-400">Aucune famille trouvée</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
