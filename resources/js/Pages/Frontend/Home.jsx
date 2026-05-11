import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Download } from 'lucide-react';

const Github = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);

const Linkedin = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

const Home = ({ settings, skills, experiences, projects, certificates, educations, social_links }) => {
    const { data: contactData, setData: setContactData, post, processing: contactProcessing, reset: resetContact, errors: contactErrors } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleContactSubmit = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => {
                alert('Message sent successfully!');
                resetContact();
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-cyan-500 selection:text-white">
            <Head title={settings?.site_title || "Dinar Abdul Hollik Firdaus | Full Stack Developer"} />
            
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        {settings?.site_logo_text || "DH."}
                    </span>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
                        <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
                        <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
                        <a href="#education" className="hover:text-cyan-400 transition-colors">Education</a>
                        <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
                        <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
                        <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
                    </div>
                    <a 
                        href="#contact"
                        className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-cyan-400 transition-all"
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
                        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium inline-block mb-6">
                            {settings?.hero_badge || "Available for Freelance & Full-time"}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
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
                                className="px-8 py-4 rounded-xl bg-cyan-500 text-black font-bold flex items-center gap-2 hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all"
                            >
                                <MessageSquare size={20} />
                                Contact Me
                            </a>
                            <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
                                <Download size={20} />
                                Download CV
                            </button>
                        </div>

                        <div className="mt-16 flex justify-center gap-6 text-gray-500">
                            {social_links?.map((social, i) => (
                                <a key={i} href={social.url} target="_blank" className="hover:text-white transition-colors">
                                    {social.platform.toLowerCase().includes('github') ? <Github size={24} /> : 
                                     social.platform.toLowerCase().includes('linkedin') ? <Linkedin size={24} /> :
                                     <Mail size={24} />}
                                </a>
                            ))}
                            {social_links?.length === 0 && (
                                <>
                                    <a href="#" className="hover:text-white transition-colors"><Github size={24} /></a>
                                    <a href="#" className="hover:text-white transition-colors"><Linkedin size={24} /></a>
                                    <a href="#" className="hover:text-white transition-colors"><Mail size={24} /></a>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-4 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
                            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
                                <img 
                                    src={settings?.profile_image || "/placeholder-profile.jpg"} 
                                    alt="Dinar Abdul Hollik Firdaus" 
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                                />
                            </div>
                        </motion.div>
                        
                        <div>
                            <h2 className="text-3xl font-bold mb-6">About Me</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                {settings?.about_description || "I am a passionate Full Stack & Backend Developer focused on building high-performance, scalable, and user-centric web applications. With over 3 years of experience in the industry, I specialize in Laravel, React, and MySQL."}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: '3+ Years', sub: 'Experience' },
                                    { label: `${projects?.length || '10'}+ Projects`, sub: 'Completed' },
                                    { label: 'Laravel', sub: 'Specialist' },
                                    { label: 'React.js', sub: 'Expert' }
                                ].map((stat, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-2xl font-bold text-cyan-400">{stat.label}</div>
                                        <div className="text-sm text-gray-500">{stat.sub}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section id="skills" className="py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Tech Stack</h2>
                    <p className="text-gray-500 mb-12">Technologies I use to bring ideas to life</p>
                    
                    <div className="space-y-12">
                        {Object.entries(skills).map(([category, items], idx) => (
                            <div key={idx} className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-400 uppercase tracking-widest">{category}</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                    {items.map((skill, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all group"
                                        >
                                            <div className="w-12 h-12 mx-auto mb-4 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                                                <div className="text-cyan-500 font-bold text-xl">{skill.name[0]}</div>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-400 group-hover:text-white transition-colors">{skill.name}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-20 px-4 bg-white/[0.02]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Work Experience</h2>
                    <div className="space-y-12">
                        {experiences?.map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative pl-8 border-l border-white/10"
                            >
                                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                                <div className="mb-1 text-sm font-medium text-cyan-400">
                                    {new Date(exp.start_date).getFullYear()} - {exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
                                </div>
                                <h3 className="text-xl font-bold">{exp.role}</h3>
                                <div className="text-gray-400 mb-4">{exp.company}</div>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {exp.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Education & Certificates Section */}
            <section id="education" className="py-20 px-4 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16">
                        {/* Education */}
                        <div>
                            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                                <span className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                    <Download size={20} className="rotate-180" />
                                </span>
                                Education
                            </h2>
                            <div className="space-y-8">
                                {educations?.map((edu, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="relative pl-8 border-l border-white/10"
                                    >
                                        <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-cyan-500" />
                                        <div className="text-sm font-medium text-cyan-400 mb-1">{edu.start_year} - {edu.end_year || 'Present'}</div>
                                        <h3 className="text-xl font-bold">{edu.institution}</h3>
                                        <div className="text-gray-400">{edu.degree} in {edu.major}</div>
                                        {edu.gpa && <div className="text-sm text-gray-500 mt-2">GPA: {edu.gpa}</div>}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Certificates */}
                        <div>
                            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                                <span className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                    <MessageSquare size={20} />
                                </span>
                                Certificates
                            </h2>
                            <div className="grid gap-4">
                                {certificates?.map((cert, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold group-hover:text-blue-400 transition-colors">{cert.title}</h3>
                                            <span className="text-xs text-gray-500">{new Date(cert.issue_date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="text-sm text-gray-400">{cert.issuer}</div>
                                        {cert.credential_url && (
                                            <a href={cert.credential_url} target="_blank" className="inline-block mt-4 text-xs font-bold text-blue-400 hover:underline">View Credential</a>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
                            <p className="text-gray-500">A collection of my best work</p>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects?.map((proj, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all"
                            >
                                <div className="aspect-video bg-gray-800 relative overflow-hidden">
                                    {proj.thumbnail ? (
                                        <img src={`/storage/${proj.thumbnail}`} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                                            <Github className="text-white/10 w-20 h-20" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        {proj.github_url && (
                                            <a href={proj.github_url} target="_blank" className="p-3 rounded-full bg-cyan-500 text-black hover:scale-110 transition-all"><Github size={20} /></a>
                                        )}
                                        {proj.demo_url && (
                                            <a href={proj.demo_url} target="_blank" className="p-3 rounded-full bg-white text-black hover:scale-110 transition-all"><ExternalLink size={20} /></a>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex gap-2 mb-4">
                                        <span className="text-[10px] px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 font-bold uppercase tracking-wider">{proj.category || 'Web App'}</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{proj.title}</h3>
                                    <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                                        {proj.description}
                                    </p>
                                    <button className="text-sm font-semibold text-cyan-400 flex items-center gap-2 group-hover:gap-3 transition-all">
                                        View Project Details <span>→</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-4 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Let's connect</h2>
                            <p className="text-gray-400 mb-8 max-w-md">
                                {settings?.contact_description || "Have a project in mind or want to hire me for your team? Feel free to reach out. I'm always open to new opportunities."}
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Email</div>
                                        <div className="font-medium text-white">{settings?.contact_email || "dinar.abd@example.com"}</div>
                                    </div>
                                </div>
                                {social_links?.find(s => s.platform.toLowerCase() === 'linkedin') && (
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                                            <Linkedin size={20} />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">LinkedIn</div>
                                            <div className="font-medium text-white">{social_links.find(s => s.platform.toLowerCase() === 'linkedin').platform}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <form onSubmit={handleContactSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Name</label>
                                        <input 
                                            type="text" 
                                            value={contactData.name}
                                            onChange={e => setContactData('name', e.target.value)}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all" 
                                            placeholder="John Doe" 
                                        />
                                        {contactErrors.name && <div className="text-red-500 text-xs">{contactErrors.name}</div>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</label>
                                        <input 
                                            type="email" 
                                            value={contactData.email}
                                            onChange={e => setContactData('email', e.target.value)}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all" 
                                            placeholder="john@example.com" 
                                        />
                                        {contactErrors.email && <div className="text-red-500 text-xs">{contactErrors.email}</div>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</label>
                                    <input 
                                        type="text" 
                                        value={contactData.subject}
                                        onChange={e => setContactData('subject', e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all" 
                                        placeholder="Inquiry" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message</label>
                                    <textarea 
                                        rows={5} 
                                        value={contactData.message}
                                        onChange={e => setContactData('message', e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all resize-none" 
                                        placeholder="How can I help you?"
                                    ></textarea>
                                    {contactErrors.message && <div className="text-red-500 text-xs">{contactErrors.message}</div>}
                                </div>
                                <button 
                                    type="submit"
                                    disabled={contactProcessing}
                                    className="w-full py-4 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] disabled:opacity-50"
                                >
                                    {contactProcessing ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 border-t border-white/10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        {settings?.site_logo_text || "DH."}
                    </div>
                    <div className="text-sm text-gray-500 text-center">
                        © {new Date().getFullYear()} {settings?.footer_text || "Dinar Abdul Hollik Firdaus. All rights reserved."}
                    </div>
                    <div className="flex gap-6 text-gray-500">
                        {social_links?.map((social, i) => (
                            <a key={i} href={social.url} target="_blank" className="hover:text-white transition-colors">
                                {social.platform.toLowerCase().includes('github') ? <Github size={20} /> : 
                                 social.platform.toLowerCase().includes('linkedin') ? <Linkedin size={20} /> :
                                 <Mail size={20} />}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp */}
            {settings?.whatsapp_number && (
                <a 
                    href={`https://wa.me/${settings.whatsapp_number}`} 
                    target="_blank"
                    className="fixed bottom-8 right-8 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-50 text-white"
                >
                    <MessageSquare size={28} />
                </a>
            )}
        </div>
    );
};

export default Home;
