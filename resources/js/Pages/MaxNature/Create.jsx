import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { Link, useForm } from '@inertiajs/react';

export default function MaxNatureCreate({
    exercices = [],
    natures = [],
}) {
    const { data, setData, post, processing, errors } = useForm({
        id_exercice: '',

        natures: natures.map((nature) => ({
            code_nat_prest: nature.code_nat_prest,
            montant_max: '',
        })),
    });


    const handleExerciceChange = (e) => {
        setData('id_exercice', e.target.value);
    };


    const handleMontantChange = (index, value) => {
        const updatedNatures = [...data.natures];

        updatedNatures[index] = {
            ...updatedNatures[index],
            montant_max: value,
        };

        setData('natures', updatedNatures);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        post('/max-nature');
    };


    return (
        <AppLayout title="Ajouter une max nature">

            <Card
                title="Ajouter une max nature"
                subtitle="Définir le montant maximum pour chaque nature de prestation."
            >

                <form onSubmit={handleSubmit}>

                    {/* Exercice */}
                    <div className="mb-6 max-w-sm">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Exercice *
                        </label>

                        <select
                            value={data.id_exercice}
                            onChange={handleExerciceChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                        >

                            <option value="">
                                -- Choisir un exercice --
                            </option>

                            {exercices.map((exercice) => (

                                <option
                                    key={exercice.id_exercice}
                                    value={exercice.id_exercice}
                                >
                                    {exercice.annee}
                                </option>

                            ))}

                        </select>

                        {errors.id_exercice && (
                            <p className="text-rose-500 text-xs mt-1">
                                {errors.id_exercice}
                            </p>
                        )}

                    </div>


                    {/* Natures de prestation */}
                    {data.id_exercice ? (

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm border-collapse">

                                <thead>

                                    <tr className="bg-cream-100 text-gray-600">

                                        <th className="text-left p-3 rounded-l-lg">
                                            Code
                                        </th>

                                        <th className="text-left p-3">
                                            Nature de prestation
                                        </th>

                                        <th className="text-right p-3 rounded-r-lg">
                                            Montant maximum
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {natures.length > 0 ? (

                                        natures.map((nature, index) => (

                                            <tr
                                                key={nature.code_nat_prest}
                                                className="border-b border-cream-200 hover:bg-cream-50"
                                            >

                                                <td className="p-3 font-mono text-navy-700">
                                                    {nature.code_nat_prest}
                                                </td>


                                                <td className="p-3">
                                                    {nature.intitule_fr || '-'}
                                                </td>


                                                <td className="p-3 text-right">

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={
                                                            data.natures[index]?.montant_max ?? ''
                                                        }
                                                        onChange={(e) =>
                                                            handleMontantChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-48 border border-gray-300 rounded-lg px-3 py-2 text-right text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                                        placeholder="0.00"
                                                    />

                                                    {errors[
                                                        `natures.${index}.montant_max`
                                                    ] && (

                                                        <p className="text-rose-500 text-xs mt-1">
                                                            {
                                                                errors[
                                                                    `natures.${index}.montant_max`
                                                                ]
                                                            }
                                                        </p>

                                                    )}

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="3"
                                                className="p-6 text-center text-gray-400"
                                            >
                                                Aucune nature de prestation disponible.
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    ) : (

                        <div className="p-8 text-center text-gray-400 border border-cream-200 rounded-lg">
                            Veuillez sélectionner un exercice.
                        </div>

                    )}


                    {/* Boutons */}
                    <div className="flex gap-3 mt-6">

                        <Button type="submit" variant="primary" disabled={processing || !data.id_exercice}>
                            {processing
                                ? 'Enregistrement...'
                                : 'Enregistrer'}
                        </Button>


                        <Button as={Link} href="/max-nature" variant="secondary">
                            Annuler
                        </Button>

                    </div>

                </form>

            </Card>

        </AppLayout>
    );
}