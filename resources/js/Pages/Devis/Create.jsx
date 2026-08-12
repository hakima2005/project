import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import { useMemo } from 'react';


export default function DevisCreate({
    bons_commande = [],
    fournisseurs = [],
}) {

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        reference_bc: '',
        id_fournisseur: '',
        reference_devis: '',
        date_devis: '',
        montant_ht: '',
        montant_tva: '',
        montant_retenue: '',
        montant_ttc: '',
        observation: '',
    });


    /**
     * =========================================================
     * BC SELECTIONNE
     * =========================================================
     */
    const selectedBC = useMemo(() => {
        return bons_commande.find(
            (bc) =>
                String(bc.reference_bc) ===
                String(data.reference_bc)
        );
    }, [
        bons_commande,
        data.reference_bc,
    ]);


    /**
     * =========================================================
     * TAUX TVA
     * =========================================================
     *
     * On utilise d'abord la valeur déjà calculée
     * sur le BC si elle existe.
     */
    const tauxTva = Number(
        selectedBC?.tva_applicable ?? 0
    );


    /**
     * =========================================================
     * TAUX RAS
     * =========================================================
     */
    const tauxRas = Number(
        selectedBC?.retenue_applicable ?? 0
    );


    /**
     * =========================================================
     * CALCUL DES MONTANTS
     * =========================================================
     */
    const calculerMontants = (
        montantHT,
        tauxTVA,
        tauxRAS
    ) => {

        const ht =
            parseFloat(montantHT) || 0;

        const tva =
            ht * (Number(tauxTVA) / 100);

        const retenue =
            ht * (Number(tauxRAS) / 100);

        /*
         * TTC = HT + TVA
         *
         * RAS est affichée séparément.
         */
        const ttc =
            ht + tva;


        setData({
            ...data,

            montant_ht:
                montantHT,

            montant_tva:
                tva.toFixed(2),

            montant_retenue:
                retenue.toFixed(2),

            montant_ttc:
                ttc.toFixed(2),
        });
    };


    /**
     * =========================================================
     * CHANGEMENT BC
     * =========================================================
     */
    const handleBCChange = (e) => {

        const reference =
            e.target.value;


        const bc =
            bons_commande.find(
                (item) =>
                    String(item.reference_bc) ===
                    String(reference)
            );


        /*
         * Quand on choisit un BC,
         * on garde le montant HT actuel
         * mais on recalcule TVA/RAS.
         */
        const ht =
            parseFloat(data.montant_ht) || 0;


        const tva =
            ht *
            (
                Number(
                    bc?.tva_applicable ?? 0
                ) / 100
            );


        const retenue =
            ht *
            (
                Number(
                    bc?.retenue_applicable ?? 0
                ) / 100
            );


        const ttc =
            ht + tva;


        setData({
            ...data,

            reference_bc:
                reference,

            montant_tva:
                tva.toFixed(2),

            montant_retenue:
                retenue.toFixed(2),

            montant_ttc:
                ttc.toFixed(2),
        });
    };


    /**
     * =========================================================
     * CHANGEMENT MONTANT HT
     * =========================================================
     */
    const handleMontantHTChange = (e) => {

        const ht =
            e.target.value;


        calculerMontants(
            ht,
            tauxTva,
            tauxRas
        );
    };


    /**
     * =========================================================
     * SUBMIT
     * =========================================================
     */
    const submit = (e) => {

        e.preventDefault();

        post(
            route('devis.store')
        );
    };


    return (
        <AppLayout title="Nouveau devis">

            <div className="max-w-3xl bg-white rounded-xl shadow p-6">

                <form
                    onSubmit={submit}
                    className="space-y-4"
                >

                    {/* =====================================================
                        BC + FOURNISSEUR
                    ====================================================== */}

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bon de commande *
                            </label>

                            <select
                                value={data.reference_bc}
                                onChange={handleBCChange}
                                className="w-full border border-gray-400 rounded-lg px-3 py-2"
                            >

                                <option value="">
                                    -- Choisir --
                                </option>

                                {bons_commande.map(
                                    (bc) => (
                                        <option
                                            key={bc.reference_bc}
                                            value={bc.reference_bc}
                                        >
                                            {bc.reference_bc}
                                            {' — '}
                                            {bc.objet || '...'}
                                        </option>
                                    )
                                )}

                            </select>

                            {errors.reference_bc && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.reference_bc}
                                </p>
                            )}

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Fournisseur *
                            </label>

                            <select
                                value={data.id_fournisseur}
                                onChange={(e) =>
                                    setData(
                                        'id_fournisseur',
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-400 rounded-lg px-3 py-2"
                            >

                                <option value="">
                                    -- Choisir --
                                </option>

                                {fournisseurs.map(
                                    (f) => (
                                        <option
                                            key={f.id_fournisseur}
                                            value={f.id_fournisseur}
                                        >
                                            {f.raison_sociale}
                                        </option>
                                    )
                                )}

                            </select>

                            {errors.id_fournisseur && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.id_fournisseur}
                                </p>
                            )}

                        </div>

                    </div>


                    {/* =====================================================
                        TAUX TVA / RAS
                    ====================================================== */}

                    {selectedBC && (
                        <div className="grid grid-cols-2 gap-4">

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">

                                <div className="text-xs text-gray-500">
                                    TVA applicable
                                </div>

                                <div className="text-lg font-semibold text-blue-600">
                                    {tauxTva.toFixed(2)} %
                                </div>

                            </div>


                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">

                                <div className="text-xs text-gray-500">
                                    Retenue à la source (RAS)
                                </div>

                                <div className="text-lg font-semibold text-orange-600">
                                    {tauxRas.toFixed(2)} %
                                </div>

                            </div>

                        </div>
                    )}


                    {/* =====================================================
                        REFERENCE + DATE
                    ====================================================== */}

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <input
                                type="text"
                                placeholder="Référence devis *"
                                value={data.reference_devis}
                                onChange={(e) =>
                                    setData(
                                        'reference_devis',
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-400 rounded-lg px-3 py-2"
                            />

                            {errors.reference_devis && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.reference_devis}
                                </p>
                            )}

                        </div>


                        <div>

                            <input
                                type="date"
                                value={data.date_devis}
                                onChange={(e) =>
                                    setData(
                                        'date_devis',
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-400 rounded-lg px-3 py-2"
                            />

                            {errors.date_devis && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.date_devis}
                                </p>
                            )}

                        </div>

                    </div>


                    {/* =====================================================
                        MONTANTS
                    ====================================================== */}

                    <div className="grid grid-cols-4 gap-3">

                        {/* HT */}

                        <div>

                            <label className="block text-xs text-gray-500 mb-1">
                                Montant HT
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="HT"
                                value={data.montant_ht}
                                onChange={handleMontantHTChange}
                                className="w-full border border-gray-400 rounded-lg px-3 py-2"
                            />

                            {errors.montant_ht && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.montant_ht}
                                </p>
                            )}

                        </div>


                        {/* TVA */}

                        <div>

                            <label className="block text-xs text-gray-500 mb-1">
                                TVA
                            </label>

                            <input
                                type="number"
                                value={data.montant_tva}
                                readOnly
                                className="w-full border border-gray-400 rounded-lg px-3 py-2 bg-gray-100"
                            />

                            {selectedBC && (
                                <span className="text-xs text-blue-500">
                                    {tauxTva.toFixed(2)}%
                                </span>
                            )}

                        </div>


                        {/* RAS */}

                        <div>

                            <label className="block text-xs text-gray-500 mb-1">
                                Retenue RAS
                            </label>

                            <input
                                type="number"
                                value={data.montant_retenue}
                                readOnly
                                className="w-full border border-gray-400 rounded-lg px-3 py-2 bg-gray-100"
                            />

                            {selectedBC && (
                                <span className="text-xs text-orange-500">
                                    {tauxRas.toFixed(2)}%
                                </span>
                            )}

                        </div>


                        {/* TTC */}

                        <div>

                            <label className="block text-xs text-gray-500 mb-1">
                                Montant TTC
                            </label>

                            <input
                                type="number"
                                value={data.montant_ttc}
                                readOnly
                                className="w-full border border-gray-400 rounded-lg px-3 py-2 bg-gray-100"
                            />

                        </div>

                    </div>


                    {/* =====================================================
                        OBSERVATION
                    ====================================================== */}

                    <div>

                        <textarea
                            rows="3"
                            placeholder="Observation"
                            value={data.observation}
                            onChange={(e) =>
                                setData(
                                    'observation',
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-400 rounded-lg px-3 py-2"
                        />

                        {errors.observation && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.observation}
                            </p>
                        )}

                    </div>


                    {/* =====================================================
                        BUTTONS
                    ====================================================== */}

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing
                                ? 'Enregistrement...'
                                : 'Enregistrer'}
                        </button>


                        <Link
                            href={route('devis.index')}
                            className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300"
                        >
                            Annuler
                        </Link>

                    </div>

                </form>

            </div>

        </AppLayout>
    );
}