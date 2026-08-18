import AppLayout from '@/Layouts/AppLayout';
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

            <div className="bg-white rounded-xl shadow p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">
                            Catégories budgétaires
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Liste des types de catégories et des natures
                            de prestations
                        </p>
                    </div>

                    {/* Exercice */}
                    <div className="flex items-center gap-3">

                        <label className="text-sm font-medium text-gray-700">
                            Exercice
                        </label>

                        <select
                            value={id_exercice || ''}
                            onChange={handleExerciceChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

                </div>

                {/* Tableau */}
                {id_exercice ? (

                    <div className="overflow-x-auto">

                        <table className="w-full text-sm border-collapse">

                            <thead>
                                <tr className="bg-gray-50 text-gray-600">

                                    <th className="text-left p-3 border-b">
                                        Type catégorie
                                    </th>

                                    <th className="text-left p-3 border-b">
                                        Code nature
                                    </th>

                                    <th className="text-left p-3 border-b">
                                        Nature de prestation
                                    </th>

                                    <th className="text-right p-3 border-b">
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
                                                    className="border-b hover:bg-gray-50"
                                                >

                                                    <td className="p-3 font-medium">
                                                        {type.libelle}
                                                    </td>

                                                    <td className="p-3 text-gray-400">
                                                        -
                                                    </td>

                                                    <td className="p-3 text-gray-400 italic">
                                                        Aucune nature de prestation
                                                    </td>

                                                    <td className="p-3 text-right font-semibold">
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
                                                    className="border-b hover:bg-gray-50"
                                                >

                                                    {/* Type catégorie */}
                                                    {index === 0 ? (
                                                        <td
                                                            rowSpan={
                                                                naturePrestations.length
                                                            }
                                                            className="p-3 align-top font-medium"
                                                        >
                                                            {type.libelle}
                                                        </td>
                                                    ) : null}

                                                    {/* Code nature */}
                                                    <td className="p-3">
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
                                                            className="p-3 text-right align-top font-semibold"
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

            </div>

        </AppLayout>
    );
}