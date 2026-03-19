import React, { useState } from "react";
import {
  Eye, Activity, Users, Clock, CheckCircle2, Circle,
  TrendingUp, PlayCircle, ChevronRight, ArrowUpRight,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";

const engagementData = [
  { day: "Mon", sessions: 14, completions: 9 },
  { day: "Tue", sessions: 22, completions: 17 },
  { day: "Wed", sessions: 18, completions: 13 },
  { day: "Thu", sessions: 31, completions: 24 },
  { day: "Fri", sessions: 27, completions: 20 },
  { day: "Sat", sessions: 9, completions: 6 },
  { day: "Sun", sessions: 12, completions: 8 },
];

const skillMasteryData = [
  { skill: "Ethical AI", mastery: 72 },
  { skill: "Systems Thinking", mastery: 58 },
  { skill: "Cross-Cultural", mastery: 44 },
  { skill: "Resilience", mastery: 67 },
  { skill: "Strategic Foresight", mastery: 38 },
];

const masteryColors = ["#4318FF", "#7551FF", "#3B82F6", "#22C55E", "#F97316"];

const liveStudents = [
  { name: "J. Anderson", scenario: "Crisis Response Plan", status: "in-progress", elapsed: "4:32", score: null, initials: "JA" },
  { name: "S. Chen", scenario: "Ethical AI Framework", status: "completed", elapsed: "6:14", score: 96, initials: "SC" },
  { name: "M. Davids", scenario: "Supply Chain Audit", status: "in-progress", elapsed: "2:08", score: null, initials: "MD" },
  { name: "A. Patel", scenario: "ESG Risk Model", status: "completed", elapsed: "5:50", score: 92, initials: "AP" },
  { name: "K. Williams", scenario: "Crisis Response Plan", status: "idle", elapsed: "—", score: null, initials: "KW" },
  { name: "L. Torres", scenario: "Budget Dilemma", status: "in-progress", elapsed: "1:22", score: null, initials: "LT" },
];

const tooltipStyle = {
  borderRadius: 12,
  border: "none",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  fontFamily: "DM Sans, sans-serif",
};

const ObserveDashboard: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState("All");

  const scenarios = ["All", "Crisis Response Plan", "Ethical AI Framework", "Budget Dilemma"];

  const filtered = selectedScenario === "All"
    ? liveStudents
    : liveStudents.filter((s) => s.scenario === selectedScenario);

  return (
    <div className="flex flex-col gap-8 w-full pb-10 animate-in fade-in duration-500">

      {/* Stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Now", value: "3", sub: "Students in simulation", icon: Activity, color: "text-green-500", bg: "bg-green-50" },
          { label: "Completed Today", value: "18", sub: "Out of 47 enrolled", icon: CheckCircle2, color: "text-ascend-blue", bg: "bg-ascend-light-blue" },
          { label: "Avg. Session Time", value: "5m 42s", sub: "Target: under 8 min", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
          { label: "Avg. Score", value: "88%", sub: "+6% vs last cohort", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-50" },
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

      {/* Main two-col */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Engagement chart + Skill mastery */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Engagement line chart */}
          <div className="bg-white rounded-card shadow-soft p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-ascend-text text-lg">Weekly Engagement</h3>
                <p className="text-xs text-ascend-subtext mt-0.5">Sessions started vs. completions this week</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs font-bold text-ascend-subtext">
                  <span className="w-3 h-0.5 bg-ascend-blue inline-block" /> Sessions
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-ascend-subtext">
                  <span className="w-3 h-0.5 bg-green-400 inline-block" /> Completions
                </span>
              </div>
            </div>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                  <XAxis dataKey="day" tick={{ fill: "#5A6A8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#5A6A8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="sessions" stroke="#4318FF" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="completions" stroke="#22C55E" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skill mastery bar chart */}
          <div className="bg-white rounded-card shadow-soft p-6">
            <div className="mb-5">
              <h3 className="font-bold text-ascend-text text-lg">Skill Mastery by Scenario</h3>
              <p className="text-xs text-ascend-subtext mt-0.5">Average demonstrated mastery % across all completions</p>
            </div>
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillMasteryData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
                  <XAxis dataKey="skill" tick={{ fill: "#5A6A8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fill: "#5A6A8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => [`${v}%`, "Mastery"]} contentStyle={tooltipStyle} />
                  <Bar dataKey="mastery" radius={[6, 6, 0, 0]} barSize={32}>
                    {skillMasteryData.map((_, i) => (
                      <Cell key={i} fill={masteryColors[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right: Live student activity */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-card shadow-soft p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-ascend-blue" />
                <h3 className="font-bold text-ascend-text text-lg">Live Activity</h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>

            {/* Scenario filter */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {scenarios.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedScenario(s)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-full transition-colors ${
                    selectedScenario === s
                      ? "bg-ascend-blue text-white"
                      : "bg-ascend-light-blue text-ascend-text hover:bg-indigo-100"
                  }`}
                >
                  {s === "All" ? "All" : s.split(" ").slice(0, 2).join(" ")}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2 flex-1">
              {filtered.map((student) => (
                <div
                  key={student.name}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-ascend-light-blue transition-colors cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {student.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-ascend-text text-xs">{student.name}</p>
                    <p className="text-xs text-ascend-subtext truncate">{student.scenario}</p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                      student.status === "completed"
                        ? "bg-green-50 text-green-700"
                        : student.status === "in-progress"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {student.status === "in-progress" ? "Active" : student.status === "completed" ? "Done" : "Idle"}
                    </span>
                    <span className="text-xs text-ascend-subtext">{student.elapsed}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-ascend-border">
              <button className="w-full flex items-center justify-center gap-2 text-sm font-bold text-ascend-blue hover:bg-ascend-light-blue py-2.5 rounded-xl transition-colors">
                <Users className="w-4 h-4" />
                View All Students
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObserveDashboard;
