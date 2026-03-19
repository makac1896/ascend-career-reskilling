import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import {
  CheckCircle2,
  ArrowRight,
  Mail,
  BookOpen,
  Link2,
  Clock,
  Check,
  Loader2,
  Upload,
  MapPin,
  RefreshCw,
  Database,
  Globe,
  FileBarChart,
  Briefcase,
  ChevronLeft,
} from "lucide-react";

interface AdvisorOnboardingProps {
  onComplete: () => void;
}

// ─── Data ──────────────────────────────────────────────────────────────────

const skillGapData = [
  { skill: "Resilience", demand: 81, coverage: 8 },
  { skill: "Assertive Advocacy", demand: 73, coverage: 12 },
  { skill: "Problem-Solving", demand: 68, coverage: 22 },
  { skill: "Cultural Awareness", demand: 64, coverage: 18 },
  { skill: "Critical Reading (AI)", demand: 55, coverage: 0 },
];

const scenarios = [
  {
    id: "nonprofit",
    title: "Indigenous Nonprofit Communications",
    description: "Team debates AI-generated community report",
    skills: ["Cultural Awareness", "Assertive Advocacy", "Critical Reading"],
    time: "5-7 minutes",
    badge: "Closes your top 3 gaps",
  },
  {
    id: "startup",
    title: "Tech Startup Decision",
    description: "Team debates product launch timing",
    skills: ["Problem-Solving", "Resilience", "Critical Reading"],
    time: "5-7 minutes",
    badge: null,
  },
  {
    id: "budget",
    title: "Budget Allocation Dilemma",
    description: "Students negotiate competing campus needs",
    skills: ["Assertive Advocacy", "Problem-Solving", "Resilience"],
    time: "6-8 minutes",
    badge: null,
  },
];

const rooms = [
  {
    id: "14b",
    name: "Room 14B",
    currentUse: "Career counseling office",
    currentUtilization: "12% utilization",
    currentNote: "Students rarely book appointments",
    suggestedUse: "Media Simulation Lab",
    forStudents: "Students who discover assertiveness gaps",
    practice: "Presenting analysis, stand-up meetings, advocating under pressure",
    costs: [
      { item: "Whiteboard walls", cost: "$200" },
      { item: "Circular seating rearrange", cost: "Free" },
      { item: "Recording setup (optional)", cost: "$200" },
    ],
    minCost: 200,
    maxCost: 400,
    projectedUtilization: "35% utilization",
    projectedStudents: "15–20 students/week",
  },
  {
    id: "22",
    name: "Room 22",
    currentUse: "Computer lab for resume workshops",
    currentUtilization: "8% utilization outside workshops",
    currentNote: "Empty most of the week",
    suggestedUse: "Decision Lab",
    forStudents: "Students who show critical reading strength",
    practice: "Complex decisions, incomplete data, trade-off analysis",
    costs: [
      { item: "Moveable furniture", cost: "$150" },
      { item: "Data visualization posters", cost: "$50" },
    ],
    minCost: 200,
    maxCost: 200,
    projectedUtilization: "+18% utilization",
    projectedStudents: "10–12 students/week",
  },
  {
    id: "commons",
    name: "The Commons",
    currentUse: "Informal student lounge",
    currentUtilization: "No structured programming",
    currentNote: "Students hang out, but no skill development",
    suggestedUse: "Dialogue Room",
    forStudents: "Students discovering resilience & cultural awareness",
    practice: "Drop-in peer feedback, cross-cultural practice, conflict navigation",
    costs: [
      { item: "Conversation norms signage", cost: "$100" },
      { item: "Circular seating zones", cost: "$100" },
    ],
    minCost: 200,
    maxCost: 200,
    projectedUtilization: "Structured use added",
    projectedStudents: "15–20 students/week",
  },
];

const resourceMappings = [
  {
    superpower: "Assertive Advocacy",
    detail: "they hesitate to state perspective",
    resource: '"Finding Your Voice" workshop — Wed 4pm',
    connection: "Recommended when students show strong insights but hold back",
  },
  {
    superpower: "Cultural Awareness",
    detail: "they see what AI misses",
    resource: '"Cultural Competency Seminar" — Fri 2pm',
    connection: "Recommended when students identify missing human context",
  },
  {
    superpower: "Critical Reading",
    detail: "they spot gaps in AI content",
    resource: '"Advanced Reading Seminar"',
    connection: "Recommended when students demonstrate analytical strength",
  },
  {
    superpower: "Resilience",
    detail: "they navigate disagreement",
    resource: '"Navigating Conflict" workshop',
    connection: "Recommended when students handle pushback well",
  },
];

const resourceEngagementData = [
  { name: "Finding Your Voice", current: 11, projected: 38 },
  { name: "Cultural Competency", current: 14, projected: 40 },
  { name: "Advanced Reading", current: 8, projected: 35 },
];

const superpowerColors = ["#4318FF", "#7551FF", "#39B8FF", "#05CD99", "#FFB547"];
const superpowerLegend = [
  "Cultural Awareness",
  "Critical Reading",
  "Assertive Advocacy",
  "Resilience",
  "Problem-Solving",
];

const loadingMessages = [
  "Reading your resources...",
  "Finding connections to student superpowers...",
  "Almost done...",
];

// ─── Sub-components ─────────────────────────────────────────────────────────

const ProgressIndicator: React.FC<{ completed: number }> = ({ completed }) => {
  const steps = ["Choose Scenario", "Map Resources", "Optimize Spaces"];
  return (
    <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
      {steps.map((label, i) => (
        <React.Fragment key={label}>
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full transition-all ${
                i < completed ? "bg-ascend-blue" : "bg-gray-200"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                i < completed ? "text-ascend-text" : "text-ascend-subtext"
              }`}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-6 h-0.5 ${
                i < completed ? "bg-ascend-blue" : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// ─── DropZone component ─────────────────────────────────────────────────────

type BoxId = "workshops" | "rooms" | "other";

interface DropZoneProps {
  boxId: BoxId;
  icon: React.ReactNode;
  label: string;
  helper: string;
  placeholder: string;
  optional?: boolean;
  items: string[];
  inputValue: string;
  isDragOver: boolean;
  onInputChange: (val: string) => void;
  onAddItem: (item: string) => void;
  onRemoveItem: (index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onChipDragStart: (index: number) => void;
  onChipDragEnd: () => void;
}

const DropZone: React.FC<DropZoneProps> = ({
  icon,
  label,
  helper,
  placeholder,
  optional,
  items,
  inputValue,
  isDragOver,
  onInputChange,
  onAddItem,
  onRemoveItem,
  onDragOver,
  onDragLeave,
  onDrop,
  onChipDragStart,
  onChipDragEnd,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      onAddItem(inputValue.trim().replace(/,$/, ""));
    }
  };

  return (
    <div className={`bg-white rounded-card shadow-crisp transition-all ${optional ? "opacity-80" : ""}`}>
      <div className="p-5 pb-4">
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <span className="font-bold text-ascend-text text-sm">{label}</span>
          {optional && (
            <span className="ml-auto text-xs text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">
              Optional
            </span>
          )}
        </div>

        {/* Drop zone */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`min-h-[90px] border-2 border-dashed rounded-xl p-3 transition-all duration-200 ${
            isDragOver
              ? "border-ascend-blue bg-indigo-50 scale-[1.01]"
              : "border-ascend-border bg-ascend-bg/40 hover:border-ascend-blue/40"
          }`}
        >
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-16 gap-1.5 pointer-events-none">
              <Upload className={`w-5 h-5 transition-colors ${isDragOver ? "text-ascend-blue" : "text-ascend-subtext"}`} />
              <p className={`text-xs text-center transition-colors ${isDragOver ? "text-ascend-blue font-medium" : "text-ascend-subtext"}`}>
                {isDragOver ? "Drop to add" : "Drag files or items here"}
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {items.map((item, i) => (
                <div
                  key={i}
                  draggable
                  onDragStart={() => onChipDragStart(i)}
                  onDragEnd={onChipDragEnd}
                  className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-ascend-blue text-xs font-medium px-3 py-1.5 rounded-full cursor-grab active:cursor-grabbing hover:bg-indigo-100 transition-colors select-none"
                >
                  <span className="opacity-40 text-[10px] leading-none">⠿</span>
                  <span>{item}</span>
                  <button
                    onClick={() => onRemoveItem(i)}
                    className="ml-0.5 w-3.5 h-3.5 flex items-center justify-center text-ascend-blue/50 hover:text-red-400 transition-colors rounded-full leading-none text-base"
                  >
                    ×
                  </button>
                </div>
              ))}
              {isDragOver && (
                <div className="flex items-center gap-1.5 bg-ascend-blue/10 border border-dashed border-ascend-blue text-ascend-blue text-xs font-medium px-3 py-1.5 rounded-full opacity-60">
                  + Drop here
                </div>
              )}
            </div>
          )}
        </div>

        {/* Text input row */}
        <div className="flex items-center gap-2 mt-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 border border-ascend-border rounded-xl px-3 py-2 text-xs text-ascend-text placeholder:text-ascend-subtext focus:outline-none focus:ring-2 focus:ring-ascend-blue/20"
          />
          <button
            onClick={() => {
              if (inputValue.trim()) onAddItem(inputValue.trim());
            }}
            className="px-3 py-2 text-xs font-bold bg-ascend-light-blue text-ascend-blue rounded-xl hover:bg-indigo-100 transition-colors whitespace-nowrap"
          >
            Add
          </button>
        </div>
        <p className="text-xs text-ascend-subtext mt-2">{helper}</p>
      </div>
    </div>
  );
};

// ─── NavRow sub-component ────────────────────────────────────────────────────

const NavRow: React.FC<{ onBack?: () => void; onSkip: () => void }> = ({ onBack, onSkip }) => (
  <div className="flex items-center justify-between mb-8">
    {onBack ? (
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-medium text-ascend-subtext hover:text-ascend-text transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back
      </button>
    ) : (
      <div />
    )}
    <button
      onClick={onSkip}
      className="text-xs text-ascend-subtext hover:text-ascend-text transition-colors underline underline-offset-2 decoration-ascend-border hover:decoration-ascend-subtext"
    >
      Skip to dashboard
    </button>
  </div>
);

// ─── Main Component ─────────────────────────────────────────────────────────

const AdvisorOnboarding: React.FC<AdvisorOnboardingProps> = ({ onComplete }) => {
  const [currentScreen, setCurrentScreen] = useState(1);

  // Screen 2
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  // Screen 3 — drag & drop
  const [items, setItems] = useState<Record<BoxId, string[]>>({
    workshops: [],
    rooms: [],
    other: [],
  });
  const [inputValues, setInputValues] = useState<Record<BoxId, string>>({
    workshops: "",
    rooms: "",
    other: "",
  });
  const [dragOverBox, setDragOverBox] = useState<BoxId | null>(null);
  const [draggingChip, setDraggingChip] = useState<{
    box: BoxId;
    index: number;
  } | null>(null);
  const [loadingStep, setLoadingStep] = useState<number | null>(null);
  const [showConnections, setShowConnections] = useState(false);

  // Screen 4
  const [selectedRooms, setSelectedRooms] = useState<Set<string>>(new Set());
  const [skipSpaces, setSkipSpaces] = useState(false);

  // Screen 5
  const [selectedDeployment, setSelectedDeployment] = useState<string | null>(null);
  const [sendingAnimation, setSendingAnimation] = useState(false);
  const [sent, setSent] = useState(false);

  // Screen 1 bar entrance animation
  const [barsVisible, setBarsVisible] = useState(false);
  React.useEffect(() => {
    if (currentScreen === 1) {
      setBarsVisible(false);
      const t = setTimeout(() => setBarsVisible(true), 80);
      return () => clearTimeout(t);
    }
  }, [currentScreen]);

  // Screen 3 handlers
  const addItem = (box: BoxId, value: string) => {
    if (!value.trim()) return;
    setItems((prev) => ({ ...prev, [box]: [...prev[box], value.trim()] }));
    setInputValues((prev) => ({ ...prev, [box]: "" }));
  };

  const removeItem = (box: BoxId, index: number) => {
    setItems((prev) => ({
      ...prev,
      [box]: prev[box].filter((_, i) => i !== index),
    }));
  };

  const handleBoxDragOver = (e: React.DragEvent, box: BoxId) => {
    e.preventDefault();
    setDragOverBox(box);
  };

  const handleBoxDragLeave = () => {
    setDragOverBox(null);
  };

  const handleBoxDrop = (e: React.DragEvent, targetBox: BoxId) => {
    e.preventDefault();
    setDragOverBox(null);

    if (draggingChip) {
      // Move chip from one box to another (or reorder within same box)
      const { box: sourceBox, index: sourceIndex } = draggingChip;
      if (sourceBox === targetBox) return;
      const item = items[sourceBox][sourceIndex];
      setItems((prev) => ({
        ...prev,
        [sourceBox]: prev[sourceBox].filter((_, i) => i !== sourceIndex),
        [targetBox]: [...prev[targetBox], item],
      }));
      setDraggingChip(null);
      return;
    }

    // File drop from OS
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setItems((prev) => ({
        ...prev,
        [targetBox]: [...prev[targetBox], ...files.map((f) => f.name)],
      }));
      return;
    }

    // Plain text drop (e.g. from another app)
    const text = e.dataTransfer.getData("text/plain");
    if (text.trim()) {
      const entries = text
        .split(/[\n,]+/)
        .map((t) => t.trim())
        .filter(Boolean);
      setItems((prev) => ({
        ...prev,
        [targetBox]: [...prev[targetBox], ...entries],
      }));
    }
  };

  const handleShowConnections = () => {
    setLoadingStep(0);
    setTimeout(() => setLoadingStep(1), 1200);
    setTimeout(() => setLoadingStep(2), 2400);
    setTimeout(() => {
      setLoadingStep(null);
      setShowConnections(true);
    }, 3400);
  };

  const handleSendToStudents = () => {
    setSendingAnimation(true);
    setTimeout(() => {
      setSendingAnimation(false);
      setSent(true);
      setTimeout(() => setCurrentScreen(6), 1500);
    }, 1000);
  };

  const toggleRoom = (id: string) => {
    setSelectedRooms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalMinCost = Array.from(selectedRooms).reduce((sum, id) => {
    return sum + (rooms.find((r) => r.id === id)?.minCost ?? 0);
  }, 0);
  const totalMaxCost = Array.from(selectedRooms).reduce((sum, id) => {
    return sum + (rooms.find((r) => r.id === id)?.maxCost ?? 0);
  }, 0);

  // ─── Screen 1 ─────────────────────────────────────────────────────────────
  if (currentScreen === 1) {
    const logoMarks = [
      { mark: "in", bg: "#0077B5", title: "LinkedIn Jobs API" },
      { mark: "LC", bg: "#FF6B2B", title: "Lightcast" },
      { mark: "BLS", bg: "#1B3A6B", title: "BLS Occupational Outlook", small: true },
      { mark: "W", bg: "#4318FF", title: "Waypoint Student Records" },
      { mark: "WEF", bg: "#009EDB", title: "WEF Future of Jobs", small: true },
    ];

    return (
      <div className="h-screen bg-ascend-bg flex flex-col items-center justify-center p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-3 duration-300 overflow-hidden">
        <div className="max-w-2xl w-full">

          <div className="flex justify-center mb-6">
            <img src="/waypoint.png" alt="Waypoint" className="h-14 w-auto" />
          </div>

          <div className="bg-white rounded-card border border-ascend-border px-8 py-7"
            style={{ boxShadow: "0 8px 40px rgba(67,24,255,0.10), 0 2px 8px rgba(0,0,0,0.06)" }}>

            <NavRow onSkip={onComplete} />

            {/* Headline */}
            <div className="mb-6 pl-4 border-l-4 border-ascend-blue">
              <h1 className="text-2xl font-bold text-ascend-text leading-snug">
                Your students have 5 skill gaps employers are hiring against right now.
              </h1>
              <p className="text-sm text-ascend-subtext mt-2">
                Here's the gap between what the market needs and what your cohort can demonstrate.
              </p>
            </div>

            {/* Skill gaps */}
            <div className="flex flex-col gap-3 mb-6 bg-ascend-bg rounded-xl p-4 border border-ascend-border">
              {skillGapData.map((row, idx) => {
                const gap = row.demand - row.coverage;
                const gapColor = gap >= 60 ? "#EF4444" : gap >= 40 ? "#F97316" : "#EAB308";
                const delay = `${idx * 80}ms`;
                return (
                  <div key={row.skill} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-ascend-text w-36 flex-shrink-0">{row.skill}</span>
                    <div className="flex-1 h-3 rounded-full bg-white border border-ascend-border overflow-hidden flex"
                      style={{ boxShadow: "inset 0 1px 3px rgba(0,0,0,0.06)" }}>
                      <div
                        className="h-full bg-emerald-400 flex-shrink-0"
                        style={{
                          width: barsVisible ? `${row.coverage}%` : "0%",
                          transition: `width 0.7s ease-out ${delay}`,
                        }}
                      />
                      <div
                        className="h-full bg-red-300 flex-shrink-0"
                        style={{
                          width: barsVisible ? `${gap}%` : "0%",
                          transition: `width 0.7s ease-out ${delay}`,
                        }}
                      />
                    </div>
                    <div
                      className="flex-shrink-0 w-24 text-right"
                      style={{ opacity: barsVisible ? 1 : 0, transition: `opacity 0.4s ease-out ${delay}` }}
                    >
                      <span className="text-sm font-bold" style={{ color: gapColor }}>{gap}%</span>
                      <span className="text-[11px] text-ascend-subtext block leading-none">not covered</span>
                    </div>
                  </div>
                );
              })}
              <div className="flex items-center gap-5 pt-2 border-t border-ascend-border mt-1">
                <span className="flex items-center gap-1.5 text-[11px] text-ascend-subtext">
                  <span className="w-3 h-2.5 rounded-sm bg-emerald-400 inline-block" /> Covered
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-ascend-subtext">
                  <span className="w-3 h-2.5 rounded-sm bg-red-300 inline-block" /> Not covered
                </span>
              </div>
            </div>

            {/* Source credibility strip */}
            <div className="pt-4 border-t border-ascend-border mb-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-ascend-subtext mb-3">Data sourced from</p>
              <div className="flex items-center justify-between">
                {logoMarks.map((src) => (
                  <div key={src.mark} className="flex flex-col items-center gap-1.5" title={src.title}>
                    <div
                      style={{
                        background: src.bg,
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: src.small ? 9 : 12,
                        borderRadius: 10,
                        width: 40,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        letterSpacing: "-0.3px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.10)",
                      }}
                    >
                      {src.mark}
                    </div>
                    <span className="text-[10px] text-ascend-subtext text-center leading-tight max-w-[56px]">
                      {src.title.split(" ")[0]}
                    </span>
                  </div>
                ))}
                <div className="flex flex-col items-center gap-1.5 pl-5 border-l border-ascend-border">
                  <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[11px] font-bold text-green-700">Live</span>
                  </div>
                  <span className="text-[10px] text-ascend-subtext whitespace-nowrap">4 min ago</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => setCurrentScreen(2)}
              className="w-full flex items-center justify-center gap-2 bg-ascend-blue hover:bg-indigo-700 text-white font-bold px-6 py-4 rounded-xl transition-all text-base"
              style={{ boxShadow: "0 4px 20px rgba(67,24,255,0.35), 0 1px 4px rgba(67,24,255,0.2)" }}
            >
              Build your first intervention
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Screen 2 ─────────────────────────────────────────────────────────────
  if (currentScreen === 2) {
    return (
      <div className="min-h-screen bg-ascend-bg flex flex-col items-center justify-start p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-3 duration-300">
        <div className="max-w-4xl w-full pt-8">
          <NavRow onBack={() => setCurrentScreen(1)} onSkip={onComplete} />
          <ProgressIndicator completed={0} />

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-ascend-text mb-3">
              Pick a professional scenario. We'll handle the setup.
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {scenarios.map((s) => {
              const isSelected = selectedScenario === s.id;
              const isFaded = selectedScenario !== null && !isSelected;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedScenario(s.id)}
                  className={`bg-white rounded-card p-6 cursor-pointer border-2 transition-all duration-300 shadow-crisp active:scale-[0.97] ${
                    isSelected
                      ? "border-ascend-blue shadow-glow scale-[1.02]"
                      : isFaded
                      ? "border-transparent opacity-50 scale-[0.98]"
                      : "border-transparent hover:border-ascend-blue/30 hover:shadow-soft"
                  }`}
                >
                  {s.badge && (
                    <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                      {s.badge}
                    </span>
                  )}
                  <h3 className="font-bold text-ascend-text text-lg mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-ascend-subtext text-sm mb-4">{s.description}</p>
                  <div className="space-y-1.5 mb-4">
                    {s.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-2 text-sm text-ascend-text"
                      >
                        <CheckCircle2 className="w-4 h-4 text-ascend-blue flex-shrink-0" />
                        {skill}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-ascend-subtext mt-2">
                    <Clock className="w-3.5 h-3.5" />
                    {s.time} for students
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-ascend-subtext mb-6">
            You can create custom scenarios later. Start with one of these to see how it
            works.
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => selectedScenario && setCurrentScreen(3)}
              disabled={!selectedScenario}
              className={`flex items-center gap-2 font-bold px-8 py-4 rounded-pill transition-all text-base ${
                selectedScenario
                  ? "bg-ascend-blue text-white shadow-glow hover:bg-indigo-700 hover:scale-105"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Use this scenario
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Screen 3 ─────────────────────────────────────────────────────────────
  if (currentScreen === 3) {
    return (
      <div className="min-h-screen bg-ascend-bg flex flex-col items-center justify-start p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-3 duration-300">
        <div className="max-w-3xl w-full pt-8">
          <NavRow onBack={() => setCurrentScreen(2)} onSkip={onComplete} />
          <ProgressIndicator completed={1} />

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-ascend-text mb-3">
              Show us what you already offer. We'll show you how it connects.
            </h1>
          </div>

          {!showConnections ? (
            <>
              <div className="space-y-5 mb-8">
                <DropZone
                  boxId="workshops"
                  icon={<Upload className="w-4 h-4 text-ascend-blue" />}
                  label="Your Workshops & Programs"
                  helper="Drag files, drop items from another app, or type and press Enter"
                  placeholder="Finding Your Voice workshop..."
                  items={items.workshops}
                  inputValue={inputValues.workshops}
                  isDragOver={dragOverBox === "workshops"}
                  onInputChange={(val) =>
                    setInputValues((prev) => ({ ...prev, workshops: val }))
                  }
                  onAddItem={(val) => addItem("workshops", val)}
                  onRemoveItem={(i) => removeItem("workshops", i)}
                  onDragOver={(e) => handleBoxDragOver(e, "workshops")}
                  onDragLeave={handleBoxDragLeave}
                  onDrop={(e) => handleBoxDrop(e, "workshops")}
                  onChipDragStart={(i) =>
                    setDraggingChip({ box: "workshops", index: i })
                  }
                  onChipDragEnd={() => setDraggingChip(null)}
                />

                <DropZone
                  boxId="rooms"
                  icon={<MapPin className="w-4 h-4 text-ascend-blue" />}
                  label="Your Available Rooms"
                  helper="Just list what you have. We'll suggest how to use it."
                  placeholder="Room 14B — whiteboard, 20 seats, M-W-F 2-5pm..."
                  items={items.rooms}
                  inputValue={inputValues.rooms}
                  isDragOver={dragOverBox === "rooms"}
                  onInputChange={(val) =>
                    setInputValues((prev) => ({ ...prev, rooms: val }))
                  }
                  onAddItem={(val) => addItem("rooms", val)}
                  onRemoveItem={(i) => removeItem("rooms", i)}
                  onDragOver={(e) => handleBoxDragOver(e, "rooms")}
                  onDragLeave={handleBoxDragLeave}
                  onDrop={(e) => handleBoxDrop(e, "rooms")}
                  onChipDragStart={(i) =>
                    setDraggingChip({ box: "rooms", index: i })
                  }
                  onChipDragEnd={() => setDraggingChip(null)}
                />

                <DropZone
                  boxId="other"
                  icon={<BookOpen className="w-4 h-4 text-ascend-subtext" />}
                  label="Other Resources"
                  helper="Counseling hours, events, special resources"
                  placeholder="Drop-in hours, career fair schedule..."
                  optional
                  items={items.other}
                  inputValue={inputValues.other}
                  isDragOver={dragOverBox === "other"}
                  onInputChange={(val) =>
                    setInputValues((prev) => ({ ...prev, other: val }))
                  }
                  onAddItem={(val) => addItem("other", val)}
                  onRemoveItem={(i) => removeItem("other", i)}
                  onDragOver={(e) => handleBoxDragOver(e, "other")}
                  onDragLeave={handleBoxDragLeave}
                  onDrop={(e) => handleBoxDrop(e, "other")}
                  onChipDragStart={(i) =>
                    setDraggingChip({ box: "other", index: i })
                  }
                  onChipDragEnd={() => setDraggingChip(null)}
                />
              </div>

              {loadingStep !== null ? (
                <div className="flex flex-col items-center gap-3 py-4">
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-ascend-blue h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${((loadingStep + 1) / 3) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm font-medium text-ascend-text">
                    {loadingMessages[loadingStep]}
                  </p>
                </div>
              ) : (
                <div className="flex justify-center">
                  <button
                    onClick={handleShowConnections}
                    className="flex items-center gap-2 bg-ascend-blue hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-pill shadow-glow transition-all hover:scale-105 text-base"
                  >
                    Show me the connections
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Connections table */}
              <div className="bg-white rounded-card shadow-soft overflow-hidden mb-6 animate-in fade-in duration-500">
                <div className="p-6 border-b border-ascend-border">
                  <h2 className="font-bold text-ascend-text text-lg">
                    Here's how your existing work supports what students need:
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-ascend-light-blue">
                        <th className="text-left p-4 text-xs font-bold text-ascend-subtext uppercase tracking-wide">
                          When Students Discover This Superpower...
                        </th>
                        <th className="text-left p-4 text-xs font-bold text-ascend-subtext uppercase tracking-wide">
                          You Already Have This Resource
                        </th>
                        <th className="text-left p-4 text-xs font-bold text-ascend-subtext uppercase tracking-wide">
                          How It Connects
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {resourceMappings.map((row, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? "bg-white" : "bg-ascend-bg/50"}
                        >
                          <td className="p-4">
                            <span className="font-bold text-ascend-text">
                              {row.superpower}
                            </span>
                            <br />
                            <span className="text-ascend-subtext text-xs">
                              {row.detail}
                            </span>
                          </td>
                          <td className="p-4 text-ascend-text">{row.resource}</td>
                          <td className="p-4 text-ascend-subtext text-xs">
                            {row.connection}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Insight box */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-card p-6 mb-8 animate-in fade-in duration-700">
                <p className="text-ascend-text leading-relaxed">
                  Right now you invite <strong>200 students</strong> to workshops with{" "}
                  <strong className="text-red-500">8% attendance.</strong>
                </p>
                <p className="text-ascend-text leading-relaxed mt-3">
                  With Waypoint, you send personal recommendations to{" "}
                  <strong>18 students</strong> who just experienced why they need it.
                  Attendance rate:{" "}
                  <strong className="text-green-600">38%.</strong>
                </p>
                <p className="text-ascend-blue font-bold mt-3">
                  Same workshops. Different timing. That's the difference.
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setCurrentScreen(4)}
                  className="flex items-center gap-2 bg-ascend-blue hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-pill shadow-glow transition-all hover:scale-105 text-base"
                >
                  Next: Optimize Spaces
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ─── Screen 4 ─────────────────────────────────────────────────────────────
  if (currentScreen === 4) {
    return (
      <div className="min-h-screen bg-ascend-bg flex flex-col items-center justify-start p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-3 duration-300">
        <div className="max-w-5xl w-full pt-8">
          <NavRow onBack={() => setCurrentScreen(3)} onSkip={onComplete} />
          <ProgressIndicator completed={2} />

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-ascend-text mb-2">
              Your rooms are sitting empty. Here's how to change that.
            </h1>
            <p className="text-ascend-subtext text-sm">
              Low investment. High impact. You decide what makes sense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {rooms.map((room) => {
              const isSelected = selectedRooms.has(room.id);
              return (
                <div
                  key={room.id}
                  className={`bg-white rounded-card border-2 transition-all shadow-crisp flex flex-col ${
                    isSelected ? "border-ascend-blue shadow-soft" : "border-transparent"
                  }`}
                >
                  {/* Current state */}
                  <div className="p-5 border-b border-ascend-border bg-gray-50/70 rounded-t-card">
                    <p className="text-xs font-bold uppercase tracking-wide text-ascend-subtext mb-1">
                      Current
                    </p>
                    <p className="font-bold text-ascend-text text-base">{room.name}</p>
                    <p className="text-sm text-ascend-subtext mt-1">{room.currentUse}</p>
                    <span className="inline-block mt-2 text-xs bg-red-50 text-red-500 font-bold px-2 py-0.5 rounded-full">
                      {room.currentUtilization}
                    </span>
                    <p className="text-xs text-ascend-subtext mt-2 italic">
                      "{room.currentNote}"
                    </p>
                  </div>

                  {/* Suggested */}
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-xs font-bold uppercase tracking-wide text-ascend-blue mb-1">
                      Add →
                    </p>
                    <p className="font-bold text-ascend-text text-base mb-1">
                      {room.suggestedUse}
                    </p>
                    <p className="text-xs text-ascend-subtext mb-2">
                      For {room.forStudents}
                    </p>
                    <p className="text-xs text-ascend-text mb-4 leading-relaxed">
                      Practice: {room.practice}
                    </p>

                    <div className="space-y-1 mb-4">
                      {room.costs.map((c, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-ascend-subtext">{c.item}</span>
                          <span className="font-bold text-ascend-text">{c.cost}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-green-50 rounded-xl p-3 mb-4">
                      <p className="text-xs font-bold text-green-700">
                        {room.projectedUtilization}
                      </p>
                      <p className="text-xs text-green-600">{room.projectedStudents}</p>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer mt-auto">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRoom(room.id)}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-xs font-bold text-ascend-text">
                        Add this to my setup
                      </span>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          {selectedRooms.size > 0 && (
            <div className="bg-white rounded-card shadow-crisp p-6 mb-5 animate-in fade-in duration-300">
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-2xl font-bold text-ascend-text">
                    ${totalMinCost}–${totalMaxCost}
                  </p>
                  <p className="text-xs text-ascend-subtext">Total investment</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-ascend-text">1-2 weeks</p>
                  <p className="text-xs text-ascend-subtext">Rooms ready</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-ascend-text">
                    {selectedRooms.size * 15}–{selectedRooms.size * 20}+
                  </p>
                  <p className="text-xs text-ascend-subtext">
                    Additional students/week
                  </p>
                </div>
              </div>
              <p className="text-xs text-ascend-subtext mt-3">
                Same rooms. New purpose. Real skill development.
              </p>
            </div>
          )}

          {/* Skip option */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-ascend-subtext">
              <input
                type="checkbox"
                checked={skipSpaces}
                onChange={(e) => setSkipSpaces(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              Not ready for this step? Skip for now — just start with digital simulations
            </label>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setCurrentScreen(5)}
              className="flex items-center gap-2 bg-ascend-blue hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-pill shadow-glow transition-all hover:scale-105 text-base"
            >
              Deploy My Setup
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Screen 5 ─────────────────────────────────────────────────────────────
  if (currentScreen === 5) {
    const deployments = [
      {
        id: "email",
        icon: <Mail className="w-6 h-6" />,
        title: "Email Invitation",
        desc: "Send personalized invitations with unique links",
        detail: "Send to 47 students from your list",
      },
      {
        id: "canvas",
        icon: <BookOpen className="w-6 h-6" />,
        title: "Canvas LMS",
        desc: "Post as assignment in your courses",
        detail: "Select course sections",
      },
      {
        id: "link",
        icon: <Link2 className="w-6 h-6" />,
        title: "Direct Link",
        desc: "Copy link to share anywhere",
        detail: "Includes QR code version for posters",
      },
    ];

    return (
      <div className="min-h-screen bg-ascend-bg flex flex-col items-center justify-start p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-3 duration-300">
        <div className="max-w-3xl w-full pt-8">
          <NavRow onBack={() => setCurrentScreen(4)} onSkip={onComplete} />
          <div className="flex justify-center mb-8">
            <img src="/waypoint.png" alt="Waypoint" className="h-20 w-auto" />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-ascend-text mb-3">
              Your simulation is ready. Time to send it to students.
            </h1>
            <p className="text-ascend-subtext text-sm max-w-lg mx-auto">
              They'll receive a professional scenario, discover superpowers they didn't
              know they had, and get personalized recommendations for your workshops and
              spaces.
            </p>
          </div>

          {/* Deployment options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {deployments.map((d) => (
              <div
                key={d.id}
                onClick={() => setSelectedDeployment(d.id)}
                className={`bg-white rounded-card p-5 cursor-pointer border-2 transition-all shadow-crisp ${
                  selectedDeployment === d.id
                    ? "border-ascend-blue shadow-glow"
                    : "border-transparent hover:border-ascend-blue/30 hover:shadow-soft"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    selectedDeployment === d.id
                      ? "bg-ascend-blue text-white"
                      : "bg-ascend-light-blue text-ascend-blue"
                  }`}
                >
                  {d.icon}
                </div>
                <p className="font-bold text-ascend-text text-sm mb-1">{d.title}</p>
                <p className="text-xs text-ascend-subtext mb-2">{d.desc}</p>
                <p className="text-xs font-medium text-ascend-blue">{d.detail}</p>
              </div>
            ))}
          </div>

          {/* Email preview */}
          <div className="bg-white rounded-card shadow-soft mb-3 overflow-hidden">
            <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-2 border-b border-ascend-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-gray-500 mx-auto font-medium">
                Email Preview
              </span>
            </div>
            <div className="p-6 text-sm">
              <p className="text-ascend-subtext text-xs mb-3">
                <strong className="text-ascend-text">Subject:</strong> Discover a
                superpower you didn't know you had (5 minutes)
              </p>
              <div className="border-t border-ascend-border pt-4 space-y-3 text-ascend-text leading-relaxed text-sm">
                <p>Hi [First Name],</p>
                <p>
                  A nonprofit team just used AI to write their annual report. They
                  disagree about whether it captures the real story. They want your
                  perspective.
                </p>
                <p>
                  Takes 5–7 minutes. You'll get personalized feedback showing superpowers
                  you might not know you have — with specific evidence from what you just
                  did.
                </p>
                <p>
                  You can complete this digitally, or visit Room 14B during open hours
                  for in-person practice.
                </p>
                <p>
                  No grades. No right answers. Just a chance to see what you're capable
                  of when it matters.
                </p>
                <p className="text-ascend-blue font-medium cursor-pointer hover:underline">
                  [UNIQUE LINK]
                </p>
                <p className="text-ascend-subtext text-xs mt-2">
                  Let me know what you think.
                  <br />— [Advisor Name]
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-ascend-subtext text-center mb-8">
            You can edit this message. We've written it to feel personal, not
            institutional.
          </p>

          <div className="flex justify-center">
            {sent ? (
              <div className="flex flex-col items-center gap-2 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-7 h-7 text-green-600" />
                </div>
                <p className="font-bold text-ascend-text">Sent to 47 students</p>
                <p className="text-xs text-ascend-subtext">
                  They'll start receiving this now
                </p>
              </div>
            ) : (
              <button
                onClick={handleSendToStudents}
                disabled={sendingAnimation}
                className="flex items-center gap-2 bg-ascend-blue hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-pill shadow-glow transition-all hover:scale-105 text-base disabled:opacity-70 disabled:cursor-wait"
              >
                {sendingAnimation ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send to Students
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── Screen 6 ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-ascend-bg flex flex-col items-center justify-start p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="max-w-4xl w-full pt-8">
        <NavRow onBack={() => setCurrentScreen(5)} onSkip={onComplete} />
        <p className="text-xs font-bold uppercase tracking-wider text-ascend-subtext text-center mb-2">
          Setup Complete
        </p>
        <h1 className="text-3xl font-bold text-ascend-text text-center mb-2">
          Students can access the simulation now.
        </h1>
        <p className="text-ascend-subtext text-center text-sm mb-10">
          Here's what you'll see as they complete it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Live activity feed */}
          <div className="bg-white rounded-card shadow-crisp p-6">
            <p className="font-bold text-ascend-text text-sm mb-4">
              Live Activity Feed
            </p>
            <p className="text-xs text-ascend-subtext italic mb-4">
              Waiting for first completion...
            </p>
            <div className="border border-dashed border-ascend-border rounded-xl p-4 opacity-40">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-ascend-blue flex-shrink-0">
                  A
                </div>
                <div className="text-xs space-y-1">
                  <p className="font-bold text-ascend-text">Student Name</p>
                  <p className="text-ascend-subtext">
                    Superpowers: Cultural Awareness, Assertive Advocacy
                  </p>
                  <p className="text-ascend-subtext">
                    Recommended: Finding Your Voice workshop
                  </p>
                  <p className="text-ascend-subtext">Just now</p>
                </div>
              </div>
            </div>
          </div>

          {/* Superpowers chart */}
          <div className="bg-white rounded-card shadow-crisp p-6">
            <p className="font-bold text-ascend-text text-sm mb-1">
              Superpowers Discovered
            </p>
            <p className="text-xs text-ascend-subtext mb-3">
              Updates in real-time as students complete
            </p>
            <div style={{ height: 120 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ name: "Waiting", value: 1 }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    fill="#E0E5F2"
                    dataKey="value"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
              {superpowerLegend.map((name, i) => (
                <span
                  key={name}
                  className="flex items-center gap-1 text-xs text-ascend-subtext"
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                    style={{ background: superpowerColors[i] }}
                  />
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Resource engagement */}
          <div className="bg-white rounded-card shadow-crisp p-6">
            <p className="font-bold text-ascend-text text-sm mb-4">
              Resource Engagement
            </p>
            <div style={{ height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={resourceEngagementData}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 9, fill: "#A3AED0" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#A3AED0" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    formatter={(v) => `${v}%`}
                    contentStyle={{ borderRadius: 10, fontSize: 11 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar
                    dataKey="current"
                    name="Current"
                    fill="#E0E5F2"
                    radius={[4, 4, 0, 0]}
                    barSize={14}
                  />
                  <Bar
                    dataKey="projected"
                    name="Projected"
                    fill="#4318FF"
                    radius={[4, 4, 0, 0]}
                    barSize={14}
                    opacity={0.6}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Space utilization (if rooms opted in) */}
          {selectedRooms.size > 0 ? (
            <div className="bg-white rounded-card shadow-crisp p-6">
              <p className="font-bold text-ascend-text text-sm mb-4">
                Space Utilization
              </p>
              <div className="space-y-4">
                {Array.from(selectedRooms).map((id) => {
                  const room = rooms.find((r) => r.id === id)!;
                  return (
                    <div key={id}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-medium text-ascend-text">
                          {room.name}
                        </span>
                        <span className="text-ascend-blue font-bold">
                          {room.projectedUtilization}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-ascend-blue/70 rounded-full transition-all"
                          style={{ width: "35%" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-card shadow-crisp p-6 flex items-center justify-center">
              <p className="text-xs text-ascend-subtext text-center">
                Space utilization tracking available
                <br />
                when rooms are configured.
              </p>
            </div>
          )}
        </div>

        {/* Anticipation box */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-card p-6 mb-8">
          <p className="text-ascend-text leading-relaxed">
            We'll email you when the first student completes. Most students finish within{" "}
            <strong>24 hours</strong> of receiving the invitation.
          </p>
          <p className="text-ascend-subtext text-sm mt-2">
            Want to see what their experience looks like?
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 bg-ascend-blue hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-pill shadow-glow transition-all hover:scale-105 text-base"
          >
            Preview Student Journey
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvisorOnboarding;
