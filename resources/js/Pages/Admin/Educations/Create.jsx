import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, ChevronLeft } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        institution: '',
        degree: '',
        major: '',
        gpa: '',
        start_year: '',
        end_year: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.educations.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('admin.educations.index')} className="text-gray-500 hover:text-gray-700">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Add Education
                    </h2>
                </div>
            }
        >
            <Head title="Add Education" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Institution</label>
                                <input
                                    type="text"
                                    value={data.institution}
                                    onChange={e => setData('institution', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                    placeholder="e.g. University of Technology"
                                />
                                {errors.institution && <div className="text-red-500 text-xs mt-1">{errors.institution}</div>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Degree</label>
                                    <input
                                        type="text"
                                        value={data.degree}
                                        onChange={e => setData('degree', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                        placeholder="e.g. Bachelor"
                                    />
                                    {errors.degree && <div className="text-red-500 text-xs mt-1">{errors.degree}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Major</label>
                                    <input
                                        type="text"
                                        value={data.major}
                                        onChange={e => setData('major', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                        placeholder="e.g. Computer Science"
                                    />
                                    {errors.major && <div className="text-red-500 text-xs mt-1">{errors.major}</div>}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Year</label>
                                    <input
                                        type="text"
                                        value={data.start_year}
                                        onChange={e => setData('start_year', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                        placeholder="2017"
                                    />
                                    {errors.start_year && <div className="text-red-500 text-xs mt-1">{errors.start_year}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Year</label>
                                    <input
                                        type="text"
                                        value={data.end_year}
                                        onChange={e => setData('end_year', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                        placeholder="2021"
                                    />
                                    {errors.end_year && <div className="text-red-500 text-xs mt-1">{errors.end_year}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">GPA</label>
                                    <input
                                        type="text"
                                        value={data.gpa}
                                        onChange={e => setData('gpa', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                        placeholder="3.8/4.0"
                                    />
                                    {errors.gpa && <div className="text-red-500 text-xs mt-1">{errors.gpa}</div>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                                <Link
                                    href={route('admin.educations.index')}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 bg-cyan-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-cyan-500 disabled:opacity-50 transition ease-in-out duration-150"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Education
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
