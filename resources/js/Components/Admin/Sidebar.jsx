import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Layers, 
    Briefcase, 
    Zap, 
    Award, 
    GraduationCap, 
    Share2, 
    Settings, 
    Mail, 
    Heart,
    Rocket,
    LogOut,
    User,
    ChevronRight,
    X
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { auth, settings } = usePage().props;
    const currentRoute = route().current();

    const getImageUrl = (path) => {
        if (!path) return "/placeholder-profile.jpg";
        if (path.startsWith('http')) return path;
        return `/storage/${path}`;
    };

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: route('admin.dashboard'), active: currentRoute === 'admin.dashboard' },
        { name: 'Projects', icon: Layers, href: route('admin.projects.index'), active: currentRoute?.startsWith('admin.projects') },
        { name: 'Experience', icon: Briefcase, href: route('admin.experiences.index'), active: currentRoute?.startsWith('admin.experiences') },
        { name: 'Freelance', icon: Rocket, href: route('admin.freelance-experiences.index'), active: currentRoute?.startsWith('admin.freelance-experiences') },
        { name: 'Skills', icon: Zap, href: route('admin.skills.index'), active: currentRoute?.startsWith('admin.skills') },
        { name: 'Certificates', icon: Award, href: route('admin.certificates.index'), active: currentRoute?.startsWith('admin.certificates') },
        { name: 'Hobbies', icon: Heart, href: route('admin.hobbies.index'), active: currentRoute?.startsWith('admin.hobbies') },
        { name: 'Education', icon: GraduationCap, href: route('admin.educations.index'), active: currentRoute?.startsWith('admin.educations') },
        { name: 'Social Links', icon: Share2, href: route('admin.social-links.index'), active: currentRoute?.startsWith('admin.social-links') },
        { name: 'Messages', icon: Mail, href: route('admin.messages.index'), active: currentRoute?.startsWith('admin.messages') },
        { name: 'Settings', icon: Settings, href: route('admin.settings.index'), active: currentRoute?.startsWith('admin.settings') },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-gray-100 z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-600 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                                <Rocket size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-lg tracking-tight text-cyan-600 leading-none">Dinar Abdul Hollik.</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Zero To Hero</span>
                            </div>
                        </Link>
                        <button onClick={toggleSidebar} className="lg:hidden p-2 text-gray-400 hover:text-gray-600">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-4 mb-4">Main Menu</div>
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all group ${
                                    item.active 
                                    ? 'bg-cyan-50 text-cyan-700 shadow-sm shadow-cyan-100/50' 
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={20} className={item.active ? 'text-cyan-600' : 'text-gray-400 group-hover:text-gray-600 transition-colors'} />
                                    <span className="text-sm font-bold tracking-tight">{item.name}</span>
                                </div>
                                {item.active && <ChevronRight size={14} className="text-cyan-400" />}
                            </Link>
                        ))}
                    </div>

                    {/* Footer / User Profile */}
                    <div className="p-4 border-t border-gray-50">
                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/50 border border-gray-100">
                            <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 shadow-sm">
                                <User size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-black text-gray-900 truncate">{auth.user.name}</div>
                                <div className="text-[10px] font-bold text-gray-400 truncate uppercase tracking-widest">{auth.user.email}</div>
                            </div>
                            <Link 
                                href={route('logout')} 
                                method="post" 
                                as="button"
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <LogOut size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #e5e5e5;
                }
            `}} />
        </>
    );
};

export default Sidebar;
