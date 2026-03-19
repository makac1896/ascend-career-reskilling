import React from "react";
import {
  TrendingUp, Zap, Globe, BarChart2, AlertTriangle,
  BookOpen, FileDown, Search, ArrowUpRight,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

interface InsightsDashboardProps {
  onAction: (action: string, item: string) => void;
}

const skillDemandData = [
  { skill: "Ethical AI Reasoning", demand: 91, coverage: 14 },
  { skill: "Systems Thinking", demand: 78, coverage: 31 },
  { skill: "Cross-Cultural Comm.", demand: 67, coverage: 22 },
  { skill: "Strategic Foresight", demand: 59, coverage: 18 },
  { skill: "Crisis Response", demand: 54, coverage: 40 },
  { skill: "Prompt Engineering", demand: 48, coverage: 55 },
];

const liveSignals = [
  {
    id: 1,
    company: "OpenAI",
    skill: "Ethical AI Reasoning",
    signal: "94% of new GenAI roles require ethics fluency — up from 61% last quarter.",
    delta: "+33%",
    urgency: "Critical",
    industry: "Technology",
    icon: Zap,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
  },
  {
    id: 2,
    company: "BlackRock",
    skill: "Sustainable Finance",
    signal: "ESG reporting mandates are now tied to senior analyst promotions across 8 divisions.",
    delta: "+22%",
    urgency: "High",
    industry: "Finance",
    icon: TrendingUp,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
  },
  {
    id: 3,
    company: "Deloitte",
    skill: "Systems Thinking",
    signal: "Consulting engagements increasingly scored on systems-level analysis delivery.",
    delta: "+18%",
    urgency: "High",
    industry: "Consulting",
    icon: Globe,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    id: 4,
    company: "Tesla",
    skill: "Crisis Response Operations",
    signal: "Supply chain disruptions elevated crisis operations to a core hiring criterion.",
    delta: "+15%",
    urgency: "Medium",
    industry: "Engineering",
    icon: AlertTriangle,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-50",
  },
];

const statusItems = [
  { label: "Live Data Sources", value: "142", up: true },
  { label: "Signals This Week", value: "1,847", up: true },
  { label: "Skill Shifts Detected", value: "23", up: false },
  { label: "Last Sync", value: "4 min ago", up: true },
];

const tooltipStyle = {
  borderRadius: 12,
  border: "none",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  fontFamily: "DM Sans, sans-serif",
};

const InsightsDashboard: React.FC<InsightsDashboardProps> = ({ onAction }) => {
  return (
    <div className="flex flex-col gap-8 w-full pb-10 animate-in fade-in duration-500">

      {/* Live status bar */}
      <div className="bg-white rounded-card shadow-crisp p-4 flex flex-wrap gap-6 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-ascend-subtext">Live Market Intelligence</span>
        </div>
        <div className="flex flex-wrap gap-8">
          {statusItems.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-lg font-bold text-ascend-text">{s.value}</span>
              <span className="text-xs text-ascend-subtext font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Skill Demand vs Coverage chart */}
        <div className="lg:col-span-1 bg-white rounded-card shadow-soft p-6 flex flex-col">
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-1">
              <BarChart2 className="w-5 h-5 text-ascend-blue" />
              <h3 className="font-bold text-ascend-text text-lg">Market vs Coverage</h3>
            </div>
            <p className="text-xs text-ascend-subtext">Market demand % vs. student skill coverage %</p>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="flex items-center gap-1.5 text-xs font-bold text-ascend-subtext">
              <span className="w-3 h-3 rounded-sm bg-ascend-blue inline-block" /> Demand
            </span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-ascend-subtext">
              <span className="w-3 h-3 rounded-sm bg-indigo-200 inline-block" /> Coverage
            </span>
          </div>

          <div style={{ flex: 1, minHeight: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={skillDemandData}
                margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                barCategoryGap="30%"
                barGap={3}
              >
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fill: "#5A6A8A", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="skill"
                  width={160}
                  tick={{ fill: "#2B3674", fontSize: 11, fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(v, name) => [`${v}%`, name === "demand" ? "Market Demand" : "Student Coverage"]}
                  contentStyle={tooltipStyle}
                />
                <Bar dataKey="demand" fill="#4318FF" radius={[0, 4, 4, 0]} barSize={10} />
                <Bar dataKey="coverage" fill="#C7D2FE" radius={[0, 4, 4, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Live market signals */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-ascend-blue" />
              <h3 className="font-bold text-ascend-text text-lg">Live Market Signals</h3>
            </div>
            <div className="relative bg-ascend-light-blue rounded-full px-4 py-2 flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-ascend-subtext" />
              <input
                type="text"
                placeholder="Filter signals..."
                className="bg-transparent outline-none text-xs text-ascend-text w-32 placeholder:text-ascend-subtext font-medium"
              />
            </div>
          </div>

          {liveSignals.map((signal) => {
            const Icon = signal.icon;
            return (
              <div
                key={signal.id}
                className="bg-white rounded-card shadow-soft p-5 flex flex-col gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${signal.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${signal.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-ascend-text text-sm">{signal.company}</span>
                      <span className="text-xs text-ascend-subtext">·</span>
                      <span className="text-xs font-bold text-ascend-blue">{signal.skill}</span>
                      <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${
                        signal.urgency === "Critical"
                          ? "bg-red-50 text-red-600"
                          : signal.urgency === "High"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-blue-50 text-blue-600"
                      }`}>
                        {signal.urgency}
                      </span>
                    </div>
                    <p className="text-sm text-ascend-subtext leading-relaxed">{signal.signal}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                        {signal.delta} demand
                      </span>
                      <span className="text-xs text-ascend-subtext">{signal.industry}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-ascend-border">
                  <button
                    onClick={() => onAction("plan", signal.skill)}
                    className="flex items-center gap-1.5 text-xs font-bold bg-ascend-blue text-white px-3 py-2 rounded-pill hover:bg-indigo-700 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Plan Curriculum
                  </button>
                  <button
                    onClick={() => onAction("report", signal.skill)}
                    className="flex items-center gap-1.5 text-xs font-bold bg-ascend-light-blue text-ascend-text px-3 py-2 rounded-pill hover:bg-indigo-100 transition-colors"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    Download Report
                  </button>
                  <button
                    onClick={() => onAction("analyze", signal.skill)}
                    className="flex items-center gap-1.5 text-xs font-bold text-ascend-subtext hover:text-ascend-blue px-3 py-2 rounded-pill hover:bg-ascend-light-blue transition-colors ml-auto"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    Correlate Data
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

export default InsightsDashboard;
