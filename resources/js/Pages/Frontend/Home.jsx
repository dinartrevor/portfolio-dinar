import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Download, ExternalLink, X, GraduationCap, Briefcase, Award, Send, CheckCircle2 } from 'lucide-react';
import parse from 'html-react-parser';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Github = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const Linkedin = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const Home = ({ settings, skills, experiences, projects, certificates, educations, social_links }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    const { data: contactData, setData: setContactData, post, processing: contactProcessing, reset: resetContact, errors: contactErrors, recentlySuccessful: contactSuccess } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const getImageUrl = (path) => {
        if (!path) return "/placeholder-profile.jpg";
        if (path.startsWith('http')) return path;
        return `/storage/${path}`;
    };

    const parseProfileImages = (value) => {
        try {
            if (!value) return ["/placeholder-profile.jpg"];
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : [value];
        } catch (e) {
            return [value];
        }
    };

    const profileImages = parseProfileImages(settings?.profile_image);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => {
                resetContact();
            },
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return '';
        }
    };

    const getYear = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return isNaN(date.getTime()) ? '' : date.getFullYear();
        } catch (e) {
            return '';
        }
    };

    const renderDescription = (text) => {
        if (!text) return null;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        return (
            <ul className="space-y-2">
                {lines.map((line, i) => (
                    <li key={i} className="flex gap-3 text-gray-400">
                        <span className="text-cyan-500 mt-1">•</span>
                        <span>{line.replace(/^- /, '')}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-cyan-500 selection:text-white">
            <Head title={settings?.site_title || "Dinar Abdul Hollik Firdaus | Full Stack Developer"} />
            
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {settings?.site_logo_image ? (
                            <img src={getImageUrl(settings.site_logo_image)} alt="Logo" className="h-8 w-auto" />
                        ) : (
                            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                {settings?.site_logo_text || "DH."}
                            </span>
                        )}
                    </div>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
                        <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
                        <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
                        <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
                        <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
                        <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
                    </div>
                    <a 
                        href="#contact"
                        className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-cyan-500/20"
                    >
                        Hire Me
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
                
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium inline-block mb-6 backdrop-blur-sm">
                            {settings?.hero_badge || "Available for Freelance & Full-time"}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
                            {settings?.hero_title_prefix || "Dinar Abdul Hollik"} <br />
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                                {settings?.hero_title_suffix || "Firdaus"}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            {settings?.hero_description || "Full Stack Developer | Backend Specialist with 3+ years of experience building scalable systems and interactive web applications."}
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4">
                            <a 
                                href="#contact"
                                className="px-8 py-4 rounded-2xl bg-cyan-500 text-black font-bold flex items-center gap-2 hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all active:scale-95"
                            >
                                <MessageSquare size={20} />
                                Contact Me
                            </a>
                            {settings?.cv_download_link && (
                                <a 
                                    href={settings.cv_download_link}
                                    target="_blank"
                                    className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold flex items-center gap-2 hover:bg-white/10 transition-all active:scale-95"
                                >
                                    <Download size={20} />
                                    Download CV
                                </a>
                            )}
                        </div>

                        <div className="mt-16 flex justify-center gap-6 text-gray-500">
                            {social_links?.map((social, i) => (
                                <a key={i} href={social.url} target="_blank" className="hover:text-white transition-all hover:-translate-y-1">
                                    {social.platform?.toLowerCase().includes('github') ? <Github size={24} /> : 
                                     social.platform?.toLowerCase().includes('linkedin') ? <Linkedin size={24} /> :
                                     <Mail size={24} />}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-4 bg-white/[0.01] relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full -z-10" />
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
                            <div className="relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                <Swiper
                                    modules={[Autoplay, Pagination, EffectFade]}
                                    effect="fade"
                                    autoplay={{ delay: 3000 }}
                                    pagination={{ clickable: true }}
                                    className="w-full h-full"
                                >
                                    {profileImages.map((img, i) => (
                                        <SwiperSlide key={i}>
                                            <img 
                                                src={getImageUrl(img)} 
                                                alt={`Profile ${i + 1}`} 
                                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
                                <span className="h-px w-12 bg-cyan-500" />
                                {settings?.about_title || "About Me"}
                            </h2>
                            <div className="text-gray-400 space-y-4 leading-relaxed text-lg">
                                {settings?.about_description ? parse(settings.about_description.replace(/\n/g, '<br>')) : (
                                    <p>I am a passionate Full Stack & Backend Developer focused on building high-performance, scalable, and user-centric web applications.</p>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6 mt-10">
                                {[
                                    { label: '3+ Years', sub: 'Experience' },
                                    { label: `${projects?.length || 0}+ Projects`, sub: 'Completed' },
                                    { label: 'Backend', sub: 'Specialist' },
                                    { label: 'Laravel', sub: 'Expert' }
                                ].map((stat, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors group">
                                        <div className="text-2xl font-bold text-cyan-400 group-hover:scale-110 transition-transform origin-left">{stat.label}</div>
                                        <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.sub}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-24 px-4 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.03)_0,transparent_100%)]" />
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Journey</h2>
                        <p className="text-gray-500">My path as a software developer, from early beginnings to current milestones.</p>
                    </div>
                    <div className="space-y-16">
                        {experiences?.map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative pl-12 border-l-2 border-white/10 hover:border-cyan-500/50 transition-colors"
                            >
                                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                                <div className="mb-2 inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                                    {getYear(exp.start_date)} — {exp.is_current ? 'Present' : getYear(exp.end_date)}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                                <div className="text-cyan-500/80 font-medium text-lg mb-6">{exp.company}</div>
                                
                                <div className="mb-6">
                                    {renderDescription(exp.description)}
                                </div>

                                {exp.tech_stack && (
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tech_stack.map((tech, ti) => (
                                            <span key={ti} className="px-2 py-1 text-[10px] rounded bg-white/5 border border-white/10 text-gray-400 font-mono italic">
                                                #{tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 px-4 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <h2 className="text-4xl font-extrabold mb-4">Selected Works</h2>
                            <p className="text-gray-500 text-lg">Solving complex problems with elegant code</p>
                        </div>
                        <div className="flex flex-wrap gap-2 p-1.5 bg-black/50 rounded-2xl border border-white/10 backdrop-blur-sm">
                            {['All', ...new Set(projects?.map(p => p.category) || [])].filter(Boolean).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                        selectedCategory === cat 
                                        ? 'bg-cyan-500 text-black shadow-xl shadow-cyan-500/20' 
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects?.filter(p => selectedCategory === 'All' || p.category === selectedCategory).map((proj, i) => (
                            <motion.div
                                key={i}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -12 }}
                                className="group rounded-3xl overflow-hidden bg-[#111] border border-white/5 hover:border-cyan-500/30 transition-all shadow-xl"
                            >
                                <div className="aspect-[16/10] bg-gray-900 relative overflow-hidden">
                                    {proj.thumbnail ? (
                                        <img src={getImageUrl(proj.thumbnail)} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                                            <Github className="text-white/5 w-24 h-24" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-[2px]">
                                        {proj.github_url && (
                                            <a href={proj.github_url} target="_blank" className="p-4 rounded-full bg-cyan-500 text-black hover:scale-110 active:scale-95 transition-all"><Github size={22} /></a>
                                        )}
                                        {proj.demo_url && (
                                            <a href={proj.demo_url} target="_blank" className="p-4 rounded-full bg-white text-black hover:scale-110 active:scale-95 transition-all"><ExternalLink size={22} /></a>
                                        )}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex gap-2 mb-4">
                                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-black uppercase tracking-widest border border-cyan-500/20">{proj.category || 'Web App'}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{proj.title}</h3>
                                    <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                                        {proj.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-1.5 mb-8">
                                        {proj.tech_stack?.slice(0, 4).map((tech, ti) => (
                                            <span key={ti} className="text-[10px] text-gray-500 font-medium px-2 py-0.5 rounded border border-white/5 bg-white/[0.02]">
                                                {tech}
                                            </span>
                                        ))}
                                        {proj.tech_stack?.length > 4 && (
                                            <span className="text-[10px] text-gray-600 font-medium px-2 py-0.5">+{proj.tech_stack.length - 4}</span>
                                        )}
                                    </div>

                                    <button 
                                        onClick={() => setSelectedProject(proj)}
                                        className="w-full py-3 rounded-xl border border-white/10 text-sm font-bold flex items-center justify-center gap-2 group-hover:bg-cyan-500 group-hover:text-black group-hover:border-transparent transition-all active:scale-[0.98]"
                                    >
                                        Details View <ExternalLink size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 px-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full -z-10" />
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20">
                        <div>
                            <h2 className="text-4xl font-extrabold mb-6 leading-tight">Got a project?<br />Let's talk about it.</h2>
                            <p className="text-gray-400 text-lg mb-12 max-w-md">
                                {settings?.contact_description || "Have a project in mind or want to hire me for your team? Feel free to reach out. I'm always open to new opportunities."}
                            </p>
                            
                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Send an Email</div>
                                        <div className="text-xl font-medium text-white">{settings?.contact_email || "dinar.abd@example.com"}</div>
                                    </div>
                                </div>
                                {social_links?.find(s => s.platform.toLowerCase() === 'linkedin') && (
                                    <div className="flex items-center gap-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                            <Linkedin size={24} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">LinkedIn Profile</div>
                                            <div className="text-xl font-medium text-white">Connect with me</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="p-1 md:p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10">
                            <form onSubmit={handleContactSubmit} className="bg-[#0a0a0a]/50 p-6 md:p-8 rounded-[1.5rem] space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={contactData.name}
                                            onChange={e => setContactData('name', e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-700" 
                                            placeholder="John Doe" 
                                        />
                                        {contactErrors.name && <div className="text-red-500 text-xs">{contactErrors.name}</div>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                                        <input 
                                            type="email" 
                                            value={contactData.email}
                                            onChange={e => setContactData('email', e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-700" 
                                            placeholder="john@example.com" 
                                        />
                                        {contactErrors.email && <div className="text-red-500 text-xs">{contactErrors.email}</div>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Subject</label>
                                    <input 
                                        type="text" 
                                        value={contactData.subject}
                                        onChange={e => setContactData('subject', e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-700" 
                                        placeholder="I'd like to talk about..." 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Your Message</label>
                                    <textarea 
                                        rows={5} 
                                        value={contactData.message}
                                        onChange={e => setContactData('message', e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-cyan-500 outline-none transition-all resize-none placeholder:text-gray-700" 
                                        placeholder="Hi Dinar, I'm interested in..."
                                    ></textarea>
                                    {contactErrors.message && <div className="text-red-500 text-xs">{contactErrors.message}</div>}
                                </div>
                                <button 
                                    type="submit"
                                    disabled={contactProcessing}
                                    className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 ${
                                        contactSuccess 
                                        ? 'bg-green-500 text-white' 
                                        : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-cyan-500/40 hover:shadow-cyan-500/60'
                                    } disabled:opacity-50`}
                                >
                                    {contactProcessing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : contactSuccess ? (
                                        <>
                                            <CheckCircle2 size={22} />
                                            Successfully Sent!
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Send Project Inquiry
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/95 backdrop-blur-md"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="bg-[#0f0f0f] border border-white/10 rounded-[2.5rem] max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="relative aspect-[21/9]">
                                <img 
                                    src={getImageUrl(selectedProject.thumbnail)} 
                                    alt={selectedProject.title} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
                                <button 
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-8 right-8 p-3 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all active:scale-90"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-8 md:p-16">
                                <div className="flex flex-wrap items-center gap-4 mb-8">
                                    <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-black uppercase tracking-[0.2em] border border-cyan-500/20">
                                        {selectedProject.category}
                                    </span>
                                    {selectedProject.is_featured && (
                                        <span className="flex items-center gap-2 text-xs font-bold text-yellow-500">
                                            <Award size={16} /> Featured Project
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight">{selectedProject.title}</h2>
                                
                                <div className="grid lg:grid-cols-3 gap-12">
                                    <div className="lg:col-span-2">
                                        <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6">About the Project</h4>
                                        <div className="prose prose-invert max-w-none text-gray-400 text-lg leading-relaxed space-y-6">
                                            {selectedProject.description ? (
                                                selectedProject.description.includes('<') ? parse(selectedProject.description) : <p>{selectedProject.description}</p>
                                            ) : (
                                                <p>No description available for this project.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-10">
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6">Tech Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.tech_stack?.map((tech, i) => (
                                                    <span key={i} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6">Project Links</h4>
                                            <div className="flex flex-col gap-3">
                                                {selectedProject.demo_url && (
                                                    <a 
                                                        href={selectedProject.demo_url} 
                                                        target="_blank"
                                                        className="w-full py-4 rounded-2xl bg-cyan-500 text-black font-black flex items-center justify-center gap-3 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
                                                    >
                                                        <ExternalLink size={20} />
                                                        Explore Live Site
                                                    </a>
                                                )}
                                                {selectedProject.github_url && (
                                                    <a 
                                                        href={selectedProject.github_url} 
                                                        target="_blank"
                                                        className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
                                                    >
                                                        <Github size={20} />
                                                        View Repository
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="py-20 px-4 border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="flex flex-col items-center md:items-start gap-4">
                            {settings?.site_logo_image ? (
                                <img src={getImageUrl(settings.site_logo_image)} alt="Logo" className="h-10 w-auto" />
                            ) : (
                                <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                    {settings?.site_logo_text || "DH."}
                                </div>
                            )}
                            <p className="text-gray-600 text-sm max-w-xs text-center md:text-left">
                                Building the future of the web, one line of code at a time.
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-6">
                            <div className="flex gap-8 text-gray-500">
                                {social_links?.map((social, i) => (
                                    <a key={i} href={social.url} target="_blank" className="hover:text-cyan-400 transition-all hover:scale-110">
                                        {social.platform.toLowerCase().includes('github') ? <Github size={24} /> : 
                                         social.platform.toLowerCase().includes('linkedin') ? <Linkedin size={24} /> :
                                         <Mail size={24} />}
                                    </a>
                                ))}
                            </div>
                            <div className="text-xs font-bold text-gray-700 uppercase tracking-[0.3em]">
                                © {new Date().getFullYear()} • {settings?.footer_text || "Crafted by Dinar"}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Floating Contact */}
            {settings?.whatsapp_number && (
                <a 
                    href={`https://wa.me/${settings.whatsapp_number}`} 
                    target="_blank"
                    className="fixed bottom-8 right-8 md:bottom-12 md:right-12 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 transition-all z-50 text-white group"
                >
                    <MessageSquare size={32} className="group-hover:rotate-12 transition-transform" />
                    <span className="absolute right-20 bg-white text-black px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                        Chat on WhatsApp
                    </span>
                </a>
            )}
        </div>
    );
};

export default Home;
