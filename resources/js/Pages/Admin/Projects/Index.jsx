import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Edit, Trash, Plus, ExternalLink, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Index({ projects, filters }) {
    const { delete: destroy } = useForm();
    const [search, setSearch] = useState(filters.search || '');
;    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this project?')) {
            destroy(route('admin.projects.destroy', id));
        }
    };

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        
        let cleanPath = path.replace(/^\/+/, '');
        if (cleanPath.startsWith('storage/')) {
            cleanPath = cleanPath.substring(8);
        }
        
        return `/storage/${cleanPath}`;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.projects.index'), { search }, {
            preserveState: true,
            replace: true
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Manage Projects
                    </h2>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
                            <input 
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search projects..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
                            />
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        </form>
                        <Link
                            href={route('admin.projects.create')}
                            className="inline-flex items-center px-4 py-2 bg-cyan-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-cyan-500 active:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ease-in-out duration-150"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Project
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Manage Projects" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-xl sm:rounded-2xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="p-0 md:p-6 text-gray-900 dark:text-gray-100">
                            {/* Mobile View (Cards) */}
                            <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                                {projects.data.data.map((project) => (
                                    <div key={project.id} className="p-6 space-y-4">
                                        <div className="flex gap-4">
                                            <div className="w-24 h-16 shrink-0 rounded-xl bg-gray-200 dark:bg-gray-700 overflow-hidden border border-gray-100 dark:border-gray-600 shadow-sm">
                                                {project.thumbnail ? (
                                                    <img src={getImageUrl(project.thumbnail)} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-gray-400">
                                                        <ExternalLink className="w-5 h-5" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-black text-gray-900 dark:text-white truncate mb-1">{project.title}</div>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold uppercase tracking-wider">
                                                        {project.category || 'Web App'}
                                                    </span>
                                                    {project.is_featured && (
                                                        <span className="px-2 py-0.5 text-[10px] rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold uppercase tracking-wider">
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-1">
                                            {project.tech_stack?.map((tech, i) => (
                                                <span key={i} className="px-2 py-0.5 text-[10px] rounded-lg bg-cyan-100/50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 border border-cyan-200/50 dark:border-cyan-800/50 font-medium">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center pt-2">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route('admin.projects.edit', project.id)}
                                                    className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 transition-all active:scale-90"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/50 transition-all active:scale-90"
                                                >
                                                    <Trash className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <Link 
                                                href={route('admin.projects.show', project.id)}
                                                className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1 hover:text-cyan-500 transition-colors"
                                            >
                                                View Details <ExternalLink className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop View (Table) */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th className="px-6 py-5 font-black uppercase text-[10px] text-gray-400 tracking-[0.2em]">Thumbnail</th>
                                            <th className="px-6 py-5 font-black uppercase text-[10px] text-gray-400 tracking-[0.2em]">Title & Tech Stack</th>
                                            <th className="px-6 py-5 font-black uppercase text-[10px] text-gray-400 tracking-[0.2em] text-center">Category</th>
                                            <th className="px-6 py-5 font-black uppercase text-[10px] text-gray-400 tracking-[0.2em] text-center">Featured</th>
                                            <th className="px-6 py-5 font-black uppercase text-[10px] text-gray-400 tracking-[0.2em] text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {projects.data.data.map((project) => (
                                            <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="w-24 h-16 rounded-xl bg-gray-200 dark:bg-gray-700 overflow-hidden border border-gray-100 dark:border-gray-600 shadow-sm transition-transform group-hover:scale-105">
                                                        {project.thumbnail ? (
                                                            <img src={getImageUrl(project.thumbnail)} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                                <ExternalLink className="w-5 h-5" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-black text-gray-900 dark:text-white mb-2 text-lg tracking-tight">{project.title}</div>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {project.tech_stack?.map((tech, i) => (
                                                            <span key={i} className="px-2 py-0.5 text-[10px] rounded-lg bg-cyan-100/50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 border border-cyan-200/50 dark:border-cyan-800/50 font-bold uppercase tracking-wider">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
                                                        {project.category || 'Uncategorized'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {project.is_featured ? (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/50">
                                                            Featured
                                                        </span>
                                                    ) : (
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-50">Standard</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            href={route('admin.projects.edit', project.id)}
                                                            className="p-2.5 rounded-xl text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 border border-transparent hover:border-blue-200 dark:hover:border-blue-800/50 transition-all active:scale-95"
                                                        >
                                                            <Edit className="w-5 h-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(project.id)}
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

                            {projects.data.data.length === 0 && (
                                <div className="py-24 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="p-6 rounded-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                                            <Search className="w-12 h-12 text-gray-300" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">No projects found</h3>
                                            <p className="text-sm mt-1">Try adjusting your search or add a new project.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Pagination */}
                            {projects.meta.pagination.last_page > 1 && (
                                <div className="mt-8 flex flex-col md:flex-row justify-between items-center bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 gap-6">
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                        Showing {projects.meta.pagination.from}-{projects.meta.pagination.to} of {projects.meta.pagination.total}
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {projects.links.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.url || '#'}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                                                    link.active 
                                                        ? 'bg-cyan-600 text-white shadow-xl shadow-cyan-500/40 scale-110' 
                                                        : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-cyan-500/50'
                                                } ${!link.url && 'opacity-30 cursor-not-allowed pointer-events-none'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
