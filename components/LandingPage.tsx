import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, CheckCircle2, Zap, BrainCircuit, Heart, Shield, TrendingUp, Users, BookOpen, UserCircle2, Building2 } from 'lucide-react';
import { GlassDNA, GlassGlobe, ClayCube } from './GlassIcons';

interface LandingPageProps {
    onEnterAdmin: () => void;
    onEnterStudent: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterAdmin, onEnterStudent }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            
            {/* --- Navigation --- */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <span className="font-bold text-xl">W</span>
                        </div>
                        <span className={`text-xl font-bold tracking-tight transition-colors lowercase ${scrolled ? 'text-slate-900' : 'text-slate-900 lg:text-white'}`}>
                            waypoint
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#mission" className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white/80 hover:text-white'}`}>Our Mission</a>
                        <a href="#crisis" className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white/80 hover:text-white'}`}>The Triple Crisis</a>
                        <a href="#solution" className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white/80 hover:text-white'}`}>The Platform</a>
                        
                        <div className="flex gap-3">
                             <button 
                                onClick={onEnterStudent}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                                    scrolled 
                                    ? 'bg-slate-100 text-slate-900 hover:bg-slate-200' 
                                    : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md'
                                }`}
                            >
                                <UserCircle2 className="w-4 h-4" /> Student
                            </button>
                            <button 
                                onClick={onEnterAdmin}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                                    scrolled 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' 
                                    : 'bg-white text-blue-900 hover:bg-gray-100'
                                }`}
                            >
                                <Building2 className="w-4 h-4" /> Staff Portal
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- Hero Section (Parallax) --- */}
            <header className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Parallax Background */}
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop')" }}
                >
                    <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/30"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-100">For Modern Universities</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                        Becoming <span className="text-blue-400">AI-Resilient.</span><br />
                        Navigating the Age of Disruption.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Empower your undergraduates to move from operational overwhelm to student agency. 
                        The operating system for the next generation of career centers.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                        <button 
                            onClick={onEnterAdmin}
                            className="px-8 py-4 bg-white text-blue-900 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-xl flex items-center gap-2 hover:scale-105"
                        >
                            Launch Waypoint <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* --- The Triple Crisis Section --- */}
            <section id="crisis" className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">A Generation on the Edge</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Students are navigating the "Perfect Storm." Data from UNESCO and the World Economic Forum 
                            reveals a multifaceted crisis facing higher education today.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Operational Overwhelm</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                "Resume-driven" participation and fear of missing out (FOMO) has led to widespread burnout. 
                                72% of students report feeling frequently overwhelmed.
                            </p>
                            <div className="h-1 w-12 bg-red-200 rounded-full"></div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <BrainCircuit className="w-8 h-8 text-purple-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">AI Disruption</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                The "High GPA + Extracurriculars" formula is obsolete. 
                                By 2030, 40% of entry-level tasks may be automated. The career ladder is broken.
                            </p>
                            <div className="h-1 w-12 bg-purple-200 rounded-full"></div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Heart className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Existential Vacuum</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                58% of young adults lack "meaning or purpose." The pressure to perform without a 
                                "Why" is creating a crisis of engagement and identity.
                            </p>
                            <div className="h-1 w-12 bg-blue-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- The Solution: Ascend Framework (Parallax Scroll) --- */}
            <section id="solution" className="relative py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2 block">The Solution</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                                The Empowerment Platform.
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Waypoint isn't just a job board. It's a comprehensive resilience engine designed to move students from 
                                anxiety to agency through four strategic pillars.
                            </p>
                            
                            <div className="space-y-6">
                                {[
                                    { title: "Discover Superpowers", desc: "Identify core strengths and values to build a coherent sense of purpose.", icon: <Users className="w-5 h-5 text-blue-600" /> },
                                    { title: "Future-Ready Skills", desc: "Prioritize core capabilities: Empathy, Ethics, and Strategic Foresight.", icon: <Shield className="w-5 h-5 text-blue-600" /> },
                                    { title: "Build Anti-Fragility", desc: "Develop personal growth plans that balance technical and reflective competencies.", icon: <TrendingUp className="w-5 h-5 text-blue-600" /> },
                                    { title: "Continuous Growth Loops", desc: "Turn uncertainty into opportunity through cycles of feedback and reflection.", icon: <BookOpen className="w-5 h-5 text-blue-600" /> }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Image Stack */}
                        <div className="relative h-[600px] hidden lg:block">
                            <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-[40px] overflow-hidden shadow-2xl z-10 animate-in slide-in-from-right duration-1000">
                                <img 
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                                    alt="Students Collaborating" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-[40px] overflow-hidden shadow-2xl z-20 border-8 border-white animate-in slide-in-from-left duration-1000 delay-200">
                                <img 
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                                    alt="Strategic Planning" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            {/* Floating Glass Element */}
                            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 z-30 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/50 animate-bounce duration-[4000ms]">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="text-xs font-bold text-slate-500 uppercase">System Status</span>
                                </div>
                                <div className="text-2xl font-bold text-slate-900">Resilience: High</div>
                                <div className="text-sm text-green-600 font-bold">+24% Student Agency</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Call to Action --- */}
            <section className="relative py-32 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">The crisis of today is your opportunity.</h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join Ascend Career Lab and build a new promise for higher education. 
                        Help students build meaningful, resilient, and student-centric lives.
                    </p>
                    <button 
                        onClick={onEnterAdmin}
                        className="px-10 py-5 bg-white text-blue-900 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-glow hover:scale-105"
                    >
                        Enter Waypoint
                    </button>
                    <p className="mt-6 text-sm text-slate-400">
                        Copyright © 2026 Haskayne School of Business. University of Calgary.
                    </p>
                </div>
            </section>

        </div>
    );
};

export default LandingPage;