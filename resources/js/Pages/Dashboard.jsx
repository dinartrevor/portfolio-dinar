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
    Eye,
    Heart,
    Rocket
} from 'lucide-react';

export default function Dashboard({ stats }) {
    const cards = [
        { 
            title: 'Full Stack Projects', 
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
            title: 'Freelance Work', 
            value: stats?.freelance_experiences || 0, 
            icon: <Rocket className="w-6 h-6 text-orange-500" />, 
            link: route('admin.freelance-experiences.index'),
            color: 'orange'
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
        { 
            title: 'Interests', 
            value: stats?.hobbies || 0, 
            icon: <Heart className="w-6 h-6 text-red-500" />, 
            link: route('admin.hobbies.index'),
            color: 'red'
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

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
                    {/* Welcome Header */}
                    <div className="relative overflow-hidden bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-2xl shadow-gray-200/50">
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-1 w-10 bg-cyan-600 rounded-full"></div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Dashboard Overview</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 mb-6 leading-[0.9]">
                                    Hello, Dinar
                                </h1>
                                <p className="text-gray-500 max-w-xl text-lg font-medium leading-relaxed">
                                    Your professional portfolio is performing excellently. 
                                    Ready to showcase some new achievements today?
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link 
                                    href="/" 
                                    target="_blank"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-gray-800 shadow-xl shadow-gray-900/10 active:scale-95"
                                >
                                    <Eye className="w-5 h-5 mr-3" />
                                    Live Preview
                                </Link>
                                <Link 
                                    href={route('admin.projects.create')}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-cyan-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-cyan-500 shadow-xl shadow-cyan-600/20 active:scale-95"
                                >
                                    <Plus className="w-5 h-5 mr-3" />
                                    New Project
                                </Link>
                            </div>
                        </div>
                        {/* Abstract Background Element */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-60"></div>
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 rounded-full blur-[100px] -ml-36 -mb-36 opacity-60"></div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cards.map((card, i) => (
                            <Link 
                                key={i}
                                href={card.link}
                                className="group relative bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/30 border border-gray-50 transition-all hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-gray-200/50 overflow-hidden"
                            >
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="p-4 rounded-[1.25rem] bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:border-cyan-100 transition-all duration-500">
                                            {card.icon}
                                        </div>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-600">Explore</span>
                                            <ArrowRight className="w-4 h-4 text-cyan-500" />
                                        </div>
                                    </div>
                                    <div className="mt-12">
                                        <div className="text-5xl font-black text-gray-900 tracking-tighter mb-2 group-hover:text-cyan-600 transition-colors duration-500">
                                            {card.value}
                                        </div>
                                        <div className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] group-hover:text-gray-500 transition-colors duration-500">
                                            {card.title}
                                        </div>
                                    </div>
                                </div>
                                {/* Subtle pattern/gradient on hover */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-50 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </Link>
                        ))}
                    </div>

                    {/* Quick Overview Section */}
                    <div className="grid lg:grid-cols-3 gap-8 pb-10">
                        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/30 border border-gray-50 overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-cyan-600/10 flex items-center justify-center text-cyan-600">
                                        <TrendingUp size={18} />
                                    </div>
                                    <h3 className="text-lg font-black tracking-tight text-gray-900">System <span className="text-cyan-600">Metrics</span></h3>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Active</span>
                                </div>
                            </div>
                            <div className="p-10 grid sm:grid-cols-2 gap-6">
                                <div className="flex items-center gap-5 p-6 bg-gray-50/50 rounded-3xl border border-gray-100 group hover:bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500">
                                    <div className="p-4 bg-white rounded-2xl text-blue-600 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Visitors</div>
                                        <div className="text-2xl font-black text-gray-900 tracking-tight">1.2k</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 p-6 bg-gray-50/50 rounded-3xl border border-gray-100 group hover:bg-white hover:border-purple-100 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500">
                                    <div className="p-4 bg-white rounded-2xl text-purple-600 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                                        <Eye className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Page Views</div>
                                        <div className="text-2xl font-black text-gray-900 tracking-tight">4.8k</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10 flex flex-col h-full">
                                <div>
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                                        <Rocket className="text-cyan-400 w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-4 leading-tight">Grow Your <span className="text-cyan-400">Reach</span></h3>
                                    <p className="text-gray-400 font-medium leading-relaxed mb-8">
                                        Regularly updating your portfolio with fresh content can boost your visitor engagement by up to 40%.
                                    </p>
                                </div>
                                <Link 
                                    href={route('admin.settings.index')}
                                    className="mt-auto flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all group/btn"
                                >
                                    <span className="text-xs font-black uppercase tracking-widest">Settings</span>
                                    <div className="p-2 rounded-xl bg-cyan-600 text-white group-hover/btn:translate-x-1 transition-transform">
                                        <ExternalLink className="w-4 h-4" />
                                    </div>
                                </Link>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
