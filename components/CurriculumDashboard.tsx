import React, { useState } from "react";
import {
  Layers, PlayCircle, Clock, Users, CheckCircle2,
  Plus, ChevronRight, ArrowUpRight, BookOpen, Zap,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const completionData = [
  { week: "Wk 1", completions: 8 },
  { week: "Wk 2", completions: 14 },
  { week: "Wk 3", completions: 11 },
  { week: "Wk 4", completions: 19 },
  { week: "Wk 5", completions: 24 },
  { week: "Wk 6", completions: 21 },
];

const barColors = ["#C7D2FE", "#A5B4FC", "#818CF8", "#6366F1", "#4F46E5", "#4318FF"];

const workshops = [
  {
    id: 1,
    title: "Gen-AI Ethics & Responsible Use",
    skill: "Ethical AI Reasoning",
    enrolled: 24,
    duration: "6 min",
    status: "active",
    completionRate: 71,
    partner: "OpenAI",
  },
  {
    id: 2,
    title: "Cross-Cultural Communication in Global Teams",
    skill: "Cross-Cultural Comm.",
    enrolled: 18,
    duration: "5 min",
    status: "active",
    completionRate: 58,
    partner: "Deloitte",
  },
  {
    id: 3,
    title: "Strategic Foresight for Business Leaders",
    skill: "Strategic Foresight",
    enrolled: 12,
    duration: "7 min",
    status: "draft",
    completionRate: 0,
    partner: "BlackRock",
  },
  {
    id: 4,
    title: "Crisis Response Operations",
    skill: "Crisis Response",
    enrolled: 31,
    duration: "8 min",
    status: "active",
    completionRate: 84,
    partner: "Tesla",
  },
  {
    id: 5,
    title: "Resilience Under Pressure",
    skill: "Resilience",
    enrolled: 0,
    duration: "5 min",
    status: "planned",
    completionRate: 0,
    partner: "—",
  },
];

const tooltipStyle = {
  borderRadius: 12,
  border: "none",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  fontFamily: "DM Sans, sans-serif",
};

const CurriculumDashboard: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "active" | "draft" | "planned">("all");

  const filtered = filter === "all" ? workshops : workshops.filter((w) => w.status === filter);

  return (
    <div className="flex flex-col gap-8 w-full pb-10 animate-in fade-in duration-500">

      {/* Stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Workshops", value: "3", sub: "Currently running", icon: PlayCircle, color: "text-ascend-blue", bg: "bg-ascend-light-blue" },
          { label: "Total Enrolled", value: "85", sub: "Across all modules", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
          { label: "Avg. Duration", value: "6.2 min", sub: "Per workshop", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
          { label: "Avg. Completion", value: "71%", sub: "Active workshops", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
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

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Workshop list */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-ascend-blue" />
              <h3 className="font-bold text-ascend-text text-lg">Workshop Library</h3>
            </div>
            <div className="flex items-center gap-2">
              {(["all", "active", "draft", "planned"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize transition-colors ${
                    filter === f
                      ? "bg-ascend-blue text-white"
                      : "bg-ascend-light-blue text-ascend-text hover:bg-indigo-100"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {filtered.map((ws) => (
              <div
                key={ws.id}
                className="bg-white rounded-card shadow-soft p-5 flex flex-col gap-3 hover:shadow-crisp transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-ascend-light-blue flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-ascend-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-ascend-text text-sm">{ws.title}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        ws.status === "active"
                          ? "bg-green-50 text-green-700"
                          : ws.status === "draft"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {ws.status.charAt(0).toUpperCase() + ws.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-xs text-ascend-blue font-bold mt-0.5">{ws.skill}</p>
                    <div className="flex items-center gap-4 mt-1.5">
                      <span className="flex items-center gap-1 text-xs text-ascend-subtext">
                        <Users className="w-3 h-3" /> {ws.enrolled} enrolled
                      </span>
                      <span className="flex items-center gap-1 text-xs text-ascend-subtext">
                        <Clock className="w-3 h-3" /> {ws.duration}
                      </span>
                      <span className="text-xs text-ascend-subtext">Partner: {ws.partner}</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-xs font-bold text-ascend-blue hover:underline flex-shrink-0">
                    View <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {ws.status === "active" && (
                  <div>
                    <div className="flex justify-between text-xs text-ascend-subtext mb-1">
                      <span>Completion Rate</span>
                      <span className="font-bold text-ascend-text">{ws.completionRate}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-ascend-blue transition-all"
                        style={{ width: `${ws.completionRate}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="bg-white rounded-card shadow-soft p-10 flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-gray-500" />
                </div>
                <p className="font-bold text-ascend-text">No workshops in this category</p>
                <p className="text-xs text-gray-600">Switch the filter or create a new workshop.</p>
              </div>
            )}
          </div>

          <button className="flex items-center justify-center gap-2 bg-white rounded-card shadow-crisp px-5 py-3 text-sm font-bold text-ascend-blue hover:bg-ascend-light-blue transition-colors border border-dashed border-ascend-border">
            <Plus className="w-4 h-4" />
            Create New Workshop
          </button>
        </div>

        {/* Right: Completion trend + quick actions */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-card shadow-soft p-6">
            <div className="mb-5">
              <h3 className="font-bold text-ascend-text text-lg">Completion Trend</h3>
              <p className="text-xs text-ascend-subtext mt-0.5">Total completions per week across all workshops</p>
            </div>
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completionData} margin={{ top: 0, right: 0, left: -15, bottom: 0 }}>
                  <XAxis dataKey="week" tick={{ fill: "#5A6A8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#5A6A8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => [v, "Completions"]} contentStyle={tooltipStyle} />
                  <Bar dataKey="completions" radius={[6, 6, 0, 0]} barSize={22}>
                    {completionData.map((_, i) => (
                      <Cell key={i} fill={barColors[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-card shadow-crisp p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-ascend-subtext mb-4">AI Suggestions</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Gap: Prompt Engineering", sub: "No workshop covers this yet", cta: "Create Workshop" },
                { label: "Low retention: Systems Thinking", sub: "Completion 22% below target", cta: "Diagnose" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl bg-ascend-light-blue flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-ascend-blue flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-ascend-text">{item.label}</p>
                      <p className="text-xs text-ascend-subtext">{item.sub}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-xs font-bold text-ascend-blue hover:underline self-end">
                    {item.cta} <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumDashboard;
