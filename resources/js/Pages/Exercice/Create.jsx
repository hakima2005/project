import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function ExerciceCreate({ typesMt }) {

    const { data, setData, post, processing, errors } = useForm({
        annee: '',
        date_debut: '',
        date_fin: '',
        date_visee: '',
        observations: '',
        montants: {},
    });

    const total = Object.values(data.montants).reduce(
        (sum, value) => sum + (parseFloat(value) || 0),
        0
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/exercices');
    };

    return (
        <AppLayout title="Nouvel exercice">

            <div className="max-w-2xl bg-white rounded-xl shadow p-6">

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Année */}

                    <div className="flex items-center gap-4">
                        <label className="w-48 font-medium">
                            Année :
                        </label>

                        <input
                            type="number"
                            value={data.annee}
                            onChange={(e) => setData('annee', e.target.value)}
                            className="flex-1 border rounded-lg px-3 py-2"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date début
                            </label>
                            <input
                                type="date"
                                value={data.date_debut}
                                onChange={(e) => setData('date_debut', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                            {errors.date_debut && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.date_debut}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date fin
                            </label>
                            <input
                                type="date"
                                value={data.date_fin}
                                onChange={(e) => setData('date_fin', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                            {errors.date_fin && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.date_fin}
                                </p>
                            )}
                        </div>
                    </div>

                    <h1 className="text-lg font-bold">Types de montant : </h1>

                    {typesMt.map((type) => (
                        <div
                            key={type.id_type_mt}
                            className="flex items-center gap-4"
                        >
                            <label className="w-48 font-medium">
                                {type.libelle} :
                            </label>

                            <input
                                type="number"
                                min="0"
                                value={data.montants[type.id_type_mt] || ''}
                                onChange={(e) =>
                                    setData('montants', {
                                        ...data.montants,
                                        [type.id_type_mt]: e.target.value,
                                    })
                                }
                                className="flex-1 border rounded-lg px-3 py-2"
                            />
                        </div>
                    ))}

                    {/* Montant Global */}

                    <div className="bg-gray-100 rounded-lg p-4">

                        <div className="flex justify-between">

                            <span className="font-bold">
                                Montant Global
                            </span>

                            <span className="font-bold text-blue-700">
                                {total.toLocaleString()} DH
                            </span>

                        </div>

                    </div>

                    {/* Date */}

                    <div>

                        <label className="block text-sm font-medium mb-1">
                            Date de visée
                        </label>

                        <input
                            type="date"
                            value={data.date_visee}
                            onChange={(e) =>
                                setData('date_visee', e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        />

                    </div>

                    {/* Observations */}

                    <div>

                        <label className="block text-sm font-medium mb-1">
                            Observations
                        </label>

                        <textarea
                            rows="3"
                            value={data.observations}
                            onChange={(e) =>
                                setData(
                                    'observations',
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        />

                    </div>

                    {/* Buttons */}

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            {processing
                                ? 'Enregistrement...'
                                : 'Enregistrer'}
                        </button>

                        <Link
                            href="/exercices"
                            className="bg-gray-300 px-5 py-2 rounded-lg"
                        >
                            Annuler
                        </Link>

                    </div>

                </form>

            </div>

        </AppLayout>
    );
}