import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
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

            <div className="max-w-4xl">
                <Card title="Ajouter une désignation">

                    <form onSubmit={submit} className="space-y-5">

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Désignation *
                            </label>

                            <input
                                type="text"
                                value={data.designation}
                                onChange={(e) => setData('designation', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />

                            {errors.designation &&
                                <p className="text-rose-500 text-xs mt-1">
                                    {errors.designation}
                                </p>
                            }
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Unité
                            </label>

                            <select
                                value={data.id_unite}
                                onChange={(e) => setData('id_unite', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
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
                                <p className="text-rose-500 text-xs mt-1">
                                    {errors.id_unite}
                                </p>
                            }
                        </div>

                        <div className="grid grid-cols-3 gap-4">

                            <div>

                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Quantité *
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.quantite}
                                    onChange={(e) => setData('quantite', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />

                                {errors.quantite &&
                                    <p className="text-rose-500 text-xs mt-1">
                                        {errors.quantite}
                                    </p>
                                }

                            </div>

                            <div>

                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Prix unitaire HT *
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.prix_unitaire_ht}
                                    onChange={(e) => setData('prix_unitaire_ht', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />

                                {errors.prix_unitaire_ht &&
                                    <p className="text-rose-500 text-xs mt-1">
                                        {errors.prix_unitaire_ht}
                                    </p>
                                }

                            </div>

                            <div>

                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    TVA %
                                </label>

                                <input
                                    type="number"
                                    value={data.tva}
                                    onChange={(e) => setData('tva', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />

                                {errors.tva &&
                                    <p className="text-rose-500 text-xs mt-1">
                                        {errors.tva}
                                    </p>
                                }

                            </div>

                        </div>

                        <div>

                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Observation
                            </label>

                            <textarea
                                rows="3"
                                value={data.observation}
                                onChange={(e) => setData('observation', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />

                        </div>

                        <div className="flex gap-3 pt-2">

                            <Button type="submit" variant="primary" disabled={processing}>
                                {processing ? 'Enregistrement...' : 'Enregistrer'}
                            </Button>

                            <Button as={Link} href={`/bons-commande/${bon_commande.reference_bc}`} variant="secondary">
                                Annuler
                            </Button>

                        </div>

                    </form>

                </Card>
            </div>

        </AppLayout>
    );
}