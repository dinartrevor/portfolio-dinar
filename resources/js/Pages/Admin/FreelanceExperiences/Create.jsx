import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, X, Rocket, Upload } from 'lucide-react';
import { useState } from 'react';

export default function Create() {
    const [preview, setPreview] = useState(null);
    const [techInput, setTechInput] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        client_name: '',
        project_name: '',
        role: '',
        project_type: '',
        start_date: '',
        end_date: '',
        technologies: [],
        description: '',
        project_url: '',
        image: null,
        testimonial: '',
        status: 'completed',
        featured: false,
        order: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.freelance-experiences.store'));
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

    const addTech = (e) => {
        if (e.key === 'Enter' && techInput.trim()) {
            e.preventDefault();
            if (!data.technologies.includes(techInput.trim())) {
                setData('technologies', [...data.technologies, techInput.trim()]);
            }
            setTechInput('');
        }
    };

    const removeTech = (index) => {
        setData('technologies', data.technologies.filter((_, i) => i !== index));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Add Freelance Experience
                </h2>
            }
        >
            <Head title="Add Freelance Experience" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column: Main Info */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">
                                    <h3 className="text-lg font-black uppercase tracking-widest text-gray-400 mb-4">Project Details</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Project Name</label>
                                            <input
                                                type="text"
                                                value={data.project_name}
                                                onChange={(e) => setData('project_name', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500"
                                            />
                                            {errors.project_name && <div className="text-red-500 text-xs mt-1">{errors.project_name}</div>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Client Name</label>
                                            <input
                                                type="text"
                                                value={data.client_name}
                                                onChange={(e) => setData('client_name', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500"
                                            />
                                            {errors.client_name && <div className="text-red-500 text-xs mt-1">{errors.client_name}</div>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Your Role</label>
                                            <input
                                                type="text"
                                                value={data.role}
                                                onChange={(e) => setData('role', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500"
                                                placeholder="e.g. Lead Backend Developer"
                                            />
                                            {errors.role && <div className="text-red-500 text-xs mt-1">{errors.role}</div>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Project Type</label>
                                            <input
                                                type="text"
                                                value={data.project_type}
                                                onChange={(e) => setData('project_type', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500"
                                                placeholder="e.g. E-Commerce, SaaS, Mobile App"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Description</label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows="5"
                                            className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-cyan-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Technologies (Press Enter to add)</label>
                                        <input
                                            type="text"
                                            value={techInput}
                                            onChange={(e) => setTechInput(e.target.value)}
                                            onKeyDown={addTech}
                                            className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 mb-4"
                                            placeholder="Add tech stack..."
                                        />
                                        <div className="flex flex-wrap gap-2">
                                            {data.technologies.map((tech, i) => (
                                                <span key={i} className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-cyan-500 rounded-lg text-xs font-black border border-cyan-500/20">
                                                    {tech}
                                                    <button type="button" onClick={() => removeTech(i)}><X size={14} /></button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">
                                    <h3 className="text-lg font-black uppercase tracking-widest text-gray-400 mb-4">Testimonial (Optional)</h3>
                                    <textarea
                                        value={data.testimonial}
                                        onChange={(e) => setData('testimonial', e.target.value)}
                                        rows="3"
                                        className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-cyan-500"
                                        placeholder="What did the client say?"
                                    />
                                </div>
                            </div>

                            {/* Right Column: Sidebar Info */}
                            <div className="space-y-8">
                                <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">
                                    <h3 className="text-lg font-black uppercase tracking-widest text-gray-400 mb-4">Project Meta</h3>
                                    
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Status</label>
                                            <select
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3"
                                            >
                                                <option value="completed">Completed</option>
                                                <option value="on-going">On-Going</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Start Date</label>
                                            <input
                                                type="date"
                                                value={data.start_date}
                                                onChange={(e) => setData('start_date', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">End Date</label>
                                            <input
                                                type="date"
                                                value={data.end_date}
                                                onChange={(e) => setData('end_date', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Project URL</label>
                                            <input
                                                type="url"
                                                value={data.project_url}
                                                onChange={(e) => setData('project_url', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3"
                                                placeholder="https://..."
                                            />
                                        </div>

                                        <div className="flex items-center gap-3 py-2">
                                            <input
                                                type="checkbox"
                                                checked={data.featured}
                                                onChange={(e) => setData('featured', e.target.checked)}
                                                className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                                            />
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Featured Project</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">
                                    <h3 className="text-lg font-black uppercase tracking-widest text-gray-400 mb-4">Project Image</h3>
                                    
                                    <div 
                                        className="aspect-video rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-cyan-500/50 transition-colors"
                                        onClick={() => document.getElementById('image-upload').click()}
                                    >
                                        {preview ? (
                                            <img src={preview} className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-gray-300 mb-2" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Upload Thumbnail</span>
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
                                        <Save size={18} /> Save Experience
                                    </button>
                                    <Link
                                        href={route('admin.freelance-experiences.index')}
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
