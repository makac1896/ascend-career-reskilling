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
    Hash
} from 'lucide-react';
import { GlassDNA, ClayCube, GlassGlobe, GlassLightning } from './GlassIcons';

// --- Mock Data with High-Fidelity Imagery ---
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
        nextSession: "Tomorrow, 2:00 PM"
    },
    {
        id: 2,
        title: "Clinical Empathy in AI Triage",
        dept: "Medical School",
        status: "Proposed",
        enrolled: 0,
        gapClosure: 45,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
        tags: ["Bio-Ethics", "Human Agency"],
        partner: "Pfizer",
        nextSession: "Pending Approval"
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
        nextSession: "In Progress"
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
        nextSession: "Cohort Closed"
    },
    {
        id: 5,
        title: "Crisis Ops: Supply Chain",
        dept: "Business School",
        status: "Active",
        enrolled: 320,
        gapClosure: 65,
        image: "https://images.unsplash.com/photo-1494412574643-35d324698428?q=80&w=2053&auto=format&fit=crop",
        tags: ["Logistics", "Strategy"],
        partner: "Maersk",
        nextSession: "Live Now"
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
        nextSession: "Needs Funding"
    }
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    // Glass Capsule Style
    const glassStyles = {
        Active: "bg-green-500 text-white border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]",
        Proposed: "bg-blue-500 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]",
        Completed: "bg-gray-800 text-gray-200 border-gray-600",
    };
    
    return (
        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest border backdrop-blur-md flex items-center gap-2 ${glassStyles[status as keyof typeof glassStyles] || glassStyles.Active}`}>
            {status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_white]"></span>}
            {status}
        </span>
    );
};

const InitiativeCard: React.FC<{ data: typeof initiatives[0] }> = ({ data }) => {
    const isLive = data.status === 'Active';

    return (
        <div className="group relative bg-white rounded-[32px] border-2 border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] transition-all duration-300 flex flex-col h-[520px] overflow-hidden">
            
            {/* Image Header - Taller for impact */}
            <div className="h-52 relative shrink-0 overflow-hidden">
                <img 
                    src={data.image} 
                    alt={data.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                
                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent/10 opacity-90 group-hover:opacity-100 transition-opacity"></div>

                {/* Status Badge */}
                <div className="absolute top-5 left-5 z-20">
                    <StatusBadge status={data.status} />
                </div>

                {/* Menu Button */}
                <div className="absolute top-5 right-5 z-20">
                    <button className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all flex items-center justify-center">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>

                {/* Title & Dept Overlay */}
                <div className="absolute bottom-0 left-0 p-6 w-full z-20">
                    <div className="flex items-center gap-2 mb-2 text-white/80">
                         <GraduationCap className="w-4 h-4 text-blue-300" />
                         <span className="text-xs font-bold uppercase tracking-widest">{data.dept}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight shadow-sm line-clamp-2">{data.title}</h3>
                </div>
            </div>

            {/* Body Content */}
            <div className="p-6 flex flex-col flex-1 bg-white relative">
                
                {/* Partner & Context - Technical Divider */}
                <div className="flex items-start justify-between mb-6 pb-6 border-b-2 border-dashed border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                            {data.partner.charAt(0)}
                        </div>
                        <div>
                            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-0.5">Powered By</span>
                            <span className="text-sm font-bold text-slate-800">{data.partner}</span>
                        </div>
                    </div>
                     <div className="text-right">
                        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-0.5">Next Session</span>
                        <div className="flex items-center gap-1.5 justify-end">
                            <Clock className="w-3.5 h-3.5 text-blue-500" />
                            <span className="text-xs font-bold text-slate-700">{data.nextSession}</span>
                        </div>
                    </div>
                </div>

                {/* Data Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Enrollment Stat */}
                    <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-center">
                         <div className="flex items-center gap-2 mb-1">
                            <Users className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Enrolled</span>
                         </div>
                         <span className="text-xl font-extrabold text-slate-900">{data.enrolled}</span>
                    </div>
                    
                    {/* Tags */}
                    <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-center">
                         <div className="flex items-center gap-2 mb-1.5">
                            <Hash className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Focus Area</span>
                         </div>
                         <div className="flex flex-wrap gap-1">
                            {data.tags.slice(0, 1).map((t, i) => (
                                <span key={i} className="text-xs font-bold text-slate-700 truncate">
                                    {t}
                                </span>
                            ))}
                            {data.tags.length > 1 && <span className="text-xs text-gray-400 font-bold">+{data.tags.length - 1}</span>}
                         </div>
                    </div>
                </div>

                {/* Linear Progress Section - Bottom Anchor */}
                <div className="mt-auto">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-ascend-blue" /> Gap Closure
                        </span>
                        <div className="text-right flex items-baseline gap-2">
                            <span className="text-2xl font-extrabold text-slate-900">{data.gapClosure}%</span>
                            <span className="text-xs font-bold text-green-500">+5% this wk</span>
                        </div>
                    </div>
                    
                    {/* Progress Track */}
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-100">
                        <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                                isLive 
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                                : 'bg-gray-300'
                            }`} 
                            style={{ width: `${data.gapClosure}%` }}
                        >
                            {/* Animated Shine Effect */}
                            {isLive && <div className="w-full h-full bg-white/20 animate-pulse"></div>}
                        </div>
                    </div>
                </div>

                 {/* Hover Action - Manage Button */}
                 <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                    <button className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100">
                        Manage <ArrowUpRight className="w-3.5 h-3.5" />
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
                        Curriculum OS 2.0
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-300 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                        <Zap className="w-3 h-3" /> System Optimal
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                    Bridging the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Latency Gap</span>
                </h1>
                <p className="text-blue-100/80 text-lg font-medium mb-8 leading-relaxed max-w-lg">
                    Orchestrate live interventions across 14 departments. Current closing velocity: <span className="text-white font-bold">12% week-over-week.</span>
                </p>
                
                <div className="flex gap-4">
                    <button className="px-6 py-3.5 bg-white text-ascend-blue rounded-xl font-bold text-sm shadow-glow hover:bg-blue-50 transition-all flex items-center gap-2 hover:scale-105 active:scale-95">
                        <Plus className="w-4 h-4" /> New Initiative
                    </button>
                    <button className="px-6 py-3.5 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-sm hover:bg-white/20 transition-all backdrop-blur-md">
                        View Analytics Report
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
                        placeholder="Search initiatives..." 
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
            <div className="group rounded-[32px] border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-blue-50/30 hover:border-ascend-blue/50 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 h-[520px]">
                <div className="w-20 h-20 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:shadow-md group-hover:border-blue-100">
                    <Plus className="w-8 h-8 text-gray-300 group-hover:text-ascend-blue transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-400 group-hover:text-ascend-blue transition-colors">Draft New Intervention</h3>
                <p className="text-xs font-bold text-gray-300 mt-2 uppercase tracking-widest">Orchestrate a new lab</p>
            </div>
        </div>

    </div>
  );
};

export default CurriculumDashboard;