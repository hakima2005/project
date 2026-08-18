import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Create({ natures = [] }) {
    const { data, setData, post, processing, errors } = useForm({
    date: '',
    taux: natures.reduce((acc, n) => {
        acc[n.code_nat_prest] = 0;
        return acc;
    }, {}),
});

    const handleTauxChange = (code, value) => {
        setData('taux', {
            ...data.taux,
            [code]: value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post('/decret-ras');
    };

    const nbRemplis = Object.values(data.taux).filter(
        (v) => v !== '' && v !== null && v !== undefined
    ).length;

    return (
        <AppLayout title="Ajouter des décrets RAS">

            <div className="max-w-3xl bg-white rounded-xl shadow p-6">

                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                    Ajouter des décrets RAS
                </h2>

                <form onSubmit={submit} className="space-y-4">

                    {/* DATE UNIQUE POUR TOUTES LES LIGNES */}
                    <div className="max-w-xs">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date *
                        </label>

                        <input
                            type="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {errors.date && (
                            <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                        )}
                    </div>

                    {/* TABLEAU DES NATURES */}
                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600">
                                    <th className="text-left p-3">Nature de prestation</th>
                                    <th className="text-left p-3 w-40">Taux RAS (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {natures.length > 0 ? (
                                    natures.map((nature) => (
                                        <tr key={nature.code_nat_prest} className="border-t">
                                            <td className="p-3">
                                                {nature.intitule_fr}
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    max="100"
                                                    value={data.taux[nature.code_nat_prest] ?? 0}
                                                    onChange={(e) =>
                                                        handleTauxChange(nature.code_nat_prest, e.target.value)
                                                    }
                                                    placeholder="EX: 20"
                                                    className="w-28 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                {errors[`taux.${nature.code_nat_prest}`] && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors[`taux.${nature.code_nat_prest}`]}
                                                    </p>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="p-6 text-center text-gray-400">
                                            Aucune nature de prestation disponible.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <p className="text-xs text-gray-500">
                        Laisse vide les natures que tu ne veux pas mettre à jour aujourd'hui — seules les lignes remplies seront enregistrées ({nbRemplis} ligne(s) prête(s)).
                    </p>

                    {errors.taux && (
                        <p className="text-red-500 text-xs">{errors.taux}</p>
                    )}

                    {/* BOUTONS */}
                    <div className="flex gap-3 pt-3">
                        <button
                            type="submit"
                            disabled={processing || !data.date || nbRemplis === 0}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Enregistrement...' : `Enregistrer (${nbRemplis})`}
                        </button>

                        <Link
                            href="/decret-ras"
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