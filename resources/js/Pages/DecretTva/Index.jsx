import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';

export default function Index({ decrets }) {
    const handleDelete = (id) => {
        if (confirm('Supprimer ce décret ?')) {
            router.delete(`/decret-tva/${id}`);
        }
    };

    return (
        <AppLayout title="décrets TVA">
            <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-700">Liste des décrets TVA</h3>
                    <Link href="/decret-tva/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                        + Ajouter
                    </Link>
                </div>

                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Nature de prestation</th>
                            <th className="p-3 text-right">Taux %</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {decrets?.length > 0 ? decrets.map((d) => (
                            <tr key={d.id} className="border-t">
                                <td className="p-3">{d.date}</td>
                                <td className="p-3">{d.nature_prestation?.intitule_fr}</td>
                                <td className="p-3 text-right">{d.taux} %</td>
                                <td className="p-3 text-right space-x-2">
                                    <Link href={`/decret-tva/${d.id}/edit`} className="text-orange-600 hover:underline">Modifier</Link>
                                    <button onClick={() => handleDelete(d.id)} className="text-red-600 hover:underline">Supprimer</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="4" className="p-6 text-center text-gray-400">Aucun décret</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
