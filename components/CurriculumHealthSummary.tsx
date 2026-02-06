import React from "react";
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Target,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  Zap,
  BarChart3,
  GraduationCap,
} from "lucide-react";

const CurriculumHealthSummary: React.FC = () => {
  const healthScore = 78;
  const metrics = {
    activeWorkshops: 24,
    totalEnrollment: 1247,
    avgEngagement: 84,
    gapsClosed: 67,
    gapsRemaining: 12,
    weeklyGrowth: 12,
  };

  const topGaps = [
    {
      skill: "Ethical AI Reasoning",
      severity: "critical",
      students: 342,
      coverage: 12,
    },
    {
      skill: "Systems Thinking",
      severity: "moderate",
      students: 218,
      coverage: 34,
    },
    {
      skill: "Cross-Cultural Comm.",
      severity: "low",
      students: 156,
      coverage: 45,
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "moderate":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className='bg-white rounded-[32px] p-8 border border-ascend-border shadow-soft h-full flex flex-col relative overflow-hidden group hover:border-ascend-blue/30 transition-all'>
      {/* Header */}
      <div className='flex justify-between items-start mb-6'>
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <span className='w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse'></span>
            <span className='text-[11px] font-extrabold text-ascend-subtext uppercase tracking-widest'>
              System Health
            </span>
          </div>
          <h3 className='text-2xl font-bold text-ascend-text tracking-tight'>
            Curriculum Overview
          </h3>
        </div>
        <div className='bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-3 rounded-2xl shadow-lg'>
          <BarChart3 className='w-6 h-6' />
        </div>
      </div>

      {/* Main Health Score */}
      <div className='flex items-center gap-6 mb-6 p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200'>
        <div className='relative'>
          <svg className='w-24 h-24 transform -rotate-90'>
            <circle
              cx='48'
              cy='48'
              r='40'
              stroke='#E2E8F0'
              strokeWidth='8'
              fill='none'
            />
            <circle
              cx='48'
              cy='48'
              r='40'
              stroke='url(#healthGradient)'
              strokeWidth='8'
              fill='none'
              strokeLinecap='round'
              strokeDasharray={`${(healthScore / 100) * 251.2} 251.2`}
            />
            <defs>
              <linearGradient
                id='healthGradient'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='0%'
              >
                <stop offset='0%' stopColor='#3B82F6' />
                <stop offset='100%' stopColor='#10B981' />
              </linearGradient>
            </defs>
          </svg>
          <div className='absolute inset-0 flex items-center justify-center'>
            <span
              className={`text-2xl font-black ${getHealthColor(healthScore)}`}
            >
              {healthScore}
            </span>
          </div>
        </div>
        <div className='flex-1'>
          <p className='text-sm font-bold text-slate-800 mb-1'>
            Overall Health Score
          </p>
          <p className='text-xs text-slate-500 mb-3'>
            Based on engagement, gap closure, and satisfaction
          </p>
          <div className='flex items-center gap-2'>
            <TrendingUp className='w-4 h-4 text-emerald-500' />
            <span className='text-xs font-bold text-emerald-600'>
              +{metrics.weeklyGrowth}% this week
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className='grid grid-cols-3 gap-3 mb-6'>
        <div className='p-4 bg-blue-50 rounded-xl border border-blue-100 text-center'>
          <BookOpen className='w-5 h-5 text-blue-600 mx-auto mb-2' />
          <p className='text-xl font-black text-slate-900'>
            {metrics.activeWorkshops}
          </p>
          <p className='text-[10px] font-bold text-slate-500 uppercase'>
            Active Workshops
          </p>
        </div>
        <div className='p-4 bg-purple-50 rounded-xl border border-purple-100 text-center'>
          <Users className='w-5 h-5 text-purple-600 mx-auto mb-2' />
          <p className='text-xl font-black text-slate-900'>
            {metrics.totalEnrollment.toLocaleString()}
          </p>
          <p className='text-[10px] font-bold text-slate-500 uppercase'>
            Total Enrolled
          </p>
        </div>
        <div className='p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center'>
          <Activity className='w-5 h-5 text-emerald-600 mx-auto mb-2' />
          <p className='text-xl font-black text-slate-900'>
            {metrics.avgEngagement}%
          </p>
          <p className='text-[10px] font-bold text-slate-500 uppercase'>
            Engagement
          </p>
        </div>
      </div>

      {/* Gap Closure Progress */}
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center gap-2'>
            <Target className='w-4 h-4 text-slate-600' />
            <span className='text-sm font-bold text-slate-800'>
              Gap Closure Progress
            </span>
          </div>
          <span className='text-sm font-black text-emerald-600'>
            {metrics.gapsClosed}/{metrics.gapsClosed + metrics.gapsRemaining}
          </span>
        </div>
        <div className='w-full h-3 bg-slate-100 rounded-full overflow-hidden'>
          <div
            className='h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full relative'
            style={{
              width: `${(metrics.gapsClosed / (metrics.gapsClosed + metrics.gapsRemaining)) * 100}%`,
            }}
          >
            <div className='absolute top-0.5 left-1 right-1 h-1 bg-white/30 rounded-full'></div>
          </div>
        </div>
        <div className='flex justify-between mt-2'>
          <span className='text-[10px] font-bold text-emerald-600 flex items-center gap-1'>
            <CheckCircle2 className='w-3 h-3' /> {metrics.gapsClosed} closed
          </span>
          <span className='text-[10px] font-bold text-amber-600 flex items-center gap-1'>
            <AlertTriangle className='w-3 h-3' /> {metrics.gapsRemaining}{" "}
            remaining
          </span>
        </div>
      </div>

      {/* Priority Gaps */}
      <div className='mt-auto'>
        <p className='text-xs font-bold text-slate-500 uppercase tracking-wider mb-3'>
          Priority Skill Gaps
        </p>
        <div className='space-y-2'>
          {topGaps.map((gap, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-3 rounded-xl border ${getSeverityColor(gap.severity)}`}
            >
              <div className='flex items-center gap-3'>
                <div className='flex items-center justify-center w-6 h-6 rounded-full bg-white/60 text-xs font-black'>
                  {i + 1}
                </div>
                <div>
                  <p className='text-sm font-bold'>{gap.skill}</p>
                  <p className='text-[10px] opacity-70'>
                    {gap.students} students • {gap.coverage}% covered
                  </p>
                </div>
              </div>
              <button className='p-2 rounded-lg bg-white/60 hover:bg-white transition-colors'>
                <ArrowUpRight className='w-4 h-4' />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurriculumHealthSummary;
