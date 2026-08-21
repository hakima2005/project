import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import { router } from '@inertiajs/react';

export default function CategorieIndex({
    exercices = [],
    typesCategories = [],
    id_exercice = '',
}) {
    const handleExerciceChange = (e) => {
        const value = e.target.value;

        router.get(
            '/categories',
            {
                id_exercice: value,
            },
            {
                preserveState: false,
                preserveScroll: true,
            }
        );
    };

    const formatMontant = (montant) => {
        if (
            montant === null ||
            montant === undefined ||
            montant === ''
        ) {
            return '-';
        }

        return (
            Number(montant).toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) + ' MAD'
        );
    };

    return (
        <AppLayout title="Catégories budgétaires">

            <Card
                title="Catégories budgétaires"
                subtitle="Liste des types de catégories et des natures de prestations"
                actions={
                    <div className="flex items-center gap-3">

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
                }
            >

                {/* Tableau */}
                {id_exercice ? (

                    <div className="overflow-x-auto">

                        <table className="w-full text-sm border-collapse">

                            <thead>
                                <tr className="bg-cream-100 text-gray-600">

                                    <th className="text-left p-3 rounded-l-lg">
                                        Type catégorie
                                    </th>

                                    <th className="text-left p-3">
                                        Code nature
                                    </th>

                                    <th className="text-left p-3">
                                        Nature de prestation
                                    </th>

                                    <th className="text-right p-3 rounded-r-lg">
                                        Budget affecté
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {typesCategories.length > 0 ? (

                                    typesCategories.map((type) => {

                                        const naturePrestations =
                                            type.naturePrestations || [];

                                        /*
                                         * Type sans nature de prestation
                                         */
                                        if (
                                            naturePrestations.length === 0
                                        ) {

                                            return (
                                                <tr
                                                    key={type.id_type_categorie}
                                                    className="border-b border-cream-200 hover:bg-cream-50"
                                                >

                                                    <td className="p-3 font-medium text-navy-900">
                                                        {type.libelle}
                                                    </td>

                                                    <td className="p-3 text-gray-400">
                                                        -
                                                    </td>

                                                    <td className="p-3 text-gray-400 italic">
                                                        Aucune nature de prestation
                                                    </td>

                                                    <td className="p-3 text-right font-semibold text-navy-800">
                                                        {formatMontant(
                                                            type.budget_affecte
                                                        )}
                                                    </td>

                                                </tr>
                                            );
                                        }

                                        /*
                                         * Type avec une ou plusieurs
                                         * natures de prestation
                                         */
                                        return naturePrestations.map(
                                            (nature, index) => (

                                                <tr
                                                    key={`${type.id_type_categorie}-${nature.code_nat_prest}`}
                                                    className="border-b border-cream-200 hover:bg-cream-50"
                                                >

                                                    {/* Type catégorie */}
                                                    {index === 0 ? (
                                                        <td
                                                            rowSpan={
                                                                naturePrestations.length
                                                            }
                                                            className="p-3 align-top font-medium text-navy-900"
                                                        >
                                                            {type.libelle}
                                                        </td>
                                                    ) : null}

                                                    {/* Code nature */}
                                                    <td className="p-3 font-mono text-xs">
                                                        {nature.code_nat_prest}
                                                    </td>

                                                    {/* Nature de prestation */}
                                                    <td className="p-3">
                                                        {nature.intitule_fr}
                                                    </td>

                                                    {/* Budget affecté */}
                                                    {index === 0 ? (
                                                        <td
                                                            rowSpan={
                                                                naturePrestations.length
                                                            }
                                                            className="p-3 text-right align-top font-semibold text-navy-800"
                                                        >
                                                            {formatMontant(
                                                                type.budget_affecte
                                                            )}
                                                        </td>
                                                    ) : null}

                                                </tr>

                                            )
                                        );
                                    })

                                ) : (

                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="p-6 text-center text-gray-400"
                                        >
                                            Aucun type de catégorie disponible.
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