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
    Palette
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
        title: 'Job Trends',
        bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', // Bright Corporate Glass
        description: 'Live market data and open roles.',
        hotspots: [],
        navigation: [
            { label: 'Return to Hub', target: 'Atrium', position: 'bottom-12 left-12', arrowDir: 'left' }
        ]
    },
    GrowthLab: {
        id: 'GrowthLab',
        title: 'Workshops',
        bgImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop', // Bright Co-working/Lab
        description: 'Skill-building labs and exercises.',
        hotspots: [],
        navigation: [
            { label: 'Return to Hub', target: 'Atrium', position: 'bottom-12 left-12', arrowDir: 'left' }
        ]
    },
    QuietRoom: {
        id: 'QuietRoom',
        title: 'Career Journal',
        bgImage: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=2070&auto=format&fit=crop', // Bright Minimalist Room/Spa
        description: 'Log experiences, synthesize skills.',
        hotspots: [],
        navigation: [
            { label: 'Return to Hub', target: 'Atrium', position: 'bottom-12 left-12', arrowDir: 'left' }
        ]
    }
};

// --- Specialized Room Interfaces ---

// --- CAREER JOURNAL INTERFACE (Redesigned & Reactive) ---
const StudentJournalInterface: React.FC = () => {
    const [activeTab, setActiveTab] = useState('feed');
    const [focusMode, setFocusMode] = useState<'idle' | 'selection' | 'writing' | 'voice' | 'chat'>('idle');
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showSlider, setShowSlider] = useState(false);

    // Core Skills Content
    const feedItems = [
        {
            id: 1,
            author: 'Maya R.',
            time: '2 hours ago',
            content: "Just finished the *Difficult Conversations* simulation. I realized my default is to 'fix' the problem immediately, but the client just wanted to be heard. Need to practice active listening without solutioning.",
            tags: ['@Sarah', '@Advisor'],
            images: [
                'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=800&auto=format&fit=crop',
            ],
            likes: 12,
            comments: 3,
            views: 45
        },
        {
            id: 2,
            author: 'Ascend AI',
            time: '3 hours ago',
            content: "Great work on the **Ethical Leadership** module! Your judgment call on the 'Supply Chain Transparency' scenario aligned 94% with industry best practices for ESG.",
            tags: [],
            isSystem: true,
            likes: 85,
            comments: 0,
            views: 120
        }
    ];

    const mentors = [
        { name: 'Dr. Al-Fayed', role: 'Ethics Lead', img: 'https://i.pravatar.cc/150?u=alfayed' },
        { name: 'Sarah Jenkins', role: 'HR Director', img: 'https://i.pravatar.cc/150?u=sarah' },
        { name: 'Marcus Chen', role: 'Negotiator', img: 'https://i.pravatar.cc/150?u=marcus' },
    ];

    const ediResources = [
        {
            id: '1',
            title: 'Black Student Excellence',
            icon: <Star className="w-5 h-5 text-purple-600" />,
            color: 'bg-purple-50',
            border: 'border-purple-200',
            count: 24,
            desc: 'Mentorship grants, leadership retreats, and cultural history labs.'
        },
        {
            id: '2',
            title: 'Indigenous Pathways',
            icon: <Feather className="w-5 h-5 text-orange-600" />,
            color: 'bg-orange-50',
            border: 'border-orange-200',
            count: 18,
            desc: 'Traditional knowledge keepers, land-based learning, and scholarships.'
        },
        {
            id: '3',
            title: 'Pride & Inclusion',
            icon: <Heart className="w-5 h-5 text-pink-600" />,
            color: 'bg-pink-50',
            border: 'border-pink-200',
            count: 32,
            desc: '2SLGBTQIA+ support networks, safe space directories, and events.'
        },
        {
            id: '4',
            title: 'Accessibility & Neurodiversity',
            icon: <Accessibility className="w-5 h-5 text-teal-600" />,
            color: 'bg-teal-50',
            border: 'border-teal-200',
            count: 15,
            desc: 'Adaptive technology grants, sensory-friendly study spaces, and advocacy.'
        },
        {
            id: '5',
            title: 'Newcomer Success',
            icon: <Plane className="w-5 h-5 text-blue-600" />,
            color: 'bg-blue-50',
            border: 'border-blue-200',
            count: 21,
            desc: 'Language labs, cultural navigation guides, and settlement support.'
        },
        {
            id: '6',
            title: 'Women in Leadership',
            icon: <TrendingUp className="w-5 h-5 text-indigo-600" />,
            color: 'bg-indigo-50',
            border: 'border-indigo-200',
            count: 29,
            desc: 'Executive coaching, STEM grants, and negotiation workshops.'
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setInputText(val);
        setIsTyping(val.length > 5);
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            {/* Main Shell - Resized to be slightly smaller to fit better (approx 5% reduction) */}
            <div className="pointer-events-auto w-[1100px] h-[650px] bg-[#F8FAFC] rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-white flex overflow-hidden animate-in zoom-in duration-500 relative">
                
                {/* ---------------- FOCUS MODE OVERLAY ---------------- */}
                {focusMode !== 'idle' && (
                    <div className="absolute inset-0 z-50 bg-slate-900 text-white flex flex-col animate-in fade-in slide-in-from-bottom-10 duration-500">
                        
                        {/* Focus Header */}
                        <div className="flex justify-between items-center p-8">
                            <div className="flex items-center gap-3">
                                {focusMode !== 'selection' && (
                                    <button 
                                        onClick={() => setFocusMode('selection')}
                                        className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-slate-400" />
                                    </button>
                                )}
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                                    {focusMode === 'selection' ? 'Select Mode' : focusMode}
                                </span>
                            </div>
                            <button 
                                onClick={() => setFocusMode('idle')}
                                className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-slate-400 hover:text-white" />
                            </button>
                        </div>

                        {/* MODE: SELECTION */}
                        {focusMode === 'selection' && (
                            <div className="flex-1 flex items-center justify-center gap-8 p-10">
                                <button 
                                    onClick={() => setFocusMode('writing')}
                                    className="group w-64 h-80 bg-slate-800 rounded-3xl border border-slate-700 hover:border-blue-500 hover:bg-slate-800/80 transition-all flex flex-col items-center justify-center gap-6 relative overflow-hidden"
                                >
                                    <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-slate-700 group-hover:border-blue-500/50">
                                        <PenTool className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <div className="text-center z-10">
                                        <h3 className="text-xl font-bold text-white mb-2">Free Write</h3>
                                        <p className="text-xs text-slate-400 px-6">Unstructured reflection on a recent experience.</p>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>

                                <button 
                                    onClick={() => setFocusMode('voice')}
                                    className="group w-64 h-80 bg-slate-800 rounded-3xl border border-slate-700 hover:border-purple-500 hover:bg-slate-800/80 transition-all flex flex-col items-center justify-center gap-6 relative overflow-hidden"
                                >
                                    <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-slate-700 group-hover:border-purple-500/50">
                                        <Mic2 className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <div className="text-center z-10">
                                        <h3 className="text-xl font-bold text-white mb-2">Voice Sync</h3>
                                        <p className="text-xs text-slate-400 px-6">Speak your thoughts. AI will transcribe & tag.</p>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>

                                <button 
                                    onClick={() => setFocusMode('chat')}
                                    className="group w-64 h-80 bg-slate-800 rounded-3xl border border-slate-700 hover:border-green-500 hover:bg-slate-800/80 transition-all flex flex-col items-center justify-center gap-6 relative overflow-hidden"
                                >
                                    <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-slate-700 group-hover:border-green-500/50">
                                        <Bot className="w-8 h-8 text-green-400" />
                                    </div>
                                    <div className="text-center z-10">
                                        <h3 className="text-xl font-bold text-white mb-2">AI Guide</h3>
                                        <p className="text-xs text-slate-400 px-6">Debrief with a specialized career coach.</p>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>
                            </div>
                        )}

                        {/* MODE: WRITING */}
                        {focusMode === 'writing' && (
                            <div className="flex-1 flex relative">
                                <div className="flex-1 flex flex-col max-w-3xl mx-auto pt-10 px-8">
                                    <input 
                                        type="text" 
                                        placeholder="Title your entry..." 
                                        className="text-4xl font-bold bg-transparent border-none outline-none text-white placeholder:text-slate-600 mb-6"
                                    />
                                    <textarea 
                                        className="w-full flex-1 bg-transparent border-none outline-none text-lg text-slate-300 leading-relaxed resize-none placeholder:text-slate-700"
                                        placeholder="Start typing your reflection here..."
                                        value={inputText}
                                        onChange={handleInputChange}
                                        autoFocus
                                    />
                                    
                                    {/* Bottom Action Bar */}
                                    <div className="h-20 border-t border-slate-800 flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => setShowSlider(!showSlider)}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${showSlider ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                                            >
                                                <SlidersHorizontal className="w-4 h-4" /> Scale
                                            </button>
                                            <button className="px-4 py-2 bg-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center gap-2">
                                                <ImageIcon className="w-4 h-4" /> Evidence
                                            </button>
                                        </div>
                                        <button className="px-8 py-3 bg-white text-slate-900 rounded-xl text-sm font-bold shadow-lg hover:scale-105 transition-all">
                                            Save Entry
                                        </button>
                                    </div>

                                    {/* Slider Popover */}
                                    {showSlider && (
                                        <div className="absolute bottom-24 left-8 bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-2xl w-72 animate-in slide-in-from-bottom-2">
                                            <h4 className="text-sm font-bold text-white mb-4">Sentiment Check</h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                                                        <span>Stress</span>
                                                        <span>Calm</span>
                                                    </div>
                                                    <input type="range" className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer" />
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                                                        <span>Confused</span>
                                                        <span>Clear</span>
                                                    </div>
                                                    <input type="range" className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Reactive Context Pane */}
                                <div className={`w-80 border-l border-slate-800 bg-slate-900/50 p-6 transition-all duration-500 ${isTyping ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute right-0'}`}>
                                    <div className="flex items-center gap-2 mb-6 text-blue-400">
                                        <Sparkles className="w-4 h-4 animate-pulse" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Context Engine</span>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                                            <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">Detected Skill</h5>
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-green-500/20 text-green-400 rounded-lg"><Handshake className="w-4 h-4"/></div>
                                                <span className="text-sm font-bold text-white">Negotiation</span>
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="text-xs font-bold text-slate-400 uppercase mb-3">Relevant Labs</h5>
                                            <div className="space-y-2">
                                                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 cursor-pointer transition-colors flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center"><Target className="w-4 h-4 text-blue-400"/></div>
                                                    <div>
                                                        <span className="block text-xs font-bold text-white">Conflict Res Sim</span>
                                                        <span className="block text-[10px] text-slate-500">20 min • Interactive</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="text-xs font-bold text-slate-400 uppercase mb-3">Suggested Mentors</h5>
                                            <div className="flex items-center gap-3">
                                                <img src="https://i.pravatar.cc/150?u=marcus" className="w-10 h-10 rounded-full border border-slate-600" alt="Mentor" />
                                                <div>
                                                    <span className="block text-xs font-bold text-white">Marcus Chen</span>
                                                    <span className="block text-[10px] text-slate-500">Negotiator @ Tesla</span>
                                                </div>
                                                <button className="ml-auto p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500"><MessageSquare className="w-3 h-3"/></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* MODE: VOICE */}
                        {focusMode === 'voice' && (
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <div className="relative w-48 h-48 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-ping"></div>
                                    <div className="absolute inset-4 bg-purple-500/20 rounded-full animate-pulse"></div>
                                    <div className="relative z-10 w-32 h-32 bg-slate-800 rounded-full border-4 border-purple-500 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                                        <Mic2 className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                                <h3 className="mt-8 text-2xl font-bold text-white">Listening...</h3>
                                <p className="text-slate-400 mt-2">Speak freely. We'll summarize the key insights.</p>
                                <div className="mt-12 flex gap-4">
                                    <button className="px-6 py-3 bg-red-500/20 text-red-400 rounded-xl font-bold hover:bg-red-500/30 transition-colors">Cancel</button>
                                    <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:scale-105 transition-transform">Done Speaking</button>
                                </div>
                            </div>
                        )}

                        {/* MODE: CHAT */}
                        {focusMode === 'chat' && (
                            <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full p-8">
                                <div className="flex-1 space-y-6 overflow-y-auto">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
                                            <Bot className="w-5 h-5 text-green-400" />
                                        </div>
                                        <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700">
                                            <p className="text-sm text-slate-300">Hi Maya. I noticed you flagged "Stress" in your last log. Do you want to debrief on the Chemistry Lab specifically?</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex gap-3">
                                    <input 
                                        type="text" 
                                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-green-500 transition-colors"
                                        placeholder="Type your response..."
                                    />
                                    <button className="p-3 bg-green-600 rounded-xl text-white hover:bg-green-500 transition-colors">
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                )}

                {/* ---------------- NORMAL DASHBOARD LAYOUT ---------------- */}
                
                {/* 1. LEFT SIDEBAR (Navigation) */}
                <div className="w-[240px] bg-white border-r border-slate-100 flex flex-col p-6">
                    {/* User Profile */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full p-[3px] bg-gradient-to-tr from-blue-400 to-purple-400 mb-2">
                                <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&auto=format&fit=crop" className="w-full h-full rounded-full object-cover border-4 border-white" alt="Profile" />
                            </div>
                            <div className="absolute top-0 right-0 bg-white p-1 rounded-full shadow-sm">
                                <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                        </div>
                        <h3 className="font-black text-slate-800 text-base">Maya R.</h3>
                        <p className="text-[10px] font-bold text-slate-400">@maya_r</p>
                    </div>

                    {/* Nav Items */}
                    <nav className="space-y-1 flex-1">
                        {[
                            { id: 'feed', label: 'Journal Feed', icon: <BookOpen className="w-4 h-4"/> },
                            { id: 'edi', label: 'EDI Resources', icon: <Heart className="w-4 h-4"/>, badge: 'Hub' },
                            { id: 'superpowers', label: 'Superpowers', icon: <Fingerprint className="w-4 h-4"/> },
                            { id: 'advisor', label: 'Advisor Chat', icon: <MessageCircle className="w-4 h-4"/>, badge: 2 },
                            { id: 'quests', label: 'Active Labs', icon: <Target className="w-4 h-4"/> },
                            { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4"/> },
                        ].map(item => (
                            <button 
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center justify-between px-3 py-3 rounded-2xl text-xs font-bold transition-all ${
                                    activeTab === item.id 
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon}
                                    {item.label}
                                </div>
                                {item.badge && (
                                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${activeTab === item.id ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-600'}`}>
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Bottom Promo */}
                    <div className="mt-4 relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white shadow-lg">
                        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-12 h-12 bg-white/20 rounded-full blur-xl"></div>
                        <div className="flex items-center gap-3 mb-2 relative z-10">
                            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <Download className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold opacity-80">Export PDF</p>
                                <p className="text-xs font-black">Transcript</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. CENTER CONTENT (Dynamic based on activeTab) */}
                {activeTab === 'edi' ? (
                    <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar animate-in fade-in slide-in-from-right-4 duration-500">
                        {/* Header */}
                        <div className="mb-8 flex justify-between items-end">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 mb-2">Equity & Belonging Hub</h2>
                                <p className="text-slate-500 font-medium">Curated growth pathways, support networks, and community grants.</p>
                            </div>
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    placeholder="Search resources..." 
                                    className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 ring-blue-500/20 w-64 shadow-sm transition-all"
                                />
                                <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" />
                            </div>
                        </div>

                        {/* Community Spotlight (Featured) */}
                        <div className="relative w-full h-48 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 mb-8 overflow-hidden shadow-lg group cursor-pointer hover:scale-[1.01] transition-transform">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div>
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
                                        Featured Event
                                    </span>
                                    <h3 className="text-3xl font-black text-white mt-4 mb-2">Indigenous Leadership Summit</h3>
                                    <p className="text-white/90 text-sm font-medium max-w-lg">
                                        Join Elders and youth leaders for a 3-day retreat focused on land-based learning and governance.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-white/80 text-xs font-bold">
                                    <Calendar className="w-4 h-4" /> Oct 24-26 • Kananaskis, AB
                                </div>
                            </div>
                            <div className="absolute bottom-6 right-6 bg-white text-orange-600 px-5 py-2 rounded-xl font-bold text-sm shadow-md group-hover:shadow-lg transition-all flex items-center gap-2">
                                Register Now <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>

                        {/* Identity Pathways Grid */}
                        <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                            <Compass className="w-5 h-5 text-blue-600" /> Identity Pathways
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            {ediResources.map((res) => (
                                <div key={res.id} className={`p-5 rounded-2xl border ${res.border} ${res.color} bg-opacity-50 hover:bg-opacity-80 transition-all cursor-pointer group`}>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className={`p-2.5 rounded-xl bg-white shadow-sm ${res.color} bg-opacity-100`}>
                                            {res.icon}
                                        </div>
                                        <span className="text-[10px] font-bold bg-white px-2 py-1 rounded-full text-slate-500 shadow-sm">
                                            {res.count} Items
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-base mb-1 group-hover:text-blue-700 transition-colors">{res.title}</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{res.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Latest Resources List */}
                        <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-500" /> New Additions
                        </h3>
                        <div className="space-y-3">
                            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <PlayCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Micro-Course</span>
                                            <span className="text-[9px] font-bold text-slate-400">• 20 Min</span>
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">Inclusive Language in the Workplace</h4>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 -rotate-45 transition-all" />
                            </div>

                            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-[9px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">Grant</span>
                                            <span className="text-[9px] font-bold text-slate-400">• $500 - $2,000</span>
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-green-600 transition-colors">Community Initiative Funding</h4>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-green-500 -rotate-45 transition-all" />
                            </div>

                            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-[9px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">Mentorship</span>
                                            <span className="text-[9px] font-bold text-slate-400">• Fall 2025</span>
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-purple-600 transition-colors">Black Professionals Network (BPN) Matching</h4>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-purple-500 -rotate-45 transition-all" />
                            </div>
                        </div>

                    </div>
                ) : activeTab === 'superpowers' ? (
                    <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar animate-in fade-in slide-in-from-right-4 duration-500">
                        {/* Header */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-slate-900 mb-2">Superpowers Profile</h2>
                            <p className="text-slate-500 font-medium">Your identity layer, evolved from evidence.</p>
                        </div>

                        {/* Becoming Statement */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mb-8 relative group">
                            <div className="absolute top-6 left-6 text-slate-300"><Quote className="w-8 h-8" /></div>
                            <div className="pl-10">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">My Statement</label>
                                <div className="text-2xl md:text-3xl font-serif text-slate-800 leading-relaxed italic relative z-10">
                                    "I am becoming a <span className="text-blue-600 font-bold border-b-2 border-blue-200 cursor-pointer hover:border-blue-500 transition-colors">Strategic Designer</span> who uses <span className="text-purple-600 font-bold border-b-2 border-purple-200 cursor-pointer hover:border-purple-500 transition-colors">radical empathy</span> to solve complex systemic problems."
                                </div>
                                <button className="mt-4 text-xs font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Edit3 className="w-3 h-3" /> Edit Statement
                                </button>
                            </div>
                        </div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Emerging Skills */}
                            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm col-span-1 md:col-span-2">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-yellow-500" /> Emerging Core Skills
                                    </h3>
                                    <button className="text-xs font-bold text-slate-400 hover:text-slate-900">View Evidence Map</button>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        { name: 'Ethical Reasoning', level: 85, trend: 'up', evidence: 12 },
                                        { name: 'Strategic Foresight', level: 62, trend: 'up', evidence: 5 },
                                        { name: 'Conflict Negotiation', level: 45, trend: 'stable', evidence: 3 },
                                    ].map(skill => (
                                        <div key={skill.name} className="group cursor-pointer">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="font-bold text-slate-700 text-sm">{skill.name}</span>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors">{skill.evidence} Evidence Entries</span>
                                                    <span className="font-bold text-slate-900 text-sm">{skill.level}%</span>
                                                </div>
                                            </div>
                                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden relative">
                                                <div className="absolute inset-0 bg-slate-100"></div>
                                                <div style={{width: `${skill.level}%`}} className="h-full bg-slate-900 rounded-full relative group-hover:bg-blue-600 transition-colors"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Values Signals */}
                            <div className="bg-purple-50/50 rounded-3xl p-6 border border-purple-100 shadow-sm">
                                <h3 className="font-bold text-purple-900 text-lg flex items-center gap-2 mb-6">
                                    <Compass className="w-5 h-5 text-purple-600" /> Core Values
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Impact', 'Autonomy', 'Equity', 'Creativity', 'Structure'].map((tag, i) => (
                                        <span key={tag} className={`px-4 py-2 rounded-xl text-xs font-bold border ${i === 0 ? 'bg-purple-600 text-white border-purple-600 shadow-md transform scale-105' : 'bg-white text-purple-700 border-purple-200'}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="mt-6 text-xs text-purple-800/70 font-medium leading-relaxed">
                                    "Impact" appears in 45% of your reflections this month, often correlated with "Community Projects".
                                </p>
                            </div>

                            {/* Strength Patterns */}
                            <div className="bg-green-50/50 rounded-3xl p-6 border border-green-100 shadow-sm">
                                <h3 className="font-bold text-green-900 text-lg flex items-center gap-2 mb-6">
                                    <Battery className="w-5 h-5 text-green-600" /> Energy Drivers
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2 text-sm text-green-800 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                        You thrive when translating complex data into visual stories.
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-green-800 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                        Energy peaks during collaborative brainstorming phases.
                                    </li>
                                </ul>
                            </div>

                             {/* Growth Edges */}
                             <div className="bg-orange-50/50 rounded-3xl p-6 border border-orange-100 shadow-sm col-span-1 md:col-span-2">
                                <h3 className="font-bold text-orange-900 text-lg flex items-center gap-2 mb-4">
                                    <TrendingUp className="w-5 h-5 text-orange-600" /> Growth Edges
                                </h3>
                                <div className="flex gap-4 items-center">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm border border-orange-100">
                                        <Activity className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-orange-900 mb-1">Detailed Operational Planning</p>
                                        <p className="text-xs text-orange-800/80">You often flag "drained" when dealing with logistics or minute scheduling details without a strategic overlay.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ) : (
                    <div className="flex-1 bg-[#F8FAFC] flex flex-col relative">
                        
                        {/* Header */}
                        <div className="px-6 py-5 flex items-center justify-between bg-[#F8FAFC]/90 backdrop-blur-xl sticky top-0 z-10">
                            <h2 className="text-xl font-black text-slate-800">Learning Stream</h2>
                            <div className="flex gap-3 text-xs font-bold text-slate-400">
                                <button className="hover:text-slate-800 transition-colors">Recents</button>
                                <button className="text-slate-800 border-b-2 border-slate-800 pb-0.5">My Cohort</button>
                                <button className="hover:text-slate-800 transition-colors">Popular</button>
                            </div>
                        </div>

                        {/* Feed Content */}
                        <div className="flex-1 overflow-y-auto px-6 pb-40 custom-scrollbar">
                            {feedItems.map((item) => (
                                <div key={item.id} className="bg-white rounded-[28px] p-5 mb-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl overflow-hidden">
                                                {item.isSystem ? (
                                                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white"><Zap className="w-5 h-5"/></div>
                                                ) : (
                                                    <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=150&auto=format&fit=crop" className="w-full h-full object-cover" alt="Avatar"/>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-sm">{item.author}</h4>
                                                <p className="text-[10px] font-bold text-slate-400">{item.time}</p>
                                            </div>
                                        </div>
                                        <button className="p-1.5 rounded-full hover:bg-slate-50 text-slate-400"><MoreVertical className="w-4 h-4"/></button>
                                    </div>

                                    <p className="text-slate-600 font-medium leading-relaxed mb-3 text-sm">
                                        {item.content.split(/(@\w+)/g).map((part, i) => 
                                            part.startsWith('@') ? <span key={i} className="text-blue-600 font-bold hover:underline cursor-pointer">{part}</span> : part
                                        )}
                                    </p>

                                    {item.images && (
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            {item.images.map((img, i) => (
                                                <div key={i} className="rounded-xl overflow-hidden h-32 relative group/img cursor-pointer">
                                                    <img src={img} className="w-full h-full object-cover transform group-hover/img:scale-105 transition-transform duration-500" alt="Post attachment"/>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {item.isSystem && (
                                        <div className="bg-blue-50 p-3 rounded-xl mb-4 border border-blue-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm"><CheckCircle2 className="w-4 h-4"/></div>
                                                <div>
                                                    <h5 className="font-bold text-slate-800 text-xs">Skill Verified</h5>
                                                    <p className="text-[10px] text-slate-500">Ethical Reasoning (Level 2)</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors cursor-pointer group/action">
                                                <Heart className="w-3.5 h-3.5 group-hover/action:fill-red-500" /> {item.likes}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-blue-500 transition-colors cursor-pointer">
                                                <MessageSquare className="w-3.5 h-3.5" /> {item.comments}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <button className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold hover:bg-slate-200 transition-colors">
                                                Insightful
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Dark Mode Input Dock - Trigger for Focus Mode */}
                        <div 
                            onClick={() => setFocusMode('selection')}
                            className="absolute bottom-6 left-6 right-6 cursor-pointer transform hover:scale-[1.01] transition-transform"
                        >
                            <div className="bg-slate-900 rounded-[24px] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-700 flex flex-col animate-in slide-in-from-bottom-4 duration-500 group">
                                <div className="flex items-center gap-4 px-4 py-3">
                                    <div className="w-9 h-9 rounded-full bg-slate-800 overflow-hidden shrink-0 border border-slate-700">
                                        <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=150&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Me"/>
                                    </div>
                                    <div className="flex-1 text-sm font-medium text-slate-500 group-hover:text-slate-400 transition-colors">
                                        Reflect on a moment...
                                    </div>
                                    <div className="flex items-center gap-2 border-l border-slate-700 pl-3">
                                        <button title="Voice Reflection" className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"><Mic className="w-4 h-4"/></button>
                                        <button title="AI Debrief" className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"><Headphones className="w-4 h-4"/></button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-2 pb-1 pt-2 border-t border-slate-800">
                                    <div className="flex gap-1">
                                        <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 text-[10px] font-bold text-slate-400 hover:text-white transition-colors">
                                            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" /> Scale
                                        </button>
                                        <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 text-[10px] font-bold text-slate-400 hover:text-white transition-colors">
                                            <ImageIcon className="w-3.5 h-3.5 text-green-400" /> Evidence
                                        </button>
                                        <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 text-[10px] font-bold text-slate-400 hover:text-white transition-colors">
                                            <Globe className="w-3.5 h-3.5 text-blue-400" /> Public
                                        </button>
                                    </div>
                                    <button className="px-5 py-2 bg-white text-slate-900 rounded-xl font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. RIGHT SIDEBAR (Widgets) */}
                <div className="w-[280px] bg-white border-l border-slate-100 flex flex-col p-6 overflow-y-auto custom-scrollbar transition-all duration-500">
                        {/* Active Quests (Stories Style) */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-black text-slate-800 text-sm">Skill Labs</h3>
                                <button className="text-[10px] font-bold text-slate-400 hover:text-slate-600">All</button>
                            </div>
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                                {[
                                    { title: 'Empathy', img: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=300&auto=format&fit=crop', color: 'border-blue-500' },
                                    { title: 'Ethics', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=300&auto=format&fit=crop', color: 'border-purple-500' },
                                    { title: 'Debate', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=300&auto=format&fit=crop', color: 'border-orange-500' },
                                ].map((story, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                                        <div className={`w-14 h-16 rounded-xl p-[2px] border-2 ${story.color} overflow-hidden relative`}>
                                            <img src={story.img} className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform" alt="Story"/>
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-600 truncate w-14 text-center">{story.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Suggestions (Mentors) */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-black text-slate-800 text-sm">Mentors</h3>
                            </div>
                            <div className="space-y-3">
                                {mentors.map((m, i) => (
                                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg overflow-hidden">
                                                <img src={m.img} className="w-full h-full object-cover" alt="Mentor"/>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-xs group-hover:text-blue-600 transition-colors">{m.name}</h4>
                                                <p className="text-[9px] font-bold text-slate-400">{m.role}</p>
                                            </div>
                                        </div>
                                        <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-blue-600 transition-colors">
                                            <MessageCircle className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recommendations (Skills/Tags) */}
                        <div>
                            <h3 className="font-black text-slate-800 text-sm mb-4">Skill Focus</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-blue-50 p-3 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-blue-100 transition-colors group">
                                    <div className="p-1.5 bg-white rounded-full text-blue-500 shadow-sm group-hover:scale-110 transition-transform">
                                        <Heart className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-700">Empathy</span>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-purple-100 transition-colors group">
                                    <div className="p-1.5 bg-white rounded-full text-purple-500 shadow-sm group-hover:scale-110 transition-transform">
                                        <BrainCircuit className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-700">Judgment</span>
                                </div>
                            </div>
                        </div>
                </div>

            </div>
        </div>
    )
}

const SignalInterface: React.FC = () => (
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative pointer-events-auto flex gap-16 items-center">
             {/* Spinning Holo Globe - Massive */}
            <div className="w-[600px] h-[600px] flex items-center justify-center animate-in zoom-in duration-1000 bg-[#F1F5F9]/40 backdrop-blur-3xl rounded-full border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                {/* Subtle sheen animation */}
                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:animate-[shimmer_2s_infinite]"></div>
                <GlassGlobe className="w-[450px] h-[450px] text-blue-500/80 opacity-90 animate-spin-slow" />
            </div>
            
            {/* Floating Data Panel - Upscaled */}
            <div className="bg-[#F8FAFC]/95 backdrop-blur-2xl border border-white/60 p-8 rounded-[32px] w-[450px] shadow-[0_30px_60px_rgba(0,0,0,0.1)] animate-in slide-in-from-right duration-1000 delay-300 flex flex-col gap-6">
                <div className="flex justify-between items-center pb-6 border-b border-slate-200">
                    <div>
                        <h3 className="text-slate-900 font-extrabold text-2xl tracking-tight">Market Pulse</h3>
                        <p className="text-slate-500 text-sm font-medium mt-1">Real-time signal ingestion</p>
                    </div>
                    <div className="flex gap-2 items-center bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                         <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                         <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Live</span>
                    </div>
                </div>
                
                <div className="space-y-4">
                     <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Trending Now</span>
                            <span className="text-[10px] font-bold text-slate-400">12m ago</span>
                        </div>
                        <p className="text-slate-800 text-base font-bold leading-snug">BlackRock posts 450 new "Sustainable Finance" roles.</p>
                     </div>
                     <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest bg-purple-50 px-2 py-1 rounded">Skill Shift</span>
                            <span className="text-[10px] font-bold text-slate-400">1h ago</span>
                        </div>
                        <p className="text-slate-800 text-base font-bold leading-snug">Python demand overtakes Excel in Banking sector.</p>
                     </div>
                     <button className="w-full py-4 mt-2 rounded-2xl bg-slate-900 text-white font-bold text-sm shadow-xl hover:shadow-2xl hover:bg-slate-800 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                        <Download className="w-5 h-5" /> Download Intelligence Report
                     </button>
                </div>
            </div>
        </div>
    </div>
);

const GrowthInterface: React.FC = () => (
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative pointer-events-auto flex items-center gap-20">
            {/* The Floating Prism - Larger & More "Floaty" */}
            <div className="w-[550px] h-[550px] flex items-center justify-center animate-in zoom-in duration-1000 hover:scale-105 transition-transform cursor-pointer bg-[#F8FAFC]/30 backdrop-blur-3xl rounded-[60px] border border-white/50 shadow-[0_30px_80px_rgba(0,0,0,0.08)] relative">
                {/* Floating Animation Wrapper */}
                <div className="animate-bounce-slow">
                     <ClayCube className="w-[400px] h-[400px] drop-shadow-2xl" />
                </div>
            </div>

            {/* Quest Card - Expanded */}
            <div className="bg-[#F8FAFC]/95 backdrop-blur-2xl border border-white/60 p-10 rounded-[40px] w-[500px] shadow-[0_40px_80px_rgba(0,0,0,0.12)] animate-in slide-in-from-left duration-1000 delay-200">
                <div className="flex items-center gap-6 mb-8">
                    <div className="p-4 bg-orange-100/50 rounded-3xl text-orange-600 shadow-sm border border-orange-100">
                        <Target className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-slate-900 font-extrabold text-2xl tracking-tight">Active Quest</h3>
                        <span className="text-xs text-orange-600 uppercase tracking-[0.2em] font-bold bg-orange-50 px-3 py-1 rounded-full mt-1 inline-block border border-orange-100">In Progress</span>
                    </div>
                </div>
                
                <div className="mb-8">
                     <h4 className="text-lg font-bold text-slate-800 mb-2">Ethical AI Audit</h4>
                     <p className="text-slate-500 text-base leading-relaxed font-medium">
                        "Audit the provided dataset for gender bias using the Ascend Framework. Deliver recommendations by EOD."
                    </p>
                </div>
                
                <div className="mb-3 flex justify-between items-center">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Completion</span>
                     <span className="text-sm font-black text-slate-900">65%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-10 border border-slate-200">
                    <div className="h-full w-[65%] bg-gradient-to-r from-orange-400 to-red-500 rounded-full shadow-sm relative">
                        <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/30"></div>
                    </div>
                </div>
                
                <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-base transition-all shadow-xl hover:shadow-2xl hover:bg-slate-800 hover:-translate-y-1 flex items-center justify-center gap-3">
                    <Zap className="w-5 h-5 fill-current" /> Continue Simulation
                </button>
            </div>
        </div>
    </div>
);

// --- Student Profile HUD (Utility-Driven Control Center) ---
const StudentProfileHUD: React.FC = () => {
    return (
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden lg:block">
            <div className="pointer-events-auto bg-white/60 backdrop-blur-2xl border-2 border-white/50 p-6 rounded-[36px] w-[360px] shadow-[0_30px_80px_rgba(0,0,0,0.1)] animate-in slide-in-from-left duration-1000 flex flex-col gap-6 transition-all hover:bg-white/80">
                
                {/* 1. Identity & Status - Updated for Mixed Race Girl & Larger Size */}
                <div className="flex items-center gap-5 border-b border-gray-200/50 pb-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full p-1 bg-white border border-white/50 shadow-md">
                            <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&auto=format&fit=crop" alt="Student" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white shadow-sm" title="Online & On Track"></div>
                    </div>
                    <div>
                        <h3 className="text-slate-900 font-black text-2xl leading-none">Maya R.</h3>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-2">Strategic Design • Year 3</p>
                        <div className="flex items-center gap-1 mt-2">
                             <div className="px-2 py-0.5 rounded-full bg-purple-50 border border-purple-100 text-[9px] font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" /> Superpower: Empathy
                             </div>
                        </div>
                    </div>
                </div>

                {/* 2. Urgent Actions (The "To-Do" List) */}
                <div>
                     <div className="flex items-center justify-between mb-3">
                        <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Zap className="w-3 h-3 text-orange-500" /> Action Items
                        </h4>
                        <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">2 Due Soon</span>
                     </div>
                     <div className="space-y-2.5">
                        <div className="bg-white/80 p-3 rounded-2xl border border-orange-200/50 shadow-sm flex items-start gap-3 hover:border-orange-400 transition-colors cursor-pointer group relative overflow-hidden">
                             <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400"></div>
                             <div className="mt-0.5 w-4 h-4 rounded border-2 border-slate-200 group-hover:border-orange-500 flex items-center justify-center transition-colors shrink-0"></div>
                             <div>
                                 <span className="block text-sm font-bold text-slate-800 leading-tight group-hover:text-orange-700 transition-colors">Submit Ethics Reflection</span>
                                 <span className="block text-[10px] text-slate-400 font-bold mt-1 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Due Today, 5:00 PM
                                 </span>
                             </div>
                        </div>
                         <div className="bg-white/60 p-3 rounded-2xl border border-slate-200/50 shadow-sm flex items-start gap-3 hover:border-blue-400 transition-colors cursor-pointer group">
                             <div className="mt-0.5 w-4 h-4 rounded border-2 border-slate-200 group-hover:border-blue-500 flex items-center justify-center transition-colors shrink-0"></div>
                             <div>
                                 <span className="block text-sm font-bold text-slate-800 leading-tight">Register for Spring Labs</span>
                                 <span className="block text-[10px] text-slate-400 font-bold mt-1">Opens Tomorrow</span>
                             </div>
                        </div>
                     </div>
                </div>

                {/* 3. Skill Progress (Updated for Core Skills) */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] ml-1 mt-1">Core Skills</h4>
                    
                    {/* Active Learning Card (Thick/Chunky) */}
                    <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-[0_4px_0_#e2e8f0] hover:translate-y-1 hover:shadow-none transition-all cursor-pointer group">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-extrabold text-slate-700 text-sm">Communication</span>
                            <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-1 rounded-lg">LVL 3</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden relative">
                            <div className="absolute inset-0 bg-slate-100"></div>
                            <div className="h-full bg-blue-500 w-[65%] rounded-full relative">
                                <div className="absolute top-1 left-2 right-2 h-1 bg-white/20 rounded-full"></div>
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 mt-2 text-right">320 / 500 XP</p>
                    </div>

                    {/* Verified Skills Grid (Badges) */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white p-2 rounded-xl border-2 border-slate-100 shadow-[0_3px_0_#e2e8f0] flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform cursor-default">
                            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[10px] font-extrabold text-slate-600">Critical Thinking</span>
                        </div>
                        <div className="bg-white p-2 rounded-xl border-2 border-slate-100 shadow-[0_3px_0_#e2e8f0] flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform cursor-default">
                            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                                <Handshake className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[10px] font-extrabold text-slate-600">Leadership</span>
                        </div>
                    </div>
                </div>

                 {/* 4. Quick Resources (Dock) */}
                 <div>
                     <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1 mt-2">Quick Access</h4>
                     <div className="grid grid-cols-4 gap-2">
                         {[
                             { label: 'Library', icon: <BookOpen className="w-5 h-5" />, color: 'text-blue-600', bg: 'bg-blue-50 group-hover:bg-blue-500 group-hover:text-white' },
                             { label: 'Advisors', icon: <Users className="w-5 h-5" />, color: 'text-purple-600', bg: 'bg-purple-50 group-hover:bg-purple-500 group-hover:text-white' },
                             { label: 'Career', icon: <Target className="w-5 h-5" />, color: 'text-orange-600', bg: 'bg-orange-50 group-hover:bg-orange-500 group-hover:text-white' },
                             { label: 'Health', icon: <Heart className="w-5 h-5" />, color: 'text-rose-600', bg: 'bg-rose-50 group-hover:bg-rose-500 group-hover:text-white' }
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

// --- Tapestry Wallet Navigation ---

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
            {/* The Tapestry Pattern Layer */}
            {pattern}
            
            {/* Deep Glow */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-10 blur-[80px] rounded-full pointer-events-none mix-blend-overlay"></div>

            {/* Top Content */}
            <div className="relative z-10 flex justify-between items-start">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                    {icon}
                </div>
                {/* Notification Badge Style */}
                 <div className="flex items-center gap-1.5 bg-red-500 shadow-lg shadow-red-900/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 group-hover:scale-110 transition-transform">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    <span className="text-[9px] font-black text-white uppercase tracking-wider">{liveStatus}</span>
                </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                    <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">{subtitle}</p>
                </div>
                {/* Massive Title - Scaled down slightly for narrower card */}
                <h3 className="text-white text-4xl font-black leading-[0.85] mb-6 tracking-tighter drop-shadow-xl">{title}</h3>
                
                {/* High Contrast CTA Button */}
                <button className="w-full py-3 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-lg hover:bg-slate-50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group-hover:shadow-2xl">
                    Enter Module <ArrowRight className="w-4 h-4" />
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
                            liveStatus="12 New Roles"
                        />
                    </div>
                    <div style={{ '--rotation': '0deg' } as React.CSSProperties} className="origin-bottom z-20 hover:z-50 transition-all duration-300 -ml-4 hover:ml-0">
                        <TapestryCard 
                            title="Workshops" 
                            subtitle="Skill Building" 
                            icon={<Target className="w-6 h-6" />} 
                            theme="orange"
                            pattern={<GeoPattern />}
                            onClick={() => onNavigate('GrowthLab')}
                            delay={200}
                            liveStatus="2 Upcoming"
                        />
                    </div>
                    <div style={{ '--rotation': '5deg' } as React.CSSProperties} className="origin-bottom-left z-10 hover:z-50 transition-all duration-300 -ml-4 hover:ml-0">
                        <TapestryCard 
                            title="Reflection" 
                            subtitle="Growth" 
                            icon={<Wind className="w-6 h-6" />} 
                            theme="cyan"
                            pattern={<WavePattern />}
                            onClick={() => onNavigate('QuietRoom')}
                            delay={300}
                            liveStatus="1 Pending"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Shared Components ---

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
                {/* Ping Effect */}
                {!isHovered && <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping"></div>}
            </div>
            
            {/* Popover */}
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
    