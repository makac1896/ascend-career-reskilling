import React, { useState, useRef } from "react";
import {
  Play, Briefcase, BookOpen, PenLine, ArrowRight, Sparkles,
  Users, Palette, BookMarked, ChevronRight, Send, Zap,
  Clock, MapPin, CheckCircle2, Target, Brain, Heart,
  Coffee, MessageCircle, Star, Trophy, Mic, Image, Link2,
  Filter, BarChart2, Flame, Award, Plus, ChevronDown,
  ThumbsUp, RotateCcw, Lightbulb, Video, AtSign, Globe,
  TrendingUp, Calendar, Hash, Layers,
} from "lucide-react";

interface WaypointLandingProps {
  onJoinCall: () => void;
  onSkipToDashboard?: () => void;
}

type ActiveView = "home" | "lab" | "journal" | "hub";

// ─── Data ────────────────────────────────────────────────────────────────────

const ACTIVE_SCENARIO = {
  scenarioName: "Crisis at the Nonprofit",
  objective: "Practice Technical Assertiveness",
};

const SIMULATIONS = [
  {
    id: "active",
    title: "Crisis at the Nonprofit",
    provider: "Waypoint",
    duration: "In progress · 42%",
    skills: ["Assertive Advocacy", "Crisis Response", "Critical Reading"],
    status: "active",
    accent: "#4318FF",
  },
  {
    id: "2",
    title: "Ethical AI Auditing",
    provider: "Deloitte",
    duration: "60 min",
    skills: ["Critical Thinking", "Moral Reasoning", "Attention to Detail"],
    status: "open",
    accent: "#059669",
  },
  {
    id: "3",
    title: "Supply Chain Resilience",
    provider: "Tesla",
    duration: "30 min",
    skills: ["Problem Solving", "Systems Thinking", "Collaboration"],
    status: "open",
    accent: "#0EA5E9",
  },
  {
    id: "4",
    title: "Inclusive Design Sprint",
    provider: "IDEO",
    duration: "90 min",
    skills: ["Creativity", "Cultural Awareness", "User Empathy"],
    status: "open",
    accent: "#7C3AED",
  },
];

const JOURNAL_ENTRIES = [
  {
    id: 1,
    date: "Mar 17",
    time: "9:42 pm",
    scenario: "Crisis at the Nonprofit",
    simulationId: "active",
    type: "post-sim" as const,
    prompt: "When did you feel most uncertain — and what did you do with that feeling?",
    excerpt: "I noticed I softened my argument when pushed back on. Next time I want to hold my position more clearly and explain the data behind my thinking. There was a moment with Dev where I had the right answer but I second-guessed myself.",
    mood: "reflective",
    moodEmoji: "🌊",
    tags: ["Assertiveness", "Resilience"],
    aiReaction: "You identified the exact moment you backed down — that awareness IS the skill. Next sim, try this: write down your position before you start. Having it anchored in text makes it harder to abandon.",
    hasVoice: false,
    hasImage: false,
    growth: { skill: "Assertive Advocacy", delta: "+6 pts" },
  },
  {
    id: 2,
    date: "Mar 14",
    time: "3:15 pm",
    scenario: "Tech Startup Decision",
    simulationId: "2",
    type: "post-sim" as const,
    prompt: "What held you back from speaking sooner?",
    excerpt: "The moment I realised the majority opinion was wrong — but I didn't speak up until it was too late. That's the gap I'm working on. It felt like social pressure disguised as agreement.",
    mood: "motivated",
    moodEmoji: "🔥",
    tags: ["Critical Thinking", "Advocacy"],
    aiReaction: "Social pressure is one of the hardest things to name in the moment. That you can name it now means you're rewiring. Keep this entry — it's going to matter.",
    hasVoice: true,
    hasImage: false,
    growth: { skill: "Critical Thinking", delta: "+4 pts" },
  },
  {
    id: 3,
    date: "Mar 10",
    time: "11:08 pm",
    scenario: null,
    simulationId: null,
    type: "free" as const,
    prompt: null,
    excerpt: "Thinking about what kind of work actually energises me. Policy stuff feels dry but the people it affects — that's the part I care about. Maybe there's a field at the intersection.",
    mood: "curious",
    moodEmoji: "✨",
    tags: ["Career Direction", "Values"],
    aiReaction: null,
    hasVoice: false,
    hasImage: true,
    growth: null,
  },
];

const AI_ADVISORS = [
  {
    id: "career-coach",
    name: "Career Coach",
    role: "AI Career Advisor",
    specialty: "Job Search · Resume · Interviews",
    description: "Personalized career guidance and job search strategies.",
    color: "#F59E0B",
    icon: Target,
  },
  {
    id: "skill-mentor",
    name: "Skill Mentor",
    role: "AI Learning Guide",
    specialty: "Skill Development · Learning Paths",
    description: "Build the right skills for your next role.",
    color: "#4318FF",
    icon: Brain,
  },
  {
    id: "wellness-guide",
    name: "Wellness Guide",
    role: "AI Well-being Support",
    specialty: "Stress · Balance · Motivation",
    description: "Navigate challenges and maintain well-being.",
    color: "#10B981",
    icon: Heart,
  },
];

const ALUMNI = [
  {
    id: 1,
    name: "Marcus Chen",
    role: "Policy Analyst @ Government of Canada",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    graduated: "Class of 2024",
    field: "Social Sciences",
    available: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "UX Researcher @ Shopify",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    graduated: "Class of 2023",
    field: "Psychology",
    available: true,
  },
  {
    id: 3,
    name: "Jordan Williams",
    role: "Community Manager @ United Way",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    graduated: "Class of 2024",
    field: "Sociology",
    available: false,
  },
];

const UNLOCKED_OUTCOMES = [
  { id: 1, title: "Role Match: Community Builder @ Microsoft", cta: "Quick Apply", accentColor: "#10B981", accentLight: "#ECFDF5", completed: true, view: "home" as ActiveView },
  { id: 2, title: "Exclusive Access: AI-Native Leadership Session", cta: "Accept Invite", accentColor: "#3B82F6", accentLight: "#EFF6FF", completed: true, view: "hub" as ActiveView },
  { id: 3, title: "Next Step: Assertive Communication Lab", cta: "Reserve Spot", accentColor: "#8B5CF6", accentLight: "#F5F3FF", completed: false, view: "lab" as ActiveView },
];

const SUPERPOWERS = [
  { name: "Resilience Under Pressure", level: 87, delta: "+11", color: "#4318FF", stage: "Mastering" },
  { name: "Critical Thinking", level: 74, delta: "+8", color: "#7C3AED", stage: "Building" },
  { name: "Assertive Advocacy", level: 52, delta: "+18", color: "#0EA5E9", stage: "Emerging" },
  { name: "Cultural Awareness", level: 38, delta: "+5", color: "#F59E0B", stage: "Developing" },
];

const NAV_ITEMS: { icon: React.ElementType; label: string; id: ActiveView }[] = [
  { icon: Palette, label: "Canvas", id: "home" },
  { icon: Play, label: "Lab", id: "lab" },
  { icon: BookMarked, label: "Journal", id: "journal" },
  { icon: Users, label: "Connection Hub", id: "hub" },
];

const JOURNAL_INSIGHTS = [
  {
    id: 1,
    icon: "📊",
    pattern: "'Uncertainty' appears in 4 of 5 entries",
    signal: "You're tracking your self-doubt in real time — that's rare.",
    suggestion: "Confidence Under Pressure Lab",
    color: "#4318FF",
    bg: "#EEF2FF",
  },
  {
    id: 2,
    icon: "🔁",
    pattern: "Writing spikes after high-stakes sims",
    signal: "Processing through reflection — this is the habit that compounds.",
    suggestion: "Book a post-sim debrief with Alex",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
  {
    id: 3,
    icon: "👁️",
    pattern: "'Social pressure' named in 3 entries",
    signal: "Naming it is step one. Let's build the practice for step two.",
    suggestion: "Holding Your Ground workshop",
    color: "#0EA5E9",
    bg: "#F0F9FF",
  },
];

// ─── Sub-views ────────────────────────────────────────────────────────────────

const s = {
  label: { margin: 0, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#5A6A8A" },
  sectionTitle: { margin: "0 0 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#5A6A8A" },
  card: { borderRadius: "16px", backgroundColor: "#FFFFFF", border: "1px solid #E0E5F2", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" },
};

// ─── Home view ────────────────────────────────────────────────────────────────
const HomeView: React.FC<{ onJoinCall: () => void; setView: (v: ActiveView) => void }> = ({ onJoinCall, setView }) => {
  const EXPLORE_CARDS = [
    { id: "lab", category: "Practice", title: "Lab", description: "Jump into simulations that build real career confidence.", cta: "Enter Lab", icon: Play, accent: "#4318FF", accentLight: "#EEF2FF", view: "lab" as ActiveView },
    { id: "journal", category: "Reflection", title: "Journal", description: "Capture insights and track growth throughout your journey.", cta: "Open Journal", icon: PenLine, accent: "#7C3AED", accentLight: "#F5F3FF", view: "journal" as ActiveView },
    { id: "hub", category: "Network", title: "Connection Hub", description: "Talk to advisors and connect with alumni in your field.", cta: "Connect", icon: Users, accent: "#0EA5E9", accentLight: "#F0F9FF", view: "hub" as ActiveView },
  ];
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
      {/* Greeting */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <Sparkles size={16} style={{ color: "#4318FF" }} />
          <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4318FF" }}>Good morning</p>
        </div>
        <h1 style={{ margin: "0 0 6px", fontSize: "30px", fontWeight: 700, color: "#2B3674", letterSpacing: "-0.02em" }}>Welcome back, Aiyana.</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#5A6A8A", lineHeight: 1.5 }}>Ready to sharpen your resilience? You're 42% through your active scenario.</p>
      </div>

      {/* Blueprint hero card */}
      <div style={{ borderRadius: "20px", border: "1px solid rgba(255,255,255,0.14)", backgroundColor: "#152D5E", backgroundImage: ["radial-gradient(circle at 78% 16%, rgba(140,130,255,0.28) 0%, transparent 38%)", "radial-gradient(circle at 92% 12%, rgba(120,100,255,0.20) 0%, transparent 28%)", "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)", "linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)"].join(", "), backgroundSize: "auto, auto, 28px 28px, 28px 28px", boxShadow: "0 16px 48px rgba(21,45,94,0.32), 0 4px 16px rgba(67,24,255,0.20)", padding: "28px 32px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <p style={{ margin: "0 0 8px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Active Scenario</p>
            <h2 style={{ margin: "0 0 5px", fontSize: "28px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em" }}>{ACTIVE_SCENARIO.scenarioName}</h2>
            <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>Objective: {ACTIVE_SCENARIO.objective}</p>
          </div>
          <span style={{ padding: "6px 14px", borderRadius: "999px", backgroundColor: "rgba(16,185,129,0.15)", color: "#6EE7B7", fontSize: "12px", fontWeight: 700, flexShrink: 0, border: "1px solid rgba(16,185,129,0.30)" }}>In progress</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[{ value: "42%", label: "Complete" }, { value: "3", label: "Decisions made" }, { value: "2", label: "Left" }].map((stat, idx) => (
            <div key={stat.label} style={{ paddingRight: idx < 2 ? "24px" : 0, paddingLeft: idx > 0 ? "24px" : 0, borderRight: idx < 2 ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
              <p style={{ margin: "0 0 3px", fontSize: "34px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em" }}>{stat.value}</p>
              <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{stat.label}</p>
            </div>
          ))}
        </div>
        <div>
          <div style={{ height: "6px", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ width: "42%", height: "100%", borderRadius: "999px", background: "linear-gradient(90deg, #6366F1, #A78BFA)", boxShadow: "0 0 12px rgba(99,102,241,0.6)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Progress</span>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#A78BFA" }}>42%</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <button onClick={onJoinCall} style={{ padding: "13px 20px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #4318FF, #7C3AED)", color: "#FFFFFF", fontSize: "14px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 20px rgba(67,24,255,0.50)", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 28px rgba(67,24,255,0.65)"; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(67,24,255,0.50)"; e.currentTarget.style.transform = "translateY(0)"; }}>
            <Play size={15} />Resume simulation
          </button>
          <button onClick={() => setView("lab")} style={{ padding: "13px 20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.22)", backgroundColor: "rgba(255,255,255,0.08)", color: "#FFFFFF", fontSize: "14px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", backdropFilter: "blur(8px)", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.14)"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}>
            Start new
          </button>
        </div>
      </div>

      {/* Explore cards */}
      <div>
        <p style={s.sectionTitle}>Or explore other paths</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {EXPLORE_CARDS.map((card) => {
            const Icon = card.icon;
            const isHov = hoveredCard === card.id;
            return (
              <div key={card.id} onMouseEnter={() => setHoveredCard(card.id)} onMouseLeave={() => setHoveredCard(null)} style={{ ...s.card, padding: "24px", display: "flex", flexDirection: "column", gap: "12px", cursor: "pointer", transition: "all 0.2s", border: `1.5px solid ${isHov ? card.accent + "40" : "#E0E5F2"}`, boxShadow: isHov ? `0 8px 24px ${card.accent}18` : "0 2px 8px rgba(0,0,0,0.04)", transform: isHov ? "translateY(-3px)" : "none" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: card.accentLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} style={{ color: card.accent }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: card.accent }}>{card.category}</p>
                  <h4 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: 700, color: "#2B3674" }}>{card.title}</h4>
                  <p style={{ margin: 0, fontSize: "13px", color: "#5A6A8A", lineHeight: 1.5 }}>{card.description}</p>
                </div>
                <button onClick={() => setView(card.view)} style={{ padding: "10px 16px", borderRadius: "10px", border: "none", backgroundColor: card.accentLight, color: card.accent, fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", width: "100%", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = card.accent; e.currentTarget.style.color = "#FFFFFF"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = card.accentLight; e.currentTarget.style.color = card.accent; }}>
                  {card.cta}<ChevronRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Lab view ─────────────────────────────────────────────────────────────────
const LAB_STATS = [
  { label: "Sims completed", value: "7", icon: Award, color: "#4318FF" },
  { label: "Hours practiced", value: "11.4", icon: Clock, color: "#0EA5E9" },
  { label: "Superpowers gained", value: "4", icon: Zap, color: "#F59E0B" },
];

const LAB_FILTER_TABS = ["All", "In progress", "Open", "Partner labs"];

const FULL_SIMULATIONS = [
  {
    id: "active",
    title: "Crisis at the Nonprofit",
    provider: "Waypoint",
    providerLogo: null,
    duration: "In progress · 42%",
    durationMins: 45,
    skills: ["Assertive Advocacy", "Crisis Response", "Critical Reading"],
    status: "active",
    accent: "#4318FF",
    difficulty: "Intermediate",
    completions: 1247,
    superpowerBoost: "Resilience Under Pressure",
    description: "Navigate a funding crisis while managing a fractured team and media scrutiny.",
  },
  {
    id: "2",
    title: "Ethical AI Auditing",
    provider: "Deloitte",
    providerLogo: null,
    duration: "60 min",
    durationMins: 60,
    skills: ["Critical Thinking", "Moral Reasoning", "Attention to Detail"],
    status: "open",
    accent: "#059669",
    difficulty: "Advanced",
    completions: 892,
    superpowerBoost: "Critical Thinking",
    description: "Identify bias and ethical gaps in an enterprise AI deployment before launch.",
  },
  {
    id: "3",
    title: "Supply Chain Resilience",
    provider: "Tesla",
    providerLogo: null,
    duration: "30 min",
    durationMins: 30,
    skills: ["Problem Solving", "Systems Thinking", "Collaboration"],
    status: "open",
    accent: "#0EA5E9",
    difficulty: "Beginner",
    completions: 2103,
    superpowerBoost: "Problem Solving",
    description: "Keep a production line moving when a key supplier goes dark. Fast decisions required.",
  },
  {
    id: "4",
    title: "Inclusive Design Sprint",
    provider: "IDEO",
    providerLogo: null,
    duration: "90 min",
    durationMins: 90,
    skills: ["Creativity", "Cultural Awareness", "User Empathy"],
    status: "open",
    accent: "#7C3AED",
    difficulty: "Intermediate",
    completions: 634,
    superpowerBoost: "Cultural Awareness",
    description: "Lead a 3-day design sprint for a product used by underserved communities.",
  },
];

const LabView: React.FC<{ onJoinCall: () => void }> = ({ onJoinCall }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedSim, setExpandedSim] = useState<string | null>(null);

  const filtered = FULL_SIMULATIONS.filter(sim => {
    if (activeFilter === "All") return true;
    if (activeFilter === "In progress") return sim.status === "active";
    if (activeFilter === "Open") return sim.status === "open";
    if (activeFilter === "Partner labs") return sim.provider !== "Waypoint";
    return true;
  });

  const activeSim = FULL_SIMULATIONS.find(s => s.status === "active")!;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <Layers size={15} style={{ color: "#4318FF" }} />
            <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4318FF" }}>Simulation Lab</p>
          </div>
          <h1 style={{ margin: "0 0 5px", fontSize: "28px", fontWeight: 700, color: "#2B3674", letterSpacing: "-0.02em" }}>Where skills become instincts.</h1>
          <p style={{ margin: 0, fontSize: "14px", color: "#5A6A8A" }}>Each scenario is designed around the gaps your cohort actually has.</p>
        </div>
        {/* Mini stat row */}
        <div style={{ display: "flex", gap: "24px", flexShrink: 0 }}>
          {LAB_STATS.map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} style={{ textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "flex-end" }}>
                  <Icon size={12} style={{ color: stat.color }} />
                  <p style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#2B3674" }}>{stat.value}</p>
                </div>
                <p style={{ margin: 0, fontSize: "11px", color: "#5A6A8A" }}>{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active sim — blueprint card */}
      <div style={{ borderRadius: "22px", backgroundColor: "#152D5E", backgroundImage: ["radial-gradient(ellipse at 85% 15%, rgba(140,130,255,0.32) 0%, transparent 45%)", "radial-gradient(ellipse at 10% 85%, rgba(99,102,241,0.18) 0%, transparent 40%)", "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)", "linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)"].join(", "), backgroundSize: "auto, auto, 28px 28px, 28px 28px", padding: "28px 32px", boxShadow: "0 16px 52px rgba(21,45,94,0.32), 0 4px 16px rgba(67,24,255,0.18)", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Active Scenario</span>
              <span style={{ padding: "3px 10px", borderRadius: "999px", backgroundColor: "rgba(16,185,129,0.15)", color: "#6EE7B7", fontSize: "11px", fontWeight: 700, border: "1px solid rgba(16,185,129,0.28)" }}>In progress</span>
            </div>
            <h2 style={{ margin: "0 0 5px", fontSize: "26px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em" }}>{activeSim.title}</h2>
            <p style={{ margin: "0 0 14px", fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{activeSim.description}</p>
            <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
              {activeSim.skills.map(sk => (
                <span key={sk} style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "999px", backgroundColor: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.82)", border: "1px solid rgba(255,255,255,0.12)" }}>{sk}</span>
              ))}
            </div>
          </div>
          <div style={{ flexShrink: 0, textAlign: "right" }}>
            <p style={{ margin: "0 0 2px", fontSize: "40px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.03em" }}>42%</p>
            <p style={{ margin: "0 0 4px", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>complete</p>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "flex-end" }}>
              <Zap size={11} style={{ color: "#A78BFA" }} />
              <span style={{ fontSize: "11px", color: "#A78BFA", fontWeight: 600 }}>{activeSim.superpowerBoost}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div style={{ height: "6px", backgroundColor: "rgba(255,255,255,0.12)", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ width: "42%", height: "100%", borderRadius: "999px", background: "linear-gradient(90deg, #6366F1, #A78BFA)", boxShadow: "0 0 14px rgba(99,102,241,0.55)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.42)" }}>3 decisions made · 2 remaining</span>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#A78BFA" }}>~18 min left</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={onJoinCall} style={{ flex: 1, padding: "13px 20px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #4318FF, #7C3AED)", color: "#FFFFFF", fontSize: "14px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 20px rgba(67,24,255,0.50)", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(67,24,255,0.65)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(67,24,255,0.50)"; }}>
            <Play size={15} fill="currentColor" />Resume simulation
          </button>
          <button style={{ padding: "13px 20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.18)", backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.75)", fontSize: "13px", fontWeight: 600, cursor: "pointer", backdropFilter: "blur(8px)", transition: "all 0.2s", whiteSpace: "nowrap" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.13)"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)"; }}>
            View debrief
          </button>
        </div>
      </div>

      {/* Browse section */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A6A8A" }}>Browse simulations</p>
          {/* Filter tabs */}
          <div style={{ display: "flex", gap: "4px", backgroundColor: "#F4F7FE", borderRadius: "10px", padding: "3px" }}>
            {LAB_FILTER_TABS.map(tab => (
              <button key={tab} onClick={() => setActiveFilter(tab)} style={{ padding: "5px 12px", borderRadius: "8px", border: "none", backgroundColor: activeFilter === tab ? "#FFFFFF" : "transparent", color: activeFilter === tab ? "#2B3674" : "#5A6A8A", fontSize: "12px", fontWeight: activeFilter === tab ? 700 : 500, cursor: "pointer", transition: "all 0.15s", boxShadow: activeFilter === tab ? "0 1px 4px rgba(0,0,0,0.08)" : "none", whiteSpace: "nowrap" }}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
          {filtered.filter(sim => sim.status !== "active").map((sim) => {
            const isHov = hovered === sim.id;
            const isExp = expandedSim === sim.id;
            return (
              <div key={sim.id} onMouseEnter={() => setHovered(sim.id)} onMouseLeave={() => setHovered(null)} style={{ borderRadius: "18px", backgroundColor: "#FFFFFF", border: `1.5px solid ${isHov ? sim.accent + "45" : "#E0E5F2"}`, boxShadow: isHov ? `0 10px 28px ${sim.accent}14` : "0 2px 8px rgba(0,0,0,0.04)", padding: "22px", display: "flex", flexDirection: "column", gap: "14px", transition: "all 0.22s", transform: isHov ? "translateY(-2px)" : "none", cursor: "pointer" }} onClick={() => setExpandedSim(isExp ? null : sim.id)}>

                {/* Card top row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
                  <div style={{ flex: 1 }}>
                    {/* Provider badge + difficulty */}
                    <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: sim.accent }}>{sim.provider}</span>
                      <span style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "#D1D5DB", display: "inline-block" }} />
                      <span style={{ fontSize: "10px", color: "#9EABC0", fontWeight: 600 }}>{sim.difficulty}</span>
                    </div>
                    <p style={{ margin: "0 0 3px", fontSize: "15px", fontWeight: 700, color: "#2B3674", lineHeight: 1.3 }}>{sim.title}</p>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "999px", backgroundColor: "#ECFDF5", color: "#059669", flexShrink: 0, border: "1px solid #D1FAE5" }}>Open</span>
                </div>

                {/* Description (expanded) */}
                {isExp && (
                  <p style={{ margin: 0, fontSize: "12px", color: "#5A6A8A", lineHeight: 1.6, borderTop: "1px solid #E0E5F2", paddingTop: "12px" }}>{sim.description}</p>
                )}

                {/* Superpower boost pill */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 12px", borderRadius: "999px", backgroundColor: sim.accent + "10", border: `1px solid ${sim.accent}22`, width: "fit-content" }}>
                  <Zap size={11} style={{ color: sim.accent }} />
                  <span style={{ fontSize: "11px", fontWeight: 700, color: sim.accent }}>Builds: {sim.superpowerBoost}</span>
                </div>

                {/* Skill tags */}
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {sim.skills.map(sk => (
                    <span key={sk} style={{ fontSize: "11px", fontWeight: 600, padding: "3px 9px", borderRadius: "999px", backgroundColor: "#F4F7FE", color: "#5A6A8A" }}>{sk}</span>
                  ))}
                </div>

                {/* Footer */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #E0E5F2", paddingTop: "12px", marginTop: "2px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#9EABC0", fontSize: "11px" }}>
                      <Clock size={12} />{sim.durationMins} min
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#9EABC0", fontSize: "11px" }}>
                      <Users size={12} />{sim.completions.toLocaleString()}
                    </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); onJoinCall(); }} style={{ padding: "8px 18px", borderRadius: "10px", border: "none", backgroundColor: sim.accent, color: "#FFFFFF", fontSize: "12px", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", boxShadow: `0 2px 8px ${sim.accent}30` }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 4px 14px ${sim.accent}50`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 2px 8px ${sim.accent}30`; }}>
                    Start
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Journal view ─────────────────────────────────────────────────────────────
const MOODS = [
  { id: "energised", label: "Energised", emoji: "⚡" },
  { id: "focused", label: "Focused", emoji: "🎯" },
  { id: "reflective", label: "Reflective", emoji: "🌊" },
  { id: "challenged", label: "Challenged", emoji: "🔥" },
];

const COMPOSE_TABS = [
  { id: "write", label: "Write", icon: PenLine },
  { id: "voice", label: "Voice note", icon: Mic },
  { id: "attach", label: "Attach", icon: Image },
];

const LINK_OPTIONS = [
  { id: "none", label: "Free reflection" },
  { id: "active", label: "Crisis at the Nonprofit" },
  { id: "2", label: "Tech Startup Decision" },
  { id: "3", label: "Supply Chain Resilience" },
];

const BANNER_THEMES = [
  {
    gradient: "linear-gradient(135deg, #1E1B4B 0%, #3730A3 45%, #4C1D95 100%)",
    accentColor: "#A78BFA",
    noise: true,
  },
  {
    gradient: "linear-gradient(135deg, #1C0A00 0%, #92400E 50%, #B45309 100%)",
    accentColor: "#FCD34D",
    noise: true,
  },
];

const JournalView: React.FC = () => {
  const [entry, setEntry] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mood, setMood] = useState<string | null>(null);
  const [composeTab, setComposeTab] = useState("write");
  const [linkedSim, setLinkedSim] = useState("active");
  const [reactedEntries, setReactedEntries] = useState<Set<number>>(new Set());

  const JOURNAL_STREAK = 5;

  const toggleReact = (id: number) => {
    setReactedEntries(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const BANNER_ENTRIES = JOURNAL_ENTRIES.filter(je => je.type === "post-sim");
  const FREE_ENTRIES = JOURNAL_ENTRIES.filter(je => je.type === "free");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <BookMarked size={15} style={{ color: "#7C3AED" }} />
            <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7C3AED" }}>Journal</p>
          </div>
          <h1 style={{ margin: "0 0 5px", fontSize: "30px", fontWeight: 800, color: "#2B3674", letterSpacing: "-0.03em" }}>Reflection is the reps.</h1>
          <p style={{ margin: 0, fontSize: "14px", color: "#5A6A8A" }}>What you notice about yourself outlasts the scenario.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "14px", backgroundColor: "#FFF7ED", border: "1px solid #FED7AA" }}>
            <Flame size={18} style={{ color: "#F97316" }} />
            <div>
              <p style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#EA580C" }}>{JOURNAL_STREAK}</p>
              <p style={{ margin: 0, fontSize: "10px", color: "#F97316", fontWeight: 600 }}>day streak</p>
            </div>
          </div>
          <button style={{ padding: "11px 20px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #4318FF, #7C3AED)", color: "#FFFFFF", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "7px", boxShadow: "0 4px 14px rgba(67,24,255,0.3)", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"} onMouseLeave={e => e.currentTarget.style.transform = "none"}>
            <Plus size={14} />New Entry
          </button>
        </div>
      </div>

      {/* ── Compose ───────────────────────────────────────────────────── */}
      <div style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", border: "1.5px solid #E0E5F2", boxShadow: "0 4px 24px rgba(67,24,255,0.07)", overflow: "hidden" }}>
        <div style={{ padding: "22px 26px", background: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)", borderBottom: "1px solid #DDD6FE", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "8px" }}>
              <Sparkles size={13} style={{ color: "#7C3AED" }} />
              <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7C3AED" }}>Today's prompt</p>
            </div>
            <p style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: "#2B3674", lineHeight: 1.5 }}>
              "When did you feel most uncertain — and what did you do with that feeling?"
            </p>
          </div>
          <div style={{ flexShrink: 0 }}>
            <p style={{ margin: "0 0 5px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9EABC0" }}>Linked to</p>
            <div style={{ position: "relative" }}>
              <select value={linkedSim} onChange={e => setLinkedSim(e.target.value)} style={{ appearance: "none", padding: "7px 28px 7px 10px", borderRadius: "10px", border: "1.5px solid #DDD6FE", backgroundColor: "#FFFFFF", fontSize: "12px", fontWeight: 600, color: "#2B3674", cursor: "pointer", outline: "none", fontFamily: "'DM Sans', sans-serif", minWidth: "190px" }}>
                {LINK_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
              </select>
              <ChevronDown size={12} style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", color: "#5A6A8A", pointerEvents: "none" }} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", borderBottom: "1px solid #E0E5F2" }}>
          {COMPOSE_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = composeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setComposeTab(tab.id)} style={{ flex: 1, padding: "13px 0", border: "none", backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "12px", fontWeight: isActive ? 700 : 500, color: isActive ? "#7C3AED" : "#5A6A8A", cursor: "pointer", borderBottom: `2px solid ${isActive ? "#7C3AED" : "transparent"}`, transition: "all 0.15s" }}>
                <Icon size={13} />{tab.label}
              </button>
            );
          })}
        </div>

        <div style={{ padding: "20px 26px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
            {MOODS.map(m => (
              <button key={m.id} onClick={() => setMood(m.id)} style={{ flex: 1, padding: "9px 6px", borderRadius: "12px", border: `1.5px solid ${mood === m.id ? "#7C3AED" : "#E0E5F2"}`, backgroundColor: mood === m.id ? "#F5F3FF" : "#FAFBFF", cursor: "pointer", transition: "all 0.18s", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                <span style={{ fontSize: "20px" }}>{m.emoji}</span>
                <span style={{ fontSize: "10px", fontWeight: 700, color: mood === m.id ? "#7C3AED" : "#9EABC0" }}>{m.label}</span>
              </button>
            ))}
          </div>

          {composeTab === "write" && (submitted ? (
            <div style={{ padding: "18px", borderRadius: "14px", backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", gap: "12px" }}>
              <CheckCircle2 size={20} style={{ color: "#16A34A", flexShrink: 0 }} />
              <div>
                <p style={{ margin: "0 0 2px", fontSize: "14px", fontWeight: 700, color: "#15803D" }}>Entry saved.</p>
                <p style={{ margin: 0, fontSize: "12px", color: "#16A34A" }}>Waypoint is tracking this moment. Your growth pattern is updating.</p>
              </div>
            </div>
          ) : (
            <>
              <textarea value={entry} onChange={e => setEntry(e.target.value)} placeholder="Write freely — no one is grading this..." style={{ width: "100%", minHeight: "100px", padding: "14px 16px", borderRadius: "12px", border: "1.5px solid #E0E5F2", fontSize: "14px", color: "#2B3674", fontFamily: "'DM Sans', sans-serif", resize: "vertical", outline: "none", lineHeight: 1.7, boxSizing: "border-box", backgroundColor: "#FAFBFF", transition: "border-color 0.15s" }} onFocus={e => e.currentTarget.style.borderColor = "#7C3AED"} onBlur={e => e.currentTarget.style.borderColor = "#E0E5F2"} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px" }}>
                <button style={{ padding: "7px 12px", borderRadius: "8px", border: "1px solid #E0E5F2", backgroundColor: "transparent", color: "#5A6A8A", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}><Hash size={12} />Tag</button>
                <button onClick={() => { if (entry.trim() && mood) setSubmitted(true); }} style={{ padding: "11px 22px", borderRadius: "12px", border: "none", backgroundColor: entry.trim() && mood ? "#7C3AED" : "#E0E5F2", color: entry.trim() && mood ? "#FFFFFF" : "#9EABC0", fontSize: "13px", fontWeight: 700, cursor: entry.trim() && mood ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: "7px", transition: "all 0.2s", boxShadow: entry.trim() && mood ? "0 4px 14px rgba(124,58,237,0.35)" : "none" }}>
                  <Send size={13} />Save entry
                </button>
              </div>
            </>
          ))}

          {composeTab === "voice" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "24px 0" }}>
              <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "#F5F3FF", border: "3px solid #7C3AED", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 0 0 8px rgba(124,58,237,0.08)" }}>
                <Mic size={28} style={{ color: "#7C3AED" }} />
              </div>
              <p style={{ margin: 0, fontSize: "13px", color: "#5A6A8A", textAlign: "center" }}>Tap to record a voice note.<br />Transcribed and linked to this reflection.</p>
              <p style={{ margin: 0, fontSize: "11px", color: "#9EABC0" }}>Max 5 min · Stored securely</p>
            </div>
          )}

          {composeTab === "attach" && (
            <div style={{ border: "2px dashed #E0E5F2", borderRadius: "14px", padding: "32px 20px", textAlign: "center", cursor: "pointer", backgroundColor: "#FAFBFF", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#7C3AED"; e.currentTarget.style.backgroundColor = "#F5F3FF"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#E0E5F2"; e.currentTarget.style.backgroundColor = "#FAFBFF"; }}>
              <Image size={28} style={{ color: "#9EABC0", margin: "0 auto 10px" }} />
              <p style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 600, color: "#2B3674" }}>Drop an image or screenshot</p>
              <p style={{ margin: 0, fontSize: "12px", color: "#9EABC0" }}>Whiteboard, job posting, anything that sparked a thought</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Featured banner entries ───────────────────────────────────── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A6A8A" }}>Featured Reflections</p>
          <span style={{ fontSize: "12px", color: "#7C3AED", fontWeight: 600, cursor: "pointer" }}>View all →</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {BANNER_ENTRIES.map((je, idx) => {
            const theme = BANNER_THEMES[idx % BANNER_THEMES.length];
            const hasReacted = reactedEntries.has(je.id);
            return (
              <div key={je.id} style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.14)", border: "1px solid rgba(0,0,0,0.06)" }}>
                {/* Cinematic banner */}
                <div style={{ position: "relative", padding: "26px 28px 22px", background: theme.gradient, minHeight: "210px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  {/* Top row: mood + scenario + media badges */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "32px", lineHeight: 1 }}>{je.moodEmoji}</span>
                      <div>
                        {je.scenario && (
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "3px 10px", borderRadius: "999px", backgroundColor: "rgba(255,255,255,0.14)", backdropFilter: "blur(10px)", marginBottom: "5px" }}>
                            <Link2 size={9} style={{ color: "rgba(255,255,255,0.75)" }} />
                            <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.88)", letterSpacing: "0.04em" }}>{je.scenario}</span>
                          </div>
                        )}
                        <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>{je.date} · {je.time}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {je.hasVoice && (
                        <div style={{ padding: "4px 9px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", gap: "4px" }}>
                          <Mic size={9} style={{ color: "rgba(255,255,255,0.8)" }} />
                          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>Voice</span>
                        </div>
                      )}
                      {je.hasImage && (
                        <div style={{ padding: "4px 9px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", gap: "4px" }}>
                          <Image size={9} style={{ color: "rgba(255,255,255,0.8)" }} />
                          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>Image</span>
                        </div>
                      )}
                      <div style={{ padding: "4px 9px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
                        <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.8)", fontWeight: 700 }}>Post-sim</span>
                      </div>
                    </div>
                  </div>

                  {/* Entry body */}
                  <div style={{ position: "relative", zIndex: 1, marginTop: "18px" }}>
                    {je.prompt && (
                      <p style={{ margin: "0 0 8px", fontSize: "11px", fontWeight: 600, color: theme.accentColor, letterSpacing: "0.03em" }}>"{je.prompt}"</p>
                    )}
                    <p style={{ margin: 0, fontSize: "15px", fontWeight: 500, color: "rgba(255,255,255,0.92)", lineHeight: 1.65 }}>{je.excerpt}</p>
                  </div>

                  {/* Bottom: tags + growth delta */}
                  <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "22px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {je.tags.map(t => (
                        <span key={t} style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)" }}>{t}</span>
                      ))}
                    </div>
                    {je.growth && (
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: "4px 12px", borderRadius: "999px", backgroundColor: "rgba(16,185,129,0.22)", border: "1px solid rgba(16,185,129,0.35)" }}>
                        <TrendingUp size={10} style={{ color: "#6EE7B7" }} />
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#6EE7B7" }}>{je.growth.skill} {je.growth.delta}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Below banner: Waypoint reaction + actions */}
                <div style={{ backgroundColor: "#FFFFFF", padding: "18px 26px 20px" }}>
                  {je.aiReaction && (
                    <div style={{ display: "flex", gap: "12px", marginBottom: "16px", padding: "14px 16px", borderRadius: "14px", backgroundColor: "#FAFBFF", border: "1px solid #E0E5F2" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, #4318FF, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Sparkles size={12} style={{ color: "#FFFFFF" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: "0 0 4px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#4318FF" }}>Waypoint noticed</p>
                        <p style={{ margin: 0, fontSize: "13px", color: "#2B3674", lineHeight: 1.6 }}>{je.aiReaction}</p>
                      </div>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => toggleReact(je.id)} style={{ padding: "7px 14px", borderRadius: "9px", border: `1px solid ${hasReacted ? "#16A34A" : "#E0E5F2"}`, backgroundColor: hasReacted ? "#F0FDF4" : "transparent", color: hasReacted ? "#16A34A" : "#5A6A8A", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", transition: "all 0.15s" }}>
                      <ThumbsUp size={12} />{hasReacted ? "Resonated" : "This resonates"}
                    </button>
                    <button style={{ padding: "7px 14px", borderRadius: "9px", border: "1px solid #E0E5F2", backgroundColor: "transparent", color: "#5A6A8A", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                      <RotateCcw size={12} />Re-reflect
                    </button>
                    {je.simulationId && (
                      <button style={{ padding: "7px 14px", borderRadius: "9px", border: "1px solid #E0E5F2", backgroundColor: "transparent", color: "#5A6A8A", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                        <Play size={11} />Replay sim
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Data → suggestions strip ─────────────────────────────────── */}
      <div style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", border: "1.5px solid #E0E5F2", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #F0F3FA", display: "flex", alignItems: "center", gap: "10px" }}>
          <BarChart2 size={14} style={{ color: "#4318FF" }} />
          <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4318FF" }}>Your data, your direction</p>
          <span style={{ fontSize: "11px", color: "#9EABC0" }}>— Patterns Waypoint found in your journal</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
          {JOURNAL_INSIGHTS.map((insight, idx) => (
            <div key={insight.id} style={{ padding: "20px 22px", borderRight: idx < JOURNAL_INSIGHTS.length - 1 ? "1px solid #F0F3FA" : "none", transition: "background-color 0.15s", cursor: "default" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = insight.bg} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <span style={{ fontSize: "20px" }}>{insight.icon}</span>
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#9EABC0" }}>Pattern</span>
              </div>
              <p style={{ margin: "0 0 5px", fontSize: "12px", fontWeight: 700, color: "#2B3674", lineHeight: 1.5 }}>{insight.pattern}</p>
              <p style={{ margin: "0 0 14px", fontSize: "12px", color: "#5A6A8A", lineHeight: 1.55 }}>{insight.signal}</p>
              <button style={{ padding: "6px 12px", borderRadius: "8px", border: `1px solid ${insight.color}25`, backgroundColor: insight.bg, color: insight.color, fontSize: "11px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                <ArrowRight size={10} />{insight.suggestion}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Free reflections ─────────────────────────────────────────── */}
      {FREE_ENTRIES.length > 0 && (
        <div>
          <p style={{ margin: "0 0 14px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A6A8A" }}>Free Reflections</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {FREE_ENTRIES.map(je => (
              <div key={je.id} style={{ borderRadius: "16px", backgroundColor: "#FFFFFF", border: "1.5px solid #E0E5F2", padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)", display: "flex", gap: "14px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: "#FAFBFF", border: "1px solid #E0E5F2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>{je.moodEmoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#2B3674" }}>{je.date}</span>
                    <span style={{ fontSize: "11px", color: "#9EABC0" }}>{je.time}</span>
                    <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", backgroundColor: "#FAFBFF", color: "#9EABC0", border: "1px solid #E0E5F2" }}>Free reflection</span>
                    {je.hasImage && <div style={{ padding: "2px 7px", borderRadius: "6px", backgroundColor: "#F5F3FF", display: "flex", alignItems: "center", gap: "3px" }}><Image size={9} style={{ color: "#7C3AED" }} /><span style={{ fontSize: "10px", color: "#7C3AED", fontWeight: 600 }}>Image</span></div>}
                  </div>
                  <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#2B3674", lineHeight: 1.6 }}>{je.excerpt}</p>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {je.tags.map(t => (
                      <span key={t} style={{ fontSize: "11px", fontWeight: 700, padding: "2px 9px", borderRadius: "999px", backgroundColor: "#F5F3FF", color: "#7C3AED" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Connection Hub view ───────────────────────────────────────────────────────
const RICH_AI_ADVISORS = [
  {
    id: "career-coach",
    name: "Alex",
    title: "Career Coach",
    role: "AI Career Advisor",
    specialty: ["Job Search", "Resume", "Interviews"],
    tagline: "I help you figure out what you want — and how to get it.",
    description: "Based on your profile, I'd suggest focusing on policy analysis roles. Your resilience scores are in the 87th percentile — that's rare. Would you like me to suggest workshops to strengthen your written brief skills?",
    gradient: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
    borderColor: "#F59E0B",
    iconBg: "#F59E0B",
    color: "#F59E0B",
    icon: Target,
    lastMessage: "You're in the top 12% for resilience. Want to talk next steps?",
    lastTime: "2h ago",
    unread: 1,
  },
  {
    id: "skill-mentor",
    name: "Maya",
    title: "Skill Mentor",
    role: "AI Learning Guide",
    specialty: ["Skill Gaps", "Learning Paths", "Practice"],
    tagline: "I turn your simulation data into a plan you can actually follow.",
    description: "Your fastest-growing superpower right now is Assertive Advocacy (+18 pts). Let's build on that. Want me to suggest a simulation that specifically targets holding your position under corporate pushback?",
    gradient: "linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)",
    borderColor: "#7C3AED",
    iconBg: "#4318FF",
    color: "#4318FF",
    icon: Brain,
    lastMessage: "Assertive Advocacy is your fastest-growing skill — keep going.",
    lastTime: "Yesterday",
    unread: 0,
  },
  {
    id: "wellness-guide",
    name: "Jordan",
    title: "Wellness Guide",
    role: "AI Well-being Support",
    specialty: ["Stress", "Confidence", "Motivation"],
    tagline: "What you feel during a scenario is data. Let's decode it.",
    description: "That tension you felt in the last simulation — not speaking up in time — is a signal, not a flaw. Let's talk about what makes that moment feel so high-stakes.",
    gradient: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)",
    borderColor: "#10B981",
    iconBg: "#10B981",
    color: "#10B981",
    icon: Heart,
    lastMessage: "The hesitation you felt was worth exploring. Ready when you are.",
    lastTime: "3d ago",
    unread: 0,
  },
];

const EVENTS = [
  { id: 1, title: "Resume Teardown Office Hours", host: "Alex · Career Coach", date: "Thu Mar 21", time: "12:00 PM EST", spots: 4 },
  { id: 2, title: "Alumni Panel: Non-traditional Paths", host: "Marcus Chen + 3 others", date: "Fri Mar 22", time: "3:00 PM EST", spots: 12 },
];

const HubView: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const send = () => {
    if (!chatInput.trim() || !activeChat) return;
    const advisor = RICH_AI_ADVISORS.find(a => a.id === activeChat)!;
    const newMsg = { role: "user", content: chatInput };
    setMessages(prev => [...prev, newMsg]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "advisor", content: advisor.description }]);
      setIsTyping(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }, 1400);
  };

  const openChat = (advisorId: string) => {
    setActiveChat(advisorId);
    setMessages([]);
    setChatInput("");
  };

  const selectedAdvisor = RICH_AI_ADVISORS.find(a => a.id === activeChat);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

      {/* Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <Users size={15} style={{ color: "#0EA5E9" }} />
          <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0EA5E9" }}>Connection Hub</p>
        </div>
        <h1 style={{ margin: "0 0 5px", fontSize: "28px", fontWeight: 700, color: "#2B3674", letterSpacing: "-0.02em" }}>You don't have to figure this out alone.</h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#5A6A8A" }}>AI advisors available 24/7 · Alumni who've been exactly where you are.</p>
      </div>

      {/* AI Advisors */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A6A8A" }}>Your AI Advisors</p>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10B981" }} />
            <span style={{ fontSize: "11px", color: "#10B981", fontWeight: 600 }}>All online</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
          {RICH_AI_ADVISORS.map(advisor => {
            const Icon = advisor.icon;
            const isActive = activeChat === advisor.id;
            return (
              <button key={advisor.id} onClick={() => openChat(advisor.id)} style={{ padding: "0", borderRadius: "18px", border: `2px solid ${isActive ? advisor.borderColor : "#E0E5F2"}`, backgroundColor: "#FFFFFF", cursor: "pointer", textAlign: "left", transition: "all 0.22s", boxShadow: isActive ? `0 8px 28px ${advisor.color}22` : "0 2px 10px rgba(0,0,0,0.04)", overflow: "hidden", transform: isActive ? "translateY(-2px)" : "none" }}>
                {/* Gradient header band */}
                <div style={{ background: advisor.gradient, padding: "18px 18px 14px", position: "relative" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "14px", backgroundColor: advisor.iconBg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 12px ${advisor.color}35`, marginBottom: "10px" }}>
                    <Icon size={20} style={{ color: "#FFFFFF" }} />
                  </div>
                  <p style={{ margin: "0 0 1px", fontSize: "15px", fontWeight: 700, color: "#1E293B" }}>{advisor.name}</p>
                  <p style={{ margin: 0, fontSize: "11px", fontWeight: 600, color: "#475569" }}>{advisor.title}</p>
                  {advisor.unread > 0 && (
                    <div style={{ position: "absolute", top: "14px", right: "14px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "#FFFFFF" }}>{advisor.unread}</span>
                    </div>
                  )}
                </div>
                {/* Card body */}
                <div style={{ padding: "12px 18px 16px" }}>
                  <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#5A6A8A", lineHeight: 1.5, fontStyle: "italic" }}>"{advisor.tagline}"</p>
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "10px" }}>
                    {advisor.specialty.map(sp => (
                      <span key={sp} style={{ fontSize: "10px", fontWeight: 700, padding: "2px 7px", borderRadius: "999px", backgroundColor: "#F4F7FE", color: "#5A6A8A" }}>{sp}</span>
                    ))}
                  </div>
                  {/* Last message preview */}
                  <div style={{ padding: "8px 10px", borderRadius: "10px", backgroundColor: "#F8FAFC", border: "1px solid #E0E5F2" }}>
                    <p style={{ margin: "0 0 2px", fontSize: "11px", color: "#2B3674", lineHeight: 1.4, fontWeight: 500 }}>{advisor.lastMessage}</p>
                    <span style={{ fontSize: "10px", color: "#9EABC0" }}>{advisor.lastTime}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat panel */}
      {activeChat && selectedAdvisor && (
        <div style={{ borderRadius: "20px", backgroundColor: "#FFFFFF", border: "2px solid " + selectedAdvisor.borderColor + "40", boxShadow: `0 8px 32px ${selectedAdvisor.color}14`, overflow: "hidden" }}>
          {/* Chat header */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #F0F3FA", background: selectedAdvisor.gradient, display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "11px", backgroundColor: selectedAdvisor.iconBg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 3px 10px ${selectedAdvisor.color}30` }}>
              <selectedAdvisor.icon size={17} style={{ color: "#FFFFFF" }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#1E293B" }}>{selectedAdvisor.name} · {selectedAdvisor.title}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#10B981" }} />
                <p style={{ margin: 0, fontSize: "11px", color: "#475569" }}>Online now</p>
              </div>
            </div>
            <button onClick={() => setActiveChat(null)} style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.10)", backgroundColor: "rgba(255,255,255,0.6)", color: "#475569", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>Close</button>
          </div>

          {/* Messages */}
          <div style={{ padding: "16px 20px", minHeight: "140px", maxHeight: "240px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", backgroundColor: "#FAFBFF" }}>
            {messages.length === 0 && (
              <div style={{ textAlign: "center", paddingTop: "16px" }}>
                <p style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 600, color: "#2B3674" }}>Start the conversation</p>
                <p style={{ margin: 0, fontSize: "13px", color: "#9EABC0" }}>Ask about career paths, skill gaps, or how you're feeling about your progress.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: "8px", alignItems: "flex-end" }}>
                {m.role !== "user" && (
                  <div style={{ width: "26px", height: "26px", borderRadius: "8px", backgroundColor: selectedAdvisor.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <selectedAdvisor.icon size={12} style={{ color: "#FFFFFF" }} />
                  </div>
                )}
                <div style={{ maxWidth: "75%", padding: "11px 15px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", backgroundColor: m.role === "user" ? "#4318FF" : "#FFFFFF", color: m.role === "user" ? "#FFFFFF" : "#2B3674", fontSize: "13px", lineHeight: 1.6, boxShadow: m.role === "user" ? "0 2px 12px rgba(67,24,255,0.25)" : "0 2px 8px rgba(0,0,0,0.06)", border: m.role !== "user" ? "1px solid #E0E5F2" : "none" }}>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                <div style={{ width: "26px", height: "26px", borderRadius: "8px", backgroundColor: selectedAdvisor.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <selectedAdvisor.icon size={12} style={{ color: "#FFFFFF" }} />
                </div>
                <div style={{ display: "flex", gap: "5px", padding: "13px 16px", backgroundColor: "#FFFFFF", borderRadius: "16px 16px 16px 4px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #E0E5F2" }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#9EABC0", animation: `pulse 1.2s ${i * 0.22}s ease-in-out infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "14px 16px", borderTop: "1px solid #E0E5F2", display: "flex", gap: "10px", backgroundColor: "#FFFFFF" }}>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder={`Ask ${selectedAdvisor.name} anything...`} style={{ flex: 1, padding: "11px 16px", borderRadius: "12px", border: "1.5px solid #E0E5F2", fontSize: "13px", color: "#2B3674", fontFamily: "'DM Sans', sans-serif", outline: "none", backgroundColor: "#FAFBFF", transition: "border-color 0.15s" }} onFocus={(e) => { e.currentTarget.style.borderColor = selectedAdvisor.borderColor; }} onBlur={(e) => { e.currentTarget.style.borderColor = "#E0E5F2"; }} />
            <button onClick={send} style={{ padding: "11px 16px", borderRadius: "12px", border: "none", backgroundColor: "#4318FF", color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 10px rgba(67,24,255,0.30)", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Upcoming events */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A6A8A" }}>Upcoming sessions</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {EVENTS.map(ev => (
            <div key={ev.id} style={{ borderRadius: "14px", backgroundColor: "#FFFFFF", border: "1.5px solid #E0E5F2", padding: "14px 18px", display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Calendar size={18} style={{ color: "#4318FF" }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 2px", fontSize: "13px", fontWeight: 700, color: "#2B3674" }}>{ev.title}</p>
                <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#5A6A8A" }}>{ev.host}</p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <span style={{ fontSize: "11px", color: "#5A6A8A" }}>{ev.date} · {ev.time}</span>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: ev.spots <= 5 ? "#F59E0B" : "#10B981" }}>{ev.spots} spots left</span>
                </div>
              </div>
              <button style={{ padding: "8px 16px", borderRadius: "10px", border: "none", backgroundColor: "#EEF2FF", color: "#4318FF", fontSize: "12px", fontWeight: 700, cursor: "pointer", flexShrink: 0, transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#4318FF"; e.currentTarget.style.color = "#FFFFFF"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#EEF2FF"; e.currentTarget.style.color = "#4318FF"; }}>
                Reserve
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Alumni network */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <div>
            <p style={{ margin: "0 0 2px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A6A8A" }}>10k Coffees · Alumni network</p>
            <p style={{ margin: 0, fontSize: "12px", color: "#9EABC0" }}>One 15-min conversation can change where you end up.</p>
          </div>
          <span style={{ fontSize: "12px", color: "#4318FF", fontWeight: 600, cursor: "pointer" }}>View all →</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {ALUMNI.map(a => (
            <div key={a.id} style={{ borderRadius: "16px", backgroundColor: "#FFFFFF", border: "1.5px solid #E0E5F2", padding: "16px 18px", display: "flex", alignItems: "center", gap: "14px", transition: "all 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img src={a.avatar} alt={a.name} style={{ width: "48px", height: "48px", borderRadius: "14px", objectFit: "cover" }} />
                {a.available && (
                  <div style={{ position: "absolute", bottom: "2px", right: "2px", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#10B981", border: "2px solid #FFFFFF" }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: "0 0 2px", fontSize: "14px", fontWeight: 700, color: "#2B3674" }}>{a.name}</p>
                <p style={{ margin: "0 0 6px", fontSize: "12px", color: "#5A6A8A" }}>{a.role}</p>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 7px", borderRadius: "999px", backgroundColor: "#F4F7FE", color: "#5A6A8A" }}>{a.field}</span>
                  <span style={{ fontSize: "10px", color: "#9EABC0" }}>{a.graduated}</span>
                </div>
              </div>
              <button style={{ padding: "9px 16px", borderRadius: "11px", border: "none", backgroundColor: a.available ? "#EEF2FF" : "#F4F7FE", color: a.available ? "#4318FF" : "#9EABC0", fontSize: "12px", fontWeight: 700, cursor: a.available ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: "6px", flexShrink: 0, transition: "all 0.2s" }} onMouseEnter={(e) => { if (a.available) { e.currentTarget.style.backgroundColor = "#4318FF"; e.currentTarget.style.color = "#FFFFFF"; }}} onMouseLeave={(e) => { if (a.available) { e.currentTarget.style.backgroundColor = "#EEF2FF"; e.currentTarget.style.color = "#4318FF"; }}}>
                <Coffee size={13} />{a.available ? "Book a coffee" : "Unavailable"}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const WaypointLanding: React.FC<WaypointLandingProps> = ({ onJoinCall }) => {
  const [activeView, setActiveView] = useState<ActiveView>("home");
  const [hoveredAction, setHoveredAction] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "linear-gradient(145deg, #FFFFFF 0%, #F4F7FE 50%, #EEF2FF 100%)", fontFamily: "'DM Sans', sans-serif", display: "flex", position: "relative", overflow: "hidden" }}>
      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: "-80px", right: "20%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(67,24,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-60px", left: "30%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* LEFT SIDEBAR */}
      <aside style={{ width: "220px", height: "100vh", padding: "28px 20px", display: "flex", flexDirection: "column", borderRight: "1px solid #E0E5F2", backgroundColor: "#FFFFFF", flexShrink: 0, position: "relative", zIndex: 10 }}>
        <div style={{ marginBottom: "40px", paddingLeft: "4px" }}>
          <img src="/waypoint.png" alt="Waypoint" style={{ height: "56px", width: "auto" }} />
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => setActiveView(item.id)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "10px", border: "none", backgroundColor: isActive ? "#EEF2FF" : "transparent", color: isActive ? "#4318FF" : "#5A6A8A", fontSize: "14px", fontWeight: isActive ? 700 : 500, cursor: "pointer", transition: "all 0.15s", textAlign: "left", width: "100%" }} onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = "#F4F7FE"; e.currentTarget.style.color = "#2B3674"; }}} onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#5A6A8A"; }}}>
                <Icon size={16} />{item.label}
              </button>
            );
          })}
        </nav>
        <div style={{ paddingTop: "20px", borderTop: "1px solid #E0E5F2", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #C7D2FE, #E9D5FF)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px", color: "#4318FF", flexShrink: 0 }}>A</div>
          <div>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#2B3674" }}>Aiyana</p>
            <p style={{ margin: "1px 0 0", fontSize: "11px", color: "#5A6A8A" }}>1st year</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "36px 40px", overflowY: "auto", position: "relative", zIndex: 5 }}>
        {activeView === "home" && <HomeView onJoinCall={onJoinCall} setView={setActiveView} />}
        {activeView === "lab" && <LabView onJoinCall={onJoinCall} />}
        {activeView === "journal" && <JournalView />}
        {activeView === "hub" && <HubView />}
      </main>

      {/* RIGHT SIDEBAR */}
      <aside style={{ width: "300px", height: "100vh", padding: "32px 24px", overflowY: "auto", borderLeft: "1px solid #E0E5F2", backgroundColor: "#FFFFFF", flexShrink: 0, position: "relative", zIndex: 5 }}>

        {/* Action Items — hidden on journal view */}
        {activeView !== "journal" && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10B981", flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2B3674" }}>Action Items</p>
            </div>
            <div style={{ position: "relative", paddingLeft: "28px" }}>
              <div style={{ position: "absolute", left: "9px", top: "12px", width: "2px", height: "calc(100% - 24px)", backgroundColor: "#E0E5F2", borderRadius: "2px" }} />
              <div style={{ position: "absolute", left: "9px", top: "12px", width: "2px", height: `${(UNLOCKED_OUTCOMES.filter(o => o.completed).length / UNLOCKED_OUTCOMES.length) * 100}%`, backgroundColor: "#4318FF", borderRadius: "2px", transition: "height 0.5s ease" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {UNLOCKED_OUTCOMES.map((outcome, idx) => {
                  const isHov = hoveredAction === idx;
                  return (
                    <div key={outcome.id} style={{ position: "relative" }}>
                      <div style={{ position: "absolute", left: "-24px", top: "16px", width: "16px", height: "16px", borderRadius: "50%", backgroundColor: outcome.completed ? "#4318FF" : "#FFFFFF", border: `2px solid ${outcome.completed ? "#4318FF" : "#E0E5F2"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: "#FFFFFF", fontWeight: 700, zIndex: 2 }}>
                        {outcome.completed ? "✓" : ""}
                      </div>
                      <div onMouseEnter={() => setHoveredAction(idx)} onMouseLeave={() => setHoveredAction(null)} style={{ borderRadius: "14px", border: `1.5px solid ${isHov ? outcome.accentColor + "40" : "#E0E5F2"}`, backgroundColor: isHov ? outcome.accentLight : "#FFFFFF", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", transition: "all 0.2s", boxShadow: isHov ? `0 4px 16px ${outcome.accentColor}20` : "none", cursor: "pointer" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: outcome.accentColor, marginTop: "5px", flexShrink: 0 }} />
                          <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#2B3674", lineHeight: 1.4, flex: 1 }}>{outcome.title}</p>
                        </div>
                        <button onClick={() => setActiveView(outcome.view)} style={{ padding: "8px 14px", borderRadius: "8px", border: "none", backgroundColor: outcome.accentColor, color: "#FFFFFF", fontSize: "12px", fontWeight: 700, cursor: "pointer", alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "5px", boxShadow: `0 2px 8px ${outcome.accentColor}30`, transition: "all 0.15s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 4px 12px ${outcome.accentColor}50`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 2px 8px ${outcome.accentColor}30`; }}>
                          {outcome.cta}<ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Superpowers */}
        <div style={{ marginTop: activeView === "journal" ? "0" : "32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2B3674" }}>Your Superpowers</p>
            <span style={{ fontSize: "11px", color: "#5A6A8A" }}>Top 12% cohort</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {SUPERPOWERS.map((sp) => (
              <div key={sp.name} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#FFFFFF", backgroundColor: sp.color, padding: "1px 7px", borderRadius: "999px" }}>{sp.stage}</span>
                    <p style={{ margin: 0, fontSize: "12px", fontWeight: 600, color: "#2B3674" }}>{sp.name}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#10B981" }}>{sp.delta}</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#5A6A8A" }}>{sp.level}%</span>
                  </div>
                </div>
                <div style={{ height: "4px", backgroundColor: "#F4F7FE", borderRadius: "999px", overflow: "hidden" }}>
                  <div style={{ width: `${sp.level}%`, height: "100%", backgroundColor: sp.color, borderRadius: "999px", opacity: 0.85 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "16px", padding: "12px 14px", borderRadius: "12px", backgroundColor: "#F4F7FE", border: "1px solid #E0E5F2", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10B981", flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: "12px", color: "#5A6A8A", lineHeight: 1.4 }}>
              <span style={{ fontWeight: 700, color: "#2B3674" }}>Resilience</span> is your strongest signal — employers are noticing.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default WaypointLanding;
