import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Toast from '@/Components/Toast';
import { 
    LayoutDashboard, 
    Layers, 
    Briefcase, 
    Zap, 
    Award, 
    GraduationCap, 
    Share2, 
    Settings as SettingsIcon, 
    Mail, 
    ChevronDown,
    Menu,
    X as CloseIcon
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    
    const { flash } = usePage().props;
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (flash.success) {
            setToast({ message: flash.success, type: 'success' });
        } else if (flash.error) {
            setToast({ message: flash.error, type: 'error' });
        }
    }, [flash]);

    const navItems = [
        { name: 'Dashboard', href: route('admin.dashboard'), active: route().current('admin.dashboard'), icon: <LayoutDashboard className="w-4 h-4" /> },
        { name: 'Projects', href: route('admin.projects.index'), active: route().current('admin.projects.*'), icon: <Layers className="w-4 h-4" /> },
        { name: 'Experience', href: route('admin.experiences.index'), active: route().current('admin.experiences.*'), icon: <Briefcase className="w-4 h-4" /> },
        { name: 'Skills', href: route('admin.skills.index'), active: route().current('admin.skills.*'), icon: <Zap className="w-4 h-4" /> },
        { name: 'Certificates', href: route('admin.certificates.index'), active: route().current('admin.certificates.*'), icon: <Award className="w-4 h-4" /> },
        { name: 'Education', href: route('admin.educations.index'), active: route().current('admin.educations.*'), icon: <GraduationCap className="w-4 h-4" /> },
        { name: 'Social', href: route('admin.social-links.index'), active: route().current('admin.social-links.*'), icon: <Share2 className="w-4 h-4" /> },
        { name: 'Settings', href: route('admin.settings.index'), active: route().current('admin.settings.*'), icon: <SettingsIcon className="w-4 h-4" /> },
        { name: 'Messages', href: route('admin.messages.index'), active: route().current('admin.messages.*'), icon: <Mail className="w-4 h-4" /> },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 transition-colors duration-500">
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(null)} 
                />
            )}
            <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/80 transition-all">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="group flex items-center gap-2">
                                    <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 group-hover:rotate-6 transition-transform">
                                        <ApplicationLogo className="w-6 h-6 fill-current" />
                                    </div>
                                    <span className="hidden md:block font-black tracking-tighter text-xl text-gray-900 dark:text-white uppercase italic">Portfolio<span className="text-cyan-600">Admin</span></span>
                                </Link>
                            </div>

                            <div className="hidden space-x-1 sm:-my-px sm:ms-10 lg:flex items-center">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        href={item.href}
                                        active={item.active}
                                        className="flex items-center gap-2 px-3 py-2 text-sm font-bold transition-all rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        <span className={`${item.active ? 'text-cyan-600' : 'text-gray-400'}`}>{item.icon}</span>
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                {showingNavigationDropdown ? (
                                    <CloseIcon className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('admin.dashboard')}
                            active={route().current('admin.dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('admin.projects.index')}
                            active={route().current('admin.projects.*')}
                        >
                            Projects
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('admin.experiences.index')}
                            active={route().current('admin.experiences.*')}
                        >
                            Experience
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('admin.skills.index')}
                            active={route().current('admin.skills.*')}
                        >
                            Skills
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('admin.certificates.index')}
                            active={route().current('admin.certificates.*')}
                        >
                            Certificates
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('admin.educations.index')}
                            active={route().current('admin.educations.*')}
                        >
                            Education
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('admin.social-links.index')}
                            active={route().current('admin.social-links.*')}
                        >
                            Social Links
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('admin.settings.index')}
                            active={route().current('admin.settings.*')}
                        >
                            Settings
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('admin.messages.index')}
                            active={route().current('admin.messages.*')}
                        >
                            Messages
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
