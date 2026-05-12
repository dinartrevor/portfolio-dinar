import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Edit, Settings as SettingsIcon, Layout, User, Mail, Globe } from 'lucide-react';

export default function Index({ settings }) {
    // Group settings by their 'group' property
    const groupedSettings = settings.data.reduce((acc, setting) => {
        const group = setting.group || 'general';
        if (!acc[group]) acc[group] = [];
        acc[group].push(setting);
        return acc;
    }, {});

    const groupIcons = {
        site: <Globe className="w-5 h-5 text-blue-500" />,
        hero: <Layout className="w-5 h-5 text-purple-500" />,
        about: <User className="w-5 h-5 text-cyan-500" />,
        contact: <Mail className="w-5 h-5 text-green-500" />,
        general: <SettingsIcon className="w-5 h-5 text-gray-500" />,
    };

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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    {Object.entries(groupedSettings).map(([group, items]) => (
                        <div key={group} className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex items-center gap-3">
                                {groupIcons[group] || groupIcons.general}
                                <h3 className="text-lg font-bold capitalize">{group} Settings</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                                            <th className="px-6 py-3 font-bold uppercase text-[10px] text-gray-500 tracking-wider w-1/3">Key</th>
                                            <th className="px-6 py-3 font-bold uppercase text-[10px] text-gray-500 tracking-wider">Value</th>
                                            <th className="px-6 py-3 font-bold uppercase text-[10px] text-gray-500 tracking-wider text-right w-24">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {items.map((setting) => (
                                            <tr key={setting.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{setting.key}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xl line-clamp-1">
                                                        {(setting.key.includes('image') || setting.key.includes('logo')) && setting.value ? (
                                                            <div className="flex items-center gap-2">
                                                                <img src={setting.value.startsWith('http') ? setting.value : `/storage/${setting.value}`} className="w-8 h-8 rounded object-cover" />
                                                                <span className="truncate">{setting.value}</span>
                                                            </div>
                                                        ) : (
                                                            setting.value
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        href={route('admin.settings.edit', setting.id)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg inline-flex"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}

                    {settings.data.length === 0 && (
                        <div className="bg-white dark:bg-gray-800 p-12 text-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                            <SettingsIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No settings found. Please run the seeder.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
