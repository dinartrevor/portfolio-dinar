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

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th className="px-6 py-4 font-bold uppercase text-xs text-gray-500 tracking-wider">Date</th>
                                            <th className="px-6 py-4 font-bold uppercase text-xs text-gray-500 tracking-wider">Sender</th>
                                            <th className="px-6 py-4 font-bold uppercase text-xs text-gray-500 tracking-wider">Subject</th>
                                            <th className="px-6 py-4 font-bold uppercase text-xs text-gray-500 tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {messages.data.map((message) => (
                                            <tr key={message.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${!message.is_read ? 'font-bold bg-cyan-50/30 dark:bg-cyan-900/10' : ''}`}>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {message.created_at}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span>{message.name}</span>
                                                        <span className="text-xs text-gray-500 font-normal">{message.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="max-w-xs truncate">
                                                        {message.subject || '(No Subject)'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-3">
                                                    <Link
                                                        href={route('admin.messages.show', message.id)}
                                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(message.id)}
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 inline-flex items-center"
                                                    >
                                                        <Trash className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {messages.data.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                                    No messages found.
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
