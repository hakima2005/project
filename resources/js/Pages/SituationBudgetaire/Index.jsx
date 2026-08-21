import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Plus, Pencil, TrendingUp, Wallet } from 'lucide-react';

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

                <Card>

                    <div className="flex justify-between items-center">

                        <div>

                            <h2 className="font-display text-xl font-semibold text-navy-900">
                                Situation budgétaire
                            </h2>

                            <p className="text-gray-500 mt-1 text-sm">
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

                            <label className="text-sm text-gray-700">
                                Exercice :
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

                    </div>

                </Card>


                {/* =========================================================
                    BOUTON AJOUTER
                ========================================================= */}

                {!showForm && id_exercice && (

                    <div className="flex justify-end">

                        <Button type="button" variant="primary" onClick={handleAdd}>
                            <Plus size={16} /> Ajouter une situation budgétaire
                        </Button>

                    </div>

                )}


                {/* =========================================================
                    FORMULAIRE AJOUT / MODIFICATION
                ========================================================= */}

                {showForm && (

                    <Card
                        title={editing
                            ? 'Modifier la situation budgétaire'
                            : 'Ajouter une situation budgétaire'}
                        subtitle="Remplissez les informations pour tous les types de catégorie."
                    >

                        {formLines.length > 0 ? (

                            <div className="overflow-x-auto">

                                <table className="w-full text-sm">

                                    <thead>

                                        <tr className="bg-cream-100">

                                            <th className="p-3 text-left rounded-l-lg">
                                                N° de compte *
                                            </th>

                                            <th className="p-3 text-left">
                                                Type catégorie
                                            </th>

                                            <th className="p-3 text-right">
                                                Montant *
                                            </th>

                                            <th className="p-3 text-right rounded-r-lg">
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
                                                    className="border-b border-cream-200"
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
                                                            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                                        />

                                                    </td>


                                                    {/* Type catégorie */}

                                                    <td className="p-3">

                                                        <span className="font-medium text-navy-900">
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
                                                            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-right text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
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
                                                            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-right text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                                        />

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>


                                    <tfoot>

                                        <tr className="bg-cream-100 font-semibold">

                                            <td
                                                colSpan="2"
                                                className="p-3 text-right"
                                            >
                                                Total
                                            </td>

                                            <td className="p-3 text-right text-navy-800">
                                                {formatMontant(
                                                    totalMontants
                                                )}
                                            </td>

                                            <td className="p-3 text-right text-gold-700">
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

                            <Button type="button" variant="secondary" onClick={handleCancel}>
                                Annuler
                            </Button>

                            <Button
                                type="button"
                                variant="primary"
                                onClick={handleSave}
                                disabled={
                                    saving ||
                                    !id_exercice ||
                                    formLines.length === 0
                                }
                            >
                                {saving
                                    ? 'Enregistrement...'
                                    : 'Enregistrer'}
                            </Button>

                        </div>

                    </Card>

                )}


                {/* =========================================================
                    TOTAUX
                ========================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="bg-navy-800 rounded-xl p-6 flex items-center gap-4">

                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <Wallet size={22} className="text-gold-400" />
                        </div>

                        <div>
                            <p className="text-navy-200 text-sm">
                                Montant total de l'exercice
                            </p>

                            <p className="text-2xl font-bold text-white mt-0.5">
                                {formatMontant(montant_global)}
                            </p>
                        </div>

                    </div>


                    <div className="bg-white shadow-card border border-cream-200 rounded-xl p-6 flex items-center gap-4">

                        <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                            <TrendingUp size={22} className="text-gold-700" />
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">
                                Total reste à payer
                            </p>

                            <p className="text-2xl font-bold text-gold-700 mt-0.5">
                                {formatMontant(reste_global)}
                            </p>
                        </div>

                    </div>

                </div>


                {/* =========================================================
                    TABLEAU DE LA SITUATION EXISTANTE
                ========================================================= */}

                <Card
                    title="Détail de la situation budgétaire"
                    subtitle="Tous les types de catégories de l'exercice sont affichés."
                >

                    {lignes.length > 0 ? (

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead>

                                    <tr className="bg-cream-100">

                                        <th className="p-3 text-left rounded-l-lg">
                                            N° de compte
                                        </th>

                                        <th className="p-3 text-left">
                                            Type catégorie
                                        </th>

                                        <th className="p-3 text-right">
                                            Montant
                                        </th>

                                        <th className="p-3 text-right rounded-r-lg">
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
                                                className="border-b border-cream-200 hover:bg-cream-50"
                                            >

                                                <td className="p-3">
                                                    {ligne.n_compte || '-'}
                                                </td>

                                                <td className="p-3 font-medium text-navy-900">

                                                    {ligne.libelle ??
                                                    ligne.typeCategorie
                                                        ?.libelle ??
                                                    '-'}

                                                </td>

                                                <td className="p-3 text-right text-navy-800">
                                                    {formatMontant(
                                                        ligne.montant
                                                    )}
                                                </td>

                                                <td className="p-3 text-right text-gold-700">
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

                            <Button type="button" variant="secondary" onClick={handleEdit}>
                                <Pencil size={16} /> Modifier
                            </Button>

                        </div>

                    )}

                </Card>

            </div>

        </AppLayout>
    );
}