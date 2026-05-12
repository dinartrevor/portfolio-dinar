import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, ChevronLeft, Image as ImageIcon, Upload } from 'lucide-react';

export default function Edit({ setting }) {
    const { data, setData, post, put, processing, errors } = useForm({
        value: setting.value || '',
        _method: 'PUT',
    });

    const [previews, setPreviews] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (setting.key === 'profile_image') {
            setData('value', files);
            const filePreviews = files.map(file => URL.createObjectURL(file));
            setPreviews(filePreviews);
        } else {
            const file = files[0];
            setData('value', file);
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setPreviews([reader.result]);
                reader.readAsDataURL(file);
            }
        }
    };

    const submit = (e) => {
        e.preventDefault();
        
        // For file uploads, Inertia recommends using post with _method spoofing
        if (data.value instanceof File || (Array.isArray(data.value) && data.value[0] instanceof File)) {
            post(route('admin.settings.update', setting.id), {
                forceFormData: true,
            });
        } else {
            put(route('admin.settings.update', setting.id));
        }
    };

    const isImageSetting = setting.key.includes('image') || setting.key.includes('logo');
    const isMultiple = setting.key === 'profile_image';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('admin.settings.index')} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Edit Setting: {setting.key}
                    </h2>
                </div>
            }
        >
            <Head title={`Edit ${setting.key}`} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <form onSubmit={submit} className="p-8 space-y-8">
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Value for <span className="text-cyan-600">{setting.key.replace(/_/g, ' ')}</span>
                                </label>

                                {setting.key.includes('description') || setting.key.includes('bio') || setting.key.includes('about') ? (
                                    <textarea
                                        value={data.value}
                                        onChange={e => setData('value', e.target.value)}
                                        rows="8"
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                                        placeholder={`Enter ${setting.key.replace(/_/g, ' ')} here...`}
                                    ></textarea>
                                ) : isImageSetting ? (
                                    <div className="space-y-6">
                                        {/* Current Values */}
                                        {setting.value && (
                                            <div className="space-y-2">
                                                <span className="text-xs font-semibold text-gray-500 uppercase">Current Asset(s)</span>
                                                <div className="flex flex-wrap gap-4">
                                                    {isMultiple ? (
                                                        JSON.parse(setting.value).map((path, i) => (
                                                            <div key={i} className="w-24 h-24 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                                                                <img src={path.startsWith('http') ? path : `/storage/${path}`} alt="" className="w-full h-full object-cover" />
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="w-32 h-32 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                                                            <img src={setting.value.startsWith('http') ? setting.value : `/storage/${setting.value}`} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* New Previews */}
                                        {previews.length > 0 && (
                                            <div className="space-y-2">
                                                <span className="text-xs font-semibold text-cyan-600 uppercase">New Selection Preview</span>
                                                <div className="flex flex-wrap gap-4">
                                                    {previews.map((src, i) => (
                                                        <div key={i} className="w-24 h-24 rounded-xl overflow-hidden border-2 border-cyan-500 shadow-xl scale-105 transition-transform">
                                                            <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Dropzone Area */}
                                        <div className="relative group">
                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group-hover:border-cyan-500/50">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <Upload className="w-8 h-8 mb-3 text-gray-400 group-hover:text-cyan-500 transition-colors" />
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                            <span className="font-bold">Click to upload</span> or drag and drop
                                                        </p>
                                                        <p className="text-xs text-gray-400">PNG, JPG or WEBP (MAX. 2MB {isMultiple ? 'per file' : ''})</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        multiple={isMultiple}
                                                        onChange={handleFileChange}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        value={data.value}
                                        onChange={e => setData('value', e.target.value)}
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                        placeholder={`Enter ${setting.key.replace(/_/g, ' ')}...`}
                                    />
                                )}
                                {errors.value && <div className="text-red-500 text-xs mt-1 font-medium">{errors.value}</div>}
                            </div>

                            <div className="flex justify-end gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
                                <Link
                                    href={route('admin.settings.index')}
                                    className="px-6 py-2.5 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-8 py-2.5 bg-cyan-600 border border-transparent rounded-xl font-bold text-xs text-white uppercase tracking-widest hover:bg-cyan-500 disabled:opacity-50 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
