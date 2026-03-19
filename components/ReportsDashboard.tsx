import React, { useState } from "react";
import {
  FileText, Download, TrendingUp, Users, Award,
  BarChart2, ChevronRight, ArrowUpRight, Calendar, Filter,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend,
} from "recharts";

const outcomesTrend = [
  { month: "Sep", rate: 54 },
  { month: "Oct", rate: 61 },
  { month: "Nov", rate: 67 },
  { month: "Dec", rate: 72 },
  { month: "Jan", rate: 69 },
  { month: "Feb", rate: 78 },
  { month: "Mar", rate: 84 },
];

const skillBreakdown = [
  { name: "Ethical AI", value: 28, color: "#4318FF" },
  { name: "Crisis Response", value: 22, color: "#7551FF" },
  { name: "Cross-Cultural", value: 18, color: "#3B82F6" },
  { name: "Systems Thinking", value: 17, color: "#22C55E" },
  { name: "Strategic Foresight", value: 15, color: "#F97316" },
];

const partnerEngagement = [
  { partner: "Deloitte", placements: 14, verified: 12 },
  { partner: "BlackRock", placements: 11, verified: 10 },
  { partner: "Tesla", placements: 9, verified: 7 },
  { partner: "OpenAI", placements: 7, verified: 6 },
  { partner: "Pfizer", placements: 5, verified: 5 },
];

const savedReports = [
  { title: "Q1 2026 Outcomes Summary", date: "Mar 15, 2026", type: "Quarterly", pages: 12 },
  { title: "Ethical AI Skills Gap Report", date: "Mar 8, 2026", type: "Skills Analysis", pages: 8 },
  { title: "Partner Engagement — Feb 2026", date: "Feb 28, 2026", type: "Partner", pages: 6 },
  { title: "Cohort Completion Metrics", date: "Feb 14, 2026", type: "Metrics", pages: 5 },
];

const tooltipStyle = {
  borderRadius: 12,
  border: "none",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  fontFamily: "DM Sans, sans-serif",
};

const ReportsDashboard: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState("This Month");

  return (
    <div className="flex flex-col gap-8 w-full pb-10 animate-in fade-in duration-500">

      {/* Header actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {["This Month", "Last Quarter", "Year to Date"].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRange(r)}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-full transition-colors ${
                selectedRange === r
                  ? "bg-ascend-blue text-white"
                  : "bg-white text-ascend-text border border-ascend-border hover:bg-ascend-light-blue"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              {r}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 bg-white border border-ascend-border rounded-pill px-4 py-2 text-xs font-bold text-ascend-text hover:bg-ascend-light-blue transition-colors">
          <Filter className="w-3.5 h-3.5 text-ascend-subtext" />
          Filters
        </button>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Employment Rate", value: "84%", sub: "+6pts vs prior cohort", icon: TrendingUp, color: "text-green-500", bg: "bg-green-50" },
          { label: "Graduates Tracked", value: "218", sub: "This academic year", icon: Users, color: "text-ascend-blue", bg: "bg-ascend-light-blue" },
          { label: "Partner Verified", value: "64", sub: "Placed with partners", icon: Award, color: "text-purple-500", bg: "bg-purple-50" },
          { label: "Reports Generated", value: "31", sub: "This period", icon: FileText, color: "text-amber-500", bg: "bg-amber-50" },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-card shadow-crisp p-5 flex flex-col gap-3">
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
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

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Outcomes trend */}
        <div className="lg:col-span-2 bg-white rounded-card shadow-soft p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-ascend-text text-lg">Employment Outcomes Trend</h3>
              <p className="text-xs text-ascend-subtext mt-0.5">% of graduates employed within 90 days by graduation month</p>
            </div>
            <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">+30pts YoY</span>
          </div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={outcomesTrend} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fill: "#5A6A8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[40, 100]} tickFormatter={(v) => `${v}%`} tick={{ fill: "#5A6A8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => [`${v}%`, "Employment Rate"]} contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#4318FF"
                  strokeWidth={3}
                  dot={{ fill: "#4318FF", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills pie */}
        <div className="bg-white rounded-card shadow-soft p-6">
          <div className="mb-5">
            <h3 className="font-bold text-ascend-text text-lg">Skills in Demand</h3>
            <p className="text-xs text-ascend-subtext mt-0.5">Distribution of placed students by top skill</p>
          </div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {skillBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, "Share"]} contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-1.5 mt-2">
            {skillBreakdown.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-xs text-ascend-subtext flex-1 truncate">{s.name}</span>
                <span className="text-xs font-bold text-ascend-text">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partner engagement + saved reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Partner bar chart */}
        <div className="lg:col-span-2 bg-white rounded-card shadow-soft p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-ascend-blue" />
                <h3 className="font-bold text-ascend-text text-lg">Partner Placements</h3>
              </div>
              <p className="text-xs text-ascend-subtext mt-0.5">Total placements and partner-verified hires</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs font-bold text-ascend-subtext">
                <span className="w-3 h-3 rounded-sm bg-ascend-blue inline-block" /> Placements
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-ascend-subtext">
                <span className="w-3 h-3 rounded-sm bg-indigo-200 inline-block" /> Verified
              </span>
            </div>
          </div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={partnerEngagement} margin={{ top: 0, right: 10, left: -10, bottom: 0 }} barGap={4}>
                <XAxis dataKey="partner" tick={{ fill: "#5A6A8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#5A6A8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="placements" fill="#4318FF" radius={[4, 4, 0, 0]} barSize={18} />
                <Bar dataKey="verified" fill="#C7D2FE" radius={[4, 4, 0, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Saved reports */}
        <div className="bg-white rounded-card shadow-soft p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-ascend-blue" />
              <h3 className="font-bold text-ascend-text text-lg">Saved Reports</h3>
            </div>
            <button className="text-xs font-bold text-ascend-blue hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            {savedReports.map((r) => (
              <div
                key={r.title}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-ascend-light-blue transition-colors cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-ascend-light-blue flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-ascend-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-ascend-text truncate">{r.title}</p>
                  <p className="text-xs text-ascend-subtext">{r.date} · {r.pages}pp</p>
                </div>
                <button className="w-7 h-7 flex items-center justify-center text-ascend-subtext group-hover:text-ascend-blue transition-colors">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-ascend-border">
            <button className="w-full flex items-center justify-center gap-2 text-sm font-bold text-ascend-blue hover:bg-ascend-light-blue py-2.5 rounded-xl transition-colors">
              <FileText className="w-4 h-4" />
              Generate New Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;
