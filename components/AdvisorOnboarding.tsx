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

// ─── Main Component ─────────────────────────────────────────────────────────

const AdvisorOnboarding: React.FC<AdvisorOnboardingProps> = ({ onComplete }) => {
  const [currentScreen, setCurrentScreen] = useState(1);

  // Screen 2
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  // Screen 3
  const [workshopsText, setWorkshopsText] = useState("");
  const [roomsText, setRoomsText] = useState("");
  const [otherText, setOtherText] = useState("");
  const [loadingStep, setLoadingStep] = useState<number | null>(null);
  const [showConnections, setShowConnections] = useState(false);

  // Screen 4
  const [selectedRooms, setSelectedRooms] = useState<Set<string>>(new Set());
  const [skipSpaces, setSkipSpaces] = useState(false);

  // Screen 5
  const [selectedDeployment, setSelectedDeployment] = useState<string | null>(null);
  const [sendingAnimation, setSendingAnimation] = useState(false);
  const [sent, setSent] = useState(false);

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
    return (
      <div className="min-h-screen bg-ascend-bg flex flex-col items-center justify-center p-6 lg:p-10 animate-in fade-in duration-500">
        <div className="max-w-3xl w-full">
          <div className="flex justify-center mb-10">
            <img src="/waypoint.png" alt="Waypoint" className="h-24 w-auto" />
          </div>

          <div className="bg-white rounded-card shadow-soft p-8 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-wider text-ascend-subtext mb-2">
              Your Students · Today
            </p>
            <h1 className="text-3xl font-bold text-ascend-text mb-8 leading-snug">
              Here's what's happening with your students
            </h1>

            <div style={{ height: 270 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={skillGapData}
                  margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="#E0E5F2"
                  />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 11, fill: "#A3AED0" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="skill"
                    width={160}
                    tick={{ fontSize: 12, fill: "#2B3674", fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(v) => `${v}%`}
                    contentStyle={{
                      borderRadius: 12,
                      border: "none",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                  <Bar
                    dataKey="demand"
                    name="Market Demand"
                    fill="#4318FF"
                    radius={[0, 4, 4, 0]}
                    barSize={9}
                  />
                  <Bar
                    dataKey="coverage"
                    name="Your Coverage"
                    fill="#39B8FF"
                    radius={[0, 4, 4, 0]}
                    barSize={9}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-base text-ascend-subtext text-center mt-6 mb-8 leading-relaxed">
              You already have what you need to close these gaps.{" "}
              <span className="text-ascend-text font-semibold">
                Let's connect the pieces.
              </span>
            </p>

            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => setCurrentScreen(2)}
                className="flex items-center gap-2 bg-ascend-blue hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-pill shadow-glow transition-all hover:scale-105 text-base"
              >
                Show me how
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-ascend-subtext">6 minutes</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Screen 2 ─────────────────────────────────────────────────────────────
  if (currentScreen === 2) {
    return (
      <div className="min-h-screen bg-ascend-bg flex flex-col items-center justify-start p-6 lg:p-10 animate-in fade-in duration-500">
        <div className="max-w-4xl w-full pt-8">
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
                  className={`bg-white rounded-card p-6 cursor-pointer border-2 transition-all duration-300 shadow-crisp ${
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
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
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
      <div className="min-h-screen bg-ascend-bg flex flex-col items-center justify-start p-6 lg:p-10 animate-in fade-in duration-500">
        <div className="max-w-3xl w-full pt-8">
          <ProgressIndicator completed={1} />

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-ascend-text mb-3">
              Show us what you already offer. We'll show you how it connects.
            </h1>
          </div>

          {!showConnections ? (
            <>
              <div className="space-y-5 mb-8">
                {/* Box 1 */}
                <div className="bg-white rounded-card p-6 shadow-crisp">
                  <div className="flex items-center gap-2 mb-3">
                    <Upload className="w-4 h-4 text-ascend-blue" />
                    <span className="font-bold text-ascend-text text-sm">
                      Your Workshops & Programs
                    </span>
                  </div>
                  <textarea
                    value={workshopsText}
                    onChange={(e) => setWorkshopsText(e.target.value)}
                    rows={3}
                    placeholder="Finding Your Voice workshop, Cultural Competency seminar, Career counseling schedule..."
                    className="w-full border border-ascend-border rounded-xl p-3 text-sm text-ascend-text placeholder:text-ascend-subtext resize-none focus:outline-none focus:ring-2 focus:ring-ascend-blue/20"
                  />
                  <p className="text-xs text-ascend-subtext mt-2">
                    Paste your workshop calendar or type descriptions
                  </p>
                </div>

                {/* Box 2 */}
                <div className="bg-white rounded-card p-6 shadow-crisp">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-ascend-blue" />
                    <span className="font-bold text-ascend-text text-sm">
                      Your Available Rooms
                    </span>
                  </div>
                  <textarea
                    value={roomsText}
                    onChange={(e) => setRoomsText(e.target.value)}
                    rows={3}
                    placeholder="Room 14B — whiteboard, 20 seats, M-W-F 2-5pm..."
                    className="w-full border border-ascend-border rounded-xl p-3 text-sm text-ascend-text placeholder:text-ascend-subtext resize-none focus:outline-none focus:ring-2 focus:ring-ascend-blue/20"
                  />
                  <p className="text-xs text-ascend-subtext mt-2">
                    Just list what you have. We'll suggest how to use it.
                  </p>
                </div>

                {/* Box 3 — Optional */}
                <div className="bg-white rounded-card p-6 shadow-crisp opacity-70">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-ascend-subtext" />
                    <span className="font-bold text-ascend-subtext text-sm">
                      Other Resources
                    </span>
                    <span className="ml-auto text-xs text-ascend-subtext bg-gray-100 px-2 py-0.5 rounded-full">
                      Optional
                    </span>
                  </div>
                  <textarea
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    rows={2}
                    placeholder="Counseling hours, campus events, special resources..."
                    className="w-full border border-ascend-border rounded-xl p-3 text-sm text-ascend-text placeholder:text-ascend-subtext resize-none focus:outline-none focus:ring-2 focus:ring-ascend-blue/20"
                  />
                </div>
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
      <div className="min-h-screen bg-ascend-bg flex flex-col items-center justify-start p-6 lg:p-10 animate-in fade-in duration-500">
        <div className="max-w-5xl w-full pt-8">
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
      <div className="min-h-screen bg-ascend-bg flex flex-col items-center justify-start p-6 lg:p-10 animate-in fade-in duration-500">
        <div className="max-w-3xl w-full pt-8">
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
    <div className="min-h-screen bg-ascend-bg flex flex-col items-center justify-start p-6 lg:p-10 animate-in fade-in duration-500">
      <div className="max-w-4xl w-full pt-8">
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
