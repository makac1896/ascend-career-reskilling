import React, { useState } from "react";
import {
  Bot, Activity, CheckCircle2, XCircle, Clock, ChevronRight,
  Zap, Eye, Database, Globe, TrendingUp, AlertTriangle,
  PlayCircle, BookOpen, Users, Sparkles, RefreshCw, Shield,
  ArrowUpRight, Circle,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ActionStatus = "pending" | "approved" | "rejected" | "modified";
type ActionType = "simulation" | "workshop" | "curriculum" | "alert";

interface PendingAction {
  id: number;
  type: ActionType;
  title: string;
  reasoning: string;
  impact: string;
  urgency: "Critical" | "High" | "Medium";
  source: string;
  proposedAt: string;
  status: ActionStatus;
}

// ─── Mock data ───────────────────────────────────────────────────────────────

const initialActions: PendingAction[] = [
  {
    id: 1,
    type: "simulation",
    title: "New simulation: ESG Reporting Under Pressure",
    reasoning:
      "LinkedIn data shows 67% of finance roles now require ESG literacy. Student coverage is 4%. No current simulation addresses this gap. Lightcast signals a 31% YoY increase in ESG-related job postings.",
    impact: "Closes the ESG gap for 47 enrolled finance students. Estimated completion rate: 74% based on comparable scenarios.",
    urgency: "Critical",
    source: "LinkedIn Jobs API + Lightcast",
    proposedAt: "18 min ago",
    status: "pending",
  },
  {
    id: 2,
    type: "workshop",
    title: "Recommend "Finding Your Voice" to 14 students",
    reasoning:
      "14 students completed the Assertive Advocacy simulation in the last 48 hours and scored high on insight but low on participation. This is the exact trigger condition for this workshop.",
    impact: "Predicted attendance rate: 38% vs. current 8% average for untargeted invitations.",
    urgency: "High",
    source: "Waypoint Student Records",
    proposedAt: "2 hours ago",
    status: "pending",
  },
  {
    id: 3,
    type: "curriculum",
    title: "Update Resilience gap threshold from 55% to 73%",
    reasoning:
      "BLS Occupational Outlook 2025 release shows resilience-related competencies have increased in weight across 6 of the 8 sectors your students are targeting. The current threshold understates urgency.",
    impact: "Reclassifies Resilience from Medium to Critical priority, surfacing it in advisor alerts and student recommendations.",
    urgency: "Medium",
    source: "BLS Occupational Outlook 2025",
    proposedAt: "Yesterday",
    status: "pending",
  },
  {
    id: 4,
    type: "alert",
    title: "Cultural Awareness coverage dropping — investigate",
    reasoning:
      "Completion rate for Cultural Awareness scenarios has dropped 18% over 3 weeks. Cross-referencing with enrollment data shows the affected students joined after the last scenario refresh. Content may need updating.",
    impact: "If unaddressed, Cultural Awareness gap widens by an estimated 12 percentage points over the next cohort cycle.",
    urgency: "High",
    source: "Waypoint Student Records + Internal Analytics",
    proposedAt: "3 hours ago",
    status: "pending",
  },
];

const monitoringFeeds = [
  {
    icon: Globe,
    name: "LinkedIn Jobs API",
    description: "Tracking 4.2M active listings for skill signal changes",
    status: "live",
    lastChecked: "4 min ago",
    color: "#0077B5",
  },
  {
    icon: TrendingUp,
    name: "Lightcast Intelligence",
    description: "Monitoring real-time skill demand index across 14 sectors",
    status: "live",
    lastChecked: "4 min ago",
    color: "#FF6B2B",
  },
  {
    icon: Database,
    name: "Waypoint Student Records",
    description: "Watching simulation completions, scores, and skill signals",
    status: "live",
    lastChecked: "1 min ago",
    color: "#4318FF",
  },
  {
    icon: Activity,
    name: "BLS Occupational Outlook",
    description: "Parsing occupational change reports for threshold updates",
    status: "syncing",
    lastChecked: "2 days ago",
    color: "#1B3A6B",
  },
  {
    icon: Users,
    name: "Partner Signals",
    description: "Listening for role requirement updates from 142 industry partners",
    status: "live",
    lastChecked: "12 min ago",
    color: "#10B981",
  },
];

const executionLog = [
  { action: "Sent Cultural Competency invitation to 9 students", time: "Yesterday 3:14pm", type: "workshop" },
  { action: "Updated Prompt Engineering gap from 29% to 34%", time: "2 days ago", type: "curriculum" },
  { action: "Launched Crisis Response scenario for Business cohort", time: "3 days ago", type: "simulation" },
  { action: "Flagged Ethical AI as Critical priority", time: "5 days ago", type: "alert" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const typeConfig: Record<ActionType, { label: string; icon: React.FC<{ className?: string }>; color: string; bg: string }> = {
  simulation: { label: "Simulation Proposal", icon: PlayCircle, color: "text-ascend-blue", bg: "bg-ascend-light-blue" },
  workshop: { label: "Workshop Recommendation", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50" },
  curriculum: { label: "Curriculum Update", icon: Sparkles, color: "text-amber-600", bg: "bg-amber-50" },
  alert: { label: "Alert", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
};

const urgencyConfig = {
  Critical: "bg-red-50 text-red-600",
  High: "bg-amber-50 text-amber-700",
  Medium: "bg-blue-50 text-blue-600",
};

// ─── Component ────────────────────────────────────────────────────────────────

const AgentDashboard: React.FC = () => {
  const [actions, setActions] = useState<PendingAction[]>(initialActions);
  const [agentActive, setAgentActive] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const pending = actions.filter((a) => a.status === "pending");
  const resolved = actions.filter((a) => a.status !== "pending");

  const resolve = (id: number, status: "approved" | "rejected") => {
    setActions((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    if (expandedId === id) setExpandedId(null);
  };

  return (
    <div className="flex flex-col gap-8 w-full pb-10 animate-in fade-in duration-500">

      {/* Agent identity card */}
      <div
        className="rounded-card border border-ascend-border p-6 flex items-start gap-5"
        style={{ background: "linear-gradient(135deg, #f8f7ff 0%, #eef2ff 100%)", boxShadow: "0 4px 24px rgba(67,24,255,0.08)" }}
      >
        <div className="w-14 h-14 rounded-2xl bg-ascend-blue flex items-center justify-center flex-shrink-0"
          style={{ boxShadow: "0 4px 16px rgba(67,24,255,0.35)" }}>
          <Bot className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <h2 className="text-xl font-bold text-ascend-text">Waypoint Intelligence</h2>
            <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${agentActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
              {agentActive ? <><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Active</> : <><Circle className="w-3 h-3" />Paused</>}
            </span>
          </div>
          <p className="text-sm text-ascend-subtext leading-relaxed max-w-2xl">
            Monitors live market data, student simulation outcomes, and partner signals to surface curriculum recommendations and simulation proposals.{" "}
            <strong className="text-ascend-text">Every proposed action requires your explicit approval before anything is executed.</strong>
          </p>
        </div>
        <button
          onClick={() => setAgentActive((v) => !v)}
          className={`flex-shrink-0 flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-pill border transition-colors ${
            agentActive
              ? "border-red-200 text-red-600 hover:bg-red-50"
              : "border-green-200 text-green-700 hover:bg-green-50"
          }`}
        >
          {agentActive ? "Pause Agent" : "Resume Agent"}
        </button>
      </div>

      {/* Monitoring feeds */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-ascend-blue" />
          <h3 className="font-bold text-ascend-text text-lg">What it monitors</h3>
          <span className="ml-auto text-xs text-ascend-subtext flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Continuous
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {monitoringFeeds.map((feed) => {
            const Icon = feed.icon;
            return (
              <div key={feed.name} className="bg-white rounded-xl border border-ascend-border p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                    style={{ background: feed.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    feed.status === "live" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-600"
                  }`}>
                    {feed.status === "live" && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
                    {feed.status}
                  </span>
                </div>
                <p className="text-xs font-bold text-ascend-text leading-tight">{feed.name}</p>
                <p className="text-[10px] text-ascend-subtext leading-snug">{feed.description}</p>
                <p className="text-[10px] text-ascend-subtext mt-auto">Checked {feed.lastChecked}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pending approvals */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-ascend-blue" />
          <h3 className="font-bold text-ascend-text text-lg">Awaiting your approval</h3>
          {pending.length > 0 && (
            <span className="ml-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
              {pending.length}
            </span>
          )}
        </div>

        {pending.length === 0 && (
          <div className="bg-white rounded-card border border-ascend-border p-10 flex flex-col items-center gap-3 text-center">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
            <p className="font-bold text-ascend-text">All caught up</p>
            <p className="text-sm text-ascend-subtext">No pending actions right now. The agent will surface new proposals as signals emerge.</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {pending.map((action) => {
            const cfg = typeConfig[action.type];
            const TypeIcon = cfg.icon;
            const isExpanded = expandedId === action.id;

            return (
              <div
                key={action.id}
                className="bg-white rounded-card border border-ascend-border overflow-hidden transition-shadow hover:shadow-soft"
                style={isExpanded ? { boxShadow: "0 4px 24px rgba(67,24,255,0.08), 0 1px 4px rgba(0,0,0,0.05)" } : {}}
              >
                {/* Header row */}
                <div
                  className="flex items-start gap-4 p-5 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : action.id)}
                >
                  <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                    <TypeIcon className={`w-5 h-5 ${cfg.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${cfg.color}`}>{cfg.label}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${urgencyConfig[action.urgency]}`}>
                        {action.urgency}
                      </span>
                    </div>
                    <p className="font-bold text-ascend-text text-sm">{action.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[11px] text-ascend-subtext flex items-center gap-1">
                        <Zap className="w-3 h-3" /> {action.source}
                      </span>
                      <span className="text-[11px] text-ascend-subtext flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {action.proposedAt}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-ascend-subtext flex-shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                  />
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-ascend-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
                      <div className="rounded-xl bg-ascend-bg border border-ascend-border p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-ascend-subtext mb-2">Agent reasoning</p>
                        <p className="text-sm text-ascend-text leading-relaxed">{action.reasoning}</p>
                      </div>
                      <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-green-600 mb-2">Projected impact</p>
                        <p className="text-sm text-ascend-text leading-relaxed">{action.impact}</p>
                      </div>
                    </div>

                    {/* Approval controls */}
                    <div className="flex items-center gap-3 px-5 pb-5">
                      <button
                        onClick={() => resolve(action.id, "approved")}
                        className="flex items-center gap-2 bg-ascend-blue hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-pill transition-all"
                        style={{ boxShadow: "0 4px 12px rgba(67,24,255,0.3)" }}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve & Execute
                      </button>
                      <button
                        onClick={() => resolve(action.id, "rejected")}
                        className="flex items-center gap-2 border border-ascend-border text-ascend-subtext hover:text-red-500 hover:border-red-200 text-sm font-bold px-5 py-2.5 rounded-pill transition-all"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                      <span className="text-xs text-ascend-subtext ml-auto">
                        Nothing executes until you approve
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Execution log */}
      {resolved.length > 0 || executionLog.length > 0 ? (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-ascend-blue" />
            <h3 className="font-bold text-ascend-text text-lg">Execution log</h3>
            <button className="ml-auto text-xs font-bold text-ascend-blue hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="bg-white rounded-card border border-ascend-border divide-y divide-ascend-border overflow-hidden">
            {/* Recently resolved this session */}
            {resolved.map((a) => (
              <div key={`resolved-${a.id}`} className="flex items-center gap-3 px-5 py-3">
                {a.status === "approved"
                  ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  : <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                <p className="text-sm text-ascend-text flex-1 truncate">
                  {a.status === "approved" ? "Approved: " : "Rejected: "}{a.title}
                </p>
                <span className="text-[11px] text-ascend-subtext flex-shrink-0">Just now</span>
              </div>
            ))}
            {/* Historical log */}
            {executionLog.map((entry, i) => {
              const cfg = typeConfig[entry.type as ActionType];
              const Icon = cfg.icon;
              return (
                <div key={i} className="flex items-center gap-3 px-5 py-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${cfg.color}`} />
                  <p className="text-sm text-ascend-text flex-1 truncate">{entry.action}</p>
                  <span className="text-[11px] text-ascend-subtext flex-shrink-0">{entry.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AgentDashboard;
