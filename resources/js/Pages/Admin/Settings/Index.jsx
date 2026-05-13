import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Edit, Settings as SettingsIcon, Layout, User, Mail, Globe } from 'lucide-react';

export default function Index({ settings }) {
    const getImageUrl = (path) => {
        if (!path) return null;
        
        // Handle potential JSON string for multiple images
        let targetPath = path;
        try {
            if (typeof path === 'string' && path.includes('[')) {
                const parsed = JSON.parse(path);
                targetPath = Array.isArray(parsed) ? parsed[0] : path;
            }
        } catch (e) {
            targetPath = path;
        }

        if (typeof targetPath !== 'string') return null;
        if (targetPath.startsWith('http')) return targetPath;
        
        let cleanPath = targetPath.replace(/^\/+/, '');
        if (cleanPath.startsWith('storage/')) {
            cleanPath = cleanPath.substring(8);
        }
        
        return `/storage/${cleanPath}`;
    };

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

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
                    {Object.entries(groupedSettings).map(([group, items]) => (
                        <div key={group} className="bg-white dark:bg-gray-800 shadow-2xl sm:rounded-[2rem] border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                                        {groupIcons[group] || groupIcons.general}
                                    </div>
                                    <h3 className="text-xl font-black capitalize tracking-tight">{group} Configuration</h3>
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 hidden sm:block">
                                    {items.length} Entries
                                </div>
                            </div>

                            {/* Mobile Cards */}
                            <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                                {items.map((setting) => (
                                    <div key={setting.id} className="p-6 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                                                {setting.key.replace(/_/g, ' ')}
                                            </div>
                                            <Link
                                                href={route('admin.settings.edit', setting.id)}
                                                className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </Link>
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 break-words leading-relaxed bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                                            {(setting.key.includes('image') || setting.key.includes('logo')) && setting.value ? (
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-white dark:border-gray-700 shadow-md">
                                                        <img 
                                                            src={getImageUrl(setting.value)} 
                                                            className="w-full h-full object-cover" 
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-mono break-all opacity-50">{setting.value}</span>
                                                </div>
                                            ) : (
                                                <span className="line-clamp-3">{setting.value}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                                            <th className="px-8 py-4 font-black uppercase text-[10px] text-gray-400 tracking-[0.2em] w-1/3">Setting Key</th>
                                            <th className="px-8 py-4 font-black uppercase text-[10px] text-gray-400 tracking-[0.2em]">Stored Value</th>
                                            <th className="px-8 py-4 font-black uppercase text-[10px] text-gray-400 tracking-[0.2em] text-right w-32">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {items.map((setting) => (
                                            <tr key={setting.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors group">
                                                <td className="px-8 py-5 font-bold text-gray-700 dark:text-gray-300">{setting.key}</td>
                                                <td className="px-8 py-5">
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xl line-clamp-1">
                                                        {(setting.key.includes('image') || setting.key.includes('logo')) && setting.value ? (
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm transition-transform group-hover:scale-110">
                                                                    <img src={getImageUrl(setting.value)} className="w-full h-full object-cover" />
                                                                </div>
                                                                <span className="truncate font-mono text-[10px] opacity-60">{setting.value}</span>
                                                            </div>
                                                        ) : (
                                                            <span className="font-medium">{setting.value}</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <Link
                                                        href={route('admin.settings.edit', setting.id)}
                                                        className="p-2.5 rounded-xl text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 border border-transparent hover:border-blue-200 dark:hover:border-blue-800/50 transition-all active:scale-95"
                                                    >
                                                        <Edit className="w-5 h-5" />
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
                        <div className="bg-white dark:bg-gray-800 p-12 text-center rounded-[2rem] border border-dashed border-gray-300 dark:border-gray-700">
                            <SettingsIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 font-black uppercase tracking-widest text-xs">No settings found. Please run the seeder.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
