import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Edit, Settings as SettingsIcon } from 'lucide-react';

export default function Index({ settings }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    System Settings
                </h2>
            }
        >
            <Head title="Settings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th className="px-6 py-4 font-bold uppercase text-xs text-gray-500 tracking-wider">Key</th>
                                            <th className="px-6 py-4 font-bold uppercase text-xs text-gray-500 tracking-wider">Value</th>
                                            <th className="px-6 py-4 font-bold uppercase text-xs text-gray-500 tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {settings.data.map((setting) => (
                                            <tr key={setting.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 font-medium">
                                                    <div className="flex items-center">
                                                        <SettingsIcon className="w-4 h-4 mr-3 text-gray-400" />
                                                        {setting.key}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="max-w-md truncate text-gray-500 dark:text-gray-400">
                                                        {setting.value}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        href={route('admin.settings.edit', setting.id)}
                                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                        {settings.data.length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-10 text-center text-gray-500">
                                                    No settings found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
