import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Edit({ exercice, typesMt, montants }) {

    const montantsInitiaux = {};

montants.forEach((item) => {
    montantsInitiaux[item.id_type_mt] = item.montant;
});

    const { data, setData, put, processing, errors } = useForm({
        annee: exercice.annee,
        date_debut: exercice.date_debut ?? '',
        date_fin: exercice.date_fin ?? '',
        date_visee: exercice.date_visee ?? '',
        observations: exercice.observations ?? '',
        montants: montantsInitiaux,
    });

    const total = Object.values(data.montants).reduce(
        (sum, value) => sum + (parseFloat(value) || 0),
        0
    );

    function submit(e) {
        e.preventDefault();
        put(`/exercices/${exercice.id_exercice}`);
    }

    return (
        <AppLayout title={`Modifier l'exercice ${exercice.annee}`}>

            <div className="max-w-2xl bg-white rounded-xl shadow p-6">

                <form onSubmit={submit} className="space-y-4">

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

                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-700">
                            Types de montant
                        </h3>

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

                        <div className="bg-blue-50 border rounded-lg p-3 flex justify-between">
                            <span className="font-semibold">
                                Montant Global
                            </span>

                            <span className="font-bold text-blue-700">
                                {total.toLocaleString()} DH
                            </span>
                        </div>
                    </div>

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

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Observations
                        </label>

                        <textarea
                            rows={3}
                            value={data.observations}
                            onChange={(e) =>
                                setData('observations', e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                        >
                            Mettre à jour
                        </button>

                        <Link
                            href="/exercices"
                            className="bg-gray-300 px-6 py-2 rounded-lg"
                        >
                            Annuler
                        </Link>
                    </div>

                </form>

            </div>

        </AppLayout>
    );
}