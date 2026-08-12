import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function BonCommandeIndex({
    bons_commande,
    statuts_bc,
}) {

    // =========================================================
    // TRANSITIONS
    // =========================================================

    const transitions = {
        7: [1, 3], // Créé -> Brouillon, Publié
        1: [3],    // Brouillon -> Publié
        3: [6],    // Publié -> Attribué
        6: [4, 2], // Attribué -> En cours d'exécution, Annulé
        4: [5, 2], // En cours d'exécution -> Terminé, Annulé
        5: [],     // Terminé
        2: [],     // Annulé
    };


    // =========================================================
    // COULEURS
    // =========================================================

    const statutColors = {

        'Créé':
            'bg-gray-100 text-gray-700',

        'Brouillon':
            'bg-yellow-100 text-yellow-700',

        'Publié':
            'bg-blue-100 text-blue-700',

        'Attribué':
            'bg-purple-100 text-purple-700',

        "En cours d'exécution":
            'bg-orange-100 text-orange-700',

        'Terminé':
            'bg-green-100 text-green-700',

        'Annulé':
            'bg-red-100 text-red-700',
    };


    // =========================================================
    // MODAL ANNULATION
    // =========================================================

    const [showAnnulationModal, setShowAnnulationModal] =
        useState(false);

    const [bcAnnulation, setBcAnnulation] =
        useState(null);

    const [fichierAnnulation, setFichierAnnulation] =
        useState(null);

    const [motifAnnulation, setMotifAnnulation] =
        useState('');


    // =========================================================
    // MODAL TERMINAISON
    // =========================================================

    const [showTerminaisonModal, setShowTerminaisonModal] =
        useState(false);

    const [bcTerminaison, setBcTerminaison] =
        useState(null);

    const [facture, setFacture] =
        useState(null);

    const [bonLivraison, setBonLivraison] =
        useState(null);


    // =========================================================
    // PROCESSING
    // =========================================================

    const [processing, setProcessing] =
        useState(false);


    // =========================================================
    // OUVRIR MODAL ANNULATION
    // =========================================================

    const ouvrirModalAnnulation = (bc) => {

        setBcAnnulation(bc);

        setFichierAnnulation(null);

        setMotifAnnulation('');

        setShowAnnulationModal(true);
    };


    // =========================================================
    // FERMER MODAL ANNULATION
    // =========================================================

    const fermerModalAnnulation = () => {

        if (processing) {
            return;
        }

        setShowAnnulationModal(false);

        setBcAnnulation(null);

        setFichierAnnulation(null);

        setMotifAnnulation('');
    };


    // =========================================================
    // OUVRIR MODAL TERMINAISON
    // =========================================================

    const ouvrirModalTerminaison = (bc) => {

        setBcTerminaison(bc);

        setFacture(null);

        setBonLivraison(null);

        setShowTerminaisonModal(true);
    };


    // =========================================================
    // FERMER MODAL TERMINAISON
    // =========================================================

    const fermerModalTerminaison = () => {

        if (processing) {
            return;
        }

        setShowTerminaisonModal(false);

        setBcTerminaison(null);

        setFacture(null);

        setBonLivraison(null);
    };


    // =========================================================
    // CONFIRMER TERMINAISON
    // =========================================================

    const confirmerTerminaison = (e) => {

        e.preventDefault();

        if (!bcTerminaison) {
            return;
        }


        // Facture obligatoire

        if (!facture) {

            alert(
                "La pièce jointe de la facture est obligatoire."
            );

            return;
        }


        // =====================================================
        // FORM DATA
        // =====================================================

        const formData = new FormData();

        formData.append(
            'id_statut_bc',
            '5'
        );

        formData.append(
            'piece_jointe_facture',
            facture
        );


        // Bon livraison optionnel

        if (bonLivraison) {

            formData.append(
                'bon_livraison',
                bonLivraison
            );
        }


        setProcessing(true);


        router.post(
            `/bons-commande/${bcTerminaison.reference_bc}/statut`,
            formData,
            {
                forceFormData: true,

                preserveScroll: true,

                onSuccess: () => {

                    setShowTerminaisonModal(false);

                    setBcTerminaison(null);

                    setFacture(null);

                    setBonLivraison(null);
                },

                onFinish: () => {

                    setProcessing(false);
                },
            }
        );
    };


    // =========================================================
    // CONFIRMER ANNULATION
    // =========================================================

    const confirmerAnnulation = (e) => {

        e.preventDefault();

        if (!bcAnnulation) {
            return;
        }


        const statutActuel =
            bcAnnulation.statut_b_c?.nom_fr ||
            'Créé';


        // =====================================================
        // ATTRIBUÉ → ANNULÉ
        // =====================================================

        if (statutActuel === 'Attribué') {

            if (!fichierAnnulation) {

                alert(
                    "La pièce jointe du fournisseur est obligatoire."
                );

                return;
            }
        }


        // =====================================================
        // EN COURS D'EXÉCUTION → ANNULÉ
        // =====================================================

        if (
            statutActuel ===
            "En cours d'exécution"
        ) {

            if (!motifAnnulation.trim()) {

                alert(
                    "Le motif d'annulation est obligatoire."
                );

                return;
            }


            if (!fichierAnnulation) {

                alert(
                    "Le document d'annulation est obligatoire."
                );

                return;
            }
        }


        const formData = new FormData();

        formData.append(
            'id_statut_bc',
            '2'
        );


        if (statutActuel === 'Attribué') {

            formData.append(
                'piece_jointe_fournisseur',
                fichierAnnulation
            );
        }


        if (
            statutActuel ===
            "En cours d'exécution"
        ) {

            formData.append(
                'motif_annulation',
                motifAnnulation
            );

            formData.append(
                'documents_annulation',
                fichierAnnulation
            );
        }


        setProcessing(true);


        router.post(
            `/bons-commande/${bcAnnulation.reference_bc}/statut`,
            formData,
            {
                forceFormData: true,

                preserveScroll: true,

                onSuccess: () => {

                    setShowAnnulationModal(false);

                    setBcAnnulation(null);

                    setFichierAnnulation(null);

                    setMotifAnnulation('');
                },

                onFinish: () => {

                    setProcessing(false);
                },
            }
        );
    };


    // =========================================================
    // CHANGEMENT STATUT
    // =========================================================

    const handleStatutChange = (
        bc,
        idStatutBc
    ) => {

        const nouveauId =
            Number(idStatutBc);


        if (
            !nouveauId ||
            nouveauId === Number(
                bc.id_statut_bc
            )
        ) {
            return;
        }


        const statutSelectionne =
            statuts_bc?.find(
                (s) =>
                    Number(
                        s.id_statut_bc
                    ) === nouveauId
            );


        // =====================================================
        // ANNULATION
        // =====================================================

        if (
            statutSelectionne?.nom_fr ===
            'Annulé'
        ) {

            ouvrirModalAnnulation(bc);

            return;
        }


        // =====================================================
        // TERMINÉ
        // =====================================================

        if (
            statutSelectionne?.nom_fr ===
            'Terminé'
        ) {

            ouvrirModalTerminaison(bc);

            return;
        }


        // =====================================================
        // AUTRES STATUTS
        // =====================================================

        router.post(
            `/bons-commande/${bc.reference_bc}/statut`,
            {
                id_statut_bc: nouveauId,
            },
            {
                preserveScroll: true,
            }
        );
    };


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <AppLayout title="Bons de commande">

            <div className="bg-white rounded-xl shadow p-6">

                {/* =====================================================
                    HEADER
                ===================================================== */}

                <div className="flex items-center justify-between mb-6">

                    <h3 className="text-md font-semibold text-gray-700">
                        Liste des bons de commande
                    </h3>


                    <Link
                        href="/bons-commande/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                        + Nouveau BC
                    </Link>

                </div>


                {/* =====================================================
                    TABLE
                ===================================================== */}

                <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead>

                            <tr className="bg-gray-50 text-gray-600">

                                <th className="text-left p-3">
                                    Référence
                                </th>

                                <th className="text-left p-3">
                                    Objet
                                </th>

                                <th className="text-left p-3">
                                    Exercice
                                </th>

                                <th className="text-left p-3">
                                    Montant
                                </th>

                                <th className="text-left p-3">
                                    Date mise en ligne
                                </th>

                                <th className="text-left p-3">
                                    Date limite
                                </th>

                                <th className="text-left p-3">
                                    Statut
                                </th>

                                <th className="text-left p-3">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {bons_commande?.length > 0 ? (

                                bons_commande.map((bc) => {

                                    const statutActuel =
                                        bc.statut_b_c?.nom_fr ||
                                        'Créé';


                                    const idStatutActuel =
                                        Number(
                                            bc.id_statut_bc
                                        );


                                    const aujourdHui =
                                        new Date()
                                            .toISOString()
                                            .slice(0, 10);


                                    const dateLimite =
                                        bc.date_limite_devis
                                            ? String(
                                                bc.date_limite_devis
                                            ).slice(0, 10)
                                            : null;


                                    const dateAvantLimite =
                                        dateLimite &&
                                        aujourdHui < dateLimite;


                                    let statutsPossibles =
                                        transitions[
                                            idStatutActuel
                                        ] || [];


                                    // =================================================
                                    // PUBLIÉ AVANT DATE LIMITE
                                    // =================================================

                                    if (
                                        idStatutActuel === 3 &&
                                        dateAvantLimite
                                    ) {

                                        statutsPossibles =
                                            statutsPossibles.filter(
                                                (id) =>
                                                    Number(id) !== 6
                                            );
                                    }


                                    const couleurStatut =
                                        statutColors[
                                            statutActuel
                                        ] ||
                                        'bg-gray-100 text-gray-600';


                                    return (

                                        <tr
                                            key={
                                                bc.reference_bc
                                            }
                                            className="border-t hover:bg-gray-50"
                                        >

                                            {/* REFERENCE */}

                                            <td className="p-3 font-mono text-blue-600">

                                                {bc.reference_bc}

                                                {bc.garanti && (

                                                    <span
                                                        className="ml-1 text-xs"
                                                        title="Bon de commande garanti"
                                                    >
                                                        🔒
                                                    </span>

                                                )}

                                            </td>


                                            {/* OBJET */}

                                            <td className="p-3 max-w-xs truncate">

                                                {bc.objet}

                                            </td>


                                            {/* EXERCICE */}

                                            <td className="p-3">

                                                {
                                                    bc.exercice?.annee ||
                                                    '—'
                                                }

                                            </td>


                                            {/* MONTANT */}

                                            <td className="p-3 font-medium">

                                                {Number(
                                                    bc.montant_estimatif || 0
                                                ).toLocaleString(
                                                    'fr-MA',
                                                    {
                                                        minimumFractionDigits: 2,
                                                    }
                                                )}

                                                {' MAD'}

                                            </td>


                                            {/* DATE MISE EN LIGNE */}

                                            <td className="p-3">

                                                {
                                                    bc.date_mise_en_ligne ||
                                                    '—'
                                                }

                                            </td>


                                            {/* DATE LIMITE */}

                                            <td className="p-3">

                                                {
                                                    bc.date_limite_devis ||
                                                    '—'
                                                }

                                            </td>


                                            {/* STATUT */}

                                            <td className="p-3">

                                                <select
                                                    value={
                                                        idStatutActuel
                                                    }
                                                    onChange={(e) =>
                                                        handleStatutChange(
                                                            bc,
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`
                                                        px-3
                                                        py-1.5
                                                        rounded-lg
                                                        text-xs
                                                        font-medium
                                                        border
                                                        ${couleurStatut}
                                                    `}
                                                >

                                                    <option
                                                        value={
                                                            idStatutActuel
                                                        }
                                                    >
                                                        {statutActuel}
                                                    </option>


                                                    {statutsPossibles.map(
                                                        (idStatut) => {

                                                            const statut =
                                                                statuts_bc?.find(
                                                                    (s) =>
                                                                        Number(
                                                                            s.id_statut_bc
                                                                        ) ===
                                                                        Number(
                                                                            idStatut
                                                                        )
                                                                );


                                                            if (!statut) {
                                                                return null;
                                                            }


                                                            return (

                                                                <option
                                                                    key={
                                                                        statut.id_statut_bc
                                                                    }
                                                                    value={
                                                                        statut.id_statut_bc
                                                                    }
                                                                >
                                                                    {
                                                                        statut.nom_fr
                                                                    }
                                                                </option>

                                                            );

                                                        }
                                                    )}

                                                </select>

                                            </td>


                                            {/* ACTIONS */}

                                            <td className="p-3">

                                                <div className="flex gap-3">

                                                    {/* ATTRIBUER */}

                                                    {Number(
                                                        bc.id_statut_bc
                                                    ) === 3 &&
                                                        dateLimite &&
                                                        !dateAvantLimite && (

                                                            <Link
                                                                href={route(
                                                                    'bons-commande.attribuer',
                                                                    bc.reference_bc
                                                                )}
                                                                className="text-purple-600 hover:underline"
                                                            >
                                                                Attribuer
                                                            </Link>

                                                        )}


                                                    {/* VOIR */}

                                                    <Link
                                                        href={`/bons-commande/${bc.reference_bc}`}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        Voir
                                                    </Link>


                                                    {/* MODIFIER */}

                                                    <Link
                                                        href={`/bons-commande/${bc.reference_bc}/edit`}
                                                        className="text-orange-600 hover:underline"
                                                    >
                                                        Modifier
                                                    </Link>


                                                    {/* SUPPRIMER */}

                                                    <Link
                                                        href={`/bons-commande/${bc.reference_bc}`}
                                                        method="delete"
                                                        as="button"
                                                        className="text-red-600 hover:underline"
                                                        onClick={(e) => {

                                                            if (
                                                                !confirm(
                                                                    'Supprimer ce bon de commande ?'
                                                                )
                                                            ) {
                                                                e.preventDefault();
                                                            }

                                                        }}
                                                    >
                                                        Supprimer
                                                    </Link>

                                                </div>

                                            </td>

                                        </tr>

                                    );

                                })

                            ) : (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="p-8 text-center text-gray-400"
                                    >
                                        Aucun bon de commande
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* =========================================================
                MODAL ANNULATION
            ========================================================= */}

            {showAnnulationModal &&
                bcAnnulation && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                        <div className="w-full max-w-lg bg-white rounded-xl shadow-xl">

                            <div className="flex items-center justify-between p-5 border-b">

                                <div>

                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Annulation du bon de commande
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {bcAnnulation.reference_bc}
                                    </p>

                                </div>


                                <button
                                    type="button"
                                    onClick={
                                        fermerModalAnnulation
                                    }
                                    className="text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ×
                                </button>

                            </div>


                            <form
                                onSubmit={
                                    confirmerAnnulation
                                }
                                className="p-5 space-y-5"
                            >

                                {/* ATTRIBUÉ */}

                                {(
                                    bcAnnulation
                                        .statut_b_c
                                        ?.nom_fr
                                ) === 'Attribué' && (

                                    <>

                                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">

                                            <p className="text-sm text-purple-800">

                                                Ce bon de commande est
                                                <strong>
                                                    {' '}Attribué
                                                </strong>.

                                            </p>

                                            <p className="text-sm text-purple-700 mt-1">

                                                La pièce jointe fournie
                                                par le fournisseur est
                                                obligatoire pour
                                                l'annulation.

                                            </p>

                                        </div>


                                        <div>

                                            <label className="block text-sm font-medium text-gray-700 mb-2">

                                                Pièce jointe du fournisseur

                                                <span className="text-red-500">
                                                    {' '}*
                                                </span>

                                            </label>


                                            <input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) =>
                                                    setFichierAnnulation(
                                                        e.target.files?.[0] || null
                                                    )
                                                }
                                                className="w-full border rounded-lg p-2 text-sm"
                                            />

                                            <p className="text-xs text-gray-500 mt-1">
                                                PDF, JPG, JPEG ou PNG — 5 Mo maximum.
                                            </p>

                                        </div>

                                    </>

                                )}


                                {/* EN COURS D'EXECUTION */}

                                {(
                                    bcAnnulation
                                        .statut_b_c
                                        ?.nom_fr
                                ) ===
                                    "En cours d'exécution" && (

                                    <>

                                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">

                                            <p className="text-sm text-orange-800">

                                                Ce bon de commande est
                                                <strong>
                                                    {' '}En cours d'exécution
                                                </strong>.

                                            </p>

                                            <p className="text-sm text-orange-700 mt-1">
                                                Le motif d'annulation et les documents sont obligatoires.
                                            </p>

                                        </div>


                                        <div>

                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Motif d'annulation
                                                <span className="text-red-500">
                                                    {' '}*
                                                </span>
                                            </label>


                                            <textarea
                                                value={
                                                    motifAnnulation
                                                }
                                                onChange={(e) =>
                                                    setMotifAnnulation(
                                                        e.target.value
                                                    )
                                                }
                                                rows="4"
                                                className="w-full border rounded-lg p-3 text-sm"
                                                placeholder="Saisir le motif d'annulation..."
                                            />

                                        </div>


                                        <div>

                                            <label className="block text-sm font-medium text-gray-700 mb-2">

                                                Documents d'annulation

                                                <span className="text-red-500">
                                                    {' '}*
                                                </span>

                                            </label>


                                            <input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) =>
                                                    setFichierAnnulation(
                                                        e.target.files?.[0] || null
                                                    )
                                                }
                                                className="w-full border rounded-lg p-2 text-sm"
                                            />

                                            <p className="text-xs text-gray-500 mt-1">
                                                PDF, JPG, JPEG ou PNG — 5 Mo maximum.
                                            </p>

                                        </div>

                                    </>

                                )}


                                <div className="flex justify-end gap-3 pt-3 border-t">

                                    <button
                                        type="button"
                                        onClick={
                                            fermerModalAnnulation
                                        }
                                        disabled={
                                            processing
                                        }
                                        className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
                                    >
                                        Retour
                                    </button>


                                    <button
                                        type="submit"
                                        disabled={
                                            processing
                                        }
                                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Annulation...'
                                            : "Confirmer l'annulation"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}


            {/* =========================================================
                MODAL TERMINAISON
            ========================================================= */}

            {showTerminaisonModal &&
                bcTerminaison && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                        <div className="w-full max-w-lg bg-white rounded-xl shadow-xl">

                            {/* HEADER */}

                            <div className="flex items-center justify-between p-5 border-b">

                                <div>

                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Terminer le bon de commande
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {bcTerminaison.reference_bc}
                                    </p>

                                </div>


                                <button
                                    type="button"
                                    onClick={
                                        fermerModalTerminaison
                                    }
                                    className="text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ×
                                </button>

                            </div>


                            {/* BODY */}

                            <form
                                onSubmit={
                                    confirmerTerminaison
                                }
                                className="p-5 space-y-5"
                            >

                                {/* INFORMATION */}

                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">

                                    <p className="text-sm text-green-800">

                                        Pour terminer ce bon de commande,
                                        la pièce jointe de la facture est
                                        <strong> obligatoire</strong>.

                                    </p>

                                    <p className="text-sm text-green-700 mt-1">

                                        Le bon de livraison est
                                        <strong> optionnel</strong>.

                                    </p>

                                </div>


                                {/* FACTURE */}

                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">

                                        Pièce jointe de la facture

                                        <span className="text-red-500">
                                            {' '}*
                                        </span>

                                    </label>


                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) =>
                                            setFacture(
                                                e.target.files?.[0] || null
                                            )
                                        }
                                        className="w-full border rounded-lg p-2 text-sm"
                                    />


                                    <p className="text-xs text-gray-500 mt-1">

                                        Obligatoire — PDF, JPG, JPEG ou PNG —
                                        5 Mo maximum.

                                    </p>

                                </div>


                                {/* BON DE LIVRAISON */}

                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">

                                        Bon de livraison

                                        <span className="text-gray-400 text-xs ml-2">
                                            (optionnel)
                                        </span>

                                    </label>


                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) =>
                                            setBonLivraison(
                                                e.target.files?.[0] || null
                                            )
                                        }
                                        className="w-full border rounded-lg p-2 text-sm"
                                    />


                                    <p className="text-xs text-gray-500 mt-1">

                                        Optionnel — PDF, JPG, JPEG ou PNG —
                                        5 Mo maximum.

                                    </p>

                                </div>


                                {/* FOOTER */}

                                <div className="flex justify-end gap-3 pt-3 border-t">

                                    <button
                                        type="button"
                                        onClick={
                                            fermerModalTerminaison
                                        }
                                        disabled={
                                            processing
                                        }
                                        className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
                                    >
                                        Retour
                                    </button>


                                    <button
                                        type="submit"
                                        disabled={
                                            processing
                                        }
                                        className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                                    >

                                        {processing
                                            ? 'Enregistrement...'
                                            : 'Confirmer Terminé'}

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

        </AppLayout>
    );
}