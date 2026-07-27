import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function Index({ typesMt }) {
    return (
        <AppLayout title="Types de montant">

            <div className="bg-white rounded-xl shadow p-6">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                        Liste des types de montant
                    </h2>

                    <Link
                        href="/type-mts/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        + Ajouter un type
                    </Link>
                </div>

                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Libellé</th>
                            <th className="p-3 text-center">Actif</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {typesMt.map(type => (
                            <tr key={type.id_type_mt} className="border-t">

                                <td className="p-3">
                                    {type.id_type_mt}
                                </td>

                                <td className="p-3">
                                    {type.libelle}
                                </td>

                                <td className="p-3 text-center">
                                    {type.actif ? (
                                        <span className="text-green-600 font-semibold">
                                            Oui
                                        </span>
                                    ) : (
                                        <span className="text-red-600 font-semibold">
                                            Non
                                        </span>
                                    )}
                                </td>

                                <td className="p-3 text-center">
                                    <Link
                                        href={`/type-mts/${type.id_type_mt}/edit`}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Modifier
                                    </Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </AppLayout>
    );
}