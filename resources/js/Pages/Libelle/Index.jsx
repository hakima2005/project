import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function LibelleIndex({ libelles }) {
    return (
        <AppLayout title="Libellés budgétaires">
            <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-md font-semibold text-gray-700">Liste des libellés</h3>
                    <Link href="/libelles/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">+ Nouveau libellé</Link>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600">
                            <th className="text-left p-3">Code</th>
                            <th className="text-left p-3">Intitulé</th>
                            <th className="text-left p-3">Nature de la prestation</th>
                            <th className="text-left p-3">Affecté</th>
                            <th className="text-left p-3">Engagé</th>
                            <th className="text-left p-3">Disponible</th>
                            <th className="text-left p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {libelles?.length > 0 ? libelles.map((l) => (
                            <tr key={l.code_libelle} className="border-t hover:bg-gray-50">
                                <td className="p-3 font-mono text-blue-600">{l.code_libelle}</td>
                                <td className="p-3">{l.intitule_fr}</td>
                                <td className="p-3">{l.naturePrestation?.intitule_fr}</td>
                                <td className="p-3">{Number(l.budget_affecte).toLocaleString()} MAD</td>
                                <td className="p-3">{Number(l.budget_engage).toLocaleString()} MAD</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${l.budget_disponible > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {Number(l.budget_disponible).toLocaleString()} MAD
                                    </span>
                                </td>
                                <td className="p-3 flex gap-2">
                                    <Link href={`/libelles/${l.code_libelle}/edit`} className="text-orange-600 hover:underline">Modifier</Link>
                                    <Link href={`/libelles/${l.code_libelle}`} method="delete" as="button" className="text-red-600 hover:underline"
                                        onClick={(e) => { if (!confirm('Supprimer ?')) e.preventDefault(); }}>Supprimer</Link>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="7" className="p-6 text-center text-gray-400">Aucun libellé</td></tr>}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
