import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function CategorieCreate({ familles, tvas, exercices, typesCategories }) {

    const { data, setData, post, processing, errors } = useForm({
        code_categorie: '',
        nom_fr: '',
        nom_ar: '',
        type_budget: 'fonctionnement',
        montant_affecte: '',
        id_tva: '',
        code_famille: '',
        id_exercice: '',
        id_type_categorie: '',
    });

    return (
        <AppLayout title="Nouvelle catégorie">

            <div className="max-w-2xl bg-white rounded-xl shadow p-6">

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        post('/categories');
                    }}
                    className="space-y-4"
                >

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Code *
                            </label>

                            <input
                                type="text"
                                value={data.code_categorie}
                                onChange={(e) => setData('code_categorie', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            />

                            {errors.code_categorie &&
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.code_categorie}
                                </p>
                            }
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Exercice *
                            </label>

                            <select
                                value={data.id_exercice}
                                onChange={(e) => setData('id_exercice', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option value="">-- Choisir --</option>

                                {exercices.map((ex) => (
                                    <option
                                        key={ex.id_exercice}
                                        value={ex.id_exercice}
                                    >
                                        {ex.annee}
                                    </option>
                                ))}
                            </select>

                            {errors.id_exercice &&
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.id_exercice}
                                </p>
                            }
                        </div>

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-1">
                            Famille *
                        </label>

                        <select
                            value={data.code_famille}
                            onChange={(e) => setData('code_famille', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">-- Choisir --</option>

                            {familles.map((f) => (
                                <option
                                    key={f.code_famille}
                                    value={f.code_famille}
                                >
                                    {f.nom_fr}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Type catégorie *
                        </label>
                        <select
                        value={data.id_type_categorie}
                        onChange={(e) =>
                            setData('id_type_categorie', e.target.value)
                        }
                        className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">-- Choisir --</option>
                            {typesCategories.map((type) => (
                                <option
                                    key={type.id_type_categorie}
                                    value={type.id_type_categorie}
                                >
                                    {type.libelle}
                                </option>
                            ))}
                            </select>
                            {errors.id_type_categorie &&
                            <p className="text-red-500 text-xs mt-1">
                                {errors.id_type_categorie}
                            </p>
                            }
                        </div>

                    <div>

                        <label className="block text-sm font-medium mb-1">
                            Nom FR *
                        </label>

                        <input
                            type="text"
                            value={data.nom_fr}
                            onChange={(e) => setData('nom_fr', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-1">
                            Nom AR
                        </label>

                        <input
                            type="text"
                            value={data.nom_ar}
                            onChange={(e) => setData('nom_ar', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <label className="block text-sm font-medium mb-1">
                                Type budget
                            </label>

                            <select
                                value={data.type_budget}
                                onChange={(e) => setData('type_budget', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option value="fonctionnement">
                                    Fonctionnement
                                </option>

                                <option value="investissement">
                                    Investissement
                                </option>

                            </select>

                        </div>

                        <div>

                            <label className="block text-sm font-medium mb-1">
                                Montant affecté
                            </label>

                            <input
                                type="number"
                                min="0"
                                value={data.montant_affecte}
                                onChange={(e) => setData('montant_affecte', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-1">
                            TVA
                        </label>

                        <select
                            value={data.id_tva}
                            onChange={(e) => setData('id_tva', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">-- Choisir --</option>

                            {tvas.map((tva) => (
                                <option
                                    key={tva.id_tva}
                                    value={tva.id_tva}
                                >
                                    {tva.pourcentage} % - {tva.description}
                                </option>
                            ))}

                        </select>

                    </div>

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                        >
                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                        </button>

                        <Link
                            href="/categories"
                            className="bg-gray-300 px-6 py-2 rounded-lg"
                        >
                            Annuler
                        </Link>

                    </div>

                </form>

            </div>

        </AppLayout>
    );
}