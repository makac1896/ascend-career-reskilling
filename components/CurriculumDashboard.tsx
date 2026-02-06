import React, { useState } from 'react';
import { 
    Play, 
    Clock, 
    Users, 
    MoreHorizontal, 
    Plus, 
    Search, 
    Filter, 
    Zap, 
    CheckCircle2, 
    AlertCircle, 
    ArrowUpRight, 
    BookOpen, 
    GraduationCap, 
    LayoutGrid, 
    List, 
    Sparkles, 
    Tag, 
    Hash, 
    Trophy, 
    Lightbulb 
} from 'lucide-react';
import { GlassDNA, ClayCube, GlassGlobe, GlassLightning } from './GlassIcons';

// --- Mock Data with Fixed Imagery & Rationale ---
const initiatives = [
    {
        id: 1,
        title: "Algorithmic Auditing for Finance",
        dept: "Finance Dept.",
        status: "Active",
        enrolled: 142,
        gapClosure: 78,
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop",
        tags: ["FinTech", "Verification"],
        partner: "Deloitte",
        nextSession: "Tomorrow, 2:00 PM",
        theme: "violet",
        rationale: "Audit firms reveal 80% of entry-level analyst roles now require Python validation skills, displacing Excel."
    },
    {
        id: 2,
        title: "Clinical Empathy in AI Triage",
        dept: "Medical School",
        status: "Proposed",
        enrolled: 0,
        gapClosure: 45,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
        tags: ["Bio-Ethics", "Student Agency"],
        partner: "Pfizer",
        nextSession: "Pending Approval",
        theme: "teal",
        rationale: "Patient advocacy groups flagged 'AI Triage' as a high-risk failure point in recent clinical trials. Critical gap."
    },
    {
        id: 3,
        title: "Generative Design for MFG",
        dept: "School of Engineering",
        status: "Active",
        enrolled: 89,
        gapClosure: 92,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
        tags: ["Supply Chain", "3D Modeling"],
        partner: "Tesla",
        nextSession: "In Progress",
        theme: "orange",
        rationale: "Automotive supply chains are shifting to generative parts; current syllabus focuses only on traditional casting."
    },
    {
        id: 4,
        title: "Legal Prompt Engineering",
        dept: "Law School",
        status: "Completed",
        enrolled: 210,
        gapClosure: 100,
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop",
        tags: ["Law", "Logic"],
        partner: "Baker McKenzie",
        nextSession: "Cohort Closed",
        theme: "blue",
        rationale: "Associates spend 40% of time prompting LLMs. ABA guidance suggests new ethics standard for AI interaction."
    },
    {
        id: 5,
        title: "Crisis Ops: Supply Chain",
        dept: "Business School",
        status: "Active",
        enrolled: 320,
        gapClosure: 65,
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
        tags: ["Logistics", "Strategy"],
        partner: "Maersk",
        nextSession: "Live Now",
        theme: "pink",
        rationale: "Global disruptions require real-time scenario planning. Static case studies are failing to prepare grads."
    },
    {
        id: 6,
        title: "The Ethics of Deepfakes",
        dept: "Journalism",
        status: "Proposed",
        enrolled: 0,
        gapClosure: 30,
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        tags: ["Media", "Verification"],
        partner: "NY Times",
        nextSession: "Needs Funding",
        theme: "yellow",
        rationale: "Verification is now a primary skill for investigative desks. Deepfake detection tools are absent in current lab."
    }
];

// Helper for "Juicy" Color Themes
const getThemeStyles = (theme: string) => {
    switch (theme) {
        case 'violet': return {
            bg: 'bg-violet-50',
            border: 'border-violet-100',
            accent: 'bg-violet-500',
            text: 'text-violet-700',
            lightAccent: 'bg-violet-200',
            gradient: 'from-violet-500 to-purple-600',
            shadow: 'shadow-violet-200'
        };
        case 'teal': return {
            bg: 'bg-teal-50',
            border: 'border-teal-100',
            accent: 'bg-teal-500',
            text: 'text-teal-700',
            lightAccent: 'bg-teal-200',
            gradient: 'from-teal-500 to-emerald-500',
            shadow: 'shadow-teal-200'
        };
        case 'orange': return {
            bg: 'bg-orange-50',
            border: 'border-orange-100',
            accent: 'bg-orange-500',
            text: 'text-orange-700',
            lightAccent: 'bg-orange-200',
            gradient: 'from-orange-500 to-red-500',
            shadow: 'shadow-orange-200'
        };
        case 'pink': return {
            bg: 'bg-pink-50',
            border: 'border-pink-100',
            accent: 'bg-pink-500',
            text: 'text-pink-700',
            lightAccent: 'bg-pink-200',
            gradient: 'from-pink-500 to-rose-600',
            shadow: 'shadow-pink-200'
        };
        case 'yellow': return {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200', // slightly darker border for visibility
            accent: 'bg-yellow-500',
            text: 'text-yellow-700',
            lightAccent: 'bg-yellow-200',
            gradient: 'from-yellow-400 to-orange-400',
            shadow: 'shadow-yellow-200'
        };
        default: return {
            bg: 'bg-blue-50',
            border: 'border-blue-100',
            accent: 'bg-blue-500',
            text: 'text-blue-700',
            lightAccent: 'bg-blue-200',
            gradient: 'from-blue-500 to-indigo-600',
            shadow: 'shadow-blue-200'
        };
    }
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const styles = {
        Active: "bg-green-500 text-white shadow-[0_4px_0_#15803d]",
        Proposed: "bg-blue-500 text-white shadow-[0_4px_0_#1d4ed8]",
        Completed: "bg-slate-700 text-slate-200 shadow-[0_4px_0_#0f172a]",
    };
    
    return (
        <span className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider flex items-center gap-2 transform active:translate-y-[2px] active:shadow-none transition-all ${styles[status as keyof typeof styles] || styles.Active}`}>
            {status === 'Active' && <Zap className="w-3.5 h-3.5 fill-current" />}
            {status}
        </span>
    );
};

const InitiativeCard: React.FC<{ data: typeof initiatives[0] }> = ({ data }) => {
    const styles = getThemeStyles(data.theme);
    const isLive = data.status === 'Active';

    return (
        <div className={`group relative bg-white rounded-[32px] border-2 ${styles.border} hover:border-transparent hover:ring-4 hover:ring-offset-2 ${styles.text.replace('text-', 'ring-')} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-[650px] overflow-hidden`}>
            
            {/* Image Header */}
            <div className="h-48 relative shrink-0 overflow-hidden">
                <img 
                    src={data.image} 
                    alt={data.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>

                {/* Status Badge */}
                <div className="absolute top-5 left-5 z-20">
                    <StatusBadge status={data.status} />
                </div>

                {/* Menu Button */}
                <div className="absolute top-5 right-5 z-20">
                    <button className="w-10 h-10 rounded-xl bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/20 text-white transition-all flex items-center justify-center">
                        <MoreHorizontal className="w-6 h-6" />
                    </button>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 p-6 w-full z-20">
                    <div className="flex items-center gap-2 mb-2">
                         <span className={`px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-extrabold uppercase tracking-widest`}>
                            {data.dept}
                         </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-white leading-tight shadow-sm line-clamp-2 drop-shadow-md">{data.title}</h3>
                </div>
            </div>

            {/* Body Content - Now tinted based on theme */}
            <div className={`p-6 flex flex-col flex-1 ${styles.bg} relative`}>
                
                {/* Partner Info */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white border-2 border-white shadow-sm flex items-center justify-center text-xl font-black text-slate-700">
                        {data.partner.charAt(0)}
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Powered By</span>
                        <h4 className="text-sm font-bold text-slate-800">{data.partner}</h4>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-slate-100 shadow-sm">
                        <Clock className={`w-3.5 h-3.5 ${styles.text}`} />
                        <span className="text-xs font-bold text-slate-600">{data.status === 'Active' ? 'Live Now' : 'Pending'}</span>
                    </div>
                </div>

                {/* Signal Intelligence Box - The "Why" */}
                <div className="mb-5 bg-white/60 p-4 rounded-2xl border border-white/50 shadow-sm backdrop-blur-sm relative overflow-hidden group/box">
                    <div className={`absolute top-0 left-0 w-1 h-full ${styles.accent} opacity-40`}></div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1 rounded-md ${styles.lightAccent}`}>
                            <Sparkles className={`w-3 h-3 ${styles.text}`} />
                        </div>
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider ${styles.text} opacity-80`}>
                            Why this matters
                        </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 leading-relaxed relative z-10">
                        "{data.rationale}"
                    </p>
                </div>

                {/* Data Grid - Floating White Cards */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-1">
                            <Users className="w-4 h-4 text-slate-400" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Enrolled</span>
                        </div>
                        <span className="text-2xl font-black text-slate-800">{data.enrolled}</span>
                    </div>
                    
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                         <div className="flex items-center gap-2 mb-1">
                            <Hash className="w-4 h-4 text-slate-400" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Tag</span>
                        </div>
                         <div className="flex flex-wrap gap-1">
                            <span className={`text-xs font-bold ${styles.text} truncate`}>
                                {data.tags[0]}
                            </span>
                         </div>
                    </div>
                </div>

                {/* Juicy Progress Section */}
                <div className="mt-auto">
                    <div className="flex justify-between items-end mb-2">
                        <div className="flex items-center gap-1.5">
                            <Trophy className={`w-4 h-4 ${styles.text}`} />
                            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Gap Closure</span>
                        </div>
                        <span className={`text-xl font-black ${styles.text}`}>{data.gapClosure}%</span>
                    </div>
                    
                    {/* The "Tube" Progress Bar */}
                    <div className={`w-full h-4 ${styles.lightAccent} rounded-full overflow-hidden relative mb-6`}>
                        <div 
                            className={`h-full rounded-full bg-gradient-to-r ${styles.gradient} relative`} 
                            style={{ width: `${data.gapClosure}%` }}
                        >
                            {/* Inner Highlight for 3D effect */}
                            <div className="absolute top-1 left-1 right-1 h-1 bg-white/30 rounded-full"></div>
                        </div>
                    </div>

                    {/* Persistent Action Button */}
                    <button className={`w-full py-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 text-white ${styles.accent} hover:brightness-110 active:scale-95 group-hover:shadow-lg`}>
                        Manage Course <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const CurriculumDashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('All');

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-10 animate-in fade-in duration-500">
        
        {/* Cinematic Hero Section */}
        <div className="w-full h-[280px] rounded-[40px] relative overflow-hidden group shadow-xl">
            <img 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[2s]" 
                alt="Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-indigo-950/80 to-transparent"></div>
            
            <div className="absolute inset-0 p-12 flex flex-col justify-center max-w-2xl z-20">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                        Courses 2.0
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-300 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                        <Zap className="w-3 h-3" /> System Optimal
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                    Closing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Skills Gap</span>
                </h1>
                <p className="text-blue-100/80 text-lg font-medium mb-8 leading-relaxed max-w-lg">
                    Manage real-world projects across 14 departments. Current progress: <span className="text-white font-bold">12% growth week-over-week.</span>
                </p>
                
                <div className="flex gap-4">
                    <button className="px-6 py-3.5 bg-white text-ascend-blue rounded-xl font-bold text-sm shadow-glow hover:bg-blue-50 transition-all flex items-center gap-2 hover:scale-105 active:scale-95">
                        <Plus className="w-4 h-4" /> New Project
                    </button>
                    <button className="px-6 py-3.5 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-sm hover:bg-white/20 transition-all backdrop-blur-md">
                        View Analytics
                    </button>
                </div>
            </div>

            {/* Decorative Floating Glass Elements */}
            <div className="absolute right-20 top-1/2 -translate-y-1/2 hidden lg:block z-10 pointer-events-none">
                 <div className="w-24 h-24 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl animate-bounce duration-[3000ms]">
                    <GlassGlobe className="w-16 h-16 opacity-80" />
                 </div>
            </div>
             <div className="absolute right-60 bottom-10 hidden lg:block z-10 pointer-events-none">
                 <div className="w-20 h-20 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl animate-pulse duration-[4000ms]">
                    <GlassDNA className="w-14 h-14 opacity-80" />
                 </div>
            </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-30 py-4 backdrop-blur-xl bg-ascend-bg/80 -mx-4 px-4 border-b border-ascend-border/50">
            <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl shadow-sm border border-ascend-border">
                {['All', 'Active', 'Proposed', 'Completed'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${filter === tab ? 'bg-ascend-blue text-white shadow-md' : 'text-ascend-subtext hover:text-ascend-text hover:bg-gray-50'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative group">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ascend-subtext group-focus-within:text-ascend-blue" />
                    <input 
                        type="text" 
                        placeholder="Search projects..." 
                        className="pl-9 pr-4 py-2.5 bg-white border border-ascend-border rounded-xl text-sm font-medium outline-none focus:ring-2 ring-ascend-blue/20 w-64 shadow-sm transition-all"
                    />
                </div>
                <div className="flex gap-1 bg-white p-1 rounded-xl border border-ascend-border shadow-sm">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-ascend-text' : 'text-ascend-subtext hover:bg-gray-50'}`}
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button 
                         onClick={() => setViewMode('list')}
                         className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-ascend-text' : 'text-ascend-subtext hover:bg-gray-50'}`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives
                .filter(i => filter === 'All' || i.status === filter)
                .map(item => (
                <InitiativeCard key={item.id} data={item} />
            ))}

            {/* "Add New" Placeholder Card */}
            <div className="group rounded-[32px] border-4 border-dashed border-gray-200 bg-gray-50/50 hover:bg-blue-50 hover:border-blue-300 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 h-[650px]">
                <div className="w-24 h-24 rounded-3xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:shadow-lg group-hover:rotate-3">
                    <Plus className="w-10 h-10 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
                <h3 className="text-xl font-black text-gray-400 group-hover:text-blue-600 transition-colors">Start New Project</h3>
                <p className="text-xs font-bold text-gray-300 mt-2 uppercase tracking-widest group-hover:text-blue-400">Launch a new lab</p>
            </div>
        </div>

    </div>
  );
};

export default CurriculumDashboard;