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
    Sparkles
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
    const styles = {
        Active: "bg-green-500/20 text-green-300 border-green-500/30 backdrop-blur-md",
        Proposed: "bg-blue-500/20 text-blue-300 border-blue-500/30 backdrop-blur-md",
        Completed: "bg-gray-500/20 text-gray-300 border-gray-500/30 backdrop-blur-md",
    };
    
    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${styles[status as keyof typeof styles] || styles.Active}`}>
            {status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>}
            {status}
        </span>
    );
};

const InitiativeCard: React.FC<{ data: typeof initiatives[0] }> = ({ data }) => {
    return (
        <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-ascend-border h-[420px] flex flex-col">
            
            {/* Image Banner */}
            <div className="h-56 relative overflow-hidden">
                <img 
                    src={data.image} 
                    alt={data.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <StatusBadge status={data.status} />
                </div>

                <div className="absolute top-4 right-4">
                    <button className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-bold text-white/80 uppercase tracking-wider mb-1 block flex items-center gap-2">
                       <GraduationCap className="w-3.5 h-3.5" /> {data.dept}
                    </span>
                    <h3 className="text-xl font-bold text-white leading-tight mb-2 shadow-sm">{data.title}</h3>
                    
                    {/* Partner Pill */}
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-white/90 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
                            Powered by {data.partner}
                        </span>
                    </div>
                </div>
            </div>

            {/* Body Content */}
            <div className="flex-1 p-6 flex flex-col bg-white relative z-10">
                
                <div className="flex justify-between items-end mb-6">
                    {/* Stats */}
                    <div className="flex flex-col gap-1">
                         <span className="text-[10px] font-bold text-ascend-subtext uppercase tracking-wider">Gap Closure</span>
                         <div className="flex items-end gap-1">
                            <span className="text-2xl font-bold text-ascend-text">{data.gapClosure}%</span>
                            <span className="text-[10px] font-bold text-green-500 mb-1">+5% this wk</span>
                         </div>
                    </div>

                    {/* Radial Progress (Visual Only for aesthetic) */}
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="24" cy="24" r="20" stroke="#E0E5F2" strokeWidth="4" fill="transparent" />
                            <circle cx="24" cy="24" r="20" stroke="#4318FF" strokeWidth="4" fill="transparent" strokeDasharray={126} strokeDashoffset={126 - (126 * data.gapClosure) / 100} strokeLinecap="round" />
                        </svg>
                        <Zap className="w-4 h-4 text-ascend-blue absolute" />
                    </div>
                </div>

                {/* Bottom Metadata */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-ascend-subtext">
                        <Users className="w-4 h-4" />
                        <span className="text-xs font-bold">{data.enrolled > 0 ? `${data.enrolled} Students` : 'Not Launched'}</span>
                    </div>
                    
                    <button className="flex items-center gap-1.5 text-xs font-bold text-ascend-blue hover:text-blue-700 transition-colors">
                        Manage <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Hover Action - "Play" Button Effect */}
                {data.status === 'Active' && (
                    <div className="absolute -top-6 right-6 w-12 h-12 bg-ascend-blue rounded-full flex items-center justify-center shadow-glow text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <Play className="w-5 h-5 ml-1 fill-current" />
                    </div>
                )}
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
        <div className="w-full h-[280px] rounded-3xl relative overflow-hidden group shadow-lg">
            <img 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover" 
                alt="Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/80 to-transparent"></div>
            
            <div className="absolute inset-0 p-10 flex flex-col justify-center max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest">
                        Curriculum OS
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-300 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                        <Zap className="w-3 h-3" /> System Optimal
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                    Bridging the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Latency Gap</span>
                </h1>
                <p className="text-white/80 text-lg font-medium mb-8 leading-relaxed max-w-lg">
                    Orchestrate live interventions across 14 departments. Current closing velocity: <span className="text-white font-bold">12% week-over-week.</span>
                </p>
                
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white text-ascend-blue rounded-xl font-bold text-sm shadow-glow hover:bg-gray-50 transition-all flex items-center gap-2">
                        <Plus className="w-4 h-4" /> New Initiative
                    </button>
                    <button className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-sm hover:bg-white/20 transition-all backdrop-blur-md">
                        View Analytics Report
                    </button>
                </div>
            </div>

            {/* Decorative Floating Glass Elements */}
            <div className="absolute right-20 top-1/2 -translate-y-1/2 hidden lg:block">
                 <div className="w-24 h-24 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl animate-bounce duration-[3000ms]">
                    <GlassGlobe className="w-16 h-16" />
                 </div>
            </div>
             <div className="absolute right-60 bottom-10 hidden lg:block">
                 <div className="w-20 h-20 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl animate-pulse duration-[4000ms]">
                    <GlassDNA className="w-14 h-14" />
                 </div>
            </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-20 py-2 backdrop-blur-sm bg-ascend-bg/50">
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-sm border border-ascend-border">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives
                .filter(i => filter === 'All' || i.status === filter)
                .map(item => (
                <InitiativeCard key={item.id} data={item} />
            ))}

            {/* "Add New" Placeholder Card */}
            <div className="group rounded-3xl border-2 border-dashed border-ascend-border bg-gray-50/50 hover:bg-blue-50/50 hover:border-ascend-blue/50 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 h-[420px]">
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 text-ascend-subtext group-hover:text-ascend-blue" />
                </div>
                <h3 className="text-lg font-bold text-ascend-subtext group-hover:text-ascend-blue">Draft New Intervention</h3>
                <p className="text-xs text-ascend-subtext mt-1">Orchestrate a new lab or course</p>
            </div>
        </div>

    </div>
  );
};

export default CurriculumDashboard;