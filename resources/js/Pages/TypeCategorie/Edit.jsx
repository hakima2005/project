import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Edit({ typeCategorie }) {

    const { data, setData, put, processing, errors } = useForm({
        libelle: typeCategorie.libelle,
        id_statut: typeCategorie.id_statut,
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/type-categories/${typeCategorie.id_type_categorie}`);
    };

    return (
        <AppLayout title="Modifier un type de catégorie">

            <div className="max-w-xl bg-white rounded-xl shadow p-6">

                <form onSubmit={submit} className="space-y-5">

                    <div>
                        <label className="block mb-1 font-medium">
                            Libellé
                        </label>

                        <input
                            type="text"
                            value={data.libelle}
                            onChange={(e) =>
                                setData('libelle', e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        />

                        {errors.libelle && (
                            <p className="text-red-500 text-sm">
                                {errors.libelle}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Statut
                        </label>

                        <select
                            value={data.id_statut}
                            onChange={(e) =>
                                setData('id_statut', Number(e.target.value))
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value={2}>Actif</option>
                            <option value={3}>Inactif</option>
                        </select>

                        {errors.id_statut && (
                            <p className="text-red-500 text-sm">
                                {errors.id_statut}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                            disabled={processing}
                        >
                            Enregistrer
                        </button>

                        <Link
                            href="/type-categories"
                            className="bg-gray-300 px-5 py-2 rounded-lg"
                        >
                            Annuler
                        </Link>

                    </div>

                </form>

            </div>

        </AppLayout>
    );
}