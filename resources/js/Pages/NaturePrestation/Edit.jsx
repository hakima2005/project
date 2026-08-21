import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { useForm, Link } from '@inertiajs/react';

export default function NaturePrestationEdit({ nature, typesCategories }) {

    const { data, setData, put, processing, errors } = useForm({
        intitule_fr: nature.intitule_fr,
        intitule_ar: nature.intitule_ar || '',
        description: nature.description || '',
        id_type_categorie: nature.id_type_categorie || '',
    });

    return (
        <AppLayout title="Modifier nature de prestation">

            <div className="max-w-2xl">

                <Card title="Modifier la nature de prestation">

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            put(`/natures-prestation/${nature.code_nat_prest}`);
                        }}
                        className="space-y-4"
                    >

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>

                            <input
                                value={nature.code_nat_prest}
                                disabled
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-cream-100 text-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type de catégorie *</label>

                            <select
                                value={data.id_type_categorie}
                                onChange={(e) =>
                                    setData('id_type_categorie', e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            >
                                <option value="">
                                    -- Choisir un type de catégorie --
                                </option>

                                {typesCategories?.map((type) => (
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Intitulé FR</label>

                            <input
                                value={data.intitule_fr}
                                onChange={(e) =>
                                    setData('intitule_fr', e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Intitulé AR</label>

                            <input
                                dir="rtl"
                                value={data.intitule_ar}
                                onChange={(e) =>
                                    setData('intitule_ar', e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>

                            <textarea
                                rows={3}
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">

                            <Button type="submit" variant="primary" disabled={processing}>
                                Mettre à jour
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