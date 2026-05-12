import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, ExternalLink, GithubIcon, Award, Tag, Calendar } from 'lucide-react';

export default function Show({ project }) {
    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `/storage/${path}`;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('admin.projects.index')} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Project Details: {project.title}
                    </h2>
                </div>
            }
        >
            <Head title={`Project: ${project.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {/* Main Info */}
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8">
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-200 dark:border-cyan-800">
                                        {project.category || 'Uncategorized'}
                                    </span>
                                    {project.is_featured && (
                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-xs font-bold uppercase tracking-wider border border-yellow-200 dark:border-yellow-800">
                                            <Award className="w-3.5 h-3.5" /> Featured
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{project.title}</h1>
                                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {project.description || 'No description provided.'}
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Tag className="w-5 h-5 text-cyan-500" /> Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {project.tech_stack?.length > 0 ? project.tech_stack.map((tech, i) => (
                                        <span key={i} className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium shadow-sm">
                                            {tech}
                                        </span>
                                    )) : (
                                        <p className="text-gray-500 italic">No technologies listed.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Thumbnail */}
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
                                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">Thumbnail</h3>
                                <div className="aspect-video rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden shadow-inner">
                                    {project.thumbnail ? (
                                        <img src={getImageUrl(project.thumbnail)} alt={project.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 italic text-sm">No Image</div>
                                    )}
                                </div>
                            </div>

                            {/* Links */}
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
                                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">Project Links</h3>
                                <div className="space-y-3">
                                    {project.demo_url ? (
                                        <a href={project.demo_url} target="_blank" className="flex items-center justify-between p-4 rounded-xl bg-cyan-600 text-white hover:bg-cyan-500 transition-all font-bold shadow-lg shadow-cyan-500/20">
                                            Live Demo <ExternalLink className="w-4 h-4" />
                                        </a>
                                    ) : (
                                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 text-gray-400 text-sm italic">Demo URL not set</div>
                                    )}
                                    {project.github_url ? (
                                        <a href={project.github_url} target="_blank" className="flex items-center justify-between p-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-all font-bold">
                                            GitHub Repo <GithubIcon className="w-4 h-4" />
                                        </a>
                                    ) : (
                                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 text-gray-400 text-sm italic">GitHub URL not set</div>
                                    )}
                                </div>
                            </div>

                            {/* Meta */}
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> Created</span>
                                        <span className="text-sm font-medium dark:text-gray-300">{new Date(project.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Display Order</span>
                                        <span className="text-sm font-medium dark:text-gray-300">{project.order}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
