import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Edit, Trash, Plus, Briefcase } from 'lucide-react';

export default function Index({ experiences }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            destroy(route('admin.experiences.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Manage Experience
                    </h2>
                    <Link
                        href={route('admin.experiences.create')}
                        className="inline-flex items-center px-4 py-2 bg-cyan-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-cyan-500 active:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                    </Link>
                </div>
            }
        >
            <Head title="Manage Experience" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-xl sm:rounded-2xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="p-0 md:p-6 text-gray-900 dark:text-gray-100">
                            {/* Mobile View (Cards) */}
                            <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                                {experiences.data.map((experience) => (
                                    <div key={experience.id} className="p-6 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-800/50">
                                                    <Briefcase className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="font-black text-gray-900 dark:text-white leading-tight">{experience.company}</div>
                                                    <div className="text-sm text-cyan-600 dark:text-cyan-400 font-bold">{experience.position}</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-50 dark:bg-gray-900/50 px-3 py-1.5 rounded-lg inline-block">
                                            {experience.start_date} — {experience.is_current ? 'Present' : experience.end_date}
                                        </div>

                                        <div className="flex justify-end gap-3 pt-2">
                                            <Link
                                                href={route('admin.experiences.edit', experience.id)}
                                                className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 transition-all active:scale-90"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(experience.id)}
                                                className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/50 transition-all active:scale-90"
                                            >
                                                <Trash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop View (Table) */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th className="px-6 py-5 font-black uppercase text-[10px] text-gray-400 tracking-[0.2em]">Organization</th>
                                            <th className="px-6 py-5 font-black uppercase text-[10px] text-gray-400 tracking-[0.2em]">Role / Position</th>
                                            <th className="px-6 py-5 font-black uppercase text-[10px] text-gray-400 tracking-[0.2em]">Timeframe</th>
                                            <th className="px-6 py-5 font-black uppercase text-[10px] text-gray-400 tracking-[0.2em] text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {experiences.data.map((experience) => (
                                            <tr key={experience.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors group">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-400 group-hover:text-cyan-500 transition-colors">
                                                            <Briefcase className="w-5 h-5" />
                                                        </div>
                                                        <div className="font-black text-gray-900 dark:text-white text-lg tracking-tight">{experience.company}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 font-bold text-cyan-600 dark:text-cyan-400">{experience.position}</td>
                                                <td className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-widest">
                                                    {experience.start_date} — {experience.is_current ? 'Present' : experience.end_date}
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            href={route('admin.experiences.edit', experience.id)}
                                                            className="p-2.5 rounded-xl text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 border border-transparent hover:border-blue-200 dark:hover:border-blue-800/50 transition-all active:scale-95"
                                                        >
                                                            <Edit className="w-5 h-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(experience.id)}
                                                            className="p-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 border border-transparent hover:border-red-200 dark:hover:border-red-800/50 transition-all active:scale-95"
                                                        >
                                                            <Trash className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {experiences.data.length === 0 && (
                                <div className="py-24 text-center">
                                    <Briefcase className="w-16 h-16 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No experience records found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
