import AppLayout from '@/Layouts/AppLayout';

export default function CategorieIndex({ natures }) {


    
    return (
        <AppLayout title="Catégories budgétaires">

            <div className="bg-white rounded-xl shadow p-6">

                <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-700">
                        Liste des catégories budgétaires
                    </h3>
                </div>

                <table className="w-full text-sm">

                    <thead>
                        <tr className="bg-gray-50 text-gray-600">
                            <th className="text-left p-3">Type catégorie</th>
                            <th className="text-left p-3">Nature de prestation</th>
                            <th className="text-left p-3">Libellé</th>
                            <th className="text-left p-3">Budget affecté</th>
                            <th className="text-left p-3">Budget engagé</th>
                            <th className="text-left p-3">Budget disponible</th>
                        </tr>
                    </thead>

                    <tbody>

                        {natures?.length > 0 ? (

                            natures.flatMap((nature) =>

                                nature.libelles.length > 0 ? (

                                    nature.libelles.map((libelle, index) => (

                                        <tr
                                            key={libelle.code_libelle}
                                            className="border-t hover:bg-gray-50"
                                        >

                                            {index === 0 && (
                                                <>
                                                    <td
                                                        rowSpan={nature.libelles.length}
                                                        className="p-3 align-top"
                                                    >
                                                        {nature.type_categorie?.libelle}
                                                    </td>

                                                    <td
                                                        rowSpan={nature.libelles.length}
                                                        className="p-3 align-top"
                                                    >
                                                        {nature.intitule_fr}
                                                    </td>
                                                </>
                                            )}

                                            <td className="p-3">
                                                {libelle.intitule_fr}
                                            </td>

                                            <td className="p-3">
                                                {Number(libelle.budget_affecte).toLocaleString()} MAD
                                            </td>

                                            <td className="p-3">
                                                {Number(libelle.budget_engage).toLocaleString()} MAD
                                            </td>

                                            <td className="p-3">
                                                {Number(libelle.budget_disponible).toLocaleString()} MAD
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr
                                        key={nature.code_nat_prest}
                                        className="border-t"
                                    >

                                        <td className="p-3">
                                            {nature.type_categorie?.libelle}
                                        </td>

                                        <td className="p-3">
                                            {nature.intitule_fr}
                                        </td>

                                        <td className="p-3 text-gray-400 italic">
                                            Aucun libellé
                                        </td>

                                        <td className="p-3">-</td>
                                        <td className="p-3">-</td>
                                        <td className="p-3">-</td>

                                    </tr>

                                )

                            )

                        ) : (

                            <tr>
                                <td
                                    colSpan="6"
                                    className="p-6 text-center text-gray-400"
                                >
                                    Aucune donnée disponible.
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </AppLayout>
    );
}