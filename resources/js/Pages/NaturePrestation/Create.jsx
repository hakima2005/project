import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { Link, useForm } from '@inertiajs/react';

export default function NaturePrestationCreate({
    typesCategories = [],
}) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        code_nat_prest: '',
        intitule_fr: '',
        intitule_ar: '',
        description: '',
        id_type_categorie: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post('/natures-prestation');
    };

    return (
        <AppLayout title="Nouvelle nature de prestation">

            <div className="max-w-2xl">

                <Card title="Nouvelle nature de prestation">

                    <form
                        onSubmit={submit}
                        className="space-y-5"
                    >

                        {/* Code */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Code *
                            </label>

                            <input
                                type="text"
                                value={data.code_nat_prest}
                                onChange={(e) =>
                                    setData(
                                        'code_nat_prest',
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                placeholder="Ex: NP004"
                            />

                            {errors.code_nat_prest && (
                                <p className="text-rose-500 text-xs mt-1">
                                    {errors.code_nat_prest}
                                </p>
                            )}

                        </div>

                        {/* Type catégorie */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type de catégorie *
                            </label>

                            <select
                                value={data.id_type_categorie}
                                onChange={(e) =>
                                    setData(
                                        'id_type_categorie',
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            >

                                <option value="">
                                    -- Choisir un type de catégorie --
                                </option>

                                {typesCategories.map((type) => (

                                    <option
                                        key={type.id_type_categorie}
                                        value={type.id_type_categorie}
                                    >
                                        {type.libelle}
                                    </option>

                                ))}

                            </select>

                            {errors.id_type_categorie && (
                                <p className="text-rose-500 text-xs mt-1">
                                    {errors.id_type_categorie}
                                </p>
                            )}

                        </div>

                        {/* Intitulé FR */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Intitulé FR *
                            </label>

                            <input
                                type="text"
                                value={data.intitule_fr}
                                onChange={(e) =>
                                    setData(
                                        'intitule_fr',
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />

                            {errors.intitule_fr && (
                                <p className="text-rose-500 text-xs mt-1">
                                    {errors.intitule_fr}
                                </p>
                            )}

                        </div>

                        {/* Intitulé AR */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Intitulé AR
                            </label>

                            <input
                                type="text"
                                dir="rtl"
                                value={data.intitule_ar}
                                onChange={(e) =>
                                    setData(
                                        'intitule_ar',
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />

                            {errors.intitule_ar && (
                                <p className="text-rose-500 text-xs mt-1">
                                    {errors.intitule_ar}
                                </p>
                            )}

                        </div>

                        {/* Description */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>

                            <textarea
                                rows={3}
                                value={data.description}
                                onChange={(e) =>
                                    setData(
                                        'description',
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />

                            {errors.description && (
                                <p className="text-rose-500 text-xs mt-1">
                                    {errors.description}
                                </p>
                            )}

                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">

                            <Button type="submit" variant="primary" disabled={processing}>
                                {processing
                                    ? 'Enregistrement...'
                                    : 'Enregistrer'}
                            </Button>

                            <Button as={Link} href="/natures-prestation" variant="secondary">
                                Annuler
                            </Button>

                        </div>

                    </form>

                </Card>

            </div>

        </AppLayout>
    );
}