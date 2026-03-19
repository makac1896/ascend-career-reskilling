import React from "react";
import {
  BarChart2, AlertCircle, Layers, Briefcase, TrendingUp, Users,
  Award, ChevronRight, Zap, Sparkles, PlayCircle, FileText, Activity,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

interface MainDashboardProps {
  onAction: (action: string, item: string) => void;
  onDeepAnalysis: () => void;
  onLaunchWorkshop: () => void;
  onDismissOpportunity: () => void;
  onViewDeck: () => void;
  onAutoDraft: () => void;
  onCandidateClick: (name: string) => void;
  onViewPipeline: () => void;
}

const statCards = [
  { label: "Skills Tracked", value: "2,543", sub: "Across 14 industries", icon: BarChart2, trend: "+12%", up: true },
  { label: "Urgent Skill Gaps", value: "12", sub: "Requiring immediate action", icon: AlertCircle, trend: "Critical", up: false },
  { label: "Active Workshops", value: "48", sub: "Students currently enrolled", icon: Layers, trend: "Stable", up: true },
  { label: "Industry Partners", value: "142", sub: "Active connections", icon: Briefcase, trend: "+3 New", up: true },
];

const skillGapData = [
  { skill: "Ethical AI Reasoning", gap: 88 },
  { skill: "Systems Thinking", gap: 66 },
  { skill: "Cross-Cultural Comm.", gap: 55 },
  { skill: "Strategic Foresight", gap: 47 },
  { skill: "Prompt Engineering", gap: 29 },
];

const opportunities = [
  { id: 1, title: "Gen-AI Ethics Pulse", provider: "OpenAI Signal", urgency: "Critical", matchScore: 99 },
  { id: 2, title: "Sustainable Finance Module", provider: "BlackRock Signal", urgency: "High", matchScore: 94 },
  { id: 3, title: "Crisis Response Operations", provider: "Tesla Signal", urgency: "High", matchScore: 88 },
];

const pipelineCandidates = [
  { name: "J. Anderson", project: "Crisis Response Plan", verifiedBy: "Deloitte", score: 98, initials: "JA" },
  { name: "S. Chen", project: "Ethical AI Framework", verifiedBy: "Pfizer", score: 96, initials: "SC" },
  { name: "M. Davids", project: "Supply Chain Audit", verifiedBy: "Tesla", score: 94, initials: "MD" },
  { name: "A. Patel", project: "ESG Risk Model", verifiedBy: "BlackRock", score: 92, initials: "AP" },
];

const gapColors = ["#EF4444", "#F97316", "#EAB308", "#3B82F6", "#8B5CF6"];

const tooltipStyle = {
  borderRadius: 12, border: "none",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)", fontFamily: "DM Sans, sans-serif",
};

const MainDashboard: React.FC<MainDashboardProps> = ({
  onAction, onDeepAnalysis, onLaunchWorkshop, onDismissOpportunity,
  onViewDeck, onAutoDraft, onCandidateClick, onViewPipeline,
}) => {
  return (
    <div className="flex flex-col gap-8 w-full pb-10 animate-in fade-in duration-500">

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-card shadow-crisp p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-ascend-light-blue flex items-center justify-center">
                  <Icon className="w-5 h-5 text-ascend-blue" />
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  card.up ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                }`}>
                  {card.trend}
                </span>
              </div>
              <div>
                <p className="text-3xl font-bold text-ascend-text">{card.value}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-ascend-subtext mt-1">{card.label}</p>
                <p className="text-xs text-ascend-subtext mt-0.5">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main two-column content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Skill Gaps + Opportunity Queue */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Skill gap chart */}
          <div className="bg-white rounded-card shadow-soft p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-ascend-text text-lg">Top Skill Gaps</h3>
                <p className="text-xs text-ascend-subtext mt-0.5">
                  % of open roles requiring this skill vs. current student coverage
                </p>
              </div>
              <button
                onClick={onDeepAnalysis}
                className="flex items-center gap-1.5 text-xs font-bold text-ascend-blue bg-ascend-light-blue px-3 py-2 rounded-pill hover:bg-indigo-100 transition-colors"
              >
                <Activity className="w-3.5 h-3.5" />
                Run Analysis
              </button>
            </div>
            <div style={{ height: 230 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={skillGapData} margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
                  <XAxis
                    type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`}
                    tick={{ fill: "#5A6A8A", fontSize: 11 }} axisLine={false} tickLine={false}
                  />
                  <YAxis
                    type="category" dataKey="skill" width={170}
                    tick={{ fill: "#2B3674", fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false}
                  />
                  <Tooltip formatter={(v) => [`${v}%`, "Gap"]} contentStyle={tooltipStyle} />
                  <Bar dataKey="gap" radius={[0, 6, 6, 0]} barSize={14}>
                    {skillGapData.map((_, i) => (
                      <Cell key={i} fill={gapColors[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Opportunity queue */}
          <div className="bg-white rounded-card shadow-soft p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-ascend-blue" />
                <h3 className="font-bold text-ascend-text text-lg">Opportunity Queue</h3>
              </div>
              <button
                onClick={onDismissOpportunity}
                className="text-xs text-ascend-subtext hover:text-red-500 transition-colors font-medium"
              >
                Dismiss All
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {opportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-ascend-border hover:border-ascend-blue/30 hover:shadow-crisp transition-all"
                >
                  <div className={`w-2 h-10 rounded-full flex-shrink-0 ${
                    opp.urgency === "Critical" ? "bg-red-400" : "bg-amber-400"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-ascend-text text-sm">{opp.title}</p>
                    <p className="text-xs text-ascend-subtext mt-0.5">{opp.provider}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      opp.urgency === "Critical" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700"
                    }`}>
                      {opp.urgency}
                    </span>
                    <span className="text-xs font-bold text-ascend-blue bg-indigo-50 px-2 py-1 rounded-full">
                      {opp.matchScore}%
                    </span>
                    <button
                      onClick={() => onAutoDraft()}
                      title="Auto-Draft"
                      className="w-8 h-8 flex items-center justify-center text-ascend-subtext hover:text-ascend-blue hover:bg-ascend-light-blue rounded-lg transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onViewDeck}
                      title="View Deck"
                      className="w-8 h-8 flex items-center justify-center text-ascend-subtext hover:text-ascend-blue hover:bg-ascend-light-blue rounded-lg transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onLaunchWorkshop}
                      className="flex items-center gap-1.5 bg-ascend-blue text-white text-xs font-bold px-3 py-2 rounded-pill hover:bg-indigo-700 transition-colors"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      Launch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Talent pipeline + quick actions */}
        <div className="flex flex-col gap-6">

          <div className="bg-white rounded-card shadow-soft p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-ascend-blue" />
                <h3 className="font-bold text-ascend-text text-lg">Talent Pipeline</h3>
              </div>
              <span className="text-xs font-bold text-ascend-subtext bg-ascend-light-blue px-2.5 py-1 rounded-full">
                {pipelineCandidates.length} ready
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {pipelineCandidates.map((c) => (
                <div
                  key={c.name}
                  onClick={() => onCandidateClick(c.name)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-ascend-light-blue cursor-pointer group transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {c.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-ascend-text text-sm">{c.name}</p>
                    <p className="text-xs text-ascend-subtext truncate">{c.project}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                      {c.score}
                    </span>
                    <ChevronRight className="w-4 h-4 text-ascend-subtext group-hover:text-ascend-blue transition-colors" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-ascend-border">
              <button
                onClick={onViewPipeline}
                className="w-full flex items-center justify-center gap-2 text-sm font-bold text-ascend-blue hover:bg-ascend-light-blue py-2.5 rounded-xl transition-colors"
              >
                <Users className="w-4 h-4" />
                View Full Pipeline
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-card shadow-crisp p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-ascend-subtext mb-4">Quick Actions</p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Launch Workshop", icon: PlayCircle, fn: onLaunchWorkshop, primary: true },
                { label: "Auto-Draft Proposal", icon: Sparkles, fn: onAutoDraft, primary: false },
                { label: "Deep Analysis", icon: Activity, fn: onDeepAnalysis, primary: false },
                { label: "View Report Deck", icon: FileText, fn: onViewDeck, primary: false },
              ].map(({ label, icon: Icon, fn, primary }) => (
                <button
                  key={label}
                  onClick={fn}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    primary
                      ? "bg-ascend-blue text-white hover:bg-indigo-700 shadow-glow"
                      : "bg-ascend-light-blue text-ascend-text hover:bg-indigo-100"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
