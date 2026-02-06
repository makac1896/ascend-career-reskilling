import React, { useState, useEffect, useRef } from 'react';
import { 
    ArrowRight, 
    ArrowLeft,
    Wind, 
    UserCircle2,
    Compass,
    Radio,
    Target,
    BookOpen,
    Cpu,
    ChevronUp,
    Heart,
    Play,
    Music,
    Smile,
    Frown,
    Meh,
    Download,
    CheckCircle2,
    Zap,
    Maximize2,
    CreditCard,
    Globe,
    Layers,
    Activity,
    Trophy,
    Star,
    Sparkles,
    Book,
    Medal,
    TrendingUp,
    Users,
    Clock,
    Calendar,
    LayoutGrid,
    BrainCircuit,
    MessageCircle,
    Lightbulb,
    Handshake,
    PenTool,
    Mic,
    Save,
    Share2,
    FileText,
    Image as ImageIcon,
    History,
    MoreHorizontal,
    Send,
    PlayCircle,
    X,
    Filter,
    Settings,
    MapPin,
    File,
    MoreVertical,
    ThumbsUp,
    MessageSquare,
    Eye,
    SlidersHorizontal,
    Headphones,
    Video,
    Mic2,
    Bot,
    Fingerprint,
    Quote,
    Edit3,
    Battery,
    Feather,
    Accessibility,
    Plane,
    Palette,
    Briefcase,
    Building2,
    TrendingDown,
    AlertTriangle,
    Search,
    BookMarked,
    Flag,
    Shield,
    Tag,
    ExternalLink,
    Bookmark
} from 'lucide-react';
import { GlassGlobe, GlassDNA, ClayCube } from './GlassIcons';

// --- Artistic Patterns (Tapestry SVGs) ---

const CircuitPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-10 mix-blend-overlay" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20h40v1h-40z" fill="white" fillOpacity="0.5"/>
                <path d="M20 0v40h1v-40z" fill="white" fillOpacity="0.5"/>
                <circle cx="20" cy="20" r="3" fill="white" />
                <rect x="5" y="5" width="5" height="5" fill="white" fillOpacity="0.3" />
                <rect x="30" y="30" width="5" height="5" fill="white" fillOpacity="0.3" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
);

const WavePattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-10 mix-blend-overlay" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="waves" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q25 20 50 10 T100 10" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#waves)" />
    </svg>
);

const GeoPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-10 mix-blend-overlay" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="geo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40 L40 0" stroke="white" strokeWidth="1" strokeOpacity="0.5"/>
                <circle cx="20" cy="20" r="10" stroke="white" strokeWidth="1" fill="none" opacity="0.5"/>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geo)" />
    </svg>
);


// --- Types & Configuration ---

type RoomType = 'Atrium' | 'SignalTower' | 'GrowthLab' | 'QuietRoom';

interface ARHotspot {
    id: string;
    top: string; // % position
    left: string; // % position
    icon: React.ReactNode;
    label: string;
    detail: string;
    type: 'alert' | 'info' | 'action';
    delay: number;
}

interface RoomConfig {
    id: RoomType;
    title: string;
    bgImage: string;
    description: string;
    hotspots: ARHotspot[];
    navigation: {
        label: string;
        target: RoomType;
        position: string; // Tailwind class
        arrowDir: 'right' | 'left' | 'up' | 'down';
    }[];
}

const ROOMS: Record<RoomType, RoomConfig> = {
    Atrium: {
        id: 'Atrium',
        title: 'Student Hub',
        bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop', // Bright Atrium
        description: 'Where do you want to go today?',
        hotspots: [], // Cleared for cleaner look with Wallet UI
        navigation: [] // Handled by Wallet Component
    },
    SignalTower: {
        id: 'SignalTower',
        title: 'Job Market',
        bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', // Bright Corporate Glass
        description: 'See who is hiring and what skills they want.',
        hotspots: [],
        navigation: [
            { label: 'Back to Hub', target: 'Atrium', position: 'bottom-12 left-12', arrowDir: 'left' }
        ]
    },
    GrowthLab: {
        id: 'GrowthLab',
        title: 'Workshops',
        bgImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop', // Bright Co-working/Lab
        description: 'Practice skills with real-world scenarios.',
        hotspots: [],
        navigation: [
            { label: 'Back to Hub', target: 'Atrium', position: 'bottom-12 left-12', arrowDir: 'left' }
        ]
    },
    QuietRoom: {
        id: 'QuietRoom',
        title: 'My Journal',
        bgImage: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=2070&auto=format&fit=crop', // Bright Minimalist Room/Spa
        description: 'Reflect on your experiences.',
        hotspots: [],
        navigation: [
            { label: 'Back to Hub', target: 'Atrium', position: 'bottom-12 left-12', arrowDir: 'left' }
        ]
    }
};

// --- Specialized Room Interfaces ---

// --- TAB SUB-COMPONENTS FOR JOURNAL ---

const ResourcesTab: React.FC = () => {
    const resources = [
        { title: "Black Student Support", desc: "Community networks, mentorship, and advocacy.", image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop" },
        { title: "Disabilities & Well-being", desc: "Accommodations, accessibility tech, and counseling.", image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop" },
        { title: "2SLGBTQIA+ Resources", desc: "Safe spaces, peer support, and health resources.", image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop" },
        { title: "Indigenous Student Centre", desc: "Cultural connection, elders, and academic support.", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop" },
        { title: "Newcomer & International", desc: "Visa help, language labs, and settlement services.", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" },
        { title: "Sex Work Support", desc: "Confidential, non-judgmental health & safety resources.", image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=2070&auto=format&fit=crop" }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {resources.map((r, i) => (
                <div key={i} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                    <div className="h-40 overflow-hidden">
                        <img src={r.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={r.title} />
                    </div>
                    <div className="p-6">
                        <h3 className="font-black text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">{r.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">{r.desc}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600">
                            View Details <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const ProfileTab: React.FC = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-8">
            {/* Identity Statement */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">My Goal</h3>
                <div className="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
                    "I want to become a <span className="text-blue-600 border-b-2 border-blue-200 hover:border-blue-600 cursor-pointer transition-colors">Strategist</span> who bridges <span className="text-purple-600 border-b-2 border-purple-200 hover:border-purple-600 cursor-pointer transition-colors">human empathy</span> with <span className="text-orange-600 border-b-2 border-orange-200 hover:border-orange-600 cursor-pointer transition-colors">tech skills</span>."
                </div>
                <button className="mt-6 text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center justify-center gap-2 mx-auto">
                    <Edit3 className="w-3 h-3" /> Edit Goal
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Skills */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                     <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" /> Top Skills
                     </h3>
                     <div className="space-y-6">
                        {[
                            { name: "Problem Solving", level: 3, evidence: 5 },
                            { name: "Ethics", level: 4, evidence: 8 },
                            { name: "Negotiation", level: 2, evidence: 2 },
                        ].map((skill, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-bold text-slate-700">{skill.name}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{skill.evidence} Examples</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-slate-800 rounded-full group-hover:bg-blue-600 transition-colors"
                                        style={{ width: `${(skill.level / 5) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>

                {/* Values & Patterns */}
                <div className="space-y-8">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                         <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-rose-500" /> My Values
                         </h3>
                         <div className="flex flex-wrap gap-2">
                            {['Impact', 'Stability', 'Learning', 'Autonomy', 'Justice'].map(tag => (
                                <span key={tag} className="px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-100 rounded-lg text-xs font-bold uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                         </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 rounded-3xl p-6 border border-green-100">
                             <h4 className="text-xs font-black text-green-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> I Enjoy
                             </h4>
                             <p className="text-sm font-medium text-slate-700 leading-snug">Working on open-ended problems with a team.</p>
                        </div>
                        <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100">
                             <h4 className="text-xs font-black text-orange-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Battery className="w-3 h-3" /> I Dislike
                             </h4>
                             <p className="text-sm font-medium text-slate-700 leading-snug">Repetitive data entry tasks.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StreamTab: React.FC = () => {
    return (
        <div className="animate-in fade-in duration-500 flex flex-col h-full max-w-3xl mx-auto">
            
            {/* Input Area (Social Post Style) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-8">
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                         <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <textarea 
                            placeholder="What's on your mind? Log a learning moment..."
                            className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none resize-none h-20"
                        />
                    </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-blue-500 transition-colors">
                            <ImageIcon className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-purple-500 transition-colors">
                            <Tag className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-yellow-500 transition-colors">
                            <Smile className="w-5 h-5" />
                        </button>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold text-sm shadow-md hover:bg-blue-700 transition-all">
                        Post Reflection
                    </button>
                </div>
            </div>

            {/* Feed */}
            <div className="space-y-6 pb-8">
                {[
                    { 
                        text: "Finally cracked the team conflict today! We were stuck arguing about the project direction for 2 days. I tried that 'active listening' thing Dr. K mentioned and we actually moved forward. Feels good.", 
                        tags: ["Leadership", "Win"], 
                        time: "2h ago", 
                        likes: 12,
                        comments: 3
                    },
                    { 
                        text: "Honestly, Python is testing my patience. Spent 3 hours on a single bug. Turns out it was a typo. But hey, I know how the debugger works now I guess? 😅", 
                        tags: ["Coding", "Struggle"], 
                        time: "Yesterday", 
                        likes: 24,
                        comments: 8
                    },
                    { 
                        text: "Volunteer shift at the Food Bank was eye-opening. We re-organized the line and saved people about 10 mins of waiting. Small change, big impact.", 
                        tags: ["Volunteering", "Impact"], 
                        time: "2 days ago", 
                        likes: 45,
                        comments: 5
                    }
                ].map((entry, i) => (
                    <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Maya R.</h4>
                                <span className="text-xs text-slate-500 font-medium">{entry.time}</span>
                            </div>
                            <button className="ml-auto text-slate-400 hover:text-slate-600">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-slate-800 text-sm leading-relaxed mb-4 font-medium">
                            {entry.text}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {entry.tags.map(t => (
                                <span key={t} className="px-3 py-1 bg-slate-50 text-blue-600 rounded-full text-xs font-bold hover:bg-blue-50 cursor-pointer">
                                    #{t}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex gap-6">
                                <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors group">
                                    <Heart className="w-5 h-5 group-hover:fill-current" />
                                    <span className="text-xs font-bold">{entry.likes}</span>
                                </button>
                                <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors">
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="text-xs font-bold">{entry.comments}</span>
                                </button>
                                <button className="flex items-center gap-2 text-slate-500 hover:text-green-500 transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                                <Bookmark className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

// --- CAREER JOURNAL INTERFACE (Refined Wrapper) ---
const StudentJournalInterface: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'stream' | 'profile' | 'resources'>('stream');

    const navItems = [
        { id: 'stream', label: 'Reflections', icon: <History className="w-4 h-4"/> },
        { id: 'profile', label: 'About Me', icon: <Fingerprint className="w-4 h-4"/> },
        { id: 'resources', label: 'Resources', icon: <Heart className="w-4 h-4"/> }
    ];

    return (
        <div className="absolute inset-0 z-20 pointer-events-none px-6 lg:px-12 pb-6 pt-28 lg:pt-32 flex justify-center">
              <div className="pointer-events-auto w-full max-w-6xl h-full bg-[#F8FAFC] rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-white flex overflow-hidden animate-in zoom-in duration-500 relative">
                
                {/* Side Navbar */}
                <div className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col gap-2">
                    <div className="mb-8 px-2 pt-2">
                        <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mb-3 shadow-sm">
                            <Wind className="w-6 h-6" />
                        </div>
                        <h3 className="font-black text-slate-800 text-lg leading-tight">My Journal</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1">Track your growth.</p>
                    </div>

                    <div className="space-y-1">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as any)}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                                    activeTab === item.id 
                                    ? 'bg-slate-900 text-white shadow-lg' 
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col h-full bg-[#F8FAFC]">
                    {/* Header - Centered */}
                    <div className="h-24 border-b border-slate-200 bg-white flex items-center justify-center relative shrink-0">
                        <div className="text-center">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Journal</h2>
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">
                                {activeTab === 'stream' && 'Personal Feed'}
                                {activeTab === 'profile' && 'My Profile'}
                                {activeTab === 'resources' && 'Help & Support'}
                            </p>
                        </div>
                        
                        {/* Optional Right Action */}
                        <div className="absolute right-8 top-1/2 -translate-y-1/2">
                            <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        {activeTab === 'resources' && <ResourcesTab />}
                        {activeTab === 'profile' && <ProfileTab />}
                        {activeTab === 'stream' && <StreamTab />}
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- NEW SIGNAL INTERFACE (JOB TRENDS REVAMP) ---
const SignalInterface: React.FC = () => {
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    
    // Mock Data: Market Trends
    const trends = [
        { id: 1, name: 'Ethical AI', growth: 142, type: 'rising', category: 'Human Skill' },
        { id: 2, name: 'Prompt Writing', growth: 88, type: 'rising', category: 'Tech Skill' },
        { id: 3, name: 'Strategic Thinking', growth: 54, type: 'rising', category: 'Human Skill' },
        { id: 4, name: 'Data Entry', growth: -45, type: 'falling', category: 'Fading Out' },
        { id: 5, name: 'Basic Copywriting', growth: -32, type: 'falling', category: 'Fading Out' },
    ];

    // Mock Data: Jobs
    const jobs = [
        {
            id: '1',
            title: 'Junior AI Ethicist',
            company: 'Anthropic',
            logo: 'https://ui-avatars.com/api/?name=Anthropic&background=7c3aed&color=fff&size=128&bold=true',
            location: 'San Francisco (Hybrid)',
            type: 'Internship',
            salary: '$45/hr',
            matchScore: 94,
            matchReason: 'High Empathy + Philosophy Background',
            tags: ['Policy', 'Humanities'],
            posted: '2h ago',
            skills: {
                match: ['Critical Thinking', 'Writing', 'Ethics'],
                gap: ['Python Basics', 'Model Eval']
            },
            desc: "Work with the team to check AI models for bias. Great for students with strong humanities backgrounds."
        },
        {
            id: '2',
            title: 'Generative Design Assoc.',
            company: 'Nike',
            logo: 'https://ui-avatars.com/api/?name=Nike&background=000&color=fff&size=128&bold=true',
            location: 'Remote',
            type: 'Full Time',
            salary: '$85k/yr',
            matchScore: 88,
            matchReason: 'Strong Visual Portfolio',
            tags: ['Creative', 'Design'],
            posted: '5h ago',
            skills: {
                match: ['Visual Design', 'Trends'],
                gap: ['Midjourney', '3D Modeling']
            },
            desc: "Collaborate with AI tools to create new footwear concepts. You act as the curator and designer."
        },
        // ... kept other jobs same structure
    ];

    const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

    return (
        <div className="absolute inset-0 z-20 pointer-events-none px-6 lg:px-12 pb-6 pt-28 lg:pt-32 flex justify-center">
            {/* Widened Container from max-w-7xl to max-w-[1600px] */}
            <div className="pointer-events-auto w-full h-full max-w-[1600px] flex gap-6 animate-in fade-in zoom-in duration-500">
                
                {/* --- LEFT COLUMN: MACRO INTELLIGENCE --- */}
                <div className="w-[320px] flex flex-col gap-6 h-full shrink-0 pb-24">
                    
                    {/* Radar Card */}
                    <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-[32px] shadow-lg flex-1 flex flex-col relative overflow-hidden group hover:bg-white/90 transition-all">
                         <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                                <Radio className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-800 text-lg leading-none">Job Market</h3>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">What's Trending</p>
                            </div>
                         </div>

                         {/* Trends List */}
                         <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                            {trends.map(t => (
                                <div key={t.id} className="flex items-center justify-between group/item cursor-default">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'rising' ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                            {t.type === 'rising' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-slate-800 group-hover/item:text-blue-600 transition-colors">{t.name}</span>
                                            <span className="block text-[9px] font-bold text-slate-400 uppercase">{t.category}</span>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-black ${t.type === 'rising' ? 'text-green-600' : 'text-red-500'}`}>
                                        {t.growth > 0 ? '+' : ''}{t.growth}%
                                    </span>
                                </div>
                            ))}
                         </div>
                    </div>

                    {/* Filter Widget */}
                    <div className="bg-slate-900 text-white p-6 rounded-[32px] shadow-xl">
                        <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                            <Filter className="w-4 h-4 text-blue-400" /> Filter Jobs
                        </h4>
                        <div className="space-y-2">
                            {['All Jobs', 'Best Match', 'Remote Only', 'Internships'].map((f, i) => (
                                <button key={i} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${i === 0 ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-white/10 text-slate-300'}`}>
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- CENTER COLUMN: JOB FEED --- */}
                <div className="flex-1 flex flex-col h-full bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] shadow-2xl overflow-hidden relative min-w-0">
                     {/* Header - Centered Title */}
                     <div className="p-6 border-b border-white/50 bg-white/40 flex items-center justify-center relative backdrop-blur-md sticky top-0 z-10">
                        <div className="text-center">
                            <h2 className="text-xl font-black text-slate-900">Open Roles</h2>
                            <p className="text-xs text-slate-500 font-bold mt-1">Jobs that fit your profile</p>
                        </div>
                        
                        {/* Right Aligned Badge */}
                        <div className="absolute right-6 top-1/2 -translate-y-1/2">
                             <div className="bg-white/80 px-3 py-1.5 rounded-lg border border-white/60 text-[10px] font-bold text-slate-600 shadow-sm flex items-center gap-1.5">
                                <Globe className="w-3 h-3 text-blue-500" /> Global
                             </div>
                        </div>
                     </div>

                     {/* Feed */}
                     <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                        {jobs.map(job => (
                            <div 
                                key={job.id} 
                                onClick={() => setSelectedJobId(job.id)}
                                className={`p-8 rounded-[36px] border transition-all cursor-pointer group relative overflow-hidden flex flex-col gap-6 ${
                                    selectedJobId === job.id 
                                    ? 'bg-white border-blue-500 shadow-[0_20px_50px_rgba(59,130,246,0.15)] ring-1 ring-blue-500' 
                                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]'
                                }`}
                            >
                                {/* Top Row: Logo + Match Pill */}
                                <div className="flex justify-between items-start">
                                    <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm p-1.5 shrink-0 flex items-center justify-center">
                                        <img src={job.logo} className="w-full h-full object-contain rounded-xl" alt="Logo" />
                                    </div>
                                    <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 ${
                                        job.matchScore >= 90 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                    }`}>
                                        <Sparkles className="w-4 h-4 fill-current" />
                                        {job.matchScore}% Match
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                                        {job.title}
                                    </h3>
                                    <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                                        <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {job.company}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span className="text-slate-400">{job.posted}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-base font-medium text-slate-600 leading-relaxed">
                                    {job.desc}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {job.tags.map(tag => (
                                        <span key={tag} className="px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 border border-slate-200">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Footer */}
                                <div className="pt-4 mt-auto flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex gap-2 shrink-0">
                                        <button className="p-3 rounded-2xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100" title="Save Job">
                                            <Bookmark className="w-6 h-6" />
                                        </button>
                                        <button className="p-3 rounded-2xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100" title="Share">
                                            <Share2 className="w-6 h-6" />
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 flex-1 justify-end min-w-0">
                                        <button className="text-xs font-bold text-slate-500 hover:text-blue-600 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0">
                                            <FileText className="w-4 h-4" />
                                            Resume Prep
                                        </button>
                                        
                                        <button className="flex-1 max-w-[240px] py-4 bg-[#0A0A0A] text-white rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap">
                                            Apply Now <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Selection Indicator */}
                                {selectedJobId === job.id && (
                                    <div className="absolute left-0 top-10 bottom-10 w-1.5 bg-blue-500 rounded-r-full"></div>
                                )}
                            </div>
                        ))}
                     </div>
                </div>

                {/* --- RIGHT COLUMN: FIT ANALYSIS --- */}
                {/* Reduced width from 400px to 350px to allow more space for feed */}
                <div className="w-[350px] flex flex-col h-full bg-slate-900 text-white rounded-[40px] shadow-2xl p-8 relative overflow-hidden border border-slate-700 shrink-0">
                     {/* Background Glow */}
                     <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

                     {/* Job Header */}
                     <div className="relative z-10 mb-8 text-center">
                        <div className="w-20 h-20 mx-auto bg-white rounded-2xl p-2 mb-4 shadow-lg">
                            <img src={selectedJob.logo} className="w-full h-full object-contain rounded-lg" alt="Logo" />
                        </div>
                        <h2 className="text-2xl font-black mb-1">{selectedJob.title}</h2>
                        <p className="text-slate-400 font-bold text-sm">{selectedJob.company}</p>
                     </div>

                     {/* Fit Visualizer */}
                     <div className="relative z-10 flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">Skill Analysis</h3>
                            <span className="text-xs font-bold bg-slate-800 px-2 py-1 rounded text-white">{selectedJob.matchScore}% Match</span>
                        </div>

                        {/* Skill Stack */}
                        <div className="space-y-4 mb-8">
                            {/* Matches */}
                            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-2 text-green-400 font-bold text-xs uppercase tracking-wide">
                                    <CheckCircle2 className="w-4 h-4" /> You Have
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedJob.skills.match.map(s => (
                                        <span key={s} className="px-3 py-1 bg-green-500/20 rounded-lg text-xs font-bold text-green-300">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Gaps */}
                            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 relative overflow-hidden">
                                <div className="flex items-center gap-2 mb-2 text-red-400 font-bold text-xs uppercase tracking-wide relative z-10">
                                    <AlertTriangle className="w-4 h-4" /> Missing Skills
                                </div>
                                <div className="flex flex-wrap gap-2 relative z-10">
                                    {selectedJob.skills.gap.map(s => (
                                        <span key={s} className="px-3 py-1 bg-red-500/20 rounded-lg text-xs font-bold text-red-300 flex items-center gap-2 group cursor-pointer hover:bg-red-500/30 transition-colors">
                                            {s} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bridge Action */}
                        <div className="bg-blue-600 rounded-3xl p-6 text-center relative overflow-hidden group cursor-pointer hover:bg-blue-500 transition-colors shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            
                            <h4 className="font-black text-lg mb-1 relative z-10">Close the Gap</h4>
                            <p className="text-blue-100 text-xs font-medium mb-4 relative z-10">Take a short workshop to learn these skills.</p>
                            <div className="inline-flex items-center gap-2 bg-white text-blue-900 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md relative z-10">
                                Start Workshop <Zap className="w-4 h-4 fill-current" />
                            </div>
                        </div>

                     </div>

                     <div className="mt-6 text-center">
                        <button className="text-slate-500 text-xs font-bold hover:text-white transition-colors flex items-center justify-center gap-2 w-full">
                            <Save className="w-4 h-4" /> Save Job
                        </button>
                     </div>
                </div>

            </div>
        </div>
    );
}

// --- GROWTH INTERFACE (ADDED) ---
const GrowthInterface: React.FC = () => {
    const workshops = [
        {
            id: 1,
            title: "Supply Chain Crisis",
            type: "Live Simulation",
            duration: "45 min",
            participants: 12,
            status: "Live Now",
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "AI Ethics Check",
            type: "Module",
            duration: "20 min",
            participants: 45,
            status: "Open",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Negotiation Practice",
            type: "Roleplay",
            duration: "Unlimited",
            participants: 8,
            status: "Always On",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    return (
        <div className="absolute inset-0 z-20 pointer-events-none px-6 lg:px-12 pb-6 pt-28 lg:pt-32 flex justify-center">
            <div className="pointer-events-auto w-full h-full max-w-6xl bg-white/90 backdrop-blur-xl rounded-[48px] shadow-2xl border border-white flex overflow-hidden animate-in zoom-in duration-500">
                
                {/* Sidebar */}
                <div className="w-80 bg-slate-50 border-r border-slate-200 p-8 pb-28 flex flex-col">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-lg">
                            <Target className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-black text-slate-800 text-lg leading-none">Workshops</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Build Skills</p>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <button className="w-full text-left px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-sm shadow-sm flex items-center justify-between group hover:border-orange-400 transition-all">
                            <span>Available</span>
                            <span className="bg-orange-100 text-orange-700 text-[10px] px-2 py-0.5 rounded-full">3</span>
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-500 font-bold text-sm transition-all">
                            Completed
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-500 font-bold text-sm transition-all">
                            Saved
                        </button>
                    </div>

                    <div className="mt-auto">
                         <div className="bg-slate-900 rounded-2xl p-4 text-white">
                            <h4 className="font-bold text-sm mb-1">Weekly Goal</h4>
                            <p className="text-xs text-slate-400 mb-3">Complete 2 workshops to earn the "Strategist" badge.</p>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full w-1/2 bg-orange-500 rounded-full"></div>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-black text-slate-900">Workshops</h2>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">Filter</button>
                            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800">Browse All</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {workshops.map(w => (
                            <div key={w.id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                                <div className="h-40 relative overflow-hidden">
                                    <img src={w.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={w.title} />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-900">
                                            {w.type}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">{w.title}</h3>
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500 mb-6">
                                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {w.duration}</span>
                                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {w.participants} Active</span>
                                    </div>
                                    <button className="w-full py-3 bg-slate-50 text-slate-900 rounded-xl font-bold text-xs group-hover:bg-orange-500 group-hover:text-white transition-colors flex items-center justify-center gap-2">
                                        Start <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

// ... Shared Components ...

const ARTag: React.FC<{ data: ARHotspot }> = ({ data }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div 
            className="absolute z-30 group"
            style={{ top: data.top, left: data.left }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`relative flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-300 ${isHovered ? 'scale-125 ring-8 ring-white/30' : 'hover:scale-110'}`}>
                <div className="text-slate-700">
                    {data.icon}
                </div>
                {!isHovered && <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping"></div>}
            </div>
            
            <div className={`absolute left-20 top-0 w-80 bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl transition-all duration-300 origin-left border border-white/50 ${isHovered ? 'opacity-100 scale-100 translate-x-4' : 'opacity-0 scale-90 translate-x-0 pointer-events-none'}`}>
                <div className="flex items-center gap-3 mb-2">
                    <span className={`w-2 h-2 rounded-full ${data.type === 'info' ? 'bg-blue-500' : 'bg-orange-500'}`}></span>
                    <h4 className="text-slate-900 font-bold text-lg">{data.label}</h4>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{data.detail}</p>
            </div>
        </div>
    );
};

const NavPortal: React.FC<{ 
    label: string; 
    position: string; 
    arrowDir: 'right' | 'left' | 'up' | 'down'; 
    onClick: () => void; 
}> = ({ label, position, arrowDir, onClick }) => (
    <div 
        onClick={onClick}
        className={`absolute z-40 ${position} group cursor-pointer flex flex-col items-center justify-center gap-4 transition-transform hover:scale-105`}
    >
        <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#F8FAFC]/80 backdrop-blur-xl border-2 border-white shadow-xl flex items-center justify-center group-hover:bg-white group-hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-500 text-slate-800">
                {arrowDir === 'right' && <ArrowRight className="w-10 h-10 group-hover:translate-x-1 transition-transform" />}
                {arrowDir === 'left' && <ArrowLeft className="w-10 h-10 group-hover:-translate-x-1 transition-transform" />}
                {arrowDir === 'up' && <ChevronUp className="w-10 h-10 group-hover:-translate-y-1 transition-transform" />}
            </div>
            <div className="absolute -inset-2 rounded-full border border-white/30 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"></div>
        </div>
        <div className="bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg border border-white/50 transform group-hover:-translate-y-1 transition-transform">
            <span className="text-slate-900 font-black text-xs uppercase tracking-[0.2em] group-hover:text-blue-600 transition-colors">
                {label}
            </span>
        </div>
    </div>
);

// --- Student Profile HUD ---
const StudentProfileHUD: React.FC = () => {
    return (
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden lg:block">
            <div className="pointer-events-auto bg-white/60 backdrop-blur-2xl border-2 border-white/50 p-6 rounded-[36px] w-[360px] shadow-[0_30px_80px_rgba(0,0,0,0.1)] animate-in slide-in-from-left duration-1000 flex flex-col gap-6 transition-all hover:bg-white/80">
                <div className="flex items-center gap-5 border-b border-gray-200/50 pb-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full p-1 bg-white border border-white/50 shadow-md">
                            <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&auto=format&fit=crop" alt="Student" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white shadow-sm" title="Online"></div>
                    </div>
                    <div>
                        <h3 className="text-slate-900 font-black text-2xl leading-none">Maya R.</h3>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-2">Design Student • Year 3</p>
                        <div className="flex items-center gap-1 mt-2">
                             <div className="px-2 py-0.5 rounded-full bg-purple-50 border border-purple-100 text-[9px] font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" /> Strength: Empathy
                             </div>
                        </div>
                    </div>
                </div>
                <div>
                     <div className="flex items-center justify-between mb-3">
                        <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Zap className="w-3 h-3 text-orange-500" /> To Do List
                        </h4>
                        <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">2 Items</span>
                     </div>
                     <div className="space-y-2.5">
                        <div className="bg-white/80 p-3 rounded-2xl border border-orange-200/50 shadow-sm flex items-start gap-3 hover:border-orange-400 transition-colors cursor-pointer group relative overflow-hidden">
                             <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400"></div>
                             <div className="mt-0.5 w-4 h-4 rounded border-2 border-slate-200 group-hover:border-orange-500 flex items-center justify-center transition-colors shrink-0"></div>
                             <div>
                                 <span className="block text-sm font-bold text-slate-800 leading-tight group-hover:text-orange-700 transition-colors">Submit Reflection</span>
                                 <span className="block text-[10px] text-slate-400 font-bold mt-1 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Due Today, 5:00 PM
                                 </span>
                             </div>
                        </div>
                         <div className="bg-white/60 p-3 rounded-2xl border border-slate-200/50 shadow-sm flex items-start gap-3 hover:border-blue-400 transition-colors cursor-pointer group">
                             <div className="mt-0.5 w-4 h-4 rounded border-2 border-slate-200 group-hover:border-blue-500 flex items-center justify-center transition-colors shrink-0"></div>
                             <div>
                                 <span className="block text-sm font-bold text-slate-800 leading-tight">Sign up for Labs</span>
                                 <span className="block text-[10px] text-slate-400 font-bold mt-1">Opens Tomorrow</span>
                             </div>
                        </div>
                     </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] ml-1 mt-1">Skill Progress</h4>
                    <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-[0_4px_0_#e2e8f0] hover:translate-y-1 hover:shadow-none transition-all cursor-pointer group">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-extrabold text-slate-700 text-sm">Communication</span>
                            <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-1 rounded-lg">Level 3</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden relative">
                            <div className="absolute inset-0 bg-slate-100"></div>
                            <div className="h-full bg-blue-500 w-[65%] rounded-full relative">
                                <div className="absolute top-1 left-2 right-2 h-1 bg-white/20 rounded-full"></div>
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 mt-2 text-right">320 / 500 XP</p>
                    </div>
                </div>
                 <div>
                     <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1 mt-2">Shortcuts</h4>
                     <div className="grid grid-cols-4 gap-2">
                         {[
                             { label: 'Library', icon: <BookOpen className="w-5 h-5" />, color: 'text-blue-600', bg: 'bg-blue-50 group-hover:bg-blue-500 group-hover:text-white' },
                             { label: 'Help', icon: <Users className="w-5 h-5" />, color: 'text-purple-600', bg: 'bg-purple-50 group-hover:bg-purple-500 group-hover:text-white' },
                             { label: 'Jobs', icon: <Target className="w-5 h-5" />, color: 'text-orange-600', bg: 'bg-orange-50 group-hover:bg-orange-500 group-hover:text-white' },
                             { label: 'Wellness', icon: <Heart className="w-5 h-5" />, color: 'text-rose-600', bg: 'bg-rose-50 group-hover:bg-rose-500 group-hover:text-white' }
                         ].map((item, i) => (
                             <button key={i} className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-white hover:shadow-md transition-all group">
                                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${item.bg} ${item.color}`}>
                                     {item.icon}
                                 </div>
                                 <span className="text-[9px] font-bold text-slate-500 group-hover:text-slate-800">{item.label}</span>
                             </button>
                         ))}
                     </div>
                 </div>
            </div>
        </div>
    );
};

const TapestryCard: React.FC<{ 
    title: string; 
    subtitle: string; 
    icon: React.ReactNode; 
    theme: 'blue' | 'orange' | 'cyan'; 
    pattern: React.ReactNode;
    onClick: () => void; 
    delay: number;
    liveStatus?: string;
}> = ({ title, subtitle, icon, theme, pattern, onClick, delay, liveStatus }) => {
    
    const themes = {
        blue: 'from-[#1e3a8a] to-[#172554] border-blue-400/30 shadow-blue-900/40',
        orange: 'from-[#c2410c] to-[#7f1d1d] border-orange-400/30 shadow-orange-900/40',
        cyan: 'from-[#0e7490] to-[#164e63] border-cyan-400/30 shadow-cyan-900/40'
    };

    return (
        <div 
            onClick={onClick}
            className={`
                group relative w-[240px] h-[380px] rounded-[48px] p-6 flex flex-col justify-between 
                cursor-pointer transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
                hover:-translate-y-6 hover:scale-[1.02] hover:z-50 hover:rotate-0
                border-[4px] bg-gradient-to-br shadow-2xl
                ${themes[theme]}
                animate-in slide-in-from-bottom-40 fade-in-0
                overflow-hidden
            `}
            style={{ 
                marginRight: '-1rem', // Reduced overlap for smaller cards
                transform: 'rotate(var(--rotation))', 
                animationDelay: `${delay}ms`
            }}
        >
            {pattern}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-10 blur-[80px] rounded-full pointer-events-none mix-blend-overlay"></div>
            <div className="relative z-10 flex justify-between items-start">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                    {icon}
                </div>
                 <div className="flex items-center gap-1.5 bg-red-500 shadow-lg shadow-red-900/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 group-hover:scale-110 transition-transform">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    <span className="text-[9px] font-black text-white uppercase tracking-wider">{liveStatus}</span>
                </div>
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                    <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">{subtitle}</p>
                </div>
                <h3 className="text-white text-4xl font-black leading-[0.85] mb-6 tracking-tighter drop-shadow-xl">{title}</h3>
                <button className="w-full py-3 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-lg hover:bg-slate-50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group-hover:shadow-2xl">
                    Enter <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

const WalletCarousel: React.FC<{ onNavigate: (target: RoomType) => void }> = ({ onNavigate }) => {
    return (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40">
            <div className="flex items-end justify-center pl-20 perspective-[1000px]">
                <div className="relative flex items-center hover:space-x-8 transition-all duration-500">
                    <div style={{ '--rotation': '-5deg' } as React.CSSProperties} className="origin-bottom-right z-10 hover:z-50 transition-all duration-300">
                        <TapestryCard 
                            title="Job Trends" 
                            subtitle="Market Data" 
                            icon={<Radio className="w-6 h-6" />} 
                            theme="blue"
                            pattern={<CircuitPattern />}
                            onClick={() => onNavigate('SignalTower')}
                            delay={100}
                            liveStatus="New Jobs"
                        />
                    </div>
                    <div style={{ '--rotation': '0deg' } as React.CSSProperties} className="origin-bottom z-20 hover:z-50 transition-all duration-300 -ml-4 hover:ml-0">
                        <TapestryCard 
                            title="Workshops" 
                            subtitle="Build Skills" 
                            icon={<Target className="w-6 h-6" />} 
                            theme="orange"
                            pattern={<GeoPattern />}
                            onClick={() => onNavigate('GrowthLab')}
                            delay={200}
                            liveStatus="Active"
                        />
                    </div>
                    <div style={{ '--rotation': '5deg' } as React.CSSProperties} className="origin-bottom-left z-10 hover:z-50 transition-all duration-300 -ml-4 hover:ml-0">
                        <TapestryCard 
                            title="Journal" 
                            subtitle="Reflect" 
                            icon={<Wind className="w-6 h-6" />} 
                            theme="cyan"
                            pattern={<WavePattern />}
                            onClick={() => onNavigate('QuietRoom')}
                            delay={300}
                            liveStatus="Log Now"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StudentDashboard: React.FC = () => {
    const [currentRoom, setCurrentRoom] = useState<RoomType>('Atrium');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

    const handleNavigate = (target: RoomType) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentRoom(target);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 100);
        }, 800);
    };

    const room = ROOMS[currentRoom];

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#F1F5F9] font-sans text-slate-900 selection:bg-blue-100/50">
            
            {/* --- 1. THE WORLD LAYER (Background) --- */}
            <div 
                className={`absolute inset-0 transition-transform duration-[1500ms] ease-in-out will-change-transform ${
                    isTransitioning ? 'scale-[1.1] opacity-0 blur-xl' : 'scale-100 opacity-100 blur-0'
                }`}
            >
                <img 
                    src={room.bgImage} 
                    alt={room.title} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent"></div>
            </div>

            {/* --- 2. GLOBAL GRADIENTS & TITLE (The "Vibe" Layer) --- */}
            {/* Right Gradient for Title Readability */}
            <div className="absolute top-0 right-0 h-full w-[60%] bg-gradient-to-l from-white/95 via-white/70 to-transparent pointer-events-none z-10"></div>
            
            {/* Left Gradient for Logo Visibility */}
            <div className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-white/80 via-white/40 to-transparent pointer-events-none z-10"></div>

            {/* Global Page Title - Conditioned for Room Type */}
            <div className={`absolute pointer-events-none z-10 flex flex-col transition-all duration-1000 ${
                currentRoom === 'Atrium' 
                ? 'top-28 right-12 text-right items-end' 
                : 'top-24 left-0 w-full items-center text-center'
            }`}>
                <div className={`flex mb-4 ${currentRoom === 'Atrium' ? 'justify-end' : 'justify-center'}`}>
                    <span key={`tag-${currentRoom}`} className="px-5 py-2 rounded-full bg-white/50 backdrop-blur-md border border-slate-900/10 text-slate-900 text-xs font-bold uppercase tracking-widest animate-in slide-in-from-top duration-1000 shadow-sm">
                        {currentRoom === 'Atrium' ? 'Student Hub' : 'Active Module'}
                    </span>
                </div>
                <h1 key={`title-${currentRoom}`} className={`${currentRoom === 'Atrium' ? 'text-7xl md:text-9xl' : 'text-4xl md:text-6xl'} font-black text-slate-900 leading-[0.85] tracking-tighter mb-6 animate-in fade-in zoom-in duration-1000 delay-200 drop-shadow-2xl opacity-90`}>
                    {room.title}
                </h1>
                <p key={`desc-${currentRoom}`} className={`text-xl text-slate-800 font-bold leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-400 max-w-md ${currentRoom === 'Atrium' ? '' : 'text-center opacity-80'}`}>
                    {room.description}
                </p>
            </div>

            {/* --- 3. THE UI LAYER (HUD) --- */}
            <div className={`absolute inset-0 z-20 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                
                {/* Top Bar - Minimalist & Glass */}
                <nav className="absolute top-0 w-full p-10 flex justify-between items-start z-50 pointer-events-none">
                    <div className="flex items-center gap-6 animate-in slide-in-from-top duration-700 pointer-events-auto">
                        <div className="w-12 h-12 bg-white/80 backdrop-blur-2xl border border-white/60 rounded-2xl flex items-center justify-center text-slate-900 shadow-sm">
                             <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-900">
                                <path d="M8 11L14 29L20 11L26 29L32 11" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <span className="text-slate-900 font-extrabold tracking-tight text-3xl block drop-shadow-sm lowercase">waypoint</span>
                            <span className="text-[11px] text-slate-600 font-bold uppercase tracking-[0.15em] flex items-center gap-2 mt-0.5">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm"></span>
                                Career Platform
                            </span>
                        </div>
                    </div>
                </nav>

                {/* Profile HUD (Kept Global for Consistency but can overlap if window small) */}
                {currentRoom === 'Atrium' && <StudentProfileHUD />}

                {/* --- NAVIGATION & CONTENT --- */}
                {currentRoom === 'Atrium' ? (
                    <WalletCarousel onNavigate={handleNavigate} />
                ) : (
                    <>
                        {/* Interactive Room Components - Z-Index 30 to sit above title layer if needed */}
                        <div className="relative z-30 w-full h-full">
                            {currentRoom === 'QuietRoom' && <StudentJournalInterface />}
                            {currentRoom === 'SignalTower' && <SignalInterface />}
                            {currentRoom === 'GrowthLab' && <GrowthInterface />}
                        </div>

                        {/* AR Hotspots */}
                        {room.hotspots.map((h, i) => (
                            <div key={h.id} className="animate-in fade-in zoom-in duration-700" style={{ animationDelay: `${h.delay}ms` }}>
                                <ARTag data={h} />
                            </div>
                        ))}

                        {/* Back Buttons */}
                        {room.navigation.map((nav, i) => (
                            <div key={i} className="animate-in fade-in duration-1000 delay-700">
                                <NavPortal 
                                    label={nav.label} 
                                    position={nav.position} 
                                    arrowDir={nav.arrowDir as any} 
                                    onClick={() => handleNavigate(nav.target)} 
                                />
                            </div>
                        ))}
                    </>
                )}

            </div>

            {/* Flash Transition Overlay - Soft White Flash */}
            <div 
                className={`absolute inset-0 bg-[#F8FAFC] pointer-events-none z-[100] transition-opacity duration-700 ease-out ${
                    isTransitioning ? 'opacity-100' : 'opacity-0'
                }`}
            ></div>

        </div>
    );
};

export default StudentDashboard;