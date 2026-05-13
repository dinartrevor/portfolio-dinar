import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, Trash, MailOpen } from 'lucide-react';

export default function Index({ messages }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this message?')) {
            destroy(route('admin.messages.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Inquiry Messages
                </h2>
            }
        >
            <Head title="Messages" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-xl sm:rounded-2xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="p-0 md:p-6 text-gray-900 dark:text-gray-100">
                            {/* Mobile View (Cards) */}
                            <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                                {messages.data.map((message) => (
                                    <div key={message.id} className={`p-6 space-y-4 ${!message.is_read ? 'bg-cyan-50/30 dark:bg-cyan-900/10' : ''}`}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-3 rounded-xl ${!message.is_read ? 'bg-cyan-100 text-cyan-600' : 'bg-gray-100 text-gray-400'} border border-transparent`}>
                                                    <MailOpen className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className={`font-black tracking-tight ${!message.is_read ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{message.name}</div>
                                                    <div className="text-xs text-gray-500 font-bold">{message.email}</div>
                                                </div>
                                            </div>
                                            {!message.is_read && (
                                                <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-widest bg-cyan-600 text-white rounded-full">New</span>
                                            )}
                                        </div>
                                        
                                        <div className="text-sm font-bold text-gray-700 dark:text-gray-300 line-clamp-1 italic">
                                            "{message.subject || '(No Subject)'}"
                                        </div>

                                        <div className="flex justify-between items-center pt-2">
                                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                {message.created_at}
                                            </div>
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route('admin.messages.show', message.id)}
                                                    className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 transition-all active:scale-90"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(message.id)}
                                                    className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/50 transition-all active:scale-90"
                                                >
                                                    <Trash className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop View (Table) */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th className="px-6 py-5 font-black uppercase text-[10px] text-gray-400 tracking-[0.2em]">Received Date</th>
                                            <th className="px-6 py-5 font-black uppercase text-[10px] text-gray-400 tracking-[0.2em]">Inquiry From</th>
                                            <th className="px-6 py-5 font-black uppercase text-[10px] text-gray-400 tracking-[0.2em]">Subject Line</th>
                                            <th className="px-6 py-5 font-black uppercase text-[10px] text-gray-400 tracking-[0.2em] text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {messages.data.map((message) => (
                                            <tr key={message.id} className={`hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors group ${!message.is_read ? 'bg-cyan-50/30 dark:bg-cyan-900/10 font-bold' : ''}`}>
                                                <td className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-widest">
                                                    {message.created_at}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-lg font-black tracking-tight text-gray-900 dark:text-white">{message.name}</span>
                                                        <span className="text-xs text-cyan-600 dark:text-cyan-400 font-bold">{message.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="max-w-xs truncate italic text-gray-600 dark:text-gray-400">
                                                        {message.subject || '(No Subject)'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            href={route('admin.messages.show', message.id)}
                                                            className="p-2.5 rounded-xl text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 border border-transparent hover:border-blue-200 dark:hover:border-blue-800/50 transition-all active:scale-95"
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(message.id)}
                                                            className="p-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 border border-transparent hover:border-red-200 dark:hover:border-red-800/50 transition-all active:scale-95"
                                                        >
                                                            <Trash className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {messages.data.length === 0 && (
                                <div className="py-24 text-center">
                                    <MailOpen className="w-16 h-16 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No inquiries received yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
