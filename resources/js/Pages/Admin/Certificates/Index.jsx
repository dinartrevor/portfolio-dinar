import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Edit, Trash, Plus, Award, ExternalLink, Star } from 'lucide-react';

export default function Index({ certificates }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this certificate?')) {
            destroy(route('admin.certificates.destroy', id));
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
                        Manage Certificates
                    </h2>
                    <Link
                        href={route('admin.certificates.create')}
                        className="inline-flex items-center px-4 py-2 bg-cyan-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-cyan-500 active:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Certificate
                    </Link>
                </div>
            }
        >
            <Head title="Manage Certificates" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((cert) => (
                            <div key={cert.id} className="bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col group relative">
                                {cert.is_featured && (
                                    <div className="absolute top-4 left-4 z-10 p-2 bg-yellow-500/10 text-yellow-500 rounded-xl backdrop-blur-md border border-yellow-500/20">
                                        <Star size={16} fill="currentColor" />
                                    </div>
                                )}
                                
                                <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 dark:bg-gray-900">
                                    {cert.image ? (
                                        <img src={getImageUrl(cert.image)} alt={cert.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-700">
                                            <Award size={64} />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="mb-4">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-1">{cert.issuer}</div>
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight line-clamp-2">{cert.title}</h3>
                                    </div>
                                    
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-6 space-y-1">
                                        {cert.issue_date && <div>Issued: {new Date(cert.issue_date).toLocaleDateString()}</div>}
                                        {cert.credential_id && <div className="font-mono text-[10px] opacity-60">ID: {cert.credential_id}</div>}
                                    </div>
                                    
                                    <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-gray-700 mt-auto">
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('admin.certificates.edit', cert.id)}
                                                className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 transition-all active:scale-90"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(cert.id)}
                                                className="p-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/50 transition-all active:scale-90"
                                            >
                                                <Trash className="w-5 h-5" />
                                            </button>
                                        </div>
                                        {cert.credential_url && (
                                            <a href={cert.credential_url} target="_blank" className="text-gray-400 hover:text-cyan-500 transition-colors">
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {certificates.length === 0 && (
                        <div className="py-24 text-center bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-200 dark:border-gray-700 shadow-xl">
                            <Award className="w-16 h-16 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No certificates documented yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
