import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Create({ bon_commande, unites }) {

    const { data, setData, post, processing, errors } = useForm({
        reference_bc: bon_commande.reference_bc,
        designation: '',
        id_unite: '',
        quantite: '',
        prix_unitaire_ht: '',
        tva: 20,
        observation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/designations');
    };

    return (
        <AppLayout title="Ajouter une désignation">

            <div className="max-w-4xl bg-white rounded-xl shadow p-6">

                <h2 className="text-lg font-semibold mb-6">
                    Ajouter une désignation
                </h2>

                <form onSubmit={submit} className="space-y-5">

                    <div>
                        <label className="block mb-1 font-medium">
                            Désignation *
                        </label>

                        <input
                            type="text"
                            value={data.designation}
                            onChange={(e) => setData('designation', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />

                        {errors.designation &&
                            <p className="text-red-500 text-sm">
                                {errors.designation}
                            </p>
                        }
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Unité
                        </label>

                        <select
                            value={data.id_unite}
                            onChange={(e) => setData('id_unite', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">
                                Choisir...
                            </option>

                            {unites.map((u) => (
                                <option
                                    key={u.id_unite}
                                    value={u.id_unite}
                                >
                                    {u.libelle}
                                </option>
                            ))}
                        </select>

                        {errors.id_unite &&
                            <p className="text-red-500 text-sm">
                                {errors.id_unite}
                            </p>
                        }
                    </div>

                    <div className="grid grid-cols-3 gap-4">

                        <div>

                            <label className="block mb-1 font-medium">
                                Quantité *
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                value={data.quantite}
                                onChange={(e) => setData('quantite', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            />

                            {errors.quantite &&
                                <p className="text-red-500 text-sm">
                                    {errors.quantite}
                                </p>
                            }

                        </div>

                        <div>

                            <label className="block mb-1 font-medium">
                                Prix unitaire HT *
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                value={data.prix_unitaire_ht}
                                onChange={(e) => setData('prix_unitaire_ht', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            />

                            {errors.prix_unitaire_ht &&
                                <p className="text-red-500 text-sm">
                                    {errors.prix_unitaire_ht}
                                </p>
                            }

                        </div>

                        <div>

                            <label className="block mb-1 font-medium">
                                TVA %
                            </label>

                            <input
                                type="number"
                                value={data.tva}
                                onChange={(e) => setData('tva', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            />

                            {errors.tva &&
                                <p className="text-red-500 text-sm">
                                    {errors.tva}
                                </p>
                            }

                        </div>

                    </div>

                    <div>

                        <label className="block mb-1 font-medium">
                            Observation
                        </label>

                        <textarea
                            rows="3"
                            value={data.observation}
                            onChange={(e) => setData('observation', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />

                    </div>

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                        >
                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                        </button>

                        <Link
                            href={`/bons-commande/${bon_commande.reference_bc}`}
                            className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400"
                        >
                            Annuler
                        </Link>

                    </div>

                </form>

            </div>

        </AppLayout>
    );
}