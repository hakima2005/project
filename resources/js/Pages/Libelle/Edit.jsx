import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function LibelleEdit({ libelle, naturesPrestation }) {
    const { data, setData, put, processing, errors } = useForm({
        intitule_fr: libelle.intitule_fr, intitule_ar: libelle.intitule_ar || '',
        budget_affecte: libelle.budget_affecte, code_nat_prest: libelle.code_nat_prest,
    });
    return (
        <AppLayout title="Modifier libellé">
            <div className="max-w-2xl bg-white rounded-xl shadow p-6">
                <form onSubmit={(e) => { e.preventDefault(); put(`/libelles/${libelle.code_libelle}`); }} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                        <input value={libelle.code_libelle} disabled className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-100"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nature de la prestation</label>
                        <select value={data.code_nat_prest} onChange={e => setData('code_nat_prest', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                                <option value="">-- Choisir une nature de prestation --</option>
                            {naturesPrestation?.map(n => <option key={n.code_nat_prest} value={n.code_nat_prest}>{n.intitule_fr}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Intitulé FR *</label>
                        <input type="text" value={data.intitule_fr} onChange={e => setData('intitule_fr', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Budget affecté</label>
                        <input type="number" value={data.budget_affecte} onChange={e => setData('budget_affecte', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
                            {processing ? 'Enregistrement...' : 'Mettre à jour'}
                        </button>
                        <Link href="/libelles" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-300">Annuler</Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
