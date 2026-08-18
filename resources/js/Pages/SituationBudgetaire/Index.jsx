import AppLayout from '@/Layouts/AppLayout';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

function formatMontant(value) {
    return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(value || 0));
}

export default function SituationBudgetaireIndex({
    exercices = [],
    id_exercice = null,
    lignes = [],
    montant_global = 0,
    reste_global = 0,
}) {
    /*
    |--------------------------------------------------------------------------
    | États
    |--------------------------------------------------------------------------
    */

    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [formLines, setFormLines] = useState([]);

    /*
    |--------------------------------------------------------------------------
    | Préparation des lignes
    |--------------------------------------------------------------------------
    |
    | Chaque type de catégorie possède :
    | - id_type_categorie
    | - libelle
    | - n_compte
    | - montant
    | - reste_a_payer
    |
    */

    useEffect(() => {
        const preparedLines = lignes.map((ligne) => ({
            id_type_categorie:
                ligne.id_type_categorie ??
                ligne.typeCategorie?.id_type_categorie ??
                null,

            libelle:
                ligne.libelle ??
                ligne.typeCategorie?.libelle ??
                '',

            n_compte: ligne.n_compte ?? '',

            montant: ligne.montant ?? '',

            reste_a_payer: ligne.reste_a_payer ?? '',
        }));

        setFormLines(preparedLines);
    }, [lignes]);

    /*
    |--------------------------------------------------------------------------
    | Changement d'exercice
    |--------------------------------------------------------------------------
    */

    const handleExerciceChange = (e) => {
        const value = e.target.value;

        router.get(
            '/situation-budgetaire',
            {
                id_exercice: value,
            },
            {
                preserveState: false,
                preserveScroll: true,
            }
        );

        setShowForm(false);
        setEditing(false);
    };

    /*
    |--------------------------------------------------------------------------
    | Ouvrir formulaire Ajouter
    |--------------------------------------------------------------------------
    */

    const handleAdd = () => {
        /*
        | On part des lignes de l'exercice.
        | On vide les valeurs pour permettre une nouvelle saisie.
        */

        const newLines = lignes.map((ligne) => ({
            id_type_categorie:
                ligne.id_type_categorie ??
                ligne.typeCategorie?.id_type_categorie ??
                null,

            libelle:
                ligne.libelle ??
                ligne.typeCategorie?.libelle ??
                '',

            n_compte: '',
            montant: '',
            reste_a_payer: '',
        }));

        setFormLines(newLines);
        setShowForm(true);
        setEditing(false);
    };

    /*
    |--------------------------------------------------------------------------
    | Modifier
    |--------------------------------------------------------------------------
    */

    const handleEdit = () => {
        const editLines = lignes.map((ligne) => ({
            id_type_categorie:
                ligne.id_type_categorie ??
                ligne.typeCategorie?.id_type_categorie ??
                null,

            libelle:
                ligne.libelle ??
                ligne.typeCategorie?.libelle ??
                '',

            n_compte: ligne.n_compte ?? '',
            montant: ligne.montant ?? '',
            reste_a_payer: ligne.reste_a_payer ?? '',
        }));

        setFormLines(editLines);
        setShowForm(true);
        setEditing(true);
    };

    /*
    |--------------------------------------------------------------------------
    | Annuler
    |--------------------------------------------------------------------------
    */

    const handleCancel = () => {
        setShowForm(false);
        setEditing(false);

        const originalLines = lignes.map((ligne) => ({
            id_type_categorie:
                ligne.id_type_categorie ??
                ligne.typeCategorie?.id_type_categorie ??
                null,

            libelle:
                ligne.libelle ??
                ligne.typeCategorie?.libelle ??
                '',

            n_compte: ligne.n_compte ?? '',
            montant: ligne.montant ?? '',
            reste_a_payer: ligne.reste_a_payer ?? '',
        }));

        setFormLines(originalLines);
    };

    /*
    |--------------------------------------------------------------------------
    | Modification d'une ligne
    |--------------------------------------------------------------------------
    */

    const handleLineChange = (index, field, value) => {
        setFormLines((previous) =>
            previous.map((line, i) =>
                i === index
                    ? {
                          ...line,
                          [field]: value,
                      }
                    : line
            )
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Enregistrement de toutes les lignes
    |--------------------------------------------------------------------------
    */

    const handleSave = () => {
        if (!id_exercice) {
            return;
        }

        setSaving(true);

        router.post(
            '/situation-budgetaire',
            {
                id_exercice: id_exercice,

                lignes: formLines.map((ligne) => ({
                    id_type_categorie: ligne.id_type_categorie,

                    n_compte: ligne.n_compte,

                    montant:
                        ligne.montant === ''
                            ? 0
                            : Number(ligne.montant),

                    reste_a_payer:
                        ligne.reste_a_payer === ''
                            ? 0
                            : Number(ligne.reste_a_payer),
                })),
            },
            {
                preserveScroll: true,

                onSuccess: () => {
                    setShowForm(false);
                    setEditing(false);
                },

                onFinish: () => {
                    setSaving(false);
                },
            }
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Totaux affichés
    |--------------------------------------------------------------------------
    */

    const totalMontants = formLines.reduce(
        (total, ligne) =>
            total + Number(ligne.montant || 0),
        0
    );

    const totalResteForm = formLines.reduce(
        (total, ligne) =>
            total + Number(ligne.reste_a_payer || 0),
        0
    );

    /*
    |--------------------------------------------------------------------------
    | Rendu
    |--------------------------------------------------------------------------
    */

    return (
        <AppLayout title="Situation budgétaire">

            <div className="space-y-6">

                {/* =========================================================
                    EN-TÊTE
                ========================================================= */}

                <div className="bg-white rounded-xl shadow p-6">

                    <div className="flex justify-between items-center">

                        <div>

                            <h2 className="text-xl font-semibold text-gray-700">
                                Situation budgétaire
                            </h2>

                            <p className="text-gray-500 mt-1">
                                {exercices.find(
                                    (ex) =>
                                        Number(ex.id_exercice) ===
                                        Number(id_exercice)
                                )?.annee
                                    ? `Exercice ${
                                          exercices.find(
                                              (ex) =>
                                                  Number(ex.id_exercice) ===
                                                  Number(id_exercice)
                                          ).annee
                                      }`
                                    : 'Gestion de la situation budgétaire par exercice'}
                            </p>

                        </div>

                        <div className="flex items-center gap-3">

                            <label className="text-gray-700">
                                Exercice :
                            </label>

                            <select
                                value={id_exercice || ''}
                                onChange={handleExerciceChange}
                                className="border border-gray-300 rounded-lg px-4 py-2"
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

                </div>


                {/* =========================================================
                    BOUTON AJOUTER
                ========================================================= */}

                {!showForm && id_exercice && (

                    <div className="flex justify-end">

                        <button
                            type="button"
                            onClick={handleAdd}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg"
                        >
                            + Ajouter une situation budgétaire
                        </button>

                    </div>

                )}


                {/* =========================================================
                    FORMULAIRE AJOUT / MODIFICATION
                ========================================================= */}

                {showForm && (

                    <div className="bg-white rounded-xl shadow p-6">

                        <div className="flex justify-between items-center mb-5">

                            <div>

                                <h3 className="text-lg font-semibold text-gray-700">

                                    {editing
                                        ? 'Modifier la situation budgétaire'
                                        : 'Ajouter une situation budgétaire'}

                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    Remplissez les informations pour tous les
                                    types de catégorie.
                                </p>

                            </div>

                        </div>


                        {formLines.length > 0 ? (

                            <div className="overflow-x-auto">

                                <table className="w-full text-sm">

                                    <thead>

                                        <tr className="bg-gray-50 border-b">

                                            <th className="p-3 text-left">
                                                N° de compte *
                                            </th>

                                            <th className="p-3 text-left">
                                                Type catégorie
                                            </th>

                                            <th className="p-3 text-right">
                                                Montant *
                                            </th>

                                            <th className="p-3 text-right">
                                                Reste à payer *
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {formLines.map(
                                            (ligne, index) => (

                                                <tr
                                                    key={
                                                        ligne.id_type_categorie ??
                                                        index
                                                    }
                                                    className="border-b"
                                                >

                                                    {/* N° compte */}

                                                    <td className="p-3">

                                                        <input
                                                            type="text"
                                                            value={
                                                                ligne.n_compte
                                                            }
                                                            onChange={(e) =>
                                                                handleLineChange(
                                                                    index,
                                                                    'n_compte',
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder="Ex : 6111"
                                                            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                                                        />

                                                    </td>


                                                    {/* Type catégorie */}

                                                    <td className="p-3">

                                                        <span className="font-medium text-gray-700">
                                                            {
                                                                ligne.libelle
                                                            }
                                                        </span>

                                                    </td>


                                                    {/* Montant */}

                                                    <td className="p-3">

                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            value={
                                                                ligne.montant
                                                            }
                                                            onChange={(e) =>
                                                                handleLineChange(
                                                                    index,
                                                                    'montant',
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-right"
                                                        />

                                                    </td>


                                                    {/* Reste à payer */}

                                                    <td className="p-3">

                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            value={
                                                                ligne.reste_a_payer
                                                            }
                                                            onChange={(e) =>
                                                                handleLineChange(
                                                                    index,
                                                                    'reste_a_payer',
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-right"
                                                        />

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>


                                    <tfoot>

                                        <tr className="bg-gray-50 font-semibold">

                                            <td
                                                colSpan="2"
                                                className="p-3 text-right"
                                            >
                                                Total
                                            </td>

                                            <td className="p-3 text-right">
                                                {formatMontant(
                                                    totalMontants
                                                )}
                                            </td>

                                            <td className="p-3 text-right">
                                                {formatMontant(
                                                    totalResteForm
                                                )}
                                            </td>

                                        </tr>

                                    </tfoot>

                                </table>

                            </div>

                        ) : (

                            <div className="py-10 text-center text-gray-400">
                                Aucun type de catégorie pour cet exercice.
                            </div>

                        )}


                        {/* Boutons */}

                        <div className="flex justify-end gap-3 mt-6">

                            <button
                                type="button"
                                onClick={handleCancel}
                                className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50"
                            >
                                Annuler
                            </button>

                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={
                                    saving ||
                                    !id_exercice ||
                                    formLines.length === 0
                                }
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-5 py-2.5 rounded-lg"
                            >
                                {saving
                                    ? 'Enregistrement...'
                                    : 'Enregistrer'}
                            </button>

                        </div>

                    </div>

                )}


                {/* =========================================================
                    TOTAUX
                ========================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="bg-white shadow rounded-xl p-6">

                        <p className="text-gray-500">
                            Montant total de l'exercice
                        </p>

                        <p className="text-2xl font-bold text-blue-600 mt-1">
                            {formatMontant(montant_global)}
                        </p>

                    </div>


                    <div className="bg-white shadow rounded-xl p-6">

                        <p className="text-gray-500">
                            Total reste à payer
                        </p>

                        <p className="text-2xl font-bold text-orange-600 mt-1">
                            {formatMontant(reste_global)}
                        </p>

                    </div>

                </div>


                {/* =========================================================
                    TABLEAU DE LA SITUATION EXISTANTE
                ========================================================= */}

                <div className="bg-white shadow rounded-xl p-6">

                    <div className="mb-5">

                        <h3 className="text-lg font-semibold text-gray-700">
                            Détail de la situation budgétaire
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Tous les types de catégories de l'exercice sont
                            affichés.
                        </p>

                    </div>


                    {lignes.length > 0 ? (

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead>

                                    <tr className="bg-gray-50 border-b">

                                        <th className="p-3 text-left">
                                            N° de compte
                                        </th>

                                        <th className="p-3 text-left">
                                            Type catégorie
                                        </th>

                                        <th className="p-3 text-right">
                                            Montant
                                        </th>

                                        <th className="p-3 text-right">
                                            Reste à payer
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {lignes.map(
                                        (ligne, index) => (

                                            <tr
                                                key={
                                                    ligne.id_type_categorie ??
                                                    index
                                                }
                                                className="border-b"
                                            >

                                                <td className="p-3">
                                                    {ligne.n_compte || '-'}
                                                </td>

                                                <td className="p-3">

                                                    {ligne.libelle ??
                                                    ligne.typeCategorie
                                                        ?.libelle ??
                                                    '-'}

                                                </td>

                                                <td className="p-3 text-right">
                                                    {formatMontant(
                                                        ligne.montant
                                                    )}
                                                </td>

                                                <td className="p-3 text-right">
                                                    {formatMontant(
                                                        ligne.reste_a_payer
                                                    )}
                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    ) : (

                        <div className="py-10 text-center text-gray-400">
                            Aucune situation budgétaire enregistrée pour cet
                            exercice.
                        </div>

                    )}


                    {/* Bouton Modifier */}

                    {lignes.length > 0 && !showForm && (

                        <div className="flex justify-end mt-5">

                            <button
                                type="button"
                                onClick={handleEdit}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 rounded-lg"
                            >
                                Modifier
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </AppLayout>
    );
}