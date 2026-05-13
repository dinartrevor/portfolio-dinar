import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Briefcase, 
    Layers, 
    Zap, 
    Award, 
    Plus, 
    ExternalLink, 
    ArrowRight,
    TrendingUp,
    Users,
    Eye
} from 'lucide-react';

export default function Dashboard({ stats }) {
    const cards = [
        { 
            title: 'Total Projects', 
            value: stats?.projects || 0, 
            icon: <Layers className="w-6 h-6 text-blue-500" />, 
            link: route('admin.projects.index'),
            color: 'blue'
        },
        { 
            title: 'Experience', 
            value: stats?.experiences || 0, 
            icon: <Briefcase className="w-6 h-6 text-purple-500" />, 
            link: route('admin.experiences.index'),
            color: 'purple'
        },
        { 
            title: 'Skills Set', 
            value: stats?.skills || 0, 
            icon: <Zap className="w-6 h-6 text-cyan-500" />, 
            link: route('admin.skills.index'),
            color: 'cyan'
        },
        { 
            title: 'Certificates', 
            value: stats?.certificates || 0, 
            icon: <Award className="w-6 h-6 text-green-500" />, 
            link: route('admin.certificates.index'),
            color: 'green'
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-black leading-tight text-gray-800 dark:text-gray-100 tracking-tight">
                    Admin <span className="text-cyan-600">Command Center</span>
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
                    {/* Welcome Header */}
                    <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl">
                        <div className="relative z-10">
                            <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
                                Welcome Back, <span className="text-cyan-400">Chief!</span>
                            </h1>
                            <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
                                Your portfolio is currently active and showcasing your best work. 
                                Everything is looking sharp and optimized for your visitors.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link 
                                    href="/" 
                                    target="_blank"
                                    className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/30"
                                >
                                    <Eye className="w-5 h-5 mr-2" />
                                    View Live Portfolio
                                </Link>
                                <Link 
                                    href={route('admin.projects.create')}
                                    className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all backdrop-blur-md border border-white/10"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add New Project
                                </Link>
                            </div>
                        </div>
                        {/* Abstract Background Element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -ml-24 -mb-24"></div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cards.map((card, i) => (
                            <Link 
                                key={i}
                                href={card.link}
                                className="group relative bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-700 transition-all hover:scale-[1.02] hover:shadow-2xl"
                            >
                                <div className="flex flex-col h-full justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className={`p-4 rounded-2xl bg-${card.color}-50 dark:bg-${card.color}-900/20 shadow-inner`}>
                                            {card.icon}
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <div className="mt-8">
                                        <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-1">
                                            {card.value}
                                        </div>
                                        <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                            {card.title}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Quick Overview Section */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                                <h3 className="text-lg font-black tracking-tight">System <span className="text-cyan-600">Health</span></h3>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Online</span>
                                </div>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                                            <TrendingUp className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">Engagement Rate</div>
                                            <div className="text-xs text-gray-500">Live analytics tracking active</div>
                                        </div>
                                    </div>
                                    <div className="text-xl font-black text-blue-600">+12%</div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">Unique Visitors</div>
                                            <div className="text-xs text-gray-500">Based on last 30 days</div>
                                        </div>
                                    </div>
                                    <div className="text-xl font-black text-purple-600">1.2k</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[2rem] p-8 text-white shadow-xl flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-black mb-4">Quick Tip</h3>
                                <p className="text-cyan-50/80 leading-relaxed">
                                    Keeping your portfolio updated regularly with new projects increases your visibility to potential clients and employers by up to 40%.
                                </p>
                            </div>
                            <Link 
                                href={route('admin.settings.index')}
                                className="mt-8 flex items-center justify-between group"
                            >
                                <span className="font-bold uppercase tracking-widest text-sm">Manage Settings</span>
                                <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all">
                                    <ExternalLink className="w-5 h-5" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
