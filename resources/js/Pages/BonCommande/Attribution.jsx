import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Attribution({
    bon_commande,
    devis,
    fournisseurs,
}) {
    const [showNewFournisseur, setShowNewFournisseur] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        id_fournisseur_attribue:
            bon_commande.id_fournisseur_attribue || '',
        nombre_devis: devis?.length || '',
        montant_ht: '',
        justificatif_caution: null,
    });

    // Formulaire nouveau fournisseur
    const [nouveauFournisseur, setNouveauFournisseur] = useState({
        raison_sociale: '',
        identifiant_fiscal: '',
        ICE: '',
        RC: '',
        CNSS: '',
        telephone: '',
        email: '',
        representation: '',
        activite_principale: '',
    });

    const handleNouveauFournisseurChange = (e) => {
        setNouveauFournisseur({
            ...nouveauFournisseur,
            [e.target.name]: e.target.value,
        });
    };

    const submit = (e) => {
        e.preventDefault();

        post(
            route(
                'bons-commande.confirmer-attribution',
                bon_commande.reference_bc
            ),
            {
                forceFormData: true,
            }
        );
    };

    return (
        <AppLayout title="Attribution du bon de commande">

            <div className="max-w-4xl mx-auto space-y-6">

                {/* =====================================================
                    INFORMATIONS BC
                ====================================================== */}
                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Attribution du bon de commande
                    </h2>

                    <div className="grid grid-cols-2 gap-4 text-sm">

                        <div>
                            <span className="text-gray-500">
                                Référence
                            </span>

                            <p className="font-semibold">
                                {bon_commande.reference_bc}
                            </p>
                        </div>

                        <div>
                            <span className="text-gray-500">
                                Objet
                            </span>

                            <p className="font-semibold">
                                {bon_commande.objet}
                            </p>
                        </div>

                        <div>
                            <span className="text-gray-500">
                                Garantie
                            </span>

                            <p className="font-semibold">
                                {bon_commande.garanti ? 'Oui' : 'Non'}
                            </p>
                        </div>

                        <div>
                            <span className="text-gray-500">
                                Date limite des devis
                            </span>

                            <p className="font-semibold">
                                {bon_commande.date_limite_devis || '—'}
                            </p>
                        </div>

                    </div>
                </div>


                {/* =====================================================
                    DEVIS REÇUS
                ====================================================== */}
                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="font-semibold text-gray-700 mb-4">
                        Devis reçus ({devis?.length || 0})
                    </h3>

                    {devis?.length > 0 ? (

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead>
                                    <tr className="bg-gray-50">

                                        <th className="text-left p-3">
                                            Référence
                                        </th>

                                        <th className="text-left p-3">
                                            Fournisseur
                                        </th>

                                        <th className="text-left p-3">
                                            Date
                                        </th>

                                        <th className="text-left p-3">
                                            Montant HT
                                        </th>

                                        <th className="text-left p-3">
                                            Montant TTC
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {devis.map((d) => (

                                        <tr
                                            key={d.id_devis}
                                            className="border-t"
                                        >

                                            <td className="p-3">
                                                {d.reference_devis}
                                            </td>

                                            <td className="p-3">
                                                {d.fournisseur
                                                    ?.raison_sociale || '—'}
                                            </td>

                                            <td className="p-3">
                                                {d.date_devis || '—'}
                                            </td>

                                            <td className="p-3">
                                                {Number(
                                                    d.montant_ht || 0
                                                ).toLocaleString('fr-MA', {
                                                    minimumFractionDigits: 2,
                                                })}{' '}
                                                MAD
                                            </td>

                                            <td className="p-3">
                                                {Number(
                                                    d.montant_ttc || 0
                                                ).toLocaleString('fr-MA', {
                                                    minimumFractionDigits: 2,
                                                })}{' '}
                                                MAD
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    ) : (

                        <p className="text-gray-400">
                            Aucun devis reçu pour ce bon de commande.
                        </p>

                    )}

                </div>


                {/* =====================================================
                    FORMULAIRE ATTRIBUTION
                ====================================================== */}
                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="font-semibold text-gray-700 mb-5">
                        Informations d'attribution
                    </h3>

                    <form
                        onSubmit={submit}
                        className="space-y-5"
                    >

                        {/* =================================================
                            FOURNISSEUR
                        ================================================== */}
                        <div>

                            <label className="block text-sm font-medium mb-1">
                                Fournisseur attribué *
                            </label>

                            <select
                                value={data.id_fournisseur_attribue}
                                onChange={(e) =>
                                    setData(
                                        'id_fournisseur_attribue',
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded-lg px-3 py-2"
                            >

                                <option value="">
                                    -- Choisir le fournisseur --
                                </option>

                                {fournisseurs?.map((f) => (

                                    <option
                                        key={f.id_fournisseur}
                                        value={f.id_fournisseur}
                                    >
                                        {f.raison_sociale}
                                    </option>

                                ))}

                            </select>

                            {errors.id_fournisseur_attribue && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.id_fournisseur_attribue}
                                </p>
                            )}

                            {/* =================================================
                                AJOUTER NOUVEAU FOURNISSEUR
                            ================================================== */}
                            <button
                                type="button"
                                onClick={() =>
                                    setShowNewFournisseur(
                                        !showNewFournisseur
                                    )
                                }
                                className="mt-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                            >
                                {showNewFournisseur
                                    ? '− Fermer le formulaire'
                                    : '+ Ajouter un nouveau fournisseur'}
                            </button>

                        </div>


                        {/* =====================================================
                            NOUVEAU FOURNISSEUR
                        ====================================================== */}
                        {showNewFournisseur && (

                            <div className="border border-blue-200 bg-blue-50 rounded-xl p-5">

                                <div className="flex items-center justify-between mb-5">

                                    <div>
                                        <h4 className="font-semibold text-blue-800">
                                            Ajouter un nouveau fournisseur
                                        </h4>

                                        <p className="text-xs text-blue-600 mt-1">
                                            Le fournisseur n'existe pas encore
                                            dans la liste.
                                        </p>
                                    </div>

                                </div>


                                <div className="grid grid-cols-2 gap-4">

                                    {/* Raison sociale */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Raison sociale *
                                        </label>

                                        <input
                                            type="text"
                                            name="raison_sociale"
                                            value={
                                                nouveauFournisseur.raison_sociale
                                            }
                                            onChange={
                                                handleNouveauFournisseurChange
                                            }
                                            placeholder="Ex: Atlas Bureau SARL"
                                            className="w-full border rounded-lg px-3 py-2 bg-white"
                                        />
                                    </div>


                                    {/* Identifiant fiscal */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Identifiant fiscal
                                        </label>

                                        <input
                                            type="text"
                                            name="identifiant_fiscal"
                                            value={
                                                nouveauFournisseur.identifiant_fiscal
                                            }
                                            onChange={
                                                handleNouveauFournisseurChange
                                            }
                                            className="w-full border rounded-lg px-3 py-2 bg-white"
                                        />
                                    </div>


                                    {/* ICE */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            ICE
                                        </label>

                                        <input
                                            type="text"
                                            name="ICE"
                                            value={
                                                nouveauFournisseur.ICE
                                            }
                                            onChange={
                                                handleNouveauFournisseurChange
                                            }
                                            className="w-full border rounded-lg px-3 py-2 bg-white"
                                        />
                                    </div>


                                    {/* RC */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            RC
                                        </label>

                                        <input
                                            type="text"
                                            name="RC"
                                            value={
                                                nouveauFournisseur.RC
                                            }
                                            onChange={
                                                handleNouveauFournisseurChange
                                            }
                                            className="w-full border rounded-lg px-3 py-2 bg-white"
                                        />
                                    </div>


                                    {/* CNSS */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            CNSS
                                        </label>

                                        <input
                                            type="text"
                                            name="CNSS"
                                            value={
                                                nouveauFournisseur.CNSS
                                            }
                                            onChange={
                                                handleNouveauFournisseurChange
                                            }
                                            className="w-full border rounded-lg px-3 py-2 bg-white"
                                        />
                                    </div>


                                    {/* Téléphone */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Téléphone
                                        </label>

                                        <input
                                            type="text"
                                            name="telephone"
                                            value={
                                                nouveauFournisseur.telephone
                                            }
                                            onChange={
                                                handleNouveauFournisseurChange
                                            }
                                            placeholder="05..."
                                            className="w-full border rounded-lg px-3 py-2 bg-white"
                                        />
                                    </div>


                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={
                                                nouveauFournisseur.email
                                            }
                                            onChange={
                                                handleNouveauFournisseurChange
                                            }
                                            placeholder="contact@example.ma"
                                            className="w-full border rounded-lg px-3 py-2 bg-white"
                                        />
                                    </div>


                                    {/* Représentation */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Représentation
                                        </label>

                                        <input
                                            type="text"
                                            name="representation"
                                            value={
                                                nouveauFournisseur.representation
                                            }
                                            onChange={
                                                handleNouveauFournisseurChange
                                            }
                                            className="w-full border rounded-lg px-3 py-2 bg-white"
                                        />
                                    </div>

                                </div>


                                {/* Activité principale */}
                                <div className="mt-4">

                                    <label className="block text-sm font-medium mb-1">
                                        Activité principale
                                    </label>

                                    <textarea
                                        name="activite_principale"
                                        rows="2"
                                        value={
                                            nouveauFournisseur.activite_principale
                                        }
                                        onChange={
                                            handleNouveauFournisseurChange
                                        }
                                        className="w-full border rounded-lg px-3 py-2 bg-white"
                                    />

                                </div>


                                {/* Bouton */}
                                <div className="flex gap-3 mt-5">

                                    <button
                                        type="button"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                        onClick={() => {
                                            alert(
                                                'Le formulaire est prêt. Nous allons maintenant le connecter au backend.'
                                            );
                                        }}
                                    >
                                        Ajouter le fournisseur
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowNewFournisseur(false)
                                        }
                                        className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                                    >
                                        Fermer
                                    </button>

                                </div>

                            </div>

                        )}


                        {/* =================================================
                            NOMBRE DE DEVIS + MONTANT HT
                        ================================================== */}
                        <div className="grid grid-cols-2 gap-4">

                            <div>

                                <label className="block text-sm font-medium mb-1">
                                    Nombre de devis reçus *
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    value={data.nombre_devis}
                                    onChange={(e) =>
                                        setData(
                                            'nombre_devis',
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                                {errors.nombre_devis && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.nombre_devis}
                                    </p>
                                )}

                            </div>


                            <div>

                                <label className="block text-sm font-medium mb-1">
                                    Montant HT attribué *
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.montant_ht}
                                    onChange={(e) =>
                                        setData(
                                            'montant_ht',
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                                {errors.montant_ht && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.montant_ht}
                                    </p>
                                )}

                            </div>

                        </div>


                        {/* =================================================
                            GARANTIE
                        ================================================== */}
                        {bon_commande.garanti && (

                            <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">

                                <p className="font-medium text-orange-800 mb-3">
                                    Ce bon de commande est garanti.
                                </p>

                                <label className="block text-sm font-medium mb-1">
                                    Justificatif de caution *
                                </label>

                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) =>
                                        setData(
                                            'justificatif_caution',
                                            e.target.files[0]
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2 bg-white"
                                />

                                <p className="text-xs text-gray-500 mt-1">
                                    PDF, JPG ou PNG — 5 Mo maximum
                                </p>

                                {errors.justificatif_caution && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.justificatif_caution}
                                    </p>
                                )}

                            </div>

                        )}


                        {/* =================================================
                            BOUTONS
                        ================================================== */}
                        <div className="flex gap-3 pt-3">

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing
                                    ? 'Attribution...'
                                    : 'Confirmer l’attribution'}
                            </button>

                            <Link
                                href={route('bons-commande.index')}
                                className="bg-gray-200 px-5 py-2 rounded-lg"
                            >
                                Annuler
                            </Link>

                        </div>

                    </form>

                </div>

            </div>

        </AppLayout>
    );
}