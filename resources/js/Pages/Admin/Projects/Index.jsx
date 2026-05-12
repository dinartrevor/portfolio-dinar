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

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th className="px-6 py-4 font-bold uppercase text-[10px] text-gray-500 tracking-wider">Thumbnail</th>
                                            <th className="px-6 py-4 font-bold uppercase text-[10px] text-gray-500 tracking-wider">Title & Tech Stack</th>
                                            <th className="px-6 py-4 font-bold uppercase text-[10px] text-gray-500 tracking-wider text-center">Category</th>
                                            <th className="px-6 py-4 font-bold uppercase text-[10px] text-gray-500 tracking-wider text-center">Featured</th>
                                            <th className="px-6 py-4 font-bold uppercase text-[10px] text-gray-500 tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {projects.data.data.map((project) => (
                                            <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="w-20 h-14 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden border border-gray-100 dark:border-gray-600 shadow-sm">
                                                        {project.thumbnail ? (
                                                            <img src={project.thumbnail.startsWith('http') ? project.thumbnail : `/storage/${project.thumbnail}`} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                                <ExternalLink className="w-4 h-4" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-800 dark:text-gray-200 mb-1">{project.title}</div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {project.tech_stack?.map((tech, i) => (
                                                            <span key={i} className="px-1.5 py-0.5 text-[10px] rounded bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                                        {project.category || 'Uncategorized'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {project.is_featured ? (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                            Featured
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs text-gray-400 italic">Standard</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <Link
                                                        href={route('admin.projects.edit', project.id)}
                                                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 inline-flex transition-colors"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(project.id)}
                                                        className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 inline-flex transition-colors"
                                                    >
                                                        <Trash className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {projects.data.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <Search className="w-8 h-8 text-gray-300" />
                                                        <p>No projects found matching your criteria.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {projects.meta.pagination.last_page > 1 && (
                                <div className="mt-8 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                    <div className="text-xs text-gray-500">
                                        Showing {projects.meta.pagination.from} to {projects.meta.pagination.to} of {projects.meta.pagination.total} entries
                                    </div>
                                    <div className="flex gap-1">
                                        {projects.links.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.url || '#'}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className={`px-3 py-1 rounded text-xs transition-all ${
                                                    link.active 
                                                        ? 'bg-cyan-600 text-white shadow-lg' 
                                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100'
                                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
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
