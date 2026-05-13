import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, X, Heart } from 'lucide-react';

export default function Edit({ hobby }) {
    const { data, setData, put, processing, errors } = useForm({
        name: hobby.name || '',
        icon: hobby.icon || '',
        description: hobby.description || '',
        order: hobby.order || 0,
        is_active: hobby.is_active ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.hobbies.update', hobby.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Hobby: {hobby.name}
                </h2>
            }
        >
            <Head title={`Edit Hobby - ${hobby.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700">
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Hobby Name</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 transition-all"
                                        />
                                        {errors.name && <div className="text-red-500 text-xs font-bold mt-1">{errors.name}</div>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Icon (Lucide Name)</label>
                                        <input
                                            type="text"
                                            value={data.icon}
                                            onChange={(e) => setData('icon', e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 transition-all"
                                        />
                                        {errors.icon && <div className="text-red-500 text-xs font-bold mt-1">{errors.icon}</div>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Display Order</label>
                                        <input
                                            type="number"
                                            value={data.order}
                                            onChange={(e) => setData('order', e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 transition-all"
                                        />
                                        {errors.order && <div className="text-red-500 text-xs font-bold mt-1">{errors.order}</div>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Status</label>
                                        <select
                                            value={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.value === 'true')}
                                            className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 transition-all font-bold"
                                        >
                                            <option value="true">Active</option>
                                            <option value="false">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows="4"
                                        className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 transition-all"
                                    />
                                    {errors.description && <div className="text-red-500 text-xs font-bold mt-1">{errors.description}</div>}
                                </div>

                                <div className="flex justify-end gap-4 pt-4">
                                    <Link
                                        href={route('admin.hobbies.index')}
                                        className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                                    >
                                        <X className="w-4 h-4 mr-2" /> Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-8 py-3 bg-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-cyan-500 disabled:opacity-50 transition-all shadow-lg shadow-cyan-500/20"
                                    >
                                        <Save className="w-4 h-4 mr-2" /> Update Hobby
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
