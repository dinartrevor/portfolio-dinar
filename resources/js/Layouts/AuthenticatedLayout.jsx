import Dropdown from '@/Components/Dropdown';
import { Link, usePage, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Toast from '@/Components/Toast';
import Sidebar from '@/Components/Admin/Sidebar';
import { 
    Menu,
    Bell,
    Search,
    ChevronDown
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, flash, settings } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (flash.success) {
            setToast({ message: flash.success, type: 'success' });
        } else if (flash.error) {
            setToast({ message: flash.error, type: 'error' });
        }
    }, [flash]);

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `/storage/${path}`;
    };

    const favicon = getImageUrl(settings?.site_logo_icon);

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Head>
                {favicon && <link rel="icon" type="image/x-icon" href={favicon} />}
            </Head>

            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(null)} 
                />
            )}

            {/* Sidebar Component */}
            <Sidebar 
                isOpen={isSidebarOpen} 
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            />

            {/* Main Content Area */}
            <div className="lg:pl-72 flex flex-col min-h-screen transition-all duration-300">
                {/* Top Header */}
                <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-xl px-6 lg:px-10">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 text-gray-400 hover:text-gray-600 lg:hidden"
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">

                        <div className="h-8 w-px bg-gray-100 hidden sm:block"></div>

                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 shadow-sm font-black text-xs uppercase">
                                        {auth.user.name.substring(0, 2)}
                                    </div>
                                    <div className="hidden sm:block text-left">
                                        <div className="text-xs font-black text-gray-900 tracking-tight">{auth.user.name}</div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Administrator</div>
                                    </div>
                                    <ChevronDown size={14} className="text-gray-400" />
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Account Settings
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Sign Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-10">
                    {header && (
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-1 w-8 bg-cyan-600 rounded-full"></div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Management Console</span>
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{header}</h1>
                        </div>
                    )}
                    
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <footer className="px-6 lg:px-10 py-6 border-t border-gray-50 bg-white/50 text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} {settings?.site_title || 'Portfolio'}.
                    </p>
                </footer>
            </div>
        </div>
    );
}
