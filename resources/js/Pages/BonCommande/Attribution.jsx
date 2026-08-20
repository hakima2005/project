import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Minus, ShieldAlert } from 'lucide-react';

export default function Attribution({
    bon_commande,
    devis,
    fournisseurs,
}) {
    const [showNewFournisseur, setShowNewFournisseur] = useState(false);

    // Corrigé : la garantie se vérifie sur les désignations, pas sur le BC
    const estGaranti =
        bon_commande.designations?.some((d) => d.garanti) || false;

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
                <Card title="Attribution du bon de commande">

                    <div className="grid grid-cols-2 gap-4 text-sm">

                        <div>
                            <span className="text-gray-500">
                                Référence
                            </span>

                            <p className="font-semibold text-navy-900">
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
                                {estGaranti ? 'Oui' : 'Non'}
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
                </Card>


                {/* =====================================================
                    DEVIS REÇUS
                ====================================================== */}
                <Card title={`Devis reçus (${devis?.length || 0})`}>

                    {devis?.length > 0 ? (

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead>
                                    <tr className="bg-cream-100">

                                        <th className="text-left p-3 rounded-l-lg">
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

                                        <th className="text-left p-3 rounded-r-lg">
                                            Montant TTC
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {devis.map((d) => (

                                        <tr
                                            key={d.id_devis}
                                            className="border-t border-cream-200"
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

                                            <td className="p-3 font-medium text-navy-800">
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

                </Card>


                {/* =====================================================
                    FORMULAIRE ATTRIBUTION
                ====================================================== */}
                <Card title="Informations d'attribution">

                    <form
                        onSubmit={submit}
                        className="space-y-5"
                    >

                        {/* =================================================
                            FOURNISSEUR
                        ================================================== */}
                        <div>

                            <label className="block text-sm font-medium mb-1 text-gray-700">
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
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
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
                                <p className="text-rose-500 text-xs mt-1">
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
                                className={`mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border-2 border-dashed transition-colors
                                ${showNewFournisseur
                                    ? 'border-rose-300 text-rose-600 hover:bg-rose-50'
                                    : 'border-gold-400 text-gold-700 hover:bg-gold-50 hover:border-gold-500'
                                }`}
                            >
                                {showNewFournisseur ? (
                                    <>
                                        <Minus size={16} /> Fermer le formulaire
                                    </>
                                ) : (
                                    <>
                                        <Plus size={16} /> Ajouter un nouveau fournisseur
                                    </>
                                )}
                            </button>

                        </div>


                        {/* =====================================================
                            NOUVEAU FOURNISSEUR
                        ====================================================== */}
                        {showNewFournisseur && (

                            <div className="border border-navy-200 bg-navy-50 rounded-xl p-5">

                                <div className="flex items-center justify-between mb-5">

                                    <div>
                                        <h4 className="font-display font-semibold text-navy-900">
                                            Ajouter un nouveau fournisseur
                                        </h4>

                                        <p className="text-xs text-navy-600 mt-1">
                                            Le fournisseur n'existe pas encore
                                            dans la liste.
                                        </p>
                                    </div>

                                </div>


                                <div className="grid grid-cols-2 gap-4">

                                    {/* Raison sociale */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">
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
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                                        />
                                    </div>


                                    {/* Identifiant fiscal */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">
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
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                                        />
                                    </div>


                                    {/* ICE */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">
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
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                                        />
                                    </div>


                                    {/* RC */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">
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
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                                        />
                                    </div>


                                    {/* CNSS */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">
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
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                                        />
                                    </div>


                                    {/* Téléphone */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">
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
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                                        />
                                    </div>


                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">
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
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                                        />
                                    </div>


                                    {/* Représentation */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">
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
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                                        />
                                    </div>

                                </div>


                                {/* Activité principale */}
                                <div className="mt-4">

                                    <label className="block text-sm font-medium mb-1 text-gray-700">
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
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                                    />

                                </div>


                                {/* Bouton */}
                                <div className="flex gap-3 mt-5">

                                    <Button
                                        type="button"
                                        variant="primary"
                                        onClick={() => {
                                            alert(
                                                'Le formulaire est prêt. Nous allons maintenant le connecter au backend.'
                                            );
                                        }}
                                    >
                                        Ajouter le fournisseur
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() =>
                                            setShowNewFournisseur(false)
                                        }
                                    >
                                        Fermer
                                    </Button>

                                </div>

                            </div>

                        )}


                        {/* =================================================
                            NOMBRE DE DEVIS + MONTANT HT
                        ================================================== */}
                        <div className="grid grid-cols-2 gap-4">

                            <div>

                                <label className="block text-sm font-medium mb-1 text-gray-700">
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
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />

                                {errors.nombre_devis && (
                                    <p className="text-rose-500 text-xs mt-1">
                                        {errors.nombre_devis}
                                    </p>
                                )}

                            </div>


                            <div>

                                <label className="block text-sm font-medium mb-1 text-gray-700">
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
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />

                                {errors.montant_ht && (
                                    <p className="text-rose-500 text-xs mt-1">
                                        {errors.montant_ht}
                                    </p>
                                )}

                            </div>

                        </div>


                        {/* =================================================
                            GARANTIE
                        ================================================== */}
                        {estGaranti && (

                            <div className="border border-gold-200 bg-gold-50 rounded-lg p-4">

                                <p className="flex items-center gap-2 font-medium text-gold-800 mb-3">
                                    <ShieldAlert size={17} />
                                    Ce bon de commande est garanti.
                                </p>

                                <label className="block text-sm font-medium mb-1 text-gray-700">
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
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                                />

                                <p className="text-xs text-gray-500 mt-1">
                                    PDF, JPG ou PNG — 5 Mo maximum
                                </p>

                                {errors.justificatif_caution && (
                                    <p className="text-rose-500 text-xs mt-1">
                                        {errors.justificatif_caution}
                                    </p>
                                )}

                            </div>

                        )}


                        {/* =================================================
                            BOUTONS
                        ================================================== */}
                        <div className="flex gap-3 pt-3">

                            <Button
                                type="submit"
                                variant="primary"
                                disabled={processing}
                            >
                                {processing
                                    ? 'Attribution...'
                                    : "Confirmer l'attribution"}
                            </Button>

                            <Button
                                as={Link}
                                href={route('bons-commande.index')}
                                variant="secondary"
                            >
                                Annuler
                            </Button>

                        </div>

                    </form>

                </Card>

            </div>

        </AppLayout>
    );
}