import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function Index({ typesCategories }) {
    return (
        <AppLayout title="Types de catégorie">

            <div className="bg-white rounded-xl shadow p-6">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                        Liste des types de catégorie
                    </h2>

                    <Link
                        href="/type-categories/create"
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
                            <th className="p-3 text-center">Statut</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {typesCategories.map(type => (
                            <tr key={type.id_type_categorie} className="border-t">

                                <td className="p-3">
                                    {type.id_type_categorie}
                                </td>

                                <td className="p-3">
                                    {type.libelle}
                                </td>

                                <td className="p-3 text-center">
                                    {type.id_statut === 1 ? (
                                        <span className="text-green-600 font-semibold">
                                            Actif
                                        </span>
                                    ) : (
                                        <span className="text-red-600 font-semibold">
                                            Inactif
                                        </span>
                                    )}
                                </td>

                                <td className="p-3 text-center">
                                    <Link
                                        href={`/type-categories/${type.id_type_categorie}/edit`}
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