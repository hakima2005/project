import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Edit({ designation }) {
    const { data, setData, put, processing, errors } = useForm({
        designation: designation.designation || '',
        quantite: designation.quantite || '',
        prix_unitaire_ht: designation.prix_unitaire_ht || '',
        tva: designation.tva || '',
        observation: designation.observation || '',
    });

    const montantHT =
        (parseFloat(data.quantite) || 0) *
        (parseFloat(data.prix_unitaire_ht) || 0);

    const montantTVA =
        montantHT * ((parseFloat(data.tva) || 0) / 100);

    const montantTTC = montantHT + montantTVA;

    function submit(e) {
        e.preventDefault();

        put(`/designations/${designation.id_designation}`);
    }

    return (
        <AppLayout title="Modifier désignation">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-bold mb-6">
                    Modifier la désignation
                </h2>

                <form onSubmit={submit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Désignation
                        </label>

                        <input
                            type="text"
                            value={data.designation}
                            onChange={e => setData('designation', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />

                        {errors.designation &&
                            <p className="text-red-500 text-sm">
                                {errors.designation}
                            </p>}
                    </div>

                    <div className="grid grid-cols-3 gap-4">

                        <div>
                            <label>Quantité</label>

                            <input
                                type="number"
                                value={data.quantite}
                                onChange={e => setData('quantite', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label>Prix HT</label>

                            <input
                                type="number"
                                value={data.prix_unitaire_ht}
                                onChange={e => setData('prix_unitaire_ht', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label>TVA %</label>

                            <input
                                type="number"
                                value={data.tva}
                                onChange={e => setData('tva', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">

                        <div>
                            <p className="text-sm text-gray-500">Montant HT</p>
                            <p className="font-bold">
                                {montantHT.toFixed(2)} MAD
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">TVA</p>
                            <p className="font-bold text-orange-600">
                                {montantTVA.toFixed(2)} MAD
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Montant TTC</p>
                            <p className="font-bold text-blue-700">
                                {montantTTC.toFixed(2)} MAD
                            </p>
                        </div>

                    </div>

                    <div>
                        <label>Observation</label>

                        <textarea
                            value={data.observation}
                            onChange={e => setData('observation', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            Enregistrer
                        </button>

                        <Link
                            href={`/bons-commande/${designation.reference_bc}`}
                            className="bg-gray-200 px-5 py-2 rounded-lg"
                        >
                            Annuler
                        </Link>

                    </div>

                </form>

            </div>
        </AppLayout>
    );
}