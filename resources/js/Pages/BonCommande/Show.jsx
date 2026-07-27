import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function BonCommandeShow({ bon_commande, unites }) {
    const [showForm, setShowForm] = useState(false);
    const estAttribue =
        bon_commande.statut_b_c?.nom_fr === "Attribué";

    const { data, setData, post, processing, errors, reset } = useForm({
        reference_bc: bon_commande.reference_bc,
        designation: '',
        id_unite: '',
        quantite: '',
        prix_unitaire_ht: '',
        tva: '20',
        observation: '',
    });

    // Calcul temps réel
    const montant_ht = estAttribue
        ? (parseFloat(data.quantite) || 0) *
        (parseFloat(data.prix_unitaire_ht) || 0)
        : 0;
    const montant_tva = montant_ht * ((parseFloat(data.tva) || 0) / 100);
    const montant_ttc = montant_ht + montant_tva;

    // Totaux BC
    const total_ht = bon_commande.designations?.reduce((s, d) => s + parseFloat(d.montant_ht || 0), 0) || 0;
    const total_tva = bon_commande.designations?.reduce((s, d) => s + (parseFloat(d.montant_ht || 0) * (parseFloat(d.tva || 0) / 100)), 0) || 0;
    const total_ttc = bon_commande.designations?.reduce((s, d) => s + parseFloat(d.montant_ttc || 0), 0) || 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/designations', {
            onSuccess: () => {
                reset('designation', 'id_unite', 'quantite', 'prix_unitaire_ht', 'tva', 'observation');
                setShowForm(false);
            }
        });
    };

    const retenir = (id) => {
        if (confirm('Retenir ce devis et rejeter les autres ?'))
            router.post(`/devis/${id}/retenir`);
    };

    return (
        <AppLayout title={`BC — ${bon_commande.reference_bc}`}>
            <div className="space-y-6">

                {/* Infos générales */}
                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-md font-semibold text-gray-700">Informations générales</h3>
                        <span className="px-3 py-1 rounded text-sm font-medium"
                            style={{
                                backgroundColor: (bon_commande.statut_b_c?.couleur || '#6b7280') + '20',
                                color: bon_commande.statut_b_c?.couleur || '#6b7280'
                            }}>
                            {bon_commande.statut_b_c?.nom_fr || 'N/A'}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="text-gray-500">Référence:</span> <span className="font-mono font-bold ml-2">{bon_commande.reference_bc}</span></div>
                        <div><span className="text-gray-500">Exercice:</span> <span className="ml-2">{bon_commande.exercice?.annee}</span></div>
                        <div><span className="text-gray-500">Objet:</span> <span className="ml-2">{bon_commande.objet}</span></div>
                        <div><span className="text-gray-500">Libellé:</span> <span className="ml-2">{bon_commande.libelle?.intitule_fr}</span></div>
                        <div><span className="text-gray-500">Nature prestation:</span> <span className="ml-2">{bon_commande.nature_prestation?.intitule_fr}</span></div>
                        <div><span className="text-gray-500">Date limite devis:</span> <span className="ml-2">{bon_commande.date_limite_devis || '—'}</span></div>
                        <div><span className="text-gray-500">Date mise en ligne:</span> <span className="ml-2">{bon_commande.date_mise_en_ligne || '—'}</span></div>
                        <div><span className="text-gray-500">TVA applicable:</span> <span className="ml-2">{bon_commande.tva_applicable || 0}%</span></div>
                    </div>
                </div>

                {/* Désignations */}
                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-md font-semibold text-gray-700">Désignations</h3>
                        {!estAttribue && (
                            <button
                                onClick={() => setShowForm(!showForm)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                            >
                                {showForm ? '✕ Annuler' : '+ Ajouter désignation'}
                            </button>
                        )}
                    </div>

                    {/* Formulaire */}
                    {showForm && !estAttribue && (
                        <form onSubmit={handleSubmit} className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
                            <h4 className="text-sm font-semibold text-blue-700 mb-3">Nouvelle désignation</h4>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Désignation *</label>
                                    <input type="text" value={data.designation}
                                        onChange={e => setData('designation', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                                        placeholder="Description de la prestation ou fourniture" />
                                    {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Unité</label>
                                    <select value={data.id_unite} onChange={e => setData('id_unite', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                                        <option value="">-- Choisir --</option>
                                        {unites?.map(u => <option key={u.id_unite} value={u.id_unite}>{u.libelle}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Quantité *</label>
                                    <input type="number" value={data.quantite}
                                        onChange={e => setData('quantite', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                                        placeholder="0" />
                                    {errors.quantite && <p className="text-red-500 text-xs mt-1">{errors.quantite}</p>}
                                </div>
                                {estAttribue && (
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Prix unitaire HT (MAD) *
                                        </label>

                                        <input
                                            type="number"
                                            value={data.prix_unitaire_ht}
                                            onChange={e => setData('prix_unitaire_ht', e.target.value)}
                                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                                            placeholder="0.00"
                                        />

                                        {errors.prix_unitaire_ht && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.prix_unitaire_ht}
                                            </p>
                                        )}
                                    </div>
                                )}
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">TVA (%)</label>
                                    <input type="number" value={data.tva}
                                        onChange={e => setData('tva', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                                        placeholder="20" />
                                </div>
                            </div>

                            {/* Calcul temps réel */}
                            {estAttribue && (
                                <div className="grid grid-cols-3 gap-3 bg-white rounded-lg p-3 mb-3 border">

                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">Montant HT</p>
                                        <p className="font-bold text-gray-700">
                                            {montant_ht.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">TVA</p>
                                        <p className="font-bold text-orange-600">
                                            {montant_tva.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">Montant TTC</p>
                                        <p className="font-bold text-blue-700">
                                            {montant_ttc.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD
                                        </p>
                                    </div>

                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Observation</label>
                                <input type="text" value={data.observation}
                                    onChange={e => setData('observation', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                            </div>

                            <div className="flex gap-3 mt-3">
                                <button type="submit" disabled={processing}
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-green-700 disabled:opacity-50">
                                    {processing ? 'Ajout...' : '✓ Ajouter'}
                                </button>
                                <button type="button" onClick={() => setShowForm(false)}
                                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-300">
                                    Annuler
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Tableau désignations */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-xs">
                                    <th className="text-left p-3">N°</th>
                                    <th className="text-left p-3">Désignation</th>
                                    <th className="text-center p-3">Unité</th>
                                    <th className="text-center p-3">Qté</th>

                                    {estAttribue ? (
                                        <>
                                            <th className="text-right p-3">PU HT</th>
                                            <th className="text-right p-3">Montant HT</th>
                                            <th className="text-center p-3">TVA %</th>
                                            <th className="text-right p-3">Montant TVA</th>
                                            <th className="text-right p-3">Montant TTC</th>
                                        </>
                                    ) : (
                                        <th className="text-center p-3">TVA %</th>
                                    )}
                                    <th className="text-center p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bon_commande.designations?.length > 0 ? (
                                    bon_commande.designations.map((d) => (
                                        <tr key={d.id_designation} className="border-t hover:bg-gray-50">

                                            <td className="p-3 text-center">{d.num_ordre}</td>

                                            <td className="p-3">{d.designation}</td>

                                            <td className="p-3 text-center">
                                                {d.unite?.libelle || '—'}
                                            </td>

                                            <td className="p-3 text-center">
                                                {d.quantite}
                                            </td>

                                            {estAttribue ? (
                                                <>
                                                    <td className="p-3 text-right">
                                                        {Number(d.prix_unitaire_ht).toLocaleString(
                                                            'fr-MA',
                                                            { minimumFractionDigits: 2 }
                                                        )}
                                                    </td>

                                                    <td className="p-3 text-right">
                                                        {Number(d.montant_ht).toLocaleString(
                                                            'fr-MA',
                                                            { minimumFractionDigits: 2 }
                                                        )}
                                                    </td>

                                                    <td className="p-3 text-center">
                                                        {d.tva}%
                                                    </td>

                                                    <td className="p-3 text-right text-orange-600">
                                                        {(
                                                            Number(d.montant_ht) *
                                                            (Number(d.tva) / 100)
                                                        ).toLocaleString('fr-MA', {
                                                            minimumFractionDigits: 2,
                                                        })}
                                                    </td>

                                                    <td className="p-3 text-right font-bold text-blue-700">
                                                        {Number(d.montant_ttc).toLocaleString(
                                                            'fr-MA',
                                                            { minimumFractionDigits: 2 }
                                                        )}
                                                    </td>
                                                </>
                                            ) : (
                                                <td className="p-3 text-center">
                                                    {d.tva}%
                                                </td>
                                            )}

                                            <td className="p-3 text-center">
                                                <div className="flex justify-center gap-3">

                                                    <Link
                                                        href={`/designations/${d.id_designation}/edit`}
                                                        className="text-orange-500 hover:text-orange-700 text-xs"
                                                    >
                                                        ✏️ Modifier
                                                    </Link>

                                                    <Link
                                                        href={`/designations/${d.id_designation}`}
                                                        method="delete"
                                                        as="button"
                                                        className="text-red-500 hover:text-red-700 text-xs"
                                                        onClick={(e) => {
                                                            if (!confirm('Supprimer cette désignation ?'))
                                                                e.preventDefault();
                                                        }}
                                                    >
                                                        🗑️ Supprimer
                                                    </Link>

                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={estAttribue ? 10 : 6}
                                            className="p-8 text-center text-gray-400 italic"
                                        >
                                            Aucune désignation — cliquez sur "+ Ajouter désignation"
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                            {/* TOTAUX BC */}
                            {estAttribue && bon_commande.designations?.length > 0 && (
                                <tfoot>
                                    <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold text-sm">

                                        <td colSpan="5" className="p-3 text-right text-gray-600">
                                            Total BC :
                                        </td>

                                        <td className="p-3 text-right">
                                            {total_ht.toLocaleString('fr-MA', {
                                                minimumFractionDigits: 2,
                                            })} MAD
                                        </td>

                                        <td></td>

                                        <td className="p-3 text-right text-orange-600">
                                            {total_tva.toLocaleString('fr-MA', {
                                                minimumFractionDigits: 2,
                                            })} MAD
                                        </td>

                                        <td className="p-3 text-right text-blue-700 font-bold">
                                            {total_ttc.toLocaleString('fr-MA', {
                                                minimumFractionDigits: 2,
                                            })} MAD
                                        </td>

                                        <td></td>

                                    </tr>

                                    <tr className="bg-blue-700 text-white">

                                        <td colSpan="7" className="p-3 text-right font-bold">
                                            Montant Total TTC du Bon de Commande :
                                        </td>

                                        <td colSpan="3" className="p-3 text-right font-bold text-lg">
                                            {total_ttc.toLocaleString('fr-MA', {
                                                minimumFractionDigits: 2,
                                            })} MAD
                                        </td>

                                    </tr>
                                </tfoot>
                            )}

                        </table>
                    </div>
                </div>

                {/* Devis reçus */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-md font-semibold text-gray-700 mb-4">Devis reçus</h3>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-xs">
                                <th className="text-left p-3">Fournisseur</th>
                                <th className="text-left p-3">Référence</th>
                                <th className="text-right p-3">Montant HT</th>
                                <th className="text-right p-3">TVA</th>
                                <th className="text-right p-3">Montant TTC</th>
                                <th className="text-left p-3">Date</th>
                                <th className="text-center p-3">Statut</th>
                                <th className="text-center p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bon_commande.devis?.length > 0 ? bon_commande.devis.map((d) => (
                                <tr key={d.id_devis} className="border-t hover:bg-gray-50">
                                    <td className="p-3 font-medium">{d.fournisseur?.raison_sociale}</td>
                                    <td className="p-3 font-mono text-xs">{d.reference_devis}</td>
                                    <td className="p-3 text-right">{Number(d.montant_ht || 0).toLocaleString('fr-MA', { minimumFractionDigits: 2 })}</td>
                                    <td className="p-3 text-right text-orange-600">{Number(d.montant_tva || 0).toLocaleString('fr-MA', { minimumFractionDigits: 2 })}</td>
                                    <td className="p-3 text-right font-bold text-blue-700">{Number(d.montant_ttc || 0).toLocaleString('fr-MA', { minimumFractionDigits: 2 })}</td>
                                    <td className="p-3">{d.date_devis}</td>
                                    <td className="p-3 text-center">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${d.statut?.nom_fr === 'retenu' ? 'bg-green-100 text-green-700' :
                                            d.statut?.nom_fr === 'rejeté' ? 'bg-red-100 text-red-700' :
                                                'bg-gray-100 text-gray-600'}`}>
                                            {d.statut?.nom_fr || 'reçu'}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        {d.statut?.nom_fr !== 'retenu' && (
                                            <button onClick={() => retenir(d.id_devis)}
                                                className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
                                                Retenir
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="8" className="p-6 text-center text-gray-400 italic">Aucun devis reçu</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <Link href="/bons-commande"
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300">
                        ← Retour
                    </Link>
                </div>

            </div>
        </AppLayout >
    );
}