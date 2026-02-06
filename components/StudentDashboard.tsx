import React, { useState, useEffect, useRef } from "react";
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
  ThumbsDown,
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
  Bookmark,
} from "lucide-react";
import { GlassGlobe, GlassDNA, ClayCube } from "./GlassIcons";

// --- Artistic Patterns (Tapestry SVGs) ---

const CircuitPattern = () => (
  <svg
    className='absolute inset-0 w-full h-full opacity-10 mix-blend-overlay'
    width='100%'
    height='100%'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs>
      <pattern
        id='circuit'
        x='0'
        y='0'
        width='40'
        height='40'
        patternUnits='userSpaceOnUse'
      >
        <path d='M0 20h40v1h-40z' fill='white' fillOpacity='0.5' />
        <path d='M20 0v40h1v-40z' fill='white' fillOpacity='0.5' />
        <circle cx='20' cy='20' r='3' fill='white' />
        <rect x='5' y='5' width='5' height='5' fill='white' fillOpacity='0.3' />
        <rect
          x='30'
          y='30'
          width='5'
          height='5'
          fill='white'
          fillOpacity='0.3'
        />
      </pattern>
    </defs>
    <rect width='100%' height='100%' fill='url(#circuit)' />
  </svg>
);

const WavePattern = () => (
  <svg
    className='absolute inset-0 w-full h-full opacity-10 mix-blend-overlay'
    width='100%'
    height='100%'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs>
      <pattern
        id='waves'
        x='0'
        y='0'
        width='100'
        height='20'
        patternUnits='userSpaceOnUse'
      >
        <path
          d='M0 10 Q25 20 50 10 T100 10'
          fill='none'
          stroke='white'
          strokeWidth='2'
          strokeOpacity='0.5'
        />
      </pattern>
    </defs>
    <rect width='100%' height='100%' fill='url(#waves)' />
  </svg>
);

const GeoPattern = () => (
  <svg
    className='absolute inset-0 w-full h-full opacity-10 mix-blend-overlay'
    width='100%'
    height='100%'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs>
      <pattern
        id='geo'
        x='0'
        y='0'
        width='40'
        height='40'
        patternUnits='userSpaceOnUse'
      >
        <path
          d='M0 40 L40 0'
          stroke='white'
          strokeWidth='1'
          strokeOpacity='0.5'
        />
        <circle
          cx='20'
          cy='20'
          r='10'
          stroke='white'
          strokeWidth='1'
          fill='none'
          opacity='0.5'
        />
      </pattern>
    </defs>
    <rect width='100%' height='100%' fill='url(#geo)' />
  </svg>
);

// --- Types & Configuration ---

type RoomType = "Atrium" | "SignalTower" | "GrowthLab" | "QuietRoom";

interface ARHotspot {
  id: string;
  top: string; // % position
  left: string; // % position
  icon: React.ReactNode;
  label: string;
  detail: string;
  type: "alert" | "info" | "action";
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
    arrowDir: "right" | "left" | "up" | "down";
  }[];
}

const ROOMS: Record<RoomType, RoomConfig> = {
  Atrium: {
    id: "Atrium",
    title: "Student Hub",
    bgImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop", // Bright Atrium
    description: "Where do you want to go today?",
    hotspots: [], // Cleared for cleaner look with Wallet UI
    navigation: [], // Handled by Wallet Component
  },
  SignalTower: {
    id: "SignalTower",
    title: "Job Market",
    bgImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", // Bright Corporate Glass
    description: "See who is hiring and what skills they want.",
    hotspots: [],
    navigation: [
      {
        label: "Back to Hub",
        target: "Atrium",
        position: "bottom-12 left-12",
        arrowDir: "left",
      },
    ],
  },
  GrowthLab: {
    id: "GrowthLab",
    title: "Workshops",
    bgImage:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop", // Bright Co-working/Lab
    description: "Practice skills with real-world scenarios.",
    hotspots: [],
    navigation: [
      {
        label: "Back to Hub",
        target: "Atrium",
        position: "bottom-12 left-12",
        arrowDir: "left",
      },
    ],
  },
  QuietRoom: {
    id: "QuietRoom",
    title: "My Journal",
    bgImage:
      "https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=2070&auto=format&fit=crop", // Bright Minimalist Room/Spa
    description: "Reflect on your experiences.",
    hotspots: [],
    navigation: [
      {
        label: "Back to Hub",
        target: "Atrium",
        position: "bottom-12 left-12",
        arrowDir: "left",
      },
    ],
  },
};

// --- Specialized Room Interfaces ---

// --- TAB SUB-COMPONENTS FOR JOURNAL ---

const ResourcesTab: React.FC = () => {
  const resources = [
    {
      title: "Indigenous Student Centre",
      desc: "Cultural connection, elders, and academic support.",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Disabilities & Well-being",
      desc: "Accommodations, accessibility tech, and counseling.",
      image:
        "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Black Student Support",
      desc: "Community networks, mentorship, and advocacy.",
      image:
        "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "2SLGBTQIA+ Resources",
      desc: "Safe spaces, peer support, and health resources.",
      image:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop",
    },
    {
      title: "Newcomer & International",
      desc: "Visa help, language labs, and settlement services.",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Sex Work Support",
      desc: "Confidential, non-judgmental health & safety resources.",
      image:
        "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500'>
      {resources.map((r, i) => (
        <div
          key={i}
          className='group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer'
        >
          <div className='h-40 overflow-hidden'>
            <img
              src={r.image}
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
              alt={r.title}
            />
          </div>
          <div className='p-6'>
            <h3 className='font-black text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition-colors'>
              {r.title}
            </h3>
            <p className='text-sm text-slate-500 leading-relaxed font-medium'>
              {r.desc}
            </p>
            <div className='mt-4 flex items-center gap-2 text-xs font-bold text-blue-600'>
              View Details <ArrowRight className='w-3.5 h-3.5' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProfileTab: React.FC = () => {
  return (
    <div className='animate-in fade-in duration-500 space-y-8'>
      {/* Identity Statement */}
      <div className='bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center relative overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500'></div>
        <h3 className='text-sm font-bold text-slate-400 uppercase tracking-widest mb-4'>
          Identity Statement
        </h3>
        <div className='text-3xl md:text-4xl font-black text-slate-800 leading-tight'>
          "I am navigating the space between{" "}
          <span className='text-blue-600 border-b-2 border-blue-200 hover:border-blue-600 cursor-pointer transition-colors'>
            Academic Theory
          </span>{" "}
          and{" "}
          <span className='text-purple-600 border-b-2 border-purple-200 hover:border-purple-600 cursor-pointer transition-colors'>
            Indigenous Knowledge
          </span>{" "}
          to find my{" "}
          <span className='text-orange-600 border-b-2 border-orange-200 hover:border-orange-600 cursor-pointer transition-colors'>
            true purpose
          </span>
          ."
        </div>
        <button className='mt-6 text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center justify-center gap-2 mx-auto'>
          <Edit3 className='w-3 h-3' /> Edit Statement
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Skills */}
        <div className='bg-white rounded-3xl p-8 border border-slate-200 shadow-sm'>
          <h3 className='text-lg font-black text-slate-800 mb-6 flex items-center gap-2'>
            <Zap className='w-5 h-5 text-yellow-500' /> Emerging Human Skills
          </h3>
          <div className='space-y-6'>
            {[
              { name: "Critical Analysis", level: 4, evidence: 12 },
              { name: "Cultural Advocacy", level: 3, evidence: 6 },
              { name: "Creative Writing", level: 4, evidence: 9 },
            ].map((skill, i) => (
              <div key={i} className='group cursor-pointer'>
                <div className='flex justify-between items-end mb-2'>
                  <span className='font-bold text-slate-700'>{skill.name}</span>
                  <span className='text-[10px] font-bold text-slate-400 uppercase'>
                    {skill.evidence} Evidence Logged
                  </span>
                </div>
                <div className='w-full h-3 bg-slate-100 rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-slate-800 rounded-full group-hover:bg-blue-600 transition-colors'
                    style={{ width: `${(skill.level / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values & Patterns */}
        <div className='space-y-8'>
          <div className='bg-white rounded-3xl p-8 border border-slate-200 shadow-sm'>
            <h3 className='text-lg font-black text-slate-800 mb-4 flex items-center gap-2'>
              <Heart className='w-5 h-5 text-rose-500' /> Values Signals
            </h3>
            <div className='flex flex-wrap gap-2'>
              {[
                "Community",
                "Purpose",
                "Resilience",
                "Justice",
                "Adaptability",
              ].map((tag) => (
                <span
                  key={tag}
                  className='px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-100 rounded-lg text-xs font-bold uppercase tracking-wider'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-green-50 rounded-3xl p-6 border border-green-100'>
              <h4 className='text-xs font-black text-green-700 uppercase tracking-wider mb-2 flex items-center gap-1'>
                <TrendingUp className='w-3 h-3' /> You Thrive When
              </h4>
              <p className='text-sm font-medium text-slate-700 leading-snug'>
                Connecting abstract concepts to real community impact.
              </p>
            </div>
            <div className='bg-orange-50 rounded-3xl p-6 border border-orange-100'>
              <h4 className='text-xs font-black text-orange-700 uppercase tracking-wider mb-2 flex items-center gap-1'>
                <Battery className='w-3 h-3' /> You Drain When
              </h4>
              <p className='text-sm font-medium text-slate-700 leading-snug'>
                Facing "busy work" without a clear purpose or "why".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Enhanced Multimodal Reflection Modal ---
const ReflectionModal: React.FC<{
  onClose: () => void;
  recentWorkshop?: { title: string; provider: string; skills: string[] } | null;
}> = ({ onClose, recentWorkshop }) => {
  const [step, setStep] = useState(0);
  const [reflectionType, setReflectionType] = useState<
    "quick" | "voice" | "photo" | "workshop" | null
  >(null);
  const [mood, setMood] = useState<number | null>(null);
  const [textContent, setTextContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const moodEmojis = [
    { emoji: "😫", label: "Struggling", color: "bg-red-100 border-red-300" },
    {
      emoji: "😕",
      label: "Confused",
      color: "bg-orange-100 border-orange-300",
    },
    { emoji: "😐", label: "Neutral", color: "bg-slate-100 border-slate-300" },
    { emoji: "🙂", label: "Good", color: "bg-blue-100 border-blue-300" },
    { emoji: "🔥", label: "On Fire", color: "bg-green-100 border-green-300" },
  ];

  const quickTags = [
    "Breakthrough",
    "Stuck",
    "Team Win",
    "Need Help",
    "Inspired",
    "Overwhelmed",
    "Curious",
    "Proud",
  ];

  const workshopSkills = recentWorkshop?.skills || [
    "Active Listening",
    "Empathy",
    "Persuasion",
  ];

  // Mock recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className='fixed inset-0 z-[200] flex items-center justify-center p-6'>
      <div
        className='absolute inset-0 bg-slate-900/60 backdrop-blur-md'
        onClick={onClose}
      ></div>

      <div className='relative bg-white rounded-[40px] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors z-10'
        >
          <X className='w-5 h-5' />
        </button>

        <div className='p-8'>
          {/* Step 0: Choose Reflection Type */}
          {step === 0 && (
            <div className='animate-in fade-in duration-300'>
              <div className='text-center mb-8'>
                <div className='w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                  <Feather className='w-8 h-8 text-cyan-600' />
                </div>
                <h2 className='text-2xl font-black text-slate-900 mb-2'>
                  Quick Reflection
                </h2>
                <p className='text-slate-500 font-medium text-sm'>
                  How do you want to capture this moment?
                </p>
              </div>

              <div className='grid grid-cols-2 gap-4 mb-6'>
                <button
                  onClick={() => {
                    setReflectionType("quick");
                    setStep(1);
                  }}
                  className='p-6 rounded-3xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center gap-3 group'
                >
                  <div className='w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform'>
                    <Zap className='w-7 h-7' />
                  </div>
                  <span className='font-bold text-slate-700'>Quick Text</span>
                  <span className='text-xs text-slate-400'>30 sec</span>
                </button>

                <button
                  onClick={() => {
                    setReflectionType("voice");
                    setStep(1);
                  }}
                  className='p-6 rounded-3xl border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50 transition-all flex flex-col items-center gap-3 group'
                >
                  <div className='w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform'>
                    <Mic className='w-7 h-7' />
                  </div>
                  <span className='font-bold text-slate-700'>Voice Note</span>
                  <span className='text-xs text-slate-400'>Just talk</span>
                </button>

                <button
                  onClick={() => {
                    setReflectionType("photo");
                    setStep(1);
                  }}
                  className='p-6 rounded-3xl border-2 border-slate-200 hover:border-orange-400 hover:bg-orange-50 transition-all flex flex-col items-center gap-3 group'
                >
                  <div className='w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform'>
                    <ImageIcon className='w-7 h-7' />
                  </div>
                  <span className='font-bold text-slate-700'>
                    Photo + Caption
                  </span>
                  <span className='text-xs text-slate-400'>Visual memory</span>
                </button>

                <button
                  onClick={() => {
                    setReflectionType("workshop");
                    setStep(1);
                  }}
                  className='p-6 rounded-3xl border-2 border-orange-300 bg-orange-50 hover:border-orange-500 transition-all flex flex-col items-center gap-3 group relative overflow-hidden'
                >
                  <div className='absolute top-2 right-2 px-2 py-0.5 bg-orange-500 text-white text-[9px] font-bold rounded-full'>
                    NEW
                  </div>
                  <div className='w-14 h-14 rounded-2xl bg-orange-200 text-orange-700 flex items-center justify-center group-hover:scale-110 transition-transform'>
                    <Target className='w-7 h-7' />
                  </div>
                  <span className='font-bold text-slate-700'>
                    Post-Workshop
                  </span>
                  <span className='text-xs text-slate-400'>Link to lab</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Mood Check (for all types) */}
          {step === 1 && (
            <div className='animate-in fade-in slide-in-from-right duration-300'>
              <p className='text-xs font-black text-cyan-600 uppercase tracking-widest mb-4 text-center'>
                Quick Check
              </p>
              <h3 className='text-2xl font-black text-slate-900 mb-8 text-center'>
                How are you feeling right now?
              </h3>

              <div className='flex justify-center gap-3 mb-8'>
                {moodEmojis.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => setMood(i)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                      mood === i
                        ? `${m.color} scale-110 shadow-lg`
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className='text-3xl'>{m.emoji}</span>
                    <span className='text-[10px] font-bold text-slate-600'>
                      {m.label}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={mood === null}
                className='w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-cyan-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Content Entry (varies by type) */}
          {step === 2 && reflectionType === "quick" && (
            <div className='animate-in fade-in slide-in-from-right duration-300'>
              <p className='text-xs font-black text-blue-600 uppercase tracking-widest mb-4'>
                Quick Thought
              </p>
              <h3 className='text-xl font-black text-slate-900 mb-4'>
                What's on your mind?
              </h3>

              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder='Just a sentence or two is perfect...'
                className='w-full h-28 p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-800 font-medium placeholder:text-slate-400 outline-none focus:border-blue-400 resize-none mb-4'
              />

              <div className='mb-6'>
                <p className='text-xs font-bold text-slate-400 mb-3'>
                  Quick tags (optional)
                </p>
                <div className='flex flex-wrap gap-2'>
                  {quickTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        selectedTags.includes(tag)
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                className='w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-colors'
              >
                Post Reflection
              </button>
            </div>
          )}

          {step === 2 && reflectionType === "voice" && (
            <div className='animate-in fade-in slide-in-from-right duration-300 text-center'>
              <p className='text-xs font-black text-purple-600 uppercase tracking-widest mb-4'>
                Voice Note
              </p>
              <h3 className='text-xl font-black text-slate-900 mb-8'>
                {isRecording ? "Recording..." : "Tap to start recording"}
              </h3>

              <div className='flex flex-col items-center gap-6 mb-8'>
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                    isRecording
                      ? "bg-red-500 text-white animate-pulse shadow-[0_0_40px_rgba(239,68,68,0.5)]"
                      : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                  }`}
                >
                  {isRecording ? (
                    <div className='w-10 h-10 bg-white rounded-lg'></div>
                  ) : (
                    <Mic className='w-12 h-12' />
                  )}
                </button>

                {isRecording && (
                  <div className='flex items-center gap-3'>
                    <span className='w-3 h-3 bg-red-500 rounded-full animate-pulse'></span>
                    <span className='text-2xl font-bold text-slate-900 font-mono'>
                      {formatTime(recordingTime)}
                    </span>
                  </div>
                )}

                {!isRecording && recordingTime > 0 && (
                  <div className='bg-slate-100 rounded-2xl p-4 w-full'>
                    <div className='flex items-center gap-3'>
                      <button className='w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center'>
                        <Play className='w-5 h-5 ml-0.5' />
                      </button>
                      <div className='flex-1 h-2 bg-slate-200 rounded-full overflow-hidden'>
                        <div className='w-1/3 h-full bg-purple-500 rounded-full'></div>
                      </div>
                      <span className='text-xs font-bold text-slate-500'>
                        {formatTime(recordingTime)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {recordingTime > 0 && !isRecording && (
                <button
                  onClick={() => setStep(3)}
                  className='w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-purple-600 transition-colors'
                >
                  Save Voice Note
                </button>
              )}
            </div>
          )}

          {step === 2 && reflectionType === "photo" && (
            <div className='animate-in fade-in slide-in-from-right duration-300'>
              <p className='text-xs font-black text-orange-600 uppercase tracking-widest mb-4'>
                Photo Memory
              </p>
              <h3 className='text-xl font-black text-slate-900 mb-4'>
                Capture the moment
              </h3>

              <div className='border-2 border-dashed border-slate-300 rounded-3xl p-8 mb-4 flex flex-col items-center gap-4 hover:border-orange-400 hover:bg-orange-50 transition-all cursor-pointer'>
                <div className='w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center'>
                  <ImageIcon className='w-8 h-8 text-orange-600' />
                </div>
                <div className='text-center'>
                  <p className='font-bold text-slate-700 mb-1'>
                    Tap to add photo
                  </p>
                  <p className='text-xs text-slate-400'>
                    From camera or gallery
                  </p>
                </div>
              </div>

              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder='Add a caption...'
                className='w-full h-20 p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-800 font-medium placeholder:text-slate-400 outline-none focus:border-orange-400 resize-none mb-4'
              />

              <button
                onClick={() => setStep(3)}
                className='w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-orange-600 transition-colors'
              >
                Post Photo
              </button>
            </div>
          )}

          {step === 2 && reflectionType === "workshop" && (
            <div className='animate-in fade-in slide-in-from-right duration-300'>
              <p className='text-xs font-black text-orange-600 uppercase tracking-widest mb-4'>
                Post-Workshop Reflection
              </p>

              {/* Workshop Badge */}
              <div className='bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 mb-6 text-white'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center'>
                    <Target className='w-6 h-6' />
                  </div>
                  <div>
                    <p className='text-orange-100 text-[10px] font-bold uppercase'>
                      Just Completed
                    </p>
                    <h4 className='font-black text-lg'>
                      {recentWorkshop?.title || "Crisis Communication Sim"}
                    </h4>
                    <p className='text-orange-200 text-xs font-medium'>
                      {recentWorkshop?.provider || "Edelman"}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className='text-lg font-black text-slate-900 mb-3'>
                Which skills did you practice?
              </h3>
              <div className='flex flex-wrap gap-2 mb-6'>
                {workshopSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleTag(skill)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      selectedTags.includes(skill)
                        ? "bg-orange-600 text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-orange-100"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              <h3 className='text-lg font-black text-slate-900 mb-3'>
                Key takeaway?
              </h3>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder='One thing you learned or realized...'
                className='w-full h-24 p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-800 font-medium placeholder:text-slate-400 outline-none focus:border-orange-400 resize-none mb-6'
              />

              <button
                onClick={() => setStep(3)}
                className='w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-orange-600 transition-colors'
              >
                Complete Reflection
              </button>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className='text-center animate-in fade-in zoom-in duration-500'>
              <div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <CheckCircle2 className='w-12 h-12 text-green-600' />
              </div>
              <h2 className='text-2xl font-black text-slate-900 mb-2'>
                Reflection Saved!
              </h2>
              <p className='text-slate-500 font-medium mb-6'>
                {reflectionType === "workshop"
                  ? "Nice work linking your lab experience."
                  : "Your thoughts are logged."}
              </p>

              {reflectionType === "workshop" && (
                <div className='bg-green-50 rounded-2xl p-4 mb-6 border border-green-200'>
                  <div className='flex items-center justify-center gap-2 text-green-700'>
                    <Zap className='w-5 h-5' />
                    <span className='font-bold'>+50 XP earned</span>
                  </div>
                </div>
              )}

              <button
                onClick={onClose}
                className='w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors'
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StreamTab: React.FC = () => {
  const [showReflectionModal, setShowReflectionModal] = useState(false);

  // Mock recent workshop for post-session prompt
  const recentWorkshop = {
    title: "Crisis Communication Sim",
    provider: "Edelman",
    skills: ["Active Listening", "Empathy", "Persuasion", "Adaptability"],
  };

  return (
    <div className='animate-in fade-in duration-500 flex flex-col h-full max-w-3xl mx-auto'>
      {/* Post-Session Prompt Banner */}
      <div className='bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-5 mb-6 text-white shadow-lg animate-in slide-in-from-top duration-500'>
        <div className='flex items-center gap-4'>
          <div className='w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0'>
            <Target className='w-7 h-7' />
          </div>
          <div className='flex-1'>
            <p className='text-orange-100 text-[10px] font-bold uppercase tracking-wider'>
              You just finished
            </p>
            <h3 className='font-black text-lg'>Crisis Communication Sim</h3>
            <p className='text-orange-200 text-xs font-medium'>
              How did it go? Capture your insights!
            </p>
          </div>
          <button
            onClick={() => setShowReflectionModal(true)}
            className='px-5 py-3 bg-white text-orange-600 rounded-xl font-bold text-sm shadow-md hover:bg-orange-50 transition-all shrink-0'
          >
            Reflect Now
          </button>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className='flex gap-3 mb-6'>
        <button
          onClick={() => setShowReflectionModal(true)}
          className='flex-1 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-center gap-3 group'
        >
          <div className='w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform'>
            <Zap className='w-5 h-5 text-blue-600' />
          </div>
          <span className='font-bold text-slate-700 text-sm'>
            Quick Thought
          </span>
        </button>
        <button
          onClick={() => setShowReflectionModal(true)}
          className='flex-1 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex items-center gap-3 group'
        >
          <div className='w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform'>
            <Mic className='w-5 h-5 text-purple-600' />
          </div>
          <span className='font-bold text-slate-700 text-sm'>Voice Note</span>
        </button>
        <button
          onClick={() => setShowReflectionModal(true)}
          className='flex-1 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex items-center gap-3 group'
        >
          <div className='w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform'>
            <ImageIcon className='w-5 h-5 text-orange-600' />
          </div>
          <span className='font-bold text-slate-700 text-sm'>Photo</span>
        </button>
      </div>

      {/* Feed */}
      <div className='space-y-6 pb-8'>
        {/* New Workshop-linked reflection entry */}
        <div className='bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden'>
              <img
                src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'
                alt='User'
                className='w-full h-full object-cover'
              />
            </div>
            <div>
              <h4 className='font-bold text-slate-900 text-sm'>Aiyana Y.</h4>
              <span className='text-xs text-slate-500 font-medium'>
                30 min ago
              </span>
            </div>
            <div className='ml-auto flex items-center gap-2'>
              <span className='px-2.5 py-1 bg-orange-100 text-orange-700 rounded-lg text-[10px] font-bold flex items-center gap-1'>
                <Target className='w-3 h-3' /> Workshop
              </span>
            </div>
          </div>

          {/* Workshop Badge */}
          <div className='bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-3 mb-4 flex items-center gap-3'>
            <div className='w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center'>
              <Target className='w-5 h-5 text-white' />
            </div>
            <div className='text-white'>
              <p className='text-[10px] font-bold text-slate-400 uppercase'>
                Completed
              </p>
              <p className='font-bold text-sm'>Crisis Communication Sim</p>
            </div>
            <div className='ml-auto text-right'>
              <span className='text-orange-400 text-xs font-bold'>+150 XP</span>
            </div>
          </div>

          <p className='text-slate-800 text-sm leading-relaxed mb-4 font-medium'>
            The hardest part was staying calm when the "angry customer" scenario
            hit. I realized I tend to get defensive instead of listening first.
            Need to practice the pause technique more.
          </p>

          {/* Skills practiced */}
          <div className='flex flex-wrap gap-2 mb-4'>
            <span className='px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-bold'>
              Active Listening
            </span>
            <span className='px-3 py-1.5 bg-purple-600 text-white rounded-lg text-[10px] font-bold'>
              Empathy
            </span>
          </div>

          <div className='flex flex-wrap gap-2 mb-6'>
            <span className='px-3 py-1 bg-slate-50 text-blue-600 rounded-full text-xs font-bold hover:bg-blue-50 cursor-pointer'>
              #Breakthrough
            </span>
            <span className='px-3 py-1 bg-slate-50 text-blue-600 rounded-full text-xs font-bold hover:bg-blue-50 cursor-pointer'>
              #NeedHelp
            </span>
          </div>

          <div className='flex items-center justify-between pt-4 border-t border-slate-100'>
            <div className='flex gap-6'>
              <button className='flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors group'>
                <Heart className='w-5 h-5 group-hover:fill-current' />
                <span className='text-xs font-bold'>18</span>
              </button>
              <button className='flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors'>
                <MessageCircle className='w-5 h-5' />
                <span className='text-xs font-bold'>4</span>
              </button>
              <button className='flex items-center gap-2 text-slate-500 hover:text-green-500 transition-colors'>
                <Share2 className='w-5 h-5' />
              </button>
            </div>
            <button className='text-slate-400 hover:text-slate-600'>
              <Bookmark className='w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Voice note entry */}
        <div className='bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden'>
              <img
                src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'
                alt='User'
                className='w-full h-full object-cover'
              />
            </div>
            <div>
              <h4 className='font-bold text-slate-900 text-sm'>Aiyana Y.</h4>
              <span className='text-xs text-slate-500 font-medium'>2h ago</span>
            </div>
            <div className='ml-auto flex items-center gap-2'>
              <span className='px-2.5 py-1 bg-purple-100 text-purple-700 rounded-lg text-[10px] font-bold flex items-center gap-1'>
                <Mic className='w-3 h-3' /> Voice
              </span>
            </div>
          </div>

          {/* Voice player */}
          <div className='bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-4 mb-4'>
            <div className='flex items-center gap-3'>
              <button className='w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors'>
                <Play className='w-6 h-6 ml-0.5' />
              </button>
              <div className='flex-1'>
                <div className='h-8 bg-purple-200/50 rounded-lg flex items-center px-2 gap-0.5'>
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className='w-1 bg-purple-400 rounded-full'
                      style={{ height: `${Math.random() * 20 + 8}px` }}
                    ></div>
                  ))}
                </div>
              </div>
              <span className='text-xs font-bold text-purple-600'>1:24</span>
            </div>
          </div>

          <p className='text-slate-600 text-sm italic mb-4'>
            "Walking back from class and just processing everything..."
          </p>

          <div className='flex items-center justify-between pt-4 border-t border-slate-100'>
            <div className='flex gap-6'>
              <button className='flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors group'>
                <Heart className='w-5 h-5 group-hover:fill-current' />
                <span className='text-xs font-bold'>8</span>
              </button>
              <button className='flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors'>
                <MessageCircle className='w-5 h-5' />
                <span className='text-xs font-bold'>2</span>
              </button>
            </div>
            <button className='text-slate-400 hover:text-slate-600'>
              <Bookmark className='w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Original text entries */}
        {[
          {
            text: "Honestly, I'm busy all the time with readings and essays, but I don't feel like I'm moving toward anything. It's just... activity. Where is this leading?",
            tags: ["Anxiety", "Direction"],
            time: "Yesterday",
            likes: 12,
            comments: 3,
            mood: "😕",
          },
          {
            text: "Professor talked about AI writing today. If ChatGPT can write better essays than me in seconds, what exactly am I building here? I need skills that won't disappear.",
            tags: ["Future Of Work", "AI Anxiety"],
            time: "2 days ago",
            likes: 24,
            comments: 8,
            mood: "🤔",
          },
        ].map((entry, i) => (
          <div
            key={i}
            className='bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all'
          >
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden'>
                <img
                  src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'
                  alt='User'
                  className='w-full h-full object-cover'
                />
              </div>
              <div>
                <h4 className='font-bold text-slate-900 text-sm'>Aiyana Y.</h4>
                <span className='text-xs text-slate-500 font-medium'>
                  {entry.time}
                </span>
              </div>
              {entry.mood && (
                <span className='ml-auto text-2xl'>{entry.mood}</span>
              )}
            </div>

            <p className='text-slate-800 text-sm leading-relaxed mb-4 font-medium'>
              {entry.text}
            </p>

            <div className='flex flex-wrap gap-2 mb-6'>
              {entry.tags.map((t) => (
                <span
                  key={t}
                  className='px-3 py-1 bg-slate-50 text-blue-600 rounded-full text-xs font-bold hover:bg-blue-50 cursor-pointer'
                >
                  #{t}
                </span>
              ))}
            </div>

            <div className='flex items-center justify-between pt-4 border-t border-slate-100'>
              <div className='flex gap-6'>
                <button className='flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors group'>
                  <Heart className='w-5 h-5 group-hover:fill-current' />
                  <span className='text-xs font-bold'>{entry.likes}</span>
                </button>
                <button className='flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors'>
                  <MessageCircle className='w-5 h-5' />
                  <span className='text-xs font-bold'>{entry.comments}</span>
                </button>
                <button className='flex items-center gap-2 text-slate-500 hover:text-green-500 transition-colors'>
                  <Share2 className='w-5 h-5' />
                </button>
              </div>
              <button className='text-slate-400 hover:text-slate-600'>
                <Bookmark className='w-5 h-5' />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reflection Modal */}
      {showReflectionModal && (
        <ReflectionModal
          onClose={() => setShowReflectionModal(false)}
          recentWorkshop={recentWorkshop}
        />
      )}
    </div>
  );
};

// --- Connections Tab with AI Advisors, Mentors, Alumni & Industry ---
const ConnectionsTab: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<
    { role: string; content: string }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const aiAdvisors = [
    {
      id: "career-coach",
      name: "Career Coach",
      role: "AI Career Advisor",
      avatar: "🎯",
      color: "bg-blue-500",
      status: "online",
      specialty: "Job search, resume, interviews",
      description:
        "Get personalized career guidance and job search strategies.",
    },
    {
      id: "skill-mentor",
      name: "Skill Mentor",
      role: "AI Learning Guide",
      avatar: "🧠",
      color: "bg-purple-500",
      status: "online",
      specialty: "Skill development, learning paths",
      description: "Build the right skills for your career goals.",
    },
    {
      id: "wellness-advisor",
      name: "Wellness Guide",
      role: "AI Well-being Support",
      avatar: "💚",
      color: "bg-emerald-500",
      status: "online",
      specialty: "Stress, balance, motivation",
      description: "Navigate challenges and maintain well-being.",
    },
  ];

  const alumni = [
    {
      id: "alumni-1",
      name: "Marcus Chen",
      role: "Policy Analyst @ Government of Canada",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      graduated: "Class of 2024",
      field: "Social Sciences",
      available: true,
    },
    {
      id: "alumni-2",
      name: "Priya Sharma",
      role: "UX Researcher @ Shopify",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      graduated: "Class of 2023",
      field: "Psychology",
      available: true,
    },
    {
      id: "alumni-3",
      name: "Jordan Williams",
      role: "Community Manager @ United Way",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
      graduated: "Class of 2024",
      field: "Sociology",
      available: false,
    },
  ];

  const industryPartners = [
    {
      id: "partner-1",
      name: "Deloitte",
      logo: "https://ui-avatars.com/api/?name=Deloitte&background=86BC25&color=fff&size=128&bold=true",
      type: "Consulting",
      opportunities: 12,
      description: "Audit, consulting, tax, and advisory services",
    },
    {
      id: "partner-2",
      name: "Government of Canada",
      logo: "https://ui-avatars.com/api/?name=Gov&background=EF4444&color=fff&size=128&bold=true",
      type: "Public Sector",
      opportunities: 28,
      description: "Federal public service opportunities",
    },
    {
      id: "partner-3",
      name: "RBC",
      logo: "https://ui-avatars.com/api/?name=RBC&background=005DAA&color=fff&size=128&bold=true",
      type: "Finance",
      opportunities: 8,
      description: "Banking, wealth management, insurance",
    },
    {
      id: "partner-4",
      name: "Shopify",
      logo: "https://ui-avatars.com/api/?name=Shopify&background=96BF48&color=fff&size=128&bold=true",
      type: "Technology",
      opportunities: 15,
      description: "E-commerce platform and merchant services",
    },
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessages = [
      ...chatMessages,
      { role: "user", content: inputMessage },
    ];
    setChatMessages(newMessages);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const advisor = aiAdvisors.find((a) => a.id === activeChat);
      let response = "";

      if (activeChat === "career-coach") {
        response =
          "Great question! Based on your profile, I'd recommend focusing on policy analysis roles. Your critical thinking skills are strong, and with a bit more experience in brief writing, you'd be an excellent candidate. Would you like me to suggest some workshops to help bridge that gap?";
      } else if (activeChat === "skill-mentor") {
        response =
          "I see you've been making great progress in Communication! Your recent workshop attendance shows real commitment. To accelerate your growth, I'd suggest focusing on the 'Crisis Communication Sim' next - it directly builds on what you've learned. Want me to explain the learning path I have in mind?";
      } else {
        response =
          "It's completely normal to feel overwhelmed sometimes. Remember, your well-being is just as important as your academic success. Have you tried the reflection journaling feature? Many students find it helpful to process their thoughts. Would you like some tips for managing stress during busy periods?";
      }

      setChatMessages([
        ...newMessages,
        { role: "assistant", content: response },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className='animate-in fade-in duration-500 max-w-5xl mx-auto'>
      {/* Active Chat View */}
      {activeChat && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center p-6'>
          <div
            className='absolute inset-0 bg-slate-900/50 backdrop-blur-sm'
            onClick={() => {
              setActiveChat(null);
              setChatMessages([]);
            }}
          ></div>
          <div className='relative bg-white rounded-[32px] w-full max-w-2xl h-[600px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300'>
            {/* Chat Header */}
            <div className='p-5 border-b border-slate-100 flex items-center gap-4'>
              {(() => {
                const advisor = aiAdvisors.find((a) => a.id === activeChat);
                return advisor ? (
                  <>
                    <div
                      className={`w-12 h-12 ${advisor.color} rounded-2xl flex items-center justify-center text-2xl`}
                    >
                      {advisor.avatar}
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-black text-slate-900'>
                        {advisor.name}
                      </h3>
                      <p className='text-xs text-slate-500 font-medium'>
                        {advisor.role}
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></span>
                      <span className='text-xs font-bold text-emerald-600'>
                        Online
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setActiveChat(null);
                        setChatMessages([]);
                      }}
                      className='w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors'
                    >
                      <X className='w-5 h-5' />
                    </button>
                  </>
                ) : null;
              })()}
            </div>

            {/* Chat Messages */}
            <div className='flex-1 overflow-y-auto p-5 space-y-4'>
              {chatMessages.length === 0 && (
                <div className='text-center py-12'>
                  <div className='w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl'>
                    {aiAdvisors.find((a) => a.id === activeChat)?.avatar}
                  </div>
                  <h4 className='font-bold text-slate-800 mb-2'>
                    Start a conversation
                  </h4>
                  <p className='text-sm text-slate-500 max-w-sm mx-auto'>
                    {aiAdvisors.find((a) => a.id === activeChat)?.description}
                  </p>

                  <div className='flex flex-wrap justify-center gap-2 mt-6'>
                    {[
                      "How can I improve my skills?",
                      "Help with job search",
                      "I'm feeling stuck",
                    ].map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setInputMessage(q);
                        }}
                        className='px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-bold text-slate-600 transition-colors'
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-slate-900 text-white rounded-br-md"
                        : "bg-slate-100 text-slate-800 rounded-bl-md"
                    }`}
                  >
                    <p className='text-sm font-medium leading-relaxed'>
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className='flex justify-start'>
                  <div className='bg-slate-100 text-slate-800 p-4 rounded-2xl rounded-bl-md'>
                    <div className='flex gap-1'>
                      <span className='w-2 h-2 bg-slate-400 rounded-full animate-bounce'></span>
                      <span
                        className='w-2 h-2 bg-slate-400 rounded-full animate-bounce'
                        style={{ animationDelay: "0.1s" }}
                      ></span>
                      <span
                        className='w-2 h-2 bg-slate-400 rounded-full animate-bounce'
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className='p-5 border-t border-slate-100'>
              <div className='flex gap-3'>
                <input
                  type='text'
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder='Type your message...'
                  className='flex-1 px-5 py-3 bg-slate-100 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-slate-900/10'
                />
                <button
                  onClick={handleSendMessage}
                  className='w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-slate-800 transition-colors'
                >
                  <Send className='w-5 h-5' />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Advisors Section */}
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-5'>
          <div className='w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center'>
            <Bot className='w-5 h-5 text-blue-600' />
          </div>
          <div>
            <h3 className='font-black text-slate-800 text-lg'>AI Advisors</h3>
            <p className='text-xs text-slate-500 font-medium'>
              24/7 personalized guidance
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {aiAdvisors.map((advisor) => (
            <button
              key={advisor.id}
              onClick={() => setActiveChat(advisor.id)}
              className='bg-white rounded-3xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all text-left group'
            >
              <div className='flex items-start gap-4'>
                <div
                  className={`w-14 h-14 ${advisor.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {advisor.avatar}
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 mb-1'>
                    <h4 className='font-bold text-slate-900'>{advisor.name}</h4>
                    <span className='w-2 h-2 bg-emerald-500 rounded-full'></span>
                  </div>
                  <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2'>
                    {advisor.specialty}
                  </p>
                  <p className='text-xs text-slate-500 leading-relaxed'>
                    {advisor.description}
                  </p>
                </div>
              </div>
              <div className='mt-4 flex items-center gap-2 text-blue-600 font-bold text-xs group-hover:gap-3 transition-all'>
                <MessageCircle className='w-4 h-4' /> Start Chat
                <ArrowRight className='w-3 h-3' />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Alumni Network */}
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-5'>
          <div className='w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center'>
            <Users className='w-5 h-5 text-purple-600' />
          </div>
          <div>
            <h3 className='font-black text-slate-800 text-lg'>
              Alumni Network
            </h3>
            <p className='text-xs text-slate-500 font-medium'>
              Connect with graduates in your field
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {alumni.map((person) => (
            <div
              key={person.id}
              className='bg-white rounded-3xl p-5 border border-slate-200 hover:shadow-lg transition-all group'
            >
              <div className='flex items-start gap-4'>
                <div className='relative'>
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className='w-14 h-14 rounded-2xl object-cover'
                  />
                  {person.available && (
                    <span className='absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white'></span>
                  )}
                </div>
                <div className='flex-1 min-w-0'>
                  <h4 className='font-bold text-slate-900 text-sm'>
                    {person.name}
                  </h4>
                  <p className='text-xs text-slate-600 font-medium mb-1'>
                    {person.role}
                  </p>
                  <p className='text-[10px] text-slate-400 font-bold'>
                    {person.graduated} • {person.field}
                  </p>
                </div>
              </div>
              <div className='mt-4 flex gap-2'>
                <button
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    person.available
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                  disabled={!person.available}
                >
                  <MessageCircle className='w-3.5 h-3.5' />
                  {person.available ? "Message" : "Unavailable"}
                </button>
                <button className='py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors'>
                  <Eye className='w-3.5 h-3.5' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Partners */}
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-5'>
          <div className='w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center'>
            <Building2 className='w-5 h-5 text-orange-600' />
          </div>
          <div>
            <h3 className='font-black text-slate-800 text-lg'>
              Industry Partners
            </h3>
            <p className='text-xs text-slate-500 font-medium'>
              Companies hiring from our network
            </p>
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {industryPartners.map((partner) => (
            <div
              key={partner.id}
              className='bg-white rounded-3xl p-5 border border-slate-200 hover:shadow-lg transition-all group cursor-pointer'
            >
              <div className='flex flex-col items-center text-center'>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className='w-16 h-16 rounded-2xl mb-3 group-hover:scale-110 transition-transform'
                />
                <h4 className='font-bold text-slate-900 text-sm mb-1'>
                  {partner.name}
                </h4>
                <p className='text-[10px] text-slate-400 font-bold uppercase mb-2'>
                  {partner.type}
                </p>
                <div className='px-3 py-1.5 bg-orange-100 rounded-full'>
                  <span className='text-[10px] font-bold text-orange-700'>
                    {partner.opportunities} open roles
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className='bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='font-black text-xl mb-1'>Need Human Support?</h3>
            <p className='text-slate-400 text-sm font-medium'>
              Schedule a meeting with a real career advisor
            </p>
          </div>
          <button className='px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors flex items-center gap-2'>
            <Calendar className='w-4 h-4' /> Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

const StudentJournalInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "stream" | "profile" | "resources" | "connections"
  >("stream");

  return (
    <div className='absolute inset-0 z-20 pointer-events-none px-6 lg:px-12 pb-6 pt-28 lg:pt-32 flex justify-center'>
      <div className='pointer-events-auto w-full max-w-5xl h-full flex flex-col gap-6 animate-in zoom-in duration-500'>
        {/* Journal Header & Tabs */}
        <div className='flex justify-center mb-4'>
          <div className='bg-white/80 backdrop-blur-xl border border-white/60 p-1.5 rounded-2xl shadow-lg flex gap-2 pointer-events-auto'>
            <button
              onClick={() => setActiveTab("stream")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "stream" ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:bg-white/50"}`}
            >
              Stream
            </button>
            <button
              onClick={() => setActiveTab("connections")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "connections" ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:bg-white/50"}`}
            >
              Connections
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "profile" ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:bg-white/50"}`}
            >
              My Profile
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "resources" ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:bg-white/50"}`}
            >
              Resources
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className='flex-1 overflow-y-auto custom-scrollbar pb-20'>
          {activeTab === "stream" && <StreamTab />}
          {activeTab === "connections" && <ConnectionsTab />}
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "resources" && <ResourcesTab />}
        </div>
      </div>
    </div>
  );
};

// --- NEW SIGNAL INTERFACE (JOB TRENDS REVAMP) ---
const SignalInterface: React.FC = () => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [filter, setFilter] = useState("All Jobs");
  const [selectedWorkshopForRegistration, setSelectedWorkshopForRegistration] =
    useState<any>(null);

  // Workshop data for gap-closing recommendations
  const gapWorkshops: Record<
    string,
    {
      id: number;
      title: string;
      provider: string;
      duration: string;
      skills: { name: string; color: string }[];
    }
  > = {
    "Brief Writing": {
      id: 101,
      title: "Policy Brief Masterclass",
      provider: "Government of Canada",
      duration: "45 min",
      skills: [
        { name: "Brief Writing", color: "bg-blue-600 text-white" },
        { name: "Persuasion", color: "bg-indigo-600 text-white" },
      ],
    },
    "Policy Frameworks": {
      id: 102,
      title: "Policy Analysis Foundations",
      provider: "Harvard Kennedy School",
      duration: "60 min",
      skills: [
        { name: "Policy Frameworks", color: "bg-emerald-600 text-white" },
        { name: "Critical Thinking", color: "bg-teal-600 text-white" },
      ],
    },
    "Grant Writing": {
      id: 103,
      title: "Grant Writing for Non-Profits",
      provider: "United Way",
      duration: "50 min",
      skills: [
        { name: "Grant Writing", color: "bg-purple-600 text-white" },
        { name: "Storytelling", color: "bg-pink-600 text-white" },
      ],
    },
    "Event Logistics": {
      id: 104,
      title: "Event Planning Essentials",
      provider: "EventBrite",
      duration: "30 min",
      skills: [
        { name: "Event Logistics", color: "bg-orange-600 text-white" },
        { name: "Organization", color: "bg-amber-600 text-white" },
      ],
    },
  };

  // Mock Data: Market Trends
  const trends = [
    {
      id: 1,
      name: "Ethical Policy",
      growth: 142,
      type: "rising",
      category: "Human Skill",
    },
    {
      id: 2,
      name: "Prompt Writing",
      growth: 88,
      type: "rising",
      category: "Tech Skill",
    },
    {
      id: 3,
      name: "Community Advocacy",
      growth: 54,
      type: "rising",
      category: "Human Skill",
    },
    {
      id: 4,
      name: "Data Entry",
      growth: -45,
      type: "falling",
      category: "Fading Out",
    },
    {
      id: 5,
      name: "Basic Copywriting",
      growth: -32,
      type: "falling",
      category: "Fading Out",
    },
  ];

  // Mock Data: Jobs
  const jobs = [
    {
      id: "1",
      title: "Junior Policy Analyst",
      company: "Government of Canada",
      logo: "https://ui-avatars.com/api/?name=Gov&background=EF4444&color=fff&size=128&bold=true",
      location: "Remote / Ottawa",
      type: "Internship",
      salary: "$28/hr",
      matchScore: 96,
      matchReason: "Strong Writing & Cultural Context",
      tags: ["Policy", "Indigenous Relations"],
      posted: "2h ago",
      skills: {
        match: ["Critical Thinking", "Writing", "Ethics"],
        gap: ["Brief Writing", "Policy Frameworks"],
      },
      desc: "Support the research and development of new social policies. Your ability to analyze complex cultural contexts is a key asset.",
    },
    {
      id: "2",
      title: "Community Liaison",
      company: "United Way",
      logo: "https://ui-avatars.com/api/?name=United&background=000&color=fff&size=128&bold=true",
      location: "Local",
      type: "Part Time",
      salary: "$22/hr",
      matchScore: 92,
      matchReason: "Community Focus & Empathy",
      tags: ["Non-Profit", "Outreach"],
      posted: "5h ago",
      skills: {
        match: ["Communication", "Empathy"],
        gap: ["Grant Writing", "Event Logistics"],
      },
      desc: "Bridge the gap between donors and community needs. Requires strong storytelling and relationship-building skills.",
    },
    // ... kept other jobs same structure
  ];

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  return (
    <div className='absolute inset-0 z-20 pointer-events-none px-6 lg:px-12 pb-6 pt-28 lg:pt-32 flex justify-center'>
      {/* Widened Container from max-w-7xl to max-w-[1600px] */}
      <div className='pointer-events-auto w-full h-full max-w-[1600px] flex gap-6 animate-in fade-in zoom-in duration-500'>
        {/* --- LEFT COLUMN: MACRO INTELLIGENCE --- */}
        <div className='w-[320px] flex flex-col gap-6 h-full shrink-0 pb-24'>
          {/* Radar Card */}
          <div className='bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-[32px] shadow-lg flex-1 flex flex-col relative overflow-hidden group hover:bg-white/90 transition-all'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg'>
                <Radio className='w-5 h-5' />
              </div>
              <div>
                <h3 className='font-black text-slate-800 text-lg leading-none'>
                  Job Market
                </h3>
                <p className='text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1'>
                  What's Trending
                </p>
              </div>
            </div>

            {/* Trends List */}
            <div className='flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar'>
              {trends.map((t) => (
                <div
                  key={t.id}
                  className='flex items-center justify-between group/item cursor-default'
                >
                  <div className='flex items-center gap-3'>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === "rising" ? "bg-green-100 text-green-600" : "bg-red-50 text-red-500"}`}
                    >
                      {t.type === "rising" ? (
                        <TrendingUp className='w-4 h-4' />
                      ) : (
                        <TrendingDown className='w-4 h-4' />
                      )}
                    </div>
                    <div>
                      <span className='block text-xs font-bold text-slate-800 group-hover/item:text-blue-600 transition-colors'>
                        {t.name}
                      </span>
                      <span className='block text-[9px] font-bold text-slate-400 uppercase'>
                        {t.category}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-black ${t.type === "rising" ? "text-green-600" : "text-red-500"}`}
                  >
                    {t.growth > 0 ? "+" : ""}
                    {t.growth}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- CENTER COLUMN: JOB FEED --- */}
        <div className='flex-1 flex flex-col h-full bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] shadow-2xl overflow-hidden relative min-w-0'>
          {/* Header - Centered Title & Filters */}
          <div className='p-6 border-b border-white/50 bg-white/40 flex flex-col gap-4 relative backdrop-blur-md sticky top-0 z-10'>
            <div className='flex justify-between items-center'>
              <div>
                <h2 className='text-xl font-black text-slate-900'>
                  Open Roles
                </h2>
                <p className='text-xs text-slate-500 font-bold mt-1'>
                  Jobs that fit your profile
                </p>
              </div>
              <div className='bg-white/80 px-3 py-1.5 rounded-lg border border-white/60 text-[10px] font-bold text-slate-600 shadow-sm flex items-center gap-1.5'>
                <Globe className='w-3 h-3 text-blue-500' /> Global
              </div>
            </div>
            {/* Filters Row */}
            <div className='flex gap-2 overflow-x-auto pb-1 scrollbar-hide'>
              {["All Jobs", "Best Match", "Remote Only", "Internships"].map(
                (f, i) => (
                  <button
                    key={i}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                      filter === f
                        ? "bg-slate-900 text-white shadow-md"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {f}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Feed */}
          <div className='flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar'>
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                className={`p-8 rounded-[36px] border transition-all cursor-pointer group relative overflow-hidden flex flex-col gap-6 ${
                  selectedJobId === job.id
                    ? "bg-white border-blue-500 shadow-[0_20px_50px_rgba(59,130,246,0.15)] ring-1 ring-blue-500"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                }`}
              >
                {/* Top Row: Logo + Match Pill */}
                <div className='flex justify-between items-start'>
                  <div className='w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm p-1.5 shrink-0 flex items-center justify-center'>
                    <img
                      src={job.logo}
                      className='w-full h-full object-contain rounded-xl'
                      alt='Logo'
                    />
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 ${
                      job.matchScore >= 90
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    <Sparkles className='w-4 h-4 fill-current' />
                    {job.matchScore}% Match
                  </div>
                </div>

                {/* Main Content */}
                <div>
                  <h3 className='text-2xl font-black text-slate-900 tracking-tight leading-tight mb-2 group-hover:text-blue-600 transition-colors'>
                    {job.title}
                  </h3>
                  <div className='flex items-center gap-3 text-sm font-bold text-slate-500'>
                    <span className='flex items-center gap-1.5'>
                      <Building2 className='w-4 h-4' /> {job.company}
                    </span>
                    <span className='w-1 h-1 rounded-full bg-slate-300'></span>
                    <span className='flex items-center gap-1.5'>
                      <MapPin className='w-4 h-4' /> {job.location}
                    </span>
                    <span className='w-1 h-1 rounded-full bg-slate-300'></span>
                    <span className='text-slate-400'>{job.posted}</span>
                  </div>
                </div>

                {/* Description */}
                <p className='text-base font-medium text-slate-600 leading-relaxed'>
                  {job.desc}
                </p>

                {/* Tags */}
                <div className='flex flex-wrap gap-2'>
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className='px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 border border-slate-200'
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Footer */}
                <div className='pt-4 mt-auto flex flex-wrap items-center justify-between gap-4'>
                  <div className='flex gap-2 shrink-0'>
                    <button
                      className='p-3 rounded-2xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100'
                      title='Save Job'
                    >
                      <Bookmark className='w-6 h-6' />
                    </button>
                    <button
                      className='p-3 rounded-2xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100'
                      title='Share'
                    >
                      <Share2 className='w-6 h-6' />
                    </button>
                  </div>

                  <div className='flex items-center gap-3 flex-1 justify-end min-w-0'>
                    <button className='text-xs font-bold text-slate-500 hover:text-blue-600 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0'>
                      <FileText className='w-4 h-4' />
                      Resume Prep
                    </button>

                    <button className='flex-1 max-w-[240px] py-4 bg-[#0A0A0A] text-white rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap'>
                      Apply Now <ExternalLink className='w-4 h-4' />
                    </button>
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedJobId === job.id && (
                  <div className='absolute left-0 top-10 bottom-10 w-1.5 bg-blue-500 rounded-r-full'></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT COLUMN: FIT ANALYSIS --- */}
        {/* Reduced width from 400px to 350px to allow more space for feed */}
        <div className='w-[350px] flex flex-col h-full bg-slate-900 text-white rounded-[40px] shadow-2xl p-6 relative overflow-hidden border border-slate-700 shrink-0'>
          {/* Background Glow */}
          <div className='absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none'></div>

          {/* Job Header */}
          <div className='relative z-10 mb-6 text-center'>
            <div className='w-16 h-16 mx-auto bg-white rounded-2xl p-1.5 mb-3 shadow-lg'>
              <img
                src={selectedJob.logo}
                className='w-full h-full object-contain rounded-lg'
                alt='Logo'
              />
            </div>
            <h2 className='text-xl font-black mb-1'>{selectedJob.title}</h2>
            <p className='text-slate-400 font-bold text-xs'>
              {selectedJob.company}
            </p>
          </div>

          {/* Fit Visualizer */}
          <div className='relative z-10 flex-1 overflow-y-auto custom-scrollbar pr-1'>
            <div className='flex items-center justify-between mb-3'>
              <h3 className='font-bold text-xs uppercase tracking-widest text-slate-400'>
                Skill Analysis
              </h3>
              <span className='text-xs font-bold bg-slate-800 px-2 py-1 rounded text-white'>
                {selectedJob.matchScore}% Match
              </span>
            </div>

            {/* Skill Stack */}
            <div className='space-y-3 mb-6'>
              {/* Matches */}
              <div className='bg-green-500/10 border border-green-500/30 rounded-2xl p-3'>
                <div className='flex items-center gap-2 mb-2 text-green-400 font-bold text-[10px] uppercase tracking-wide'>
                  <CheckCircle2 className='w-3.5 h-3.5' /> You Have
                </div>
                <div className='flex flex-wrap gap-1.5'>
                  {selectedJob.skills.match.map((s) => (
                    <span
                      key={s}
                      className='px-2.5 py-1 bg-green-500/20 rounded-lg text-[10px] font-bold text-green-300'
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gaps */}
              <div className='bg-red-500/10 border border-red-500/30 rounded-2xl p-3 relative overflow-hidden'>
                <div className='flex items-center gap-2 mb-2 text-red-400 font-bold text-[10px] uppercase tracking-wide relative z-10'>
                  <AlertTriangle className='w-3.5 h-3.5' /> Missing Skills
                </div>
                <div className='flex flex-wrap gap-1.5 relative z-10'>
                  {selectedJob.skills.gap.map((s) => (
                    <span
                      key={s}
                      className='px-2.5 py-1 bg-red-500/20 rounded-lg text-[10px] font-bold text-red-300'
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggested Workshops to Close Gap */}
            <div className='mb-4'>
              <div className='flex items-center gap-2 mb-3'>
                <Target className='w-4 h-4 text-orange-400' />
                <h3 className='font-bold text-xs uppercase tracking-widest text-slate-400'>
                  Close the Gap
                </h3>
              </div>
              <p className='text-[10px] text-slate-500 mb-3'>
                These workshops will help you qualify:
              </p>

              <div className='space-y-3'>
                {selectedJob.skills.gap.slice(0, 2).map((gapSkill) => {
                  const workshop = gapWorkshops[gapSkill];
                  if (!workshop) return null;
                  return (
                    <div
                      key={gapSkill}
                      className='bg-slate-800/80 border border-slate-700 rounded-2xl p-4 hover:bg-slate-800 transition-all group'
                    >
                      <div className='flex items-start gap-3 mb-3'>
                        <div className='w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center shrink-0'>
                          <Target className='w-5 h-5 text-orange-400' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-bold text-white leading-tight mb-0.5'>
                            {workshop.title}
                          </p>
                          <p className='text-[10px] text-slate-400 font-medium'>
                            {workshop.provider} • {workshop.duration}
                          </p>
                        </div>
                      </div>

                      <div className='flex flex-wrap gap-1.5 mb-3'>
                        {workshop.skills.map((skill) => (
                          <span
                            key={skill.name}
                            className={`px-2 py-1 rounded-md text-[9px] font-bold ${skill.color}`}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() =>
                          setSelectedWorkshopForRegistration(workshop)
                        }
                        className='w-full py-2.5 bg-orange-500 hover:bg-orange-400 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg'
                      >
                        Register Now <ArrowRight className='w-3.5 h-3.5' />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className='mt-4 pt-4 border-t border-slate-700/50'>
            <button className='text-slate-500 text-xs font-bold hover:text-white transition-colors flex items-center justify-center gap-2 w-full'>
              <Save className='w-4 h-4' /> Save Job
            </button>
          </div>
        </div>
      </div>

      {/* Workshop Registration Modal */}
      {selectedWorkshopForRegistration && (
        <WorkshopSurveyModal
          workshop={selectedWorkshopForRegistration}
          onClose={() => setSelectedWorkshopForRegistration(null)}
        />
      )}
    </div>
  );
};

// --- Workshop Survey Modal ---
const WorkshopSurveyModal: React.FC<{
  workshop: {
    id: number;
    title: string;
    provider: string;
    skills: { name: string; color: string }[];
  };
  onClose: () => void;
}> = ({ workshop, onClose }) => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});

  const surveySteps = [
    {
      type: "intro",
      title: "Pre-Session Check-In",
      subtitle: `You're about to join ${workshop.title}`,
    },
    {
      type: "slider",
      question: "How confident do you feel about this topic right now?",
      skill: "Confidence",
      min: "Not at all",
      max: "Very confident",
    },
    {
      type: "thumbs",
      question: "Have you had real-world experience with this skill area?",
      skill: "Experience",
    },
    {
      type: "slider",
      question: "How comfortable are you working in team scenarios?",
      skill: "Collaboration",
      min: "Prefer solo",
      max: "Love teamwork",
    },
    {
      type: "thumbs",
      question: "Are you open to receiving peer feedback during the session?",
      skill: "Openness",
    },
    {
      type: "text",
      question: "Anything specific you want to get out of this session?",
      placeholder: "Optional: Share your goals or concerns...",
    },
    {
      type: "complete",
      title: "You're All Set!",
      subtitle: "Head to Room 204B for your in-person session",
    },
  ];

  const currentStep = surveySteps[step];

  const handleSliderChange = (value: number) => {
    setResponses({ ...responses, [currentStep.skill || step]: value });
  };

  const handleThumbsResponse = (value: boolean) => {
    setResponses({ ...responses, [currentStep.skill || step]: value });
    setTimeout(() => setStep(step + 1), 300);
  };

  const handleTextChange = (value: string) => {
    setResponses({ ...responses, notes: value });
  };

  return (
    <div className='fixed inset-0 z-[200] flex items-center justify-center p-6'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-slate-900/60 backdrop-blur-md'
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className='relative bg-white rounded-[40px] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300'>
        {/* Progress Bar */}
        <div className='h-1.5 bg-slate-100'>
          <div
            className='h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500'
            style={{ width: `${((step + 1) / surveySteps.length) * 100}%` }}
          ></div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors z-10'
        >
          <X className='w-5 h-5' />
        </button>

        {/* Content */}
        <div className='p-10'>
          {currentStep.type === "intro" && (
            <div className='text-center animate-in fade-in duration-500'>
              <div className='w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-6'>
                <Target className='w-10 h-10 text-orange-600' />
              </div>
              <h2 className='text-3xl font-black text-slate-900 mb-3'>
                {currentStep.title}
              </h2>
              <p className='text-slate-500 font-medium mb-2'>
                {currentStep.subtitle}
              </p>
              <p className='text-sm text-slate-400 mb-8'>
                Quick check-in to personalize your experience
              </p>

              {/* Skills Preview */}
              <div className='flex flex-wrap justify-center gap-2 mb-8'>
                {workshop.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-4 py-2 rounded-xl text-xs font-bold ${skill.color}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                className='w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-base hover:bg-orange-600 transition-colors shadow-lg'
              >
                Let's Go
              </button>
            </div>
          )}

          {currentStep.type === "slider" && (
            <div className='animate-in fade-in slide-in-from-right duration-300'>
              <p className='text-xs font-black text-orange-600 uppercase tracking-widest mb-4'>
                Question {step} of {surveySteps.length - 2}
              </p>
              <h3 className='text-2xl font-black text-slate-900 mb-10 leading-tight'>
                {currentStep.question}
              </h3>

              <div className='mb-8'>
                <input
                  type='range'
                  min='0'
                  max='100'
                  defaultValue={responses[currentStep.skill || step] || 50}
                  onChange={(e) => handleSliderChange(Number(e.target.value))}
                  className='w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-orange-500 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white'
                />
                <div className='flex justify-between mt-3'>
                  <span className='text-xs font-bold text-slate-400'>
                    {currentStep.min}
                  </span>
                  <span className='text-xs font-bold text-slate-400'>
                    {currentStep.max}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setStep(step + 1)}
                className='w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-base hover:bg-orange-600 transition-colors shadow-lg flex items-center justify-center gap-2'
              >
                Continue <ArrowRight className='w-5 h-5' />
              </button>
            </div>
          )}

          {currentStep.type === "thumbs" && (
            <div className='animate-in fade-in slide-in-from-right duration-300'>
              <p className='text-xs font-black text-orange-600 uppercase tracking-widest mb-4'>
                Question {step} of {surveySteps.length - 2}
              </p>
              <h3 className='text-2xl font-black text-slate-900 mb-10 leading-tight'>
                {currentStep.question}
              </h3>

              <div className='flex gap-4 justify-center'>
                <button
                  onClick={() => handleThumbsResponse(false)}
                  className={`flex-1 py-8 rounded-3xl border-2 font-bold text-lg transition-all flex flex-col items-center gap-3 ${
                    responses[currentStep.skill || step] === false
                      ? "bg-red-50 border-red-300 text-red-600"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-red-300 hover:bg-red-50"
                  }`}
                >
                  <ThumbsDown className='w-10 h-10' />
                  Not Really
                </button>
                <button
                  onClick={() => handleThumbsResponse(true)}
                  className={`flex-1 py-8 rounded-3xl border-2 font-bold text-lg transition-all flex flex-col items-center gap-3 ${
                    responses[currentStep.skill || step] === true
                      ? "bg-green-50 border-green-300 text-green-600"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-green-300 hover:bg-green-50"
                  }`}
                >
                  <ThumbsUp className='w-10 h-10' />
                  Yes!
                </button>
              </div>
            </div>
          )}

          {currentStep.type === "text" && (
            <div className='animate-in fade-in slide-in-from-right duration-300'>
              <p className='text-xs font-black text-orange-600 uppercase tracking-widest mb-4'>
                Almost Done
              </p>
              <h3 className='text-2xl font-black text-slate-900 mb-6 leading-tight'>
                {currentStep.question}
              </h3>

              <textarea
                placeholder={currentStep.placeholder}
                value={responses.notes || ""}
                onChange={(e) => handleTextChange(e.target.value)}
                className='w-full h-32 p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-800 font-medium placeholder:text-slate-400 outline-none focus:border-orange-400 resize-none mb-6 transition-colors'
              />

              <div className='flex gap-3'>
                <button
                  onClick={() => setStep(step + 1)}
                  className='flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-base hover:bg-slate-200 transition-colors'
                >
                  Skip
                </button>
                <button
                  onClick={() => setStep(step + 1)}
                  className='flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold text-base hover:bg-orange-600 transition-colors shadow-lg'
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {currentStep.type === "complete" && (
            <div className='text-center animate-in fade-in zoom-in duration-500'>
              <div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <CheckCircle2 className='w-12 h-12 text-green-600' />
              </div>
              <h2 className='text-3xl font-black text-slate-900 mb-3'>
                {currentStep.title}
              </h2>
              <p className='text-slate-500 font-medium mb-2'>
                {currentStep.subtitle}
              </p>

              <div className='bg-slate-50 rounded-2xl p-6 my-8 border border-slate-200'>
                <div className='flex items-center justify-center gap-3 text-slate-700'>
                  <MapPin className='w-5 h-5 text-orange-500' />
                  <span className='font-bold'>Room 204B • Building A</span>
                </div>
                <p className='text-sm text-slate-400 mt-2'>
                  Session starts in 15 minutes
                </p>
              </div>

              <button
                onClick={onClose}
                className='w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-base hover:bg-orange-600 transition-colors shadow-lg'
              >
                Got It
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const GrowthInterface: React.FC = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);

  const workshops = [
    {
      id: 1,
      title: "Crisis Communication Sim",
      provider: "Edelman",
      duration: "45 min",
      xp: 150,
      skills: [
        { name: "Active Listening", color: "bg-blue-600 text-white" },
        { name: "Empathy", color: "bg-purple-600 text-white" },
        { name: "Persuasion", color: "bg-indigo-600 text-white" },
        { name: "Adaptability", color: "bg-cyan-600 text-white" },
      ],
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
      status: "Open",
    },
    {
      id: 2,
      title: "Ethical AI Auditing",
      provider: "Deloitte",
      duration: "60 min",
      xp: 200,
      skills: [
        { name: "Critical Thinking", color: "bg-emerald-600 text-white" },
        { name: "Moral Reasoning", color: "bg-rose-600 text-white" },
        { name: "Attention to Detail", color: "bg-amber-600 text-white" },
      ],
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
      status: "Full",
    },
    {
      id: 3,
      title: "Supply Chain Resilience",
      provider: "Tesla",
      duration: "30 min",
      xp: 100,
      skills: [
        { name: "Problem Solving", color: "bg-orange-600 text-white" },
        { name: "Systems Thinking", color: "bg-teal-600 text-white" },
        { name: "Collaboration", color: "bg-violet-600 text-white" },
      ],
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
      status: "Open",
    },
    {
      id: 4,
      title: "Inclusive Design Sprint",
      provider: "IDEO",
      duration: "90 min",
      xp: 250,
      skills: [
        { name: "Creativity", color: "bg-pink-600 text-white" },
        { name: "Cultural Awareness", color: "bg-lime-600 text-white" },
        { name: "User Empathy", color: "bg-fuchsia-600 text-white" },
        { name: "Iteration", color: "bg-sky-600 text-white" },
      ],
      image:
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop",
      status: "Open",
    },
  ];

  return (
    <>
      <div className='absolute inset-0 z-20 pointer-events-none px-6 lg:px-12 pb-6 pt-28 lg:pt-32 flex justify-center'>
        <div className='pointer-events-auto w-full max-w-6xl h-full bg-white/90 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white flex overflow-hidden animate-in zoom-in duration-500'>
          {/* Sidebar */}
          <div className='w-80 bg-slate-50 border-r border-slate-200 p-6 flex flex-col gap-5 shrink-0 overflow-y-auto custom-scrollbar'>
            <div>
              <div className='w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm'>
                <Target className='w-6 h-6' />
              </div>
              <h3 className='font-black text-slate-800 text-2xl leading-tight'>
                Skill Labs
              </h3>
              <p className='text-sm text-slate-500 font-bold mt-1'>
                Practice makes perfect.
              </p>
            </div>

            <div className='bg-white p-5 rounded-3xl shadow-sm border border-slate-200'>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-xs font-black text-slate-400 uppercase tracking-wider'>
                  Weekly Goal
                </span>
                <span className='text-xs font-bold text-orange-600'>
                  350 / 500 XP
                </span>
              </div>
              <div className='w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-1'>
                <div className='h-full bg-orange-500 w-[70%] rounded-full'></div>
              </div>
            </div>

            {/* Skill Profile Section */}
            <div className='bg-white p-5 rounded-3xl shadow-sm border border-slate-200'>
              <h4 className='text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2'>
                <Zap className='w-3.5 h-3.5 text-orange-500' /> Your Skill
                Profile
              </h4>
              <div className='space-y-4'>
                {[
                  { name: "Communication", level: 72, color: "bg-blue-500" },
                  {
                    name: "Critical Thinking",
                    level: 58,
                    color: "bg-emerald-500",
                  },
                  { name: "Empathy", level: 85, color: "bg-purple-500" },
                  { name: "Adaptability", level: 45, color: "bg-cyan-500" },
                  {
                    name: "Problem Solving",
                    level: 62,
                    color: "bg-orange-500",
                  },
                  { name: "Creativity", level: 38, color: "bg-pink-500" },
                ].map((skill) => (
                  <div key={skill.name} className='group cursor-pointer'>
                    <div className='flex justify-between items-center mb-1.5'>
                      <span className='text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors'>
                        {skill.name}
                      </span>
                      <span className='text-[10px] font-bold text-slate-400'>
                        {skill.level}%
                      </span>
                    </div>
                    <div className='w-full h-2 bg-slate-100 rounded-full overflow-hidden'>
                      <div
                        className={`h-full ${skill.color} rounded-full transition-all group-hover:opacity-80`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className='text-[10px] text-slate-400 mt-4 text-center'>
                Based on workshops & reflections
              </p>
            </div>

            {/* Recommendations */}
            <div className='flex-1'>
              <h4 className='text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2'>
                <Sparkles className='w-3.5 h-3.5 text-orange-500' /> Recommended
                For You
              </h4>
              <div className='space-y-3'>
                <div className='p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl border border-pink-200 shadow-sm hover:shadow-md transition-all cursor-pointer group'>
                  <div className='flex items-start gap-3'>
                    <div className='w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center shrink-0'>
                      <Palette className='w-5 h-5' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-xs font-black text-pink-800 leading-tight group-hover:text-pink-900'>
                        Inclusive Design Sprint
                      </p>
                      <p className='text-[10px] text-pink-600 font-medium mt-0.5'>
                        Boost your Creativity
                      </p>
                      <div className='flex items-center gap-1 mt-2'>
                        <span className='px-2 py-0.5 bg-pink-200 text-pink-700 rounded text-[9px] font-bold'>
                          +38% skill
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl border border-cyan-200 shadow-sm hover:shadow-md transition-all cursor-pointer group'>
                  <div className='flex items-start gap-3'>
                    <div className='w-10 h-10 rounded-xl bg-cyan-500 text-white flex items-center justify-center shrink-0'>
                      <Wind className='w-5 h-5' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-xs font-black text-cyan-800 leading-tight group-hover:text-cyan-900'>
                        Crisis Communication Sim
                      </p>
                      <p className='text-[10px] text-cyan-600 font-medium mt-0.5'>
                        Grow your Adaptability
                      </p>
                      <div className='flex items-center gap-1 mt-2'>
                        <span className='px-2 py-0.5 bg-cyan-200 text-cyan-700 rounded text-[9px] font-bold'>
                          +45% skill
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200 shadow-sm hover:shadow-md transition-all cursor-pointer group'>
                  <div className='flex items-start gap-3'>
                    <div className='w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0'>
                      <BrainCircuit className='w-5 h-5' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-xs font-black text-emerald-800 leading-tight group-hover:text-emerald-900'>
                        Ethical AI Auditing
                      </p>
                      <p className='text-[10px] text-emerald-600 font-medium mt-0.5'>
                        Sharpen Critical Thinking
                      </p>
                      <div className='flex items-center gap-1 mt-2'>
                        <span className='px-2 py-0.5 bg-emerald-200 text-emerald-700 rounded text-[9px] font-bold'>
                          +58% skill
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='flex-1 p-8 overflow-y-auto custom-scrollbar'>
            <div className='flex justify-between items-center mb-8'>
              <h2 className='text-3xl font-black text-slate-900'>
                Available Workshops
              </h2>
              <div className='flex gap-2'>
                <button className='px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg'>
                  All
                </button>
                <button className='px-4 py-2 bg-white text-slate-500 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50'>
                  Saved
                </button>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pb-6'>
              {workshops.map((w) => (
                <div
                  key={w.id}
                  className='bg-white rounded-[32px] border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer flex flex-col'
                >
                  <div className='h-40 overflow-hidden relative shrink-0'>
                    <img
                      src={w.image}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                      alt={w.title}
                    />
                    <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm'>
                      {w.duration}
                    </div>
                    {w.status === "Full" && (
                      <div className='absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center'>
                        <span className='bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg transform -rotate-6'>
                          Session Full
                        </span>
                      </div>
                    )}
                  </div>
                  <div className='p-6 flex-1 flex flex-col'>
                    <div className='flex justify-between items-start mb-2'>
                      <span className='text-[10px] font-black text-slate-400 uppercase tracking-wider'>
                        {w.provider}
                      </span>
                      <span className='text-xs font-bold text-orange-600 flex items-center gap-1'>
                        <Zap className='w-3 h-3' /> {w.xp} XP
                      </span>
                    </div>
                    <h3 className='text-xl font-black text-slate-900 mb-4 leading-tight'>
                      {w.title}
                    </h3>
                    {/* Enhanced Skill Pills */}
                    <div className='flex flex-wrap gap-2 mb-6'>
                      {w.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide shadow-sm ${skill.color}`}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        w.status !== "Full" && setSelectedWorkshop(w)
                      }
                      disabled={w.status === "Full"}
                      className='mt-auto w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-900'
                    >
                      {w.status === "Full" ? "Join Waitlist" : "Start Session"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Survey Modal */}
      {selectedWorkshop && (
        <WorkshopSurveyModal
          workshop={selectedWorkshop}
          onClose={() => setSelectedWorkshop(null)}
        />
      )}
    </>
  );
};

// ... Shared Components ...

const ARTag: React.FC<{ data: ARHotspot }> = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className='absolute z-30 group'
      style={{ top: data.top, left: data.left }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-300 ${isHovered ? "scale-125 ring-8 ring-white/30" : "hover:scale-110"}`}
      >
        <div className='text-slate-700'>{data.icon}</div>
        {!isHovered && (
          <div className='absolute inset-0 rounded-full border-2 border-white/50 animate-ping'></div>
        )}
      </div>

      <div
        className={`absolute left-20 top-0 w-80 bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl transition-all duration-300 origin-left border border-white/50 ${isHovered ? "opacity-100 scale-100 translate-x-4" : "opacity-0 scale-90 translate-x-0 pointer-events-none"}`}
      >
        <div className='flex items-center gap-3 mb-2'>
          <span
            className={`w-2 h-2 rounded-full ${data.type === "info" ? "bg-blue-500" : "bg-orange-500"}`}
          ></span>
          <h4 className='text-slate-900 font-bold text-lg'>{data.label}</h4>
        </div>
        <p className='text-slate-500 text-sm leading-relaxed font-medium'>
          {data.detail}
        </p>
      </div>
    </div>
  );
};

const NavPortal: React.FC<{
  label: string;
  position: string;
  arrowDir: "right" | "left" | "up" | "down";
  onClick: () => void;
}> = ({ label, position, arrowDir, onClick }) => (
  <div
    onClick={onClick}
    className={`absolute z-40 ${position} group cursor-pointer flex flex-col items-center justify-center gap-4 transition-transform hover:scale-105`}
  >
    <div className='relative'>
      <div className='w-24 h-24 rounded-full bg-[#F8FAFC]/80 backdrop-blur-xl border-2 border-white shadow-xl flex items-center justify-center group-hover:bg-white group-hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-500 text-slate-800'>
        {arrowDir === "right" && (
          <ArrowRight className='w-10 h-10 group-hover:translate-x-1 transition-transform' />
        )}
        {arrowDir === "left" && (
          <ArrowLeft className='w-10 h-10 group-hover:-translate-x-1 transition-transform' />
        )}
        {arrowDir === "up" && (
          <ChevronUp className='w-10 h-10 group-hover:-translate-y-1 transition-transform' />
        )}
      </div>
      <div className='absolute -inset-2 rounded-full border border-white/30 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500'></div>
    </div>
    <div className='bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg border border-white/50 transform group-hover:-translate-y-1 transition-transform'>
      <span className='text-slate-900 font-black text-xs uppercase tracking-[0.2em] group-hover:text-blue-600 transition-colors'>
        {label}
      </span>
    </div>
  </div>
);

// --- Student Profile HUD ---
const StudentProfileHUD: React.FC = () => {
  return (
    <div className='absolute left-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden lg:block'>
      {/* Resized: w-[400px] -> w-[370px], p-8 -> p-6 */}
      <div className='pointer-events-auto bg-white/90 backdrop-blur-2xl border-2 border-white/50 p-6 rounded-[36px] w-[370px] shadow-[0_30px_80px_rgba(0,0,0,0.15)] animate-in slide-in-from-left duration-1000 flex flex-col gap-6 transition-all hover:bg-white'>
        <div className='flex items-center gap-5 border-b border-gray-200/50 pb-6'>
          <div className='relative'>
            {/* Resized Avatar: w-28 -> w-24 */}
            <div className='w-24 h-24 rounded-full p-1.5 bg-white border border-white/50 shadow-lg'>
              <img
                src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'
                alt='Student'
                className='w-full h-full rounded-full object-cover'
              />
            </div>
            <div
              className='absolute bottom-1 right-1 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white shadow-sm'
              title='Online'
            ></div>
          </div>
          <div>
            {/* Resized Text: 3xl -> 2xl */}
            <h3 className='text-slate-900 font-black text-2xl leading-none tracking-tight'>
              Aiyana Y.
            </h3>
            <p className='text-xs font-extrabold text-slate-600 uppercase tracking-wider mt-2'>
              Social Sciences • Year 1
            </p>
            <div className='flex items-center gap-1 mt-2'>
              <div className='px-3 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-[10px] font-black text-purple-700 uppercase tracking-wider flex items-center gap-2 shadow-sm'>
                <Sparkles className='w-3 h-3' /> Strength: Resilience
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='flex items-center justify-between mb-4'>
            <h4 className='text-xs font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2'>
              <Zap className='w-4 h-4 text-orange-500' /> To Do List
            </h4>
            <span className='text-xs font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full border border-orange-200'>
              2 Items
            </span>
          </div>
          <div className='space-y-3'>
            <div className='bg-white/80 p-4 rounded-2xl border border-orange-200/50 shadow-sm flex items-start gap-4 hover:border-orange-400 transition-colors cursor-pointer group relative overflow-hidden'>
              <div className='absolute left-0 top-0 bottom-0 w-1.5 bg-orange-400'></div>
              <div className='mt-0.5 w-5 h-5 rounded border-2 border-slate-300 group-hover:border-orange-500 flex items-center justify-center transition-colors shrink-0'></div>
              <div>
                <span className='block text-base font-bold text-slate-800 leading-tight group-hover:text-orange-700 transition-colors'>
                  Submit Reflection
                </span>
                <span className='block text-xs text-slate-500 font-bold mt-1.5 flex items-center gap-1.5'>
                  <Clock className='w-3.5 h-3.5' /> Due Today, 5:00 PM
                </span>
              </div>
            </div>
            <div className='bg-white/60 p-4 rounded-2xl border border-slate-200/50 shadow-sm flex items-start gap-4 hover:border-blue-400 transition-colors cursor-pointer group'>
              <div className='mt-0.5 w-5 h-5 rounded border-2 border-slate-300 group-hover:border-blue-500 flex items-center justify-center transition-colors shrink-0'></div>
              <div>
                <span className='block text-base font-bold text-slate-800 leading-tight'>
                  Sign up for Labs
                </span>
                <span className='block text-xs text-slate-500 font-bold mt-1.5'>
                  Opens Tomorrow
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <h4 className='text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1 mt-1'>
            Skill Progress
          </h4>
          <div className='bg-white p-5 rounded-3xl border-2 border-slate-100 shadow-[0_4px_0_#e2e8f0] hover:translate-y-1 hover:shadow-none transition-all cursor-pointer group'>
            <div className='flex justify-between items-center mb-3'>
              <span className='font-extrabold text-slate-700 text-sm'>
                Communication
              </span>
              <span className='text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100'>
                Level 3
              </span>
            </div>
            <div className='w-full h-4 bg-slate-100 rounded-full overflow-hidden relative'>
              <div className='absolute inset-0 bg-slate-100'></div>
              <div className='h-full bg-blue-500 w-[65%] rounded-full relative shadow-sm'>
                <div className='absolute top-1 left-2 right-2 h-1.5 bg-white/20 rounded-full'></div>
              </div>
            </div>
            <p className='text-[10px] font-bold text-slate-400 mt-2.5 text-right'>
              320 / 500 XP
            </p>
          </div>
        </div>
        <div>
          <h4 className='text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-1 mt-2'>
            Shortcuts
          </h4>
          <div className='grid grid-cols-4 gap-2'>
            {[
              {
                label: "Library",
                icon: <BookOpen className='w-6 h-6' />,
                color: "text-blue-600",
                bg: "bg-blue-50 group-hover:bg-blue-500 group-hover:text-white",
              },
              {
                label: "Help",
                icon: <Users className='w-6 h-6' />,
                color: "text-purple-600",
                bg: "bg-purple-50 group-hover:bg-purple-500 group-hover:text-white",
              },
              {
                label: "Jobs",
                icon: <Target className='w-6 h-6' />,
                color: "text-orange-600",
                bg: "bg-orange-50 group-hover:bg-orange-500 group-hover:text-white",
              },
              {
                label: "Wellness",
                icon: <Heart className='w-6 h-6' />,
                color: "text-rose-600",
                bg: "bg-rose-50 group-hover:bg-rose-500 group-hover:text-white",
              },
            ].map((item, i) => (
              <button
                key={i}
                className='flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all group'
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${item.bg} ${item.color}`}
                >
                  {item.icon}
                </div>
                <span className='text-[10px] font-bold text-slate-500 group-hover:text-slate-800'>
                  {item.label}
                </span>
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
  theme: "blue" | "orange" | "cyan";
  pattern: React.ReactNode;
  onClick: () => void;
  delay: number;
  liveStatus?: string;
}> = ({
  title,
  subtitle,
  icon,
  theme,
  pattern,
  onClick,
  delay,
  liveStatus,
}) => {
  const themes = {
    blue: "from-[#1e3a8a] to-[#172554] border-blue-400/30 shadow-blue-900/40",
    orange:
      "from-[#c2410c] to-[#7f1d1d] border-orange-400/30 shadow-orange-900/40",
    cyan: "from-[#0e7490] to-[#164e63] border-cyan-400/30 shadow-cyan-900/40",
  };

  return (
    <div
      onClick={onClick}
      className={`
                group relative w-[276px] h-[437px] rounded-[48px] p-7 flex flex-col justify-between 
                cursor-pointer transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
                hover:-translate-y-6 hover:scale-[1.02] hover:z-50 hover:rotate-0
                border-[4px] bg-gradient-to-br shadow-2xl
                ${themes[theme]}
                animate-in slide-in-from-bottom-40 fade-in-0
                overflow-hidden
            `}
      style={{
        marginRight: "-1rem",
        transform: "rotate(var(--rotation))",
        animationDelay: `${delay}ms`,
      }}
    >
      {pattern}
      <div className='absolute -right-20 -top-20 w-80 h-80 bg-white opacity-10 blur-[80px] rounded-full pointer-events-none mix-blend-overlay'></div>
      <div className='relative z-10 flex justify-between items-start'>
        <div className='w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500'>
          {icon}
        </div>
        <div className='flex items-center gap-1.5 bg-white/95 shadow-lg backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 group-hover:scale-110 transition-transform'>
          <span className='w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse'></span>
          <span className='text-[9px] font-black text-slate-700 uppercase tracking-wider'>
            {liveStatus}
          </span>
        </div>
      </div>
      <div className='relative z-10'>
        <div className='flex items-center gap-2 mb-1'>
          <p className='text-white/80 text-[10px] font-black uppercase tracking-[0.2em]'>
            {subtitle}
          </p>
        </div>
        <h3 className='text-white text-4xl font-black leading-[0.85] mb-6 tracking-tighter drop-shadow-xl'>
          {title}
        </h3>
        <button className='w-full py-3 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-lg hover:bg-slate-50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group-hover:shadow-2xl'>
          Enter <ArrowRight className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
};

const WalletCarousel: React.FC<{ onNavigate: (target: RoomType) => void }> = ({
  onNavigate,
}) => {
  return (
    <div className='absolute bottom-12 left-1/2 -translate-x-1/2 z-40'>
      <div className='flex items-end justify-center pl-20 perspective-[1000px]'>
        <div className='relative flex items-center hover:space-x-8 transition-all duration-500'>
          <div
            style={{ "--rotation": "-5deg" } as React.CSSProperties}
            className='origin-bottom-right z-10 hover:z-50 transition-all duration-300'
          >
            <TapestryCard
              title='Job Trends'
              subtitle='Market Data'
              icon={<Radio className='w-6 h-6' />}
              theme='blue'
              pattern={<CircuitPattern />}
              onClick={() => onNavigate("SignalTower")}
              delay={100}
              liveStatus='New Jobs'
            />
          </div>
          <div
            style={{ "--rotation": "0deg" } as React.CSSProperties}
            className='origin-bottom z-20 hover:z-50 transition-all duration-300 -ml-4 hover:ml-0'
          >
            <TapestryCard
              title='Workshops'
              subtitle='Build Skills'
              icon={<Target className='w-6 h-6' />}
              theme='orange'
              pattern={<GeoPattern />}
              onClick={() => onNavigate("GrowthLab")}
              delay={200}
              liveStatus='Active'
            />
          </div>
          <div
            style={{ "--rotation": "5deg" } as React.CSSProperties}
            className='origin-bottom-left z-10 hover:z-50 transition-all duration-300 -ml-4 hover:ml-0'
          >
            <TapestryCard
              title='Journal'
              subtitle='Reflect'
              icon={<Wind className='w-6 h-6' />}
              theme='cyan'
              pattern={<WavePattern />}
              onClick={() => onNavigate("QuietRoom")}
              delay={300}
              liveStatus='Log Now'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentDashboard: React.FC = () => {
  const [currentRoom, setCurrentRoom] = useState<RoomType>("Atrium");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

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
    <div className='relative w-full h-screen overflow-hidden bg-[#F1F5F9] font-sans text-slate-900 selection:bg-blue-100/50'>
      {/* --- 1. THE WORLD LAYER (Background) --- */}
      <div
        className={`absolute inset-0 transition-transform duration-[1500ms] ease-in-out will-change-transform ${
          isTransitioning
            ? "scale-[1.1] opacity-0 blur-xl"
            : "scale-100 opacity-100 blur-0"
        }`}
      >
        <img
          src={room.bgImage}
          alt={room.title}
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-slate-900/10 mix-blend-overlay'></div>
        <div className='absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent'></div>
      </div>

      {/* --- 2. GLOBAL GRADIENTS & TITLE (The "Vibe" Layer) --- */}
      {/* Right Gradient for Title Readability */}
      <div className='absolute top-0 right-0 h-full w-[60%] bg-gradient-to-l from-white/95 via-white/70 to-transparent pointer-events-none z-10'></div>

      {/* Left Gradient for Logo Visibility */}
      <div className='absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-white/80 via-white/40 to-transparent pointer-events-none z-10'></div>

      {/* Global Page Title - Conditioned for Room Type */}
      {currentRoom !== "SignalTower" && (
        <div
          className={`absolute pointer-events-none z-10 flex flex-col transition-all duration-1000 ${
            currentRoom === "Atrium"
              ? "top-28 right-12 text-right items-end"
              : currentRoom === "QuietRoom"
                ? "top-24 right-12 text-right items-end scale-75 origin-top-right" // Far right, downsized
                : "top-24 right-12 text-right items-end" // GrowthLab - far right
          }`}
        >
          <h1
            key={`title-${currentRoom}`}
            className={`${currentRoom === "Atrium" ? "text-7xl md:text-9xl" : "text-4xl md:text-6xl"} font-black text-slate-900 leading-[0.85] tracking-tighter mb-6 animate-in fade-in zoom-in duration-1000 delay-200 drop-shadow-2xl opacity-90`}
          >
            {room.title}
          </h1>
          <p
            key={`desc-${currentRoom}`}
            className={`text-xl text-slate-800 font-bold leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-400 max-w-md ${currentRoom === "Atrium" ? "" : currentRoom === "QuietRoom" ? "text-right" : "text-center opacity-80"}`}
          >
            {room.description}
          </p>
        </div>
      )}

      {/* --- 3. THE UI LAYER (HUD) --- */}
      <div
        className={`absolute inset-0 z-20 transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
      >
        {/* Top Bar - Minimalist & Glass */}
        <nav className='absolute top-[5px] left-[5px] z-50 pointer-events-none'>
          <div className='flex items-center animate-in slide-in-from-top duration-700 pointer-events-auto'>
            <img
              src='/waypoint.png'
              alt='Waypoint'
              className='h-16 w-auto m-0 drop-shadow-lg'
            />
          </div>
        </nav>

        {/* Profile HUD (Kept Global for Consistency but can overlap if window small) */}
        {currentRoom === "Atrium" && <StudentProfileHUD />}

        {/* --- NAVIGATION & CONTENT --- */}
        {currentRoom === "Atrium" ? (
          <WalletCarousel onNavigate={handleNavigate} />
        ) : (
          <>
            {/* Interactive Room Components - Z-Index 30 to sit above title layer if needed */}
            <div className='relative z-30 w-full h-full'>
              {currentRoom === "QuietRoom" && <StudentJournalInterface />}
              {currentRoom === "SignalTower" && <SignalInterface />}
              {currentRoom === "GrowthLab" && <GrowthInterface />}
            </div>

            {/* AR Hotspots */}
            {room.hotspots.map((h, i) => (
              <div
                key={h.id}
                className='animate-in fade-in zoom-in duration-700'
                style={{ animationDelay: `${h.delay}ms` }}
              >
                <ARTag data={h} />
              </div>
            ))}

            {/* Back Buttons */}
            {room.navigation.map((nav, i) => (
              <div
                key={i}
                className='animate-in fade-in duration-1000 delay-700'
              >
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
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
      ></div>
    </div>
  );
};

export default StudentDashboard;
