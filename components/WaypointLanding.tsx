import React, { useState } from "react";
import {
  Play, Briefcase, BookOpen, PenLine, ArrowRight, Sparkles,
  Users, Palette, BookMarked, ChevronRight, Send, Zap,
  Clock, MapPin, CheckCircle2, Target, Brain, Heart,
  Coffee, MessageCircle, Star, Trophy,
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
    scenario: "Crisis at the Nonprofit",
    excerpt: "I noticed I softened my argument when pushed back on. Next time I want to hold my position more clearly and explain the data behind my thinking...",
    mood: "reflective",
    tags: ["Assertiveness", "Resilience"],
  },
  {
    id: 2,
    date: "Mar 14",
    scenario: "Tech Startup Decision",
    excerpt: "The moment I realised the majority opinion was wrong — but I didn't speak up until it was too late. That's the gap I'm working on.",
    mood: "motivated",
    tags: ["Critical Thinking", "Advocacy"],
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
const LabView: React.FC<{ onJoinCall: () => void }> = ({ onJoinCall }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div>
        <h1 style={{ margin: "0 0 4px", fontSize: "28px", fontWeight: 700, color: "#2B3674", letterSpacing: "-0.02em" }}>Simulation Lab</h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#5A6A8A" }}>Practice real-world scenarios. Build superpowers employers notice.</p>
      </div>

      {/* Active sim */}
      <div>
        <p style={s.sectionTitle}>Continue where you left off</p>
        <div style={{ borderRadius: "20px", backgroundColor: "#152D5E", backgroundImage: ["radial-gradient(circle at 80% 20%, rgba(140,130,255,0.25) 0%, transparent 40%)", "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)"].join(", "), backgroundSize: "auto, 28px 28px, 28px 28px", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", boxShadow: "0 12px 40px rgba(21,45,94,0.30)" }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>Active Scenario</span>
            <h3 style={{ margin: "6px 0 4px", fontSize: "22px", fontWeight: 700, color: "#FFFFFF" }}>Crisis at the Nonprofit</h3>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
              {["Assertive Advocacy", "Crisis Response", "Critical Reading"].map(s => (
                <span key={s} style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "999px", backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px", flexShrink: 0 }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: "0 0 2px", fontSize: "28px", fontWeight: 700, color: "#FFFFFF" }}>42%</p>
              <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>complete</p>
            </div>
            <button onClick={onJoinCall} style={{ padding: "11px 22px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #4318FF, #7C3AED)", color: "#FFFFFF", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 16px rgba(67,24,255,0.50)", transition: "all 0.2s", whiteSpace: "nowrap" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
              <Play size={14} />Resume
            </button>
          </div>
        </div>
      </div>

      {/* Available sims */}
      <div>
        <p style={s.sectionTitle}>Available simulations</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {SIMULATIONS.filter(s => s.id !== "active").map((sim) => {
            const isHov = hovered === sim.id;
            return (
              <div key={sim.id} onMouseEnter={() => setHovered(sim.id)} onMouseLeave={() => setHovered(null)} style={{ ...s.card, padding: "22px", display: "flex", flexDirection: "column", gap: "14px", transition: "all 0.2s", border: `1.5px solid ${isHov ? sim.accent + "50" : "#E0E5F2"}`, boxShadow: isHov ? `0 8px 24px ${sim.accent}18` : "0 2px 8px rgba(0,0,0,0.04)", transform: isHov ? "translateY(-2px)" : "none" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                  <div>
                    <p style={{ margin: "0 0 5px", fontSize: "15px", fontWeight: 700, color: "#2B3674" }}>{sim.title}</p>
                    <p style={{ margin: 0, fontSize: "12px", color: "#5A6A8A" }}>by {sim.provider}</p>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "999px", backgroundColor: sim.status === "open" ? "#ECFDF5" : "#FEF2F2", color: sim.status === "open" ? "#059669" : "#DC2626", flexShrink: 0, border: `1px solid ${sim.status === "open" ? "#D1FAE5" : "#FECACA"}` }}>{sim.status === "open" ? "Open" : "Full"}</span>
                </div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {sim.skills.map(sk => (
                    <span key={sk} style={{ fontSize: "11px", fontWeight: 600, padding: "3px 9px", borderRadius: "999px", backgroundColor: "#F4F7FE", color: "#5A6A8A" }}>{sk}</span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#5A6A8A", fontSize: "12px" }}>
                    <Clock size={13} />{sim.duration}
                  </div>
                  <button onClick={sim.status === "open" ? onJoinCall : undefined} disabled={sim.status !== "open"} style={{ padding: "8px 16px", borderRadius: "10px", border: "none", backgroundColor: sim.status === "open" ? sim.accent : "#E0E5F2", color: sim.status === "open" ? "#FFFFFF" : "#9EABC0", fontSize: "12px", fontWeight: 700, cursor: sim.status === "open" ? "pointer" : "not-allowed", transition: "all 0.2s" }}>
                    {sim.status === "open" ? "Start" : "Full"}
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
const JournalView: React.FC = () => {
  const [entry, setEntry] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mood, setMood] = useState<string | null>(null);

  const MOODS = [
    { id: "great", label: "Energised", emoji: "⚡" },
    { id: "good", label: "Focused", emoji: "🎯" },
    { id: "okay", label: "Reflective", emoji: "🌊" },
    { id: "tough", label: "Challenged", emoji: "🔥" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div>
        <h1 style={{ margin: "0 0 4px", fontSize: "28px", fontWeight: 700, color: "#2B3674", letterSpacing: "-0.02em" }}>My Journal</h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#5A6A8A" }}>Capture what you noticed. Reflection is how superpowers become permanent.</p>
      </div>

      {/* Today's prompt */}
      <div style={{ ...s.card, padding: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <Sparkles size={15} style={{ color: "#4318FF" }} />
          <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4318FF" }}>Today's prompt</p>
        </div>
        <p style={{ margin: "0 0 20px", fontSize: "17px", fontWeight: 600, color: "#2B3674", lineHeight: 1.5 }}>
          "In your last scenario, when did you feel most uncertain — and what did you do with that feeling?"
        </p>

        {/* Mood check */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
          {MOODS.map(m => (
            <button key={m.id} onClick={() => setMood(m.id)} style={{ flex: 1, padding: "10px 8px", borderRadius: "12px", border: `1.5px solid ${mood === m.id ? "#4318FF" : "#E0E5F2"}`, backgroundColor: mood === m.id ? "#EEF2FF" : "#FFFFFF", cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: "18px" }}>{m.emoji}</span>
              <span style={{ fontSize: "11px", fontWeight: 700, color: mood === m.id ? "#4318FF" : "#5A6A8A" }}>{m.label}</span>
            </button>
          ))}
        </div>

        {submitted ? (
          <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "#ECFDF5", border: "1px solid #D1FAE5", display: "flex", alignItems: "center", gap: "10px" }}>
            <CheckCircle2 size={18} style={{ color: "#059669", flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#059669" }}>Entry saved — your growth pattern is being tracked.</p>
          </div>
        ) : (
          <>
            <textarea value={entry} onChange={e => setEntry(e.target.value)} placeholder="Write freely — this is just for you..." style={{ width: "100%", minHeight: "100px", padding: "14px 16px", borderRadius: "12px", border: "1.5px solid #E0E5F2", fontSize: "14px", color: "#2B3674", fontFamily: "'DM Sans', sans-serif", resize: "vertical", outline: "none", lineHeight: 1.6, boxSizing: "border-box", backgroundColor: "#FAFBFF" }} onFocus={(e) => { e.currentTarget.style.borderColor = "#4318FF"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "#E0E5F2"; }} />
            <button onClick={() => { if (entry.trim()) setSubmitted(true); }} style={{ marginTop: "12px", padding: "12px 20px", borderRadius: "12px", border: "none", backgroundColor: entry.trim() ? "#4318FF" : "#E0E5F2", color: entry.trim() ? "#FFFFFF" : "#9EABC0", fontSize: "13px", fontWeight: 700, cursor: entry.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: "6px", transition: "all 0.2s" }}>
              <Send size={13} />Save entry
            </button>
          </>
        )}
      </div>

      {/* Past entries */}
      <div>
        <p style={s.sectionTitle}>Past reflections</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {JOURNAL_ENTRIES.map(je => (
            <div key={je.id} style={{ ...s.card, padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#5A6A8A" }}>{je.date}</span>
                  <span style={{ fontSize: "11px", color: "#5A6A8A", padding: "2px 8px", borderRadius: "999px", border: "1px solid #E0E5F2" }}>{je.scenario}</span>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  {je.tags.map(t => (
                    <span key={t} style={{ fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", backgroundColor: "#EEF2FF", color: "#4318FF" }}>{t}</span>
                  ))}
                </div>
              </div>
              <p style={{ margin: 0, fontSize: "13px", color: "#2B3674", lineHeight: 1.6 }}>{je.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Connection Hub view ───────────────────────────────────────────────────────
const HubView: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const RESPONSES: Record<string, string> = {
    "career-coach": "Based on your profile, I'd suggest focusing on policy analysis roles. Your resilience scores are in the 87th percentile — that's rare. Would you like me to suggest workshops to strengthen your written brief skills?",
    "skill-mentor": "Your fastest-growing superpower right now is Assertive Advocacy (+18 pts). Let's build on that. Want me to suggest a simulation that specifically targets holding your position under corporate pushback?",
    "wellness-guide": "It sounds like you're working really hard. That tension you felt in the last simulation — not speaking up in time — is a signal, not a flaw. Let's talk about what makes that moment feel so high-stakes.",
  };

  const send = () => {
    if (!chatInput.trim() || !activeChat) return;
    const newMsg = { role: "user", content: chatInput };
    setMessages(prev => [...prev, newMsg]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "advisor", content: RESPONSES[activeChat] || "Thanks for sharing that. Let me think about the best path forward for you." }]);
      setIsTyping(false);
    }, 1400);
  };

  const selectedAdvisor = AI_ADVISORS.find(a => a.id === activeChat);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div>
        <h1 style={{ margin: "0 0 4px", fontSize: "28px", fontWeight: 700, color: "#2B3674", letterSpacing: "-0.02em" }}>Connection Hub</h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#5A6A8A" }}>Talk to your AI advisors or reach out to alumni in your field.</p>
      </div>

      {/* AI Advisors */}
      <div>
        <p style={s.sectionTitle}>AI Advisors · Always available</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: activeChat ? "24px" : 0 }}>
          {AI_ADVISORS.map(a => {
            const Icon = a.icon;
            const isActive = activeChat === a.id;
            return (
              <button key={a.id} onClick={() => { setActiveChat(a.id); setMessages([]); }} style={{ padding: "18px", borderRadius: "14px", border: `1.5px solid ${isActive ? a.color + "60" : "#E0E5F2"}`, backgroundColor: isActive ? a.color + "0D" : "#FFFFFF", cursor: "pointer", textAlign: "left", transition: "all 0.2s", boxShadow: isActive ? `0 4px 16px ${a.color}20` : "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: a.color + "18", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                  <Icon size={18} style={{ color: a.color }} />
                </div>
                <p style={{ margin: "0 0 2px", fontSize: "13px", fontWeight: 700, color: "#2B3674" }}>{a.name}</p>
                <p style={{ margin: "0 0 6px", fontSize: "11px", color: "#5A6A8A" }}>{a.role}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10B981" }} />
                  <span style={{ fontSize: "11px", color: "#10B981", fontWeight: 600 }}>Online</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Chat panel */}
        {activeChat && selectedAdvisor && (
          <div style={{ ...s.card, overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #E0E5F2", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "9px", backgroundColor: selectedAdvisor.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <selectedAdvisor.icon size={15} style={{ color: selectedAdvisor.color }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#2B3674" }}>{selectedAdvisor.name}</p>
                <p style={{ margin: 0, fontSize: "11px", color: "#5A6A8A" }}>{selectedAdvisor.description}</p>
              </div>
            </div>
            <div style={{ padding: "16px 20px", minHeight: "120px", maxHeight: "200px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
              {messages.length === 0 && (
                <p style={{ margin: 0, fontSize: "13px", color: "#5A6A8A", fontStyle: "italic" }}>Start by asking anything — career questions, skill gaps, how you're feeling about where you're headed.</p>
              )}
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "80%", padding: "10px 14px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", backgroundColor: m.role === "user" ? "#4318FF" : "#F4F7FE", color: m.role === "user" ? "#FFFFFF" : "#2B3674", fontSize: "13px", lineHeight: 1.5 }}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ display: "flex", gap: "4px", padding: "10px 14px", backgroundColor: "#F4F7FE", borderRadius: "14px 14px 14px 4px", width: "fit-content" }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#5A6A8A", animation: `pulse 1.2s ${i * 0.2}s infinite` }} />)}
                </div>
              )}
            </div>
            <div style={{ padding: "12px 16px", borderTop: "1px solid #E0E5F2", display: "flex", gap: "10px" }}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask anything..." style={{ flex: 1, padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #E0E5F2", fontSize: "13px", color: "#2B3674", fontFamily: "'DM Sans', sans-serif", outline: "none", backgroundColor: "#FAFBFF" }} onFocus={(e) => { e.currentTarget.style.borderColor = "#4318FF"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "#E0E5F2"; }} />
              <button onClick={send} style={{ padding: "10px 16px", borderRadius: "10px", border: "none", backgroundColor: "#4318FF", color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Send size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Alumni network */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <p style={{ ...s.sectionTitle, margin: 0 }}>Alumni · 10k Coffees</p>
          <span style={{ fontSize: "12px", color: "#4318FF", fontWeight: 600, cursor: "pointer" }}>View all →</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {ALUMNI.map(a => (
            <div key={a.id} style={{ ...s.card, padding: "16px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
              <img src={a.avatar} alt={a.name} style={{ width: "44px", height: "44px", borderRadius: "12px", objectFit: "cover", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: "0 0 2px", fontSize: "13px", fontWeight: 700, color: "#2B3674" }}>{a.name}</p>
                <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#5A6A8A" }}>{a.role}</p>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", color: "#5A6A8A" }}>{a.graduated} · {a.field}</span>
                </div>
              </div>
              <button style={{ padding: "8px 14px", borderRadius: "10px", border: "none", backgroundColor: a.available ? "#EEF2FF" : "#F4F7FE", color: a.available ? "#4318FF" : "#9EABC0", fontSize: "12px", fontWeight: 700, cursor: a.available ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: "5px", flexShrink: 0, transition: "all 0.2s" }} onMouseEnter={(e) => { if (a.available) { e.currentTarget.style.backgroundColor = "#4318FF"; e.currentTarget.style.color = "#FFFFFF"; }}} onMouseLeave={(e) => { if (a.available) { e.currentTarget.style.backgroundColor = "#EEF2FF"; e.currentTarget.style.color = "#4318FF"; }}}>
                <Coffee size={13} />{a.available ? "Request chat" : "Unavailable"}
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
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10B981", flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2B3674" }}>Action Items</p>
        </div>

        {/* Timeline */}
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

        {/* Superpowers */}
        <div style={{ marginTop: "32px" }}>
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
