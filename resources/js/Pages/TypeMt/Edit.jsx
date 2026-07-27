import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Edit({ typeMt }) {

    const { data, setData, put, processing, errors } = useForm({
        libelle: typeMt.libelle,
        actif: typeMt.actif,
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/type-mts/${typeMt.id_type_mt}`);
    };

    return (
        <AppLayout title="Modifier un type de montant">

            <div className="max-w-xl bg-white rounded-xl shadow p-6">

                <form onSubmit={submit} className="space-y-5">

                    <div>
                        <label className="block mb-1 font-medium">
                            Libellé
                        </label>

                        <input
                            type="text"
                            value={data.libelle}
                            onChange={e => setData('libelle', e.target.value)}
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
                            value={data.actif ? 1 : 0}
                            onChange={e => setData('actif', Number(e.target.value))}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value={1}>Actif</option>
                            <option value={0}>Inactif</option>
                        </select>
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
                            href="/type-mts"
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