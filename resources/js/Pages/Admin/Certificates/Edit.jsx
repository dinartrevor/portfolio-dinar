import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, X, Award, Upload } from 'lucide-react';
import { useState } from 'react';

export default function Edit({ certificate }) {
    const [preview, setPreview] = useState(certificate.image ? `/storage/${certificate.image}` : null);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: certificate.title || '',
        issuer: certificate.issuer || '',
        issue_date: certificate.issue_date || '',
        credential_id: certificate.credential_id || '',
        credential_url: certificate.credential_url || '',
        image: null,
        description: certificate.description || '',
        order: certificate.order || 0,
        is_featured: certificate.is_featured ?? false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.certificates.update', certificate.id));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Certificate: {certificate.title}
                </h2>
            }
        >
            <Head title={`Edit Certificate - ${certificate.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Certificate Title</label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500"
                                        />
                                        {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Issuer</label>
                                            <input
                                                type="text"
                                                value={data.issuer}
                                                onChange={(e) => setData('issuer', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500"
                                            />
                                            {errors.issuer && <div className="text-red-500 text-xs mt-1">{errors.issuer}</div>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Issue Date</label>
                                            <input
                                                type="date"
                                                value={data.issue_date}
                                                onChange={(e) => setData('issue_date', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Description</label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows="4"
                                            className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-cyan-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">
                                    <h3 className="text-lg font-black uppercase tracking-widest text-gray-400 mb-4">Credential Info</h3>
                                    
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Credential ID</label>
                                            <input
                                                type="text"
                                                value={data.credential_id}
                                                onChange={(e) => setData('credential_id', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Credential URL</label>
                                            <input
                                                type="url"
                                                value={data.credential_url}
                                                onChange={(e) => setData('credential_url', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Display Order</label>
                                                <input
                                                    type="number"
                                                    value={data.order}
                                                    onChange={(e) => setData('order', e.target.value)}
                                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3"
                                                />
                                            </div>
                                            <div className="flex items-center gap-3 py-2">
                                                <input
                                                    type="checkbox"
                                                    checked={data.is_featured}
                                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                                    className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                                                />
                                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Featured</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">
                                    <h3 className="text-lg font-black uppercase tracking-widest text-gray-400 mb-4">Certificate Image</h3>
                                    
                                    <div 
                                        className="aspect-[4/3] rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-cyan-500/50 transition-colors"
                                        onClick={() => document.getElementById('image-upload').click()}
                                    >
                                        {preview ? (
                                            <img src={preview} className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-gray-300 mb-2" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Upload Image</span>
                                            </>
                                        )}
                                        <input
                                            id="image-upload"
                                            type="file"
                                            className="hidden"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-4 bg-cyan-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-500 disabled:opacity-50 transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2"
                                    >
                                        <Save size={18} /> Update Certificate
                                    </button>
                                    <Link
                                        href={route('admin.certificates.index')}
                                        className="w-full py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-black text-xs uppercase tracking-widest text-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
