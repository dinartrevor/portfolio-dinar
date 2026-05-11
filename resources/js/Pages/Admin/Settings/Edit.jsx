import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, ChevronLeft } from 'lucide-react';

export default function Edit({ setting }) {
    const { data, setData, put, processing, errors } = useForm({
        value: setting.value || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.settings.update', setting.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('admin.settings.index')} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Edit Setting: {setting.key}
                    </h2>
                </div>
            }
        >
            <Head title={`Edit ${setting.key}`} />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Value for {setting.key}</label>
                                {setting.key.includes('description') || setting.key.includes('bio') || setting.key.includes('about') ? (
                                    <textarea
                                        value={data.value}
                                        onChange={e => setData('value', e.target.value)}
                                        rows="6"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                    ></textarea>
                                ) : (
                                    <input
                                        type="text"
                                        value={data.value}
                                        onChange={e => setData('value', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                    />
                                )}
                                {errors.value && <div className="text-red-500 text-xs mt-1">{errors.value}</div>}
                            </div>

                            <div className="flex justify-end gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                                <Link
                                    href={route('admin.settings.index')}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 bg-cyan-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-cyan-500 disabled:opacity-50 transition ease-in-out duration-150"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Update Setting
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
