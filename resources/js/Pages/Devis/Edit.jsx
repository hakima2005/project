import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { useForm, Link } from '@inertiajs/react';

export default function Edit({ devis, bons_commande, fournisseurs }) {

    const { data, setData, put, processing, errors } = useForm({
        reference_bc: devis.reference_bc || '',
        id_fournisseur: devis.id_fournisseur || '',
        reference_devis: devis.reference_devis || '',
        date_devis: devis.date_devis || '',
        montant_ht: devis.montant_ht || '',
        montant_tva: devis.montant_tva || '',
        montant_ttc: devis.montant_ttc || '',
        observation: devis.observation || '',
    });

    const calcTTC = (ht, tva) => {
        const montantHT = parseFloat(ht) || 0;
        const montantTVA = parseFloat(tva) || 0;

        setData({
            ...data,
            montant_ht: ht,
            montant_tva: tva,
            montant_ttc: (montantHT + montantTVA).toFixed(2),
        });
    };

    const submit = (e) => {
        e.preventDefault();
        put(`/devis/${devis.id_devis}`);
    };

    return (
        <AppLayout title="Modifier devis">

            <div className="max-w-3xl">
                <Card title="Modifier le devis">

                    <form onSubmit={submit} className="space-y-4">

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bon de commande</label>

                                <select
                                    value={data.reference_bc}
                                    onChange={e => setData('reference_bc', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                >
                                    {bons_commande.map(bc => (
                                        <option
                                            key={bc.reference_bc}
                                            value={bc.reference_bc}
                                        >
                                            {bc.reference_bc}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fournisseur</label>

                                <select
                                    value={data.id_fournisseur}
                                    onChange={e => setData('id_fournisseur', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                >
                                    {fournisseurs.map(f => (
                                        <option
                                            key={f.id_fournisseur}
                                            value={f.id_fournisseur}
                                        >
                                            {f.raison_sociale}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Référence devis</label>

                                <input
                                    type="text"
                                    value={data.reference_devis}
                                    onChange={e => setData('reference_devis', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date devis</label>

                                <input
                                    type="date"
                                    value={data.date_devis}
                                    onChange={e => setData('date_devis', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-3 gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Montant HT</label>

                                <input
                                    type="number"
                                    value={data.montant_ht}
                                    onChange={e => calcTTC(e.target.value, data.montant_tva)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">TVA</label>

                                <input
                                    type="number"
                                    value={data.montant_tva}
                                    onChange={e => calcTTC(data.montant_ht, e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Montant TTC</label>

                                <input
                                    type="number"
                                    value={data.montant_ttc}
                                    readOnly
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-cream-100 font-semibold text-navy-900"
                                />
                            </div>

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Observation</label>

                            <textarea
                                rows="3"
                                value={data.observation}
                                onChange={e => setData('observation', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">

                            <Button type="submit" variant="primary" disabled={processing}>
                                Mettre à jour
                            </Button>

                            <Button as={Link} href="/devis" variant="secondary">
                                Annuler
                            </Button>

                        </div>

                    </form>

                </Card>
            </div>

        </AppLayout>
    );
}