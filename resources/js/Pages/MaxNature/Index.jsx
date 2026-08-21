import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default function MaxNatureIndex({
    exercices = [],
    id_exercice = '',
    maxNatures = [],
}) {
    const handleExerciceChange = (e) => {
        const value = e.target.value;

        router.get(
            '/max-nature',
            {
                id_exercice: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const formatMontant = (montant) => {
        return (
            Number(montant || 0).toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) + ' MAD'
        );
    };

    return (
        <AppLayout title="Max Nature">

            <Card
                title="Max Nature"
                subtitle="Montants maximum par nature de prestation"
                actions={
                    <Button as={Link} href="/max-nature/create" variant="primary">
                        <Plus size={16} /> Ajouter une max nature
                    </Button>
                }
            >

                {/* Exercice */}
                <div className="flex items-center gap-3 mb-6">

                    <label className="text-sm font-medium text-gray-700">
                        Exercice
                    </label>

                    <select
                        value={id_exercice || ''}
                        onChange={handleExerciceChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                    >
                        <option value="">
                            -- Choisir --
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

                </div>


                {/* Listing */}
                {id_exercice ? (

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

                                {maxNatures.length > 0 ? (

                                    maxNatures.map((item) => (

                                        <tr
                                            key={item.id}
                                            className="border-b border-cream-200 hover:bg-cream-50"
                                        >

                                            <td className="p-3 font-mono text-navy-700">
                                                {item.code_nat_prest}
                                            </td>

                                            <td className="p-3">
                                                {item.nature_prestation?.intitule_fr || '-'}
                                            </td>

                                            <td className="p-3 text-right font-medium text-navy-800">
                                                {formatMontant(
                                                    item.montant_max
                                                )}
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="3"
                                            className="p-8 text-center text-gray-400"
                                        >
                                            Aucun montant maximum enregistré
                                            pour cet exercice.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                ) : (

                    <div className="p-10 text-center text-gray-400">
                        Veuillez sélectionner un exercice.
                    </div>

                )}

            </Card>

        </AppLayout>
    );
}