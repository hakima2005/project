import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Create({ natures }) {

    const { data, setData, post, processing, errors } = useForm({
        date: '',
        code_nat_prest: '',
        taux: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post('/decret-tva');
    };

    return (
        <AppLayout title="Ajouter un décret TVA">

            <div className="max-w-lg bg-white rounded-xl shadow p-6">

                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                    Ajouter un décret TVA
                </h2>

                <form onSubmit={submit} className="space-y-4">

                    {/* DATE */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date *
                        </label>

                        <input
                            type="date"
                            value={data.date}
                            onChange={(e) =>
                                setData('date', e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {errors.date && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.date}
                            </p>
                        )}
                    </div>

                    {/* NATURE */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nature de prestation *
                        </label>

                        <select
                            value={data.code_nat_prest}
                            onChange={(e) =>
                                setData(
                                    'code_nat_prest',
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">
                                -- Choisir une nature --
                            </option>

                            {natures?.map((nature) => (
                                <option
                                    key={nature.code_nat_prest}
                                    value={nature.code_nat_prest}
                                >
                                    {nature.intitule_fr}
                                </option>
                            ))}
                        </select>

                        {errors.code_nat_prest && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.code_nat_prest}
                            </p>
                        )}
                    </div>

                    {/* TAUX */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Taux (%) *
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            value={data.taux}
                            onChange={(e) =>
                                setData('taux', e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ex: 20"
                        />

                        {errors.taux && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.taux}
                            </p>
                        )}
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-3 pt-3">

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
                            href="/decret-tva"
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