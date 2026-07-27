import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function DevisCreate({ bons_commande, fournisseurs }) {
    const { data, setData, post, processing, errors } = useForm({
        reference_bc: '',
        id_fournisseur: '',
        reference_devis: '',
        date_devis: '',
        montant_ht: '',
        montant_tva: '',
        montant_ttc: '',
        montant_retenue: '',
        observation: '',
    });

    const calcTTC = (ht, tva) => {
        const montantHT = parseFloat(ht) || 0;
        const montantTVA = parseFloat(tva) || 0;

        setData('montant_ht', ht);
        setData('montant_tva', tva);
        setData('montant_ttc', (montantHT + montantTVA).toFixed(2));
    };

    return (
        <AppLayout title="Nouveau devis">
            <div className="max-w-2xl bg-white rounded-xl shadow p-6">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        post(route('devis.store'));
                    }}
                    className="space-y-4"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Bon de commande *</label>
                            <select
                                value={data.reference_bc}
                                onChange={(e) => setData('reference_bc', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option value="">-- Choisir --</option>
                                {bons_commande?.map((bc) => (
                                    <option key={bc.reference_bc} value={bc.reference_bc}>
                                        {bc.reference_bc} — {bc.objet}
                                    </option>
                                ))}
                            </select>
                            {errors.reference_bc && <p className="text-red-500 text-xs">{errors.reference_bc}</p>}
                        </div>

                        <div>
                            <label>Fournisseur *</label>
                            <select
                                value={data.id_fournisseur}
                                onChange={(e) => setData('id_fournisseur', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option value="">-- Choisir --</option>
                                {fournisseurs?.map((f) => (
                                    <option key={f.id_fournisseur} value={f.id_fournisseur}>
                                        {f.raison_sociale}
                                    </option>
                                ))}
                            </select>
                            {errors.id_fournisseur && <p className="text-red-500 text-xs">{errors.id_fournisseur}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Référence devis"
                            value={data.reference_devis}
                            onChange={(e) => setData('reference_devis', e.target.value)}
                            className="border rounded-lg px-3 py-2"
                        />

                        <input
                            type="date"
                            value={data.date_devis}
                            onChange={(e) => setData('date_devis', e.target.value)}
                            className="border rounded-lg px-3 py-2"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <input
                            type="number"
                            placeholder="Montant HT"
                            value={data.montant_ht}
                            onChange={(e) => calcTTC(e.target.value, data.montant_tva)}
                            className="border rounded-lg px-3 py-2"
                        />

                        <input
                            type="number"
                            placeholder="TVA"
                            value={data.montant_tva}
                            onChange={(e) => calcTTC(data.montant_ht, e.target.value)}
                            className="border rounded-lg px-3 py-2"
                        />

                        <input
                            type="number"
                            value={data.montant_ttc}
                            readOnly
                            className="border rounded-lg px-3 py-2 bg-gray-100"
                        />
                    </div>

                    <textarea
                        rows="3"
                        placeholder="Observation"
                        value={data.observation}
                        onChange={(e) => setData('observation', e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            Enregistrer
                        </button>

                        <Link
                            href={route('devis.index')}
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