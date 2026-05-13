import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Edit, Trash, Plus, Rocket, ExternalLink } from 'lucide-react';

export default function Index({ experiences }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            destroy(route('admin.freelance-experiences.destroy', id));
        }
    };

    const getImageUrl = (path) => {
        if (!path) return "/placeholder-profile.jpg";
        if (path.startsWith('http')) return path;
        return `/storage/${path}`;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Manage Freelance Experience
                    </h2>
                    <Link
                        href={route('admin.freelance-experiences.create')}
                        className="inline-flex items-center px-4 py-2 bg-cyan-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-cyan-500 active:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                    </Link>
                </div>
            }
        >
            <Head title="Manage Freelance Experience" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {experiences.map((exp) => (
                            <div key={exp.id} className="bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col group">
                                <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-900">
                                    {exp.image ? (
                                        <img src={getImageUrl(exp.image)} alt={exp.project_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-700">
                                            <Rocket size={48} />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${exp.status === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'} backdrop-blur-md`}>
                                            {exp.status}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="mb-4">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-1">{exp.client_name}</div>
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight">{exp.project_name}</h3>
                                    </div>
                                    
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 flex-1">
                                        {exp.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {exp.technologies?.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="px-2 py-0.5 text-[9px] font-bold bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded border border-gray-200 dark:border-gray-600">
                                                {tech}
                                            </span>
                                        ))}
                                        {exp.technologies?.length > 3 && (
                                            <span className="text-[9px] font-bold text-gray-400">+{exp.technologies.length - 3}</span>
                                        )}
                                    </div>
                                    
                                    <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-gray-700">
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('admin.freelance-experiences.edit', exp.id)}
                                                className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 transition-all active:scale-90"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(exp.id)}
                                                className="p-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/50 transition-all active:scale-90"
                                            >
                                                <Trash className="w-5 h-5" />
                                            </button>
                                        </div>
                                        {exp.project_url && (
                                            <a href={exp.project_url} target="_blank" className="text-gray-400 hover:text-cyan-500 transition-colors">
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {experiences.length === 0 && (
                        <div className="py-24 text-center bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-200 dark:border-gray-700 shadow-xl">
                            <Rocket className="w-16 h-16 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No freelance projects documented yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
