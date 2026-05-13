import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Trash, ChevronLeft, Mail, User, Calendar, MessageSquare } from 'lucide-react';

export default function Show({ message }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this message?')) {
            destroy(route('admin.messages.destroy', message.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admin.messages.index')} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                            <ChevronLeft className="w-6 h-6" />
                        </Link>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            View Message
                        </h2>
                    </div>
                    <button
                        onClick={handleDelete}
                        disabled={processing}
                        className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 disabled:opacity-50 transition ease-in-out duration-150"
                    >
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                    </button>
                </div>
            }
        >
            <Head title="View Message" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="p-8">
                            <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-gray-100 dark:border-gray-700">
                                <div className="space-y-1">
                                    <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                        <User className="w-3 h-3 mr-1" /> Sender
                                    </div>
                                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{message.name}</div>
                                    <div className="text-sm text-cyan-600 dark:text-cyan-400 flex items-center">
                                        <Mail className="w-3 h-3 mr-1" /> {message.email}
                                    </div>
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                        <Calendar className="w-3 h-3 mr-1" /> Sent At
                                    </div>
                                    <div className="text-gray-700 dark:text-gray-300">
                                        {message.created_at}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subject</div>
                                    <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                        {message.subject || '(No Subject)'}
                                    </div>
                                </div>
                                
                                <div className="pt-4">
                                    <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                                        <MessageSquare className="w-3 h-3 mr-1" /> Message Body
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap border border-gray-100 dark:border-gray-700">
                                        {message.message}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex justify-center">
                                <a 
                                    href={`mailto:${message.email}?subject=Re: ${message.subject || 'Portfolio Inquiry'}`}
                                    className="px-8 py-3 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-500 transition-all flex items-center gap-2"
                                >
                                    <Mail className="w-5 h-5" />
                                    Reply via Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
