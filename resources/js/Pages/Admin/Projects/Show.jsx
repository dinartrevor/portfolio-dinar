import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, ExternalLink, Award, Tag, Calendar } from 'lucide-react';

export default function Show({ project }) {
    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        
        let cleanPath = path.replace(/^\/+/, '');
        if (cleanPath.startsWith('storage/')) {
            cleanPath = cleanPath.substring(8);
        }
        
        return `/storage/${cleanPath}`;
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
                                            GitHub Repo <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
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
