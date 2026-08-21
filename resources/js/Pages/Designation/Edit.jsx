import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { useForm, Link } from '@inertiajs/react';
import { Coins } from 'lucide-react';

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
            <div className="max-w-3xl mx-auto">
                <Card title="Modifier la désignation">

                    <form onSubmit={submit} className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Désignation
                            </label>

                            <input
                                type="text"
                                value={data.designation}
                                onChange={e => setData('designation', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />

                            {errors.designation &&
                                <p className="text-rose-500 text-xs mt-1">
                                    {errors.designation}
                                </p>}
                        </div>

                        <div className="grid grid-cols-3 gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>

                                <input
                                    type="number"
                                    value={data.quantite}
                                    onChange={e => setData('quantite', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Prix HT</label>

                                <input
                                    type="number"
                                    value={data.prix_unitaire_ht}
                                    onChange={e => setData('prix_unitaire_ht', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">TVA %</label>

                                <input
                                    type="number"
                                    value={data.tva}
                                    onChange={e => setData('tva', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-3 gap-4 bg-navy-800 rounded-xl p-4">

                            <div>
                                <p className="text-xs text-navy-200">Montant HT</p>
                                <p className="font-bold text-white">
                                    {montantHT.toFixed(2)} MAD
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-navy-200">TVA</p>
                                <p className="font-bold text-gold-300">
                                    {montantTVA.toFixed(2)} MAD
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-navy-200">Montant TTC</p>
                                <p className="font-bold text-gold-300 flex items-center gap-1">
                                    <Coins size={14} /> {montantTTC.toFixed(2)} MAD
                                </p>
                            </div>

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Observation</label>

                            <textarea
                                value={data.observation}
                                onChange={e => setData('observation', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">

                            <Button type="submit" variant="primary" disabled={processing}>
                                Enregistrer
                            </Button>

                            <Button as={Link} href={`/bons-commande/${designation.reference_bc}`} variant="secondary">
                                Annuler
                            </Button>

                        </div>

                    </form>

                </Card>
            </div>
        </AppLayout>
    );
}