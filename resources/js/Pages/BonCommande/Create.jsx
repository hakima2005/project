import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { useForm, Link } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';

export default function BonCommandeCreate({ exercices, natures_prestation, unites }) {
    const { data, setData, post, processing, errors } = useForm({
        reference_bc: '', objet: '', id_exercice: '',
        code_nat_prest: '',
        date_limite_devis: '', observations: '',
        designations: [],
    });

    const ligneVide = {
        designation: '', id_unite: '', quantite: '', tva: '20', garanti: false, observation: '',
    };

    const addLigne = () => setData('designations', [...data.designations, { ...ligneVide }]);
    const removeLigne = (idx) => setData('designations', data.designations.filter((_, i) => i !== idx));
    const updateLigne = (idx, field, value) => {
        const copy = [...data.designations];
        copy[idx] = { ...copy[idx], [field]: value };
        setData('designations', copy);
    };

    return (
        <AppLayout title="Nouveau bon de commande">
            <div className="max-w-4xl">
                <Card title="Nouveau bon de commande">

                    <form onSubmit={(e) => { e.preventDefault(); post('/bons-commande'); }} className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Référence *</label>
                            <input type="text" value={data.reference_bc} onChange={e => setData('reference_bc', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400" placeholder="BC-2026-001"/>
                            {errors.reference_bc && <p className="text-rose-500 text-xs mt-1">{errors.reference_bc}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Objet *</label>
                            <textarea value={data.objet} rows={2} onChange={e => setData('objet', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                            {errors.objet && <p className="text-rose-500 text-xs mt-1">{errors.objet}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Exercice *</label>
                                <select value={data.id_exercice} onChange={e => setData('id_exercice', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400">
                                    <option value="">-- Choisir --</option>
                                    {exercices?.map(ex => <option key={ex.id_exercice} value={ex.id_exercice}>{ex.annee}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nature de prestation *</label>
                                <select value={data.code_nat_prest} onChange={e => setData('code_nat_prest', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400">
                                    <option value="">-- Choisir --</option>
                                    {natures_prestation?.map(n => <option key={n.code_nat_prest} value={n.code_nat_prest}>{n.intitule_fr}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date limite devis</label>
                                <input type="date" value={data.date_limite_devis} onChange={e => setData('date_limite_devis', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Observations</label>
                            <textarea value={data.observations} rows={2} onChange={e => setData('observations', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                        </div>

                        {/* ================= DESIGNATIONS ================= */}
                        <div className="border-t border-cream-200 pt-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-display text-md font-semibold text-navy-900">Désignations</h3>
                                <Button type="button" variant="secondary" onClick={addLigne}>
                                    <Plus size={16} /> Ajouter une désignation
                                </Button>
                            </div>

                            {data.designations.length === 0 && (
                                <p className="text-sm text-gray-400 italic">Aucune désignation ajoutée.</p>
                            )}

                            <div className="space-y-3">
                                {data.designations.map((ligne, idx) => (
                                    <div key={idx} className="border border-cream-200 rounded-lg p-3 space-y-2 bg-cream-50">
                                        <div className="flex gap-2 items-start">
                                            <textarea
                                                value={ligne.designation}
                                                onChange={e => updateLigne(idx, 'designation', e.target.value)}
                                                placeholder="Désignation *"
                                                rows={1}
                                                className="flex-1 border border-gray-300 rounded-lg px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                            />
                                            <button type="button" onClick={() => removeLigne(idx)}
                                                className="text-rose-600 hover:text-rose-700 px-2 py-1.5" title="Supprimer">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-4 gap-2">
                                            <div>
                                                <label className="text-xs text-gray-500">Unité</label>
                                                <select value={ligne.id_unite} onChange={e => updateLigne(idx, 'id_unite', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400">
                                                    <option value="">--</option>
                                                    {unites?.map(u => <option key={u.id_unite} value={u.id_unite}>{u.libelle}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500">Quantité *</label>
                                                <input type="number" min="0" value={ligne.quantite}
                                                    onChange={e => updateLigne(idx, 'quantite', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500">TVA (%)</label>
                                                <input type="number" min="0" step="0.01" value={ligne.tva}
                                                    onChange={e => updateLigne(idx, 'tva', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                                            </div>
                                            <div className="flex items-end pb-1.5">
                                                <label className="flex items-center gap-2 text-sm text-gray-700">
                                                    <input type="checkbox" checked={ligne.garanti}
                                                        onChange={e => updateLigne(idx, 'garanti', e.target.checked)}
                                                        className="accent-navy-800"/>
                                                    Garantie
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs text-gray-500">Observation</label>
                                            <input type="text" value={ligne.observation}
                                                onChange={e => updateLigne(idx, 'observation', e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                                        </div>

                                        {errors[`designations.${idx}.designation`] && (
                                            <p className="text-rose-500 text-xs">{errors[`designations.${idx}.designation`]}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="submit" variant="primary" disabled={processing}>
                                {processing ? 'Enregistrement...' : 'Enregistrer'}
                            </Button>
                            <Button as={Link} href="/bons-commande" variant="secondary">Annuler</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}