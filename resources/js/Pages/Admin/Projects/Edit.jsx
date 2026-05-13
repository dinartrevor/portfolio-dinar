import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, ChevronLeft, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function Edit({ project }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: project.data.title || '',
        description: project.data.description || '',
        tech_stack: project.data.tech_stack || [],
        thumbnail: null,
        demo_url: project.data.demo_url || '',
        github_url: project.data.github_url || '',
        category: project.data.category || '',
        is_featured: project.data.is_featured || false,
        order: project.data.order || 0,
    });

    console.log(project.data)

    const [techInput, setTechInput] = useState(project.data.tech_stack?.join(', ') || '');
    const [preview, setPreview] = useState(null);

    const handleTechInput = (e) => {
        const val = e.target.value;
        setTechInput(val);
        const techs = val.split(',').map(t => t.trim()).filter(t => t !== '');
        setData('tech_stack', techs);
    };

    const submit = (e) => {
        e.preventDefault();
        // Since we are uploading a file (potentially), we use POST with _method PUT
        post(route('admin.projects.update', project.data.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('admin.projects.index')} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Project: {project.data.title}
                    </h2>
                </div>
            }
        >
            <Head title={`Edit ${project.data.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                    />
                                    {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                    <input
                                        type="text"
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                    />
                                    {errors.category && <div className="text-red-500 text-xs mt-1">{errors.category}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Display Order</label>
                                    <input
                                        type="number"
                                        value={data.order}
                                        onChange={e => setData('order', e.target.value)}
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                    />
                                    {errors.order && <div className="text-red-500 text-xs mt-1">{errors.order}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tech Stack (comma separated)</label>
                                <input
                                    type="text"
                                    value={techInput}
                                    onChange={handleTechInput}
                                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                    placeholder="Laravel, React, Tailwind, MySQL"
                                />
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {data.tech_stack.map((tech, i) => (
                                        <span key={i} className="px-2 py-1 text-xs rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-800">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                {errors.tech_stack && <div className="text-red-500 text-xs mt-1">{errors.tech_stack}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows="4"
                                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                ></textarea>
                                {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Demo URL</label>
                                    <input
                                        type="url"
                                        value={data.demo_url}
                                        onChange={e => setData('demo_url', e.target.value)}
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                    />
                                    {errors.demo_url && <div className="text-red-500 text-xs mt-1">{errors.demo_url}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">GitHub URL</label>
                                    <input
                                        type="url"
                                        value={data.github_url}
                                        onChange={e => setData('github_url', e.target.value)}
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                    />
                                    {errors.github_url && <div className="text-red-500 text-xs mt-1">{errors.github_url}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Thumbnail Image (Leave blank to keep current)</label>
                                <div className="mt-2 flex items-center gap-4">
                                    <div className="w-32 h-20 rounded-xl bg-gray-100 dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center overflow-hidden shadow-inner">
                                        {preview ? (
                                            <img src={preview} alt="New Preview" className="w-full h-full object-cover" />
                                        ) : project.thumbnail ? (
                                            <img src={project.thumbnail.startsWith('http') ? project.thumbnail : `/storage/${project.thumbnail}`} alt="Current" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="w-6 h-6 text-gray-400" />
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        onChange={e => {
                                            const file = e.target.files[0];
                                            setData('thumbnail', file);
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => setPreview(reader.result);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
                                    />
                                </div>
                                {errors.thumbnail && <div className="text-red-500 text-xs mt-1">{errors.thumbnail}</div>}
                            </div>

                            <div className="flex items-center p-4 rounded-xl bg-cyan-50/50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-900/30">
                                <input
                                    type="checkbox"
                                    id="is_featured"
                                    checked={data.is_featured}
                                    onChange={e => setData('is_featured', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-cyan-600 shadow-sm focus:ring-cyan-500"
                                />
                                <label htmlFor="is_featured" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Mark as Featured Project
                                </label>
                            </div>

                            <div className="flex justify-end gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                                <Link
                                    href={route('admin.projects.index')}
                                    className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-6 py-2 bg-cyan-600 border border-transparent rounded-xl font-bold text-xs text-white uppercase tracking-widest hover:bg-cyan-500 disabled:opacity-50 shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Update Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
