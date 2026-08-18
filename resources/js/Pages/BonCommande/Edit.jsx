import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Edit({
    bon_commande,
    exercices,
    natures_prestation,
}) {
    const { data, setData, put, processing, errors } = useForm({
        reference_bc: bon_commande.reference_bc || '',
        objet: bon_commande.objet || '',
        id_exercice: bon_commande.id_exercice || '',
        code_nat_prest: bon_commande.code_nat_prest || '',
        date_limite_devis: bon_commande.date_limite_devis || '',
        observations: bon_commande.observations || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/bons-commande/${bon_commande.reference_bc}`);
    };

    return (
        <AppLayout title="Modifier le bon de commande">

            <div className="max-w-3xl bg-white rounded-xl shadow p-6">

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Référence */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Référence *
                        </label>

                        <input
                            type="text"
                            value={data.reference_bc}
                            onChange={e =>
                                setData('reference_bc', e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="BC-2026-001"
                        />

                        {errors.reference_bc && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.reference_bc}
                            </p>
                        )}
                    </div>

                    {/* Objet */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Objet *
                        </label>

                        <textarea
                            value={data.objet}
                            rows={2}
                            onChange={e =>
                                setData('objet', e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        />

                        {errors.objet && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.objet}
                            </p>
                        )}
                    </div>

                    {/* Exercice + Nature */}
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Exercice *
                            </label>

                            <select
                                value={data.id_exercice}
                                onChange={e =>
                                    setData('id_exercice', e.target.value)
                                }
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">
                                    -- Choisir --
                                </option>

                                {exercices?.map(ex => (
                                    <option
                                        key={ex.id_exercice}
                                        value={ex.id_exercice}
                                    >
                                        {ex.annee}
                                    </option>
                                ))}
                            </select>

                            {errors.id_exercice && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.id_exercice}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nature de prestation *
                            </label>

                            <select
                                value={data.code_nat_prest}
                                onChange={e =>
                                    setData(
                                        'code_nat_prest',
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">
                                    -- Choisir --
                                </option>

                                {natures_prestation?.map(n => (
                                    <option
                                        key={n.code_nat_prest}
                                        value={n.code_nat_prest}
                                    >
                                        {n.intitule_fr}
                                    </option>
                                ))}
                            </select>

                            <p className="text-xs text-gray-500 mt-1">
                                Détermine la TVA / RAS appliquées automatiquement.
                            </p>

                            {errors.code_nat_prest && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.code_nat_prest}
                                </p>
                            )}
                        </div>

                    </div>

                    {/* Date */}
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date limite devis
                            </label>

                            <input
                                type="date"
                                value={data.date_limite_devis}
                                onChange={e =>
                                    setData(
                                        'date_limite_devis',
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                    </div>

                    {/* Observations */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Observations
                        </label>

                        <textarea
                            value={data.observations}
                            rows={2}
                            onChange={e =>
                                setData(
                                    'observations',
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing
                                ? 'Enregistrement...'
                                : 'Enregistrer'}
                        </button>

                        <Link
                            href="/bons-commande"
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-300"
                        >
                            Annuler
                        </Link>

                    </div>

                </form>

            </div>

        </AppLayout>
    );
}