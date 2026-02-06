import React, { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  BookOpen,
  BrainCircuit,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  Filter,
  Lightbulb,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Play,
  Plus,
  Radio,
  RefreshCw,
  Send,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
} from "recharts";

// Types
interface SkillGapAlert {
  id: string;
  skill: string;
  severity: "critical" | "moderate" | "emerging";
  affectedStudents: number;
  industryDemand: number;
  currentCoverage: number;
  source: string;
  detectedAt: string;
  status: "new" | "reviewing" | "addressed";
}

interface Student {
  id: string;
  name: string;
  avatar: string;
  program: string;
  skillBefore: number;
  skillAfter: number;
  workshopsAttended: number;
  reflections: number;
  lastActive: string;
}

// Mock Data
const skillGapAlerts: SkillGapAlert[] = [
  {
    id: "1",
    skill: "Ethical AI Reasoning",
    severity: "critical",
    affectedStudents: 342,
    industryDemand: 89,
    currentCoverage: 12,
    source: "Deloitte Job Postings",
    detectedAt: "2 hours ago",
    status: "new",
  },
  {
    id: "2",
    skill: "Systems Thinking",
    severity: "moderate",
    affectedStudents: 218,
    industryDemand: 76,
    currentCoverage: 34,
    source: "LinkedIn Trends",
    detectedAt: "1 day ago",
    status: "reviewing",
  },
  {
    id: "3",
    skill: "Cross-Cultural Communication",
    severity: "emerging",
    affectedStudents: 156,
    industryDemand: 62,
    currentCoverage: 45,
    source: "Partner Feedback",
    detectedAt: "3 days ago",
    status: "addressed",
  },
];

const marketTrajectoryData = [
  { month: "Jan", demand: 4200, supply: 3800 },
  { month: "Feb", demand: 3800, supply: 3200 },
  { month: "Mar", demand: 6800, supply: 4500 },
  { month: "Apr", demand: 5200, supply: 4800 },
  { month: "May", demand: 4800, supply: 5200 },
  { month: "Jun", demand: 5500, supply: 5800 },
  { month: "Jul", demand: 5200, supply: 6100 },
];

const studentProgressData: Student[] = [
  {
    id: "1",
    name: "Aiyana Youngblood",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
    program: "Social Sciences",
    skillBefore: 23,
    skillAfter: 67,
    workshopsAttended: 3,
    reflections: 8,
    lastActive: "2h ago",
  },
  {
    id: "2",
    name: "Marcus Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    program: "Business",
    skillBefore: 31,
    skillAfter: 72,
    workshopsAttended: 4,
    reflections: 12,
    lastActive: "1h ago",
  },
  {
    id: "3",
    name: "Priya Sharma",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    program: "Psychology",
    skillBefore: 18,
    skillAfter: 54,
    workshopsAttended: 2,
    reflections: 5,
    lastActive: "30m ago",
  },
  {
    id: "4",
    name: "Jordan Williams",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200",
    program: "Sociology",
    skillBefore: 42,
    skillAfter: 89,
    workshopsAttended: 5,
    reflections: 15,
    lastActive: "15m ago",
  },
];

const cohortProgressData = [
  { week: "Week 1", avgSkill: 25, engagement: 45 },
  { week: "Week 2", avgSkill: 38, engagement: 62 },
  { week: "Week 3", avgSkill: 52, engagement: 78 },
  { week: "Week 4", avgSkill: 64, engagement: 85 },
  { week: "Week 5", avgSkill: 71, engagement: 88 },
  { week: "Week 6", avgSkill: 78, engagement: 91 },
];

// Component: Skill Gap Alert Card
const SkillGapAlertCard: React.FC<{
  alert: SkillGapAlert;
  onTakeAction: (id: string) => void;
  isExpanded: boolean;
  onExpand: () => void;
}> = ({ alert, onTakeAction, isExpanded, onExpand }) => {
  const severityStyles = {
    critical: {
      bg: "bg-red-50",
      border: "border-red-200",
      badge: "bg-red-500 text-white",
      icon: "text-red-500",
    },
    moderate: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      badge: "bg-amber-500 text-white",
      icon: "text-amber-500",
    },
    emerging: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      badge: "bg-blue-500 text-white",
      icon: "text-blue-500",
    },
  };

  const styles = severityStyles[alert.severity];

  return (
    <div
      className={`${styles.bg} ${styles.border} border-2 rounded-2xl p-5 transition-all hover:shadow-lg cursor-pointer ${isExpanded ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
      onClick={onExpand}
    >
      <div className='flex items-start justify-between mb-3'>
        <div className='flex items-center gap-3'>
          <div
            className={`w-10 h-10 rounded-xl ${styles.badge} flex items-center justify-center`}
          >
            <AlertTriangle className='w-5 h-5' />
          </div>
          <div>
            <h4 className='font-black text-slate-900 text-sm'>{alert.skill}</h4>
            <p className='text-[10px] text-slate-500 font-medium'>
              {alert.source}
            </p>
          </div>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${styles.badge}`}
        >
          {alert.severity}
        </span>
      </div>

      <div className='grid grid-cols-3 gap-3 mb-4'>
        <div className='text-center p-2 bg-white/60 rounded-xl'>
          <p className='text-lg font-black text-slate-900'>
            {alert.affectedStudents}
          </p>
          <p className='text-[9px] font-bold text-slate-500 uppercase'>
            Students
          </p>
        </div>
        <div className='text-center p-2 bg-white/60 rounded-xl'>
          <p className='text-lg font-black text-green-600'>
            +{alert.industryDemand}%
          </p>
          <p className='text-[9px] font-bold text-slate-500 uppercase'>
            Demand
          </p>
        </div>
        <div className='text-center p-2 bg-white/60 rounded-xl'>
          <p className='text-lg font-black text-red-600'>
            {alert.currentCoverage}%
          </p>
          <p className='text-[9px] font-bold text-slate-500 uppercase'>
            Coverage
          </p>
        </div>
      </div>

      {isExpanded && (
        <div className='mt-4 pt-4 border-t border-slate-200 space-y-3 animate-in fade-in duration-300'>
          <p className='text-xs text-slate-600 leading-relaxed'>
            <strong>Gap Analysis:</strong> Industry demand for {alert.skill} has
            increased {alert.industryDemand}% this quarter, but only{" "}
            {alert.currentCoverage}% of our curriculum addresses this skill.{" "}
            {alert.affectedStudents} students in relevant programs need
            intervention.
          </p>
          <div className='flex gap-2'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTakeAction(alert.id);
              }}
              className='flex-1 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2'
            >
              <Zap className='w-3.5 h-3.5' /> Create Workshop
            </button>
            <button className='py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors'>
              Dismiss
            </button>
          </div>
        </div>
      )}

      <p className='text-[10px] text-slate-400 mt-3'>{alert.detectedAt}</p>
    </div>
  );
};

// Component: Workshop Creation Modal
const WorkshopCreationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  skillGap: string;
  onComplete: () => void;
}> = ({ isOpen, onClose, skillGap, onComplete }) => {
  const [step, setStep] = useState(0);
  const [workshopData, setWorkshopData] = useState({
    title: `${skillGap} Fundamentals`,
    duration: "45 min",
    capacity: 30,
    targetSkills: [skillGap, "Critical Thinking", "Adaptability"],
    notifyStudents: true,
  });

  if (!isOpen) return null;

  const steps = [
    { title: "Workshop Details", icon: <BookOpen className='w-5 h-5' /> },
    { title: "Target Audience", icon: <Users className='w-5 h-5' /> },
    { title: "Schedule & Launch", icon: <Calendar className='w-5 h-5' /> },
  ];

  return (
    <div className='fixed inset-0 z-[200] flex items-center justify-center p-6'>
      <div
        className='absolute inset-0 bg-slate-900/60 backdrop-blur-md'
        onClick={onClose}
      ></div>

      <div className='relative bg-white rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300'>
        {/* Progress */}
        <div className='h-1.5 bg-slate-100'>
          <div
            className='h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500'
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        {/* Header */}
        <div className='p-6 border-b border-slate-100 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center'>
              {steps[step].icon}
            </div>
            <div>
              <h3 className='font-black text-slate-900 text-lg'>
                Create Workshop
              </h3>
              <p className='text-xs text-slate-500 font-medium'>
                Step {step + 1} of {steps.length}: {steps[step].title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Content */}
        <div className='p-8'>
          {step === 0 && (
            <div className='space-y-6 animate-in fade-in duration-300'>
              <div className='bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-4 border border-red-100'>
                <div className='flex items-center gap-2 mb-2'>
                  <AlertTriangle className='w-4 h-4 text-red-500' />
                  <span className='text-xs font-bold text-red-700'>
                    Addressing Skill Gap
                  </span>
                </div>
                <p className='text-sm font-bold text-slate-800'>{skillGap}</p>
              </div>

              <div>
                <label className='block text-xs font-bold text-slate-600 mb-2'>
                  Workshop Title
                </label>
                <input
                  type='text'
                  value={workshopData.title}
                  onChange={(e) =>
                    setWorkshopData({ ...workshopData, title: e.target.value })
                  }
                  className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:border-blue-400 transition-colors'
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-xs font-bold text-slate-600 mb-2'>
                    Duration
                  </label>
                  <select
                    value={workshopData.duration}
                    onChange={(e) =>
                      setWorkshopData({
                        ...workshopData,
                        duration: e.target.value,
                      })
                    }
                    className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:border-blue-400 transition-colors'
                  >
                    <option>30 min</option>
                    <option>45 min</option>
                    <option>60 min</option>
                    <option>90 min</option>
                  </select>
                </div>
                <div>
                  <label className='block text-xs font-bold text-slate-600 mb-2'>
                    Capacity
                  </label>
                  <input
                    type='number'
                    value={workshopData.capacity}
                    onChange={(e) =>
                      setWorkshopData({
                        ...workshopData,
                        capacity: parseInt(e.target.value),
                      })
                    }
                    className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:border-blue-400 transition-colors'
                  />
                </div>
              </div>

              <div>
                <label className='block text-xs font-bold text-slate-600 mb-2'>
                  Skills Covered
                </label>
                <div className='flex flex-wrap gap-2'>
                  {workshopData.targetSkills.map((skill) => (
                    <span
                      key={skill}
                      className='px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold'
                    >
                      {skill}
                    </span>
                  ))}
                  <button className='px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-1'>
                    <Plus className='w-3 h-3' /> Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className='space-y-6 animate-in fade-in duration-300'>
              <div className='bg-slate-50 rounded-2xl p-5 border border-slate-200'>
                <div className='flex items-center justify-between mb-4'>
                  <h4 className='font-bold text-slate-800'>
                    Auto-Selected Students
                  </h4>
                  <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold'>
                    342 students
                  </span>
                </div>
                <p className='text-sm text-slate-600 mb-4'>
                  Based on skill gap analysis, these students have been
                  identified as needing this workshop:
                </p>
                <div className='space-y-3'>
                  {studentProgressData.slice(0, 3).map((student) => (
                    <div
                      key={student.id}
                      className='flex items-center gap-3 p-3 bg-white rounded-xl'
                    >
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className='w-10 h-10 rounded-full object-cover'
                      />
                      <div className='flex-1'>
                        <p className='text-sm font-bold text-slate-800'>
                          {student.name}
                        </p>
                        <p className='text-[10px] text-slate-500'>
                          {student.program}
                        </p>
                      </div>
                      <span className='text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded'>
                        {student.skillBefore}% current
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200'>
                <div className='flex items-center gap-3'>
                  <Bell className='w-5 h-5 text-green-600' />
                  <div>
                    <p className='text-sm font-bold text-slate-800'>
                      Auto-notify students
                    </p>
                    <p className='text-xs text-slate-500'>
                      Send push notification when workshop is live
                    </p>
                  </div>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={workshopData.notifyStudents}
                    onChange={(e) =>
                      setWorkshopData({
                        ...workshopData,
                        notifyStudents: e.target.checked,
                      })
                    }
                    className='sr-only peer'
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className='space-y-6 animate-in fade-in duration-300'>
              <div className='bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white'>
                <h4 className='font-black text-xl mb-2'>
                  Workshop Ready to Launch!
                </h4>
                <p className='text-blue-100 text-sm mb-4'>
                  "{workshopData.title}" will be available immediately after
                  launch.
                </p>
                <div className='grid grid-cols-3 gap-4'>
                  <div className='text-center'>
                    <p className='text-2xl font-black'>342</p>
                    <p className='text-[10px] text-blue-200 uppercase'>
                      Students Notified
                    </p>
                  </div>
                  <div className='text-center'>
                    <p className='text-2xl font-black'>
                      {workshopData.duration}
                    </p>
                    <p className='text-[10px] text-blue-200 uppercase'>
                      Duration
                    </p>
                  </div>
                  <div className='text-center'>
                    <p className='text-2xl font-black'>
                      {workshopData.capacity}
                    </p>
                    <p className='text-[10px] text-blue-200 uppercase'>
                      Capacity
                    </p>
                  </div>
                </div>
              </div>

              <div className='bg-amber-50 rounded-2xl p-4 border border-amber-200'>
                <div className='flex items-start gap-3'>
                  <Lightbulb className='w-5 h-5 text-amber-600 shrink-0 mt-0.5' />
                  <div>
                    <p className='text-sm font-bold text-slate-800 mb-1'>
                      AI Recommendation
                    </p>
                    <p className='text-xs text-slate-600'>
                      Based on student schedules, Tuesday 2:00 PM has the
                      highest availability. Consider scheduling the first
                      session then.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='p-6 border-t border-slate-100 flex justify-between'>
          <button
            onClick={() => step > 0 && setStep(step - 1)}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-colors ${
              step === 0
                ? "text-slate-300 cursor-not-allowed"
                : "text-slate-600 hover:bg-slate-100"
            }`}
            disabled={step === 0}
          >
            Back
          </button>
          <button
            onClick={() => {
              if (step < steps.length - 1) {
                setStep(step + 1);
              } else {
                onComplete();
              }
            }}
            className='px-8 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors flex items-center gap-2'
          >
            {step === steps.length - 1 ? (
              <>
                <Play className='w-4 h-4' /> Launch Workshop
              </>
            ) : (
              <>
                Continue <ArrowRight className='w-4 h-4' />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const AdvisorJourneyDashboard: React.FC = () => {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [isCreatingWorkshop, setIsCreatingWorkshop] = useState(false);
  const [selectedSkillGap, setSelectedSkillGap] = useState("");
  const [activeView, setActiveView] = useState<"alerts" | "progress">("alerts");
  const [workshopLaunched, setWorkshopLaunched] = useState(false);

  const handleTakeAction = (alertId: string) => {
    const alert = skillGapAlerts.find((a) => a.id === alertId);
    if (alert) {
      setSelectedSkillGap(alert.skill);
      setIsCreatingWorkshop(true);
    }
  };

  const handleWorkshopComplete = () => {
    setIsCreatingWorkshop(false);
    setWorkshopLaunched(true);
    setActiveView("progress");
  };

  return (
    <div className='flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-10 animate-in fade-in duration-500'>
      {/* Header */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4'>
        <div>
          <h2 className='text-3xl font-bold text-ascend-text tracking-tight mb-2'>
            Advisor Command Center
          </h2>
          <p className='text-ascend-subtext text-sm font-medium'>
            Monitor skill gaps, adapt curricula, and track student progress in
            real-time.
          </p>
        </div>
        <div className='flex gap-3'>
          <button
            onClick={() => setActiveView("alerts")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeView === "alerts"
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Bell className='w-4 h-4' /> Skill Gap Alerts
          </button>
          <button
            onClick={() => setActiveView("progress")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeView === "progress"
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <TrendingUp className='w-4 h-4' /> Student Progress
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {workshopLaunched && (
        <div className='bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-5 text-white flex items-center justify-between animate-in slide-in-from-top duration-500'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center'>
              <CheckCircle2 className='w-6 h-6' />
            </div>
            <div>
              <h3 className='font-black text-lg'>
                Workshop Launched Successfully!
              </h3>
              <p className='text-green-100 text-sm'>
                342 students have been notified. Tracking progress below.
              </p>
            </div>
          </div>
          <button
            onClick={() => setWorkshopLaunched(false)}
            className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors'
          >
            <X className='w-4 h-4' />
          </button>
        </div>
      )}

      {activeView === "alerts" ? (
        <>
          {/* Market Trajectory Chart */}
          <div className='bg-white rounded-[32px] border border-slate-200 shadow-sm p-8'>
            <div className='flex items-center justify-between mb-6'>
              <div>
                <h3 className='text-xl font-bold text-slate-900'>
                  Market Trajectory
                </h3>
                <p className='text-xs text-slate-500 font-medium'>
                  Industry demand vs. student skill supply
                </p>
              </div>
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-2 text-xs font-bold text-slate-500'>
                  <div className='w-3 h-3 rounded-full bg-emerald-500'></div>{" "}
                  Supply
                </div>
                <div className='flex items-center gap-2 text-xs font-bold text-slate-500'>
                  <div className='w-3 h-3 rounded-full bg-blue-500'></div>{" "}
                  Demand
                </div>
                <div className='flex bg-slate-100 rounded-lg p-1 ml-4'>
                  {["1W", "1M", "1Y"].map((period) => (
                    <button
                      key={period}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        period === "1M"
                          ? "bg-white shadow-sm text-slate-900"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className='h-[280px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart
                  data={marketTrajectoryData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id='colorDemand'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop offset='5%' stopColor='#3B82F6' stopOpacity={0.2} />
                      <stop offset='95%' stopColor='#3B82F6' stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id='colorSupply'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop offset='5%' stopColor='#10B981' stopOpacity={0.2} />
                      <stop offset='95%' stopColor='#10B981' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray='3 3'
                    vertical={false}
                    stroke='#E2E8F0'
                  />
                  <XAxis
                    dataKey='month'
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type='monotone'
                    dataKey='demand'
                    stroke='#3B82F6'
                    strokeWidth={3}
                    fillOpacity={1}
                    fill='url(#colorDemand)'
                  />
                  <Area
                    type='monotone'
                    dataKey='supply'
                    stroke='#10B981'
                    strokeWidth={3}
                    fillOpacity={1}
                    fill='url(#colorSupply)'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* AI Executive Summary */}
            <div className='mt-6 pt-6 border-t border-slate-100 flex items-center gap-6'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center'>
                  <BrainCircuit className='w-5 h-5 text-purple-600' />
                </div>
                <div>
                  <p className='text-xs font-bold text-slate-400 uppercase'>
                    AI Executive Summary
                  </p>
                  <p className='text-xs text-slate-600 font-medium'>
                    Live Analysis
                  </p>
                </div>
              </div>
              <div className='w-px h-10 bg-slate-200'></div>
              <div className='flex items-start gap-2'>
                <Sparkles className='w-4 h-4 text-purple-500 shrink-0 mt-0.5' />
                <p className='text-sm text-slate-700'>
                  <span className='font-bold text-purple-600'>
                    Velocity Alert:
                  </span>{" "}
                  Systems Thinking demand rose{" "}
                  <span className='font-bold text-green-600'>+12%</span> vs
                  narrow coding roles.
                </p>
              </div>
              <div className='w-px h-10 bg-slate-200'></div>
              <div className='flex items-start gap-2'>
                <TrendingUp className='w-4 h-4 text-emerald-500 shrink-0 mt-0.5' />
                <p className='text-sm text-slate-700'>
                  <span className='font-bold text-emerald-600'>
                    Supply Gap:
                  </span>{" "}
                  Ethical Leadership roles unfilled for 45d.{" "}
                  <span className='underline cursor-pointer hover:text-blue-600'>
                    Intervention needed.
                  </span>
                </p>
              </div>
              <button className='ml-auto px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2'>
                <Lightbulb className='w-4 h-4' /> Deep Analysis
              </button>
            </div>
          </div>

          {/* Skill Gap Alerts Grid */}
          <div>
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center'>
                  <AlertTriangle className='w-5 h-5 text-red-600' />
                </div>
                <div>
                  <h3 className='text-xl font-bold text-slate-900'>
                    Active Skill Gap Alerts
                  </h3>
                  <p className='text-xs text-slate-500 font-medium'>
                    Detected from market signals & partner feedback
                  </p>
                </div>
              </div>
              <span className='px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-xs font-bold'>
                3 Alerts Pending
              </span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {skillGapAlerts.map((alert) => (
                <SkillGapAlertCard
                  key={alert.id}
                  alert={alert}
                  onTakeAction={handleTakeAction}
                  isExpanded={expandedAlert === alert.id}
                  onExpand={() =>
                    setExpandedAlert(
                      expandedAlert === alert.id ? null : alert.id,
                    )
                  }
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Student Progress View */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Cohort Progress Chart */}
            <div className='lg:col-span-2 bg-white rounded-[32px] border border-slate-200 shadow-sm p-8'>
              <div className='flex items-center justify-between mb-6'>
                <div>
                  <h3 className='text-xl font-bold text-slate-900'>
                    Cohort Skill Growth
                  </h3>
                  <p className='text-xs text-slate-500 font-medium'>
                    Students enrolled in "Ethical AI Reasoning Fundamentals"
                  </p>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-2 text-xs font-bold text-slate-500'>
                    <div className='w-3 h-3 rounded-full bg-blue-500'></div> Avg
                    Skill
                  </div>
                  <div className='flex items-center gap-2 text-xs font-bold text-slate-500'>
                    <div className='w-3 h-3 rounded-full bg-emerald-500'></div>{" "}
                    Engagement
                  </div>
                </div>
              </div>

              <div className='h-[280px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart
                    data={cohortProgressData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      vertical={false}
                      stroke='#E2E8F0'
                    />
                    <XAxis
                      dataKey='week'
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94A3B8", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94A3B8", fontSize: 12 }}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Line
                      type='monotone'
                      dataKey='avgSkill'
                      stroke='#3B82F6'
                      strokeWidth={3}
                      dot={{ fill: "#3B82F6", strokeWidth: 2 }}
                    />
                    <Line
                      type='monotone'
                      dataKey='engagement'
                      stroke='#10B981'
                      strokeWidth={3}
                      dot={{ fill: "#10B981", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className='mt-6 grid grid-cols-4 gap-4'>
                <div className='text-center p-4 bg-blue-50 rounded-2xl'>
                  <p className='text-2xl font-black text-blue-600'>+53%</p>
                  <p className='text-[10px] font-bold text-slate-500 uppercase'>
                    Avg Skill Growth
                  </p>
                </div>
                <div className='text-center p-4 bg-green-50 rounded-2xl'>
                  <p className='text-2xl font-black text-green-600'>91%</p>
                  <p className='text-[10px] font-bold text-slate-500 uppercase'>
                    Completion Rate
                  </p>
                </div>
                <div className='text-center p-4 bg-purple-50 rounded-2xl'>
                  <p className='text-2xl font-black text-purple-600'>4.8</p>
                  <p className='text-[10px] font-bold text-slate-500 uppercase'>
                    Satisfaction
                  </p>
                </div>
                <div className='text-center p-4 bg-orange-50 rounded-2xl'>
                  <p className='text-2xl font-black text-orange-600'>312</p>
                  <p className='text-[10px] font-bold text-slate-500 uppercase'>
                    Reflections
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className='space-y-6'>
              <div className='bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-6 text-white'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center'>
                    <Target className='w-5 h-5' />
                  </div>
                  <div>
                    <p className='text-xs text-slate-400 font-bold uppercase'>
                      Gap Closure
                    </p>
                    <p className='text-2xl font-black'>78%</p>
                  </div>
                </div>
                <p className='text-sm text-slate-300'>
                  The curriculum intervention is closing the Ethical AI
                  Reasoning gap faster than projected.
                </p>
                <div className='mt-4 w-full h-2 bg-white/20 rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full'
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>

              <div className='bg-white rounded-[32px] border border-slate-200 shadow-sm p-6'>
                <h4 className='font-bold text-slate-900 mb-4 flex items-center gap-2'>
                  <MessageCircle className='w-5 h-5 text-blue-500' /> Recent
                  Reflections
                </h4>
                <div className='space-y-3'>
                  <div className='p-3 bg-slate-50 rounded-xl'>
                    <p className='text-xs text-slate-600 italic'>
                      "The workshop helped me understand why ethical AI matters
                      in my future career..."
                    </p>
                    <p className='text-[10px] text-slate-400 mt-2'>
                      — Aiyana Y., 2h ago
                    </p>
                  </div>
                  <div className='p-3 bg-slate-50 rounded-xl'>
                    <p className='text-xs text-slate-600 italic'>
                      "Finally clicked! I can see how this connects to policy
                      work."
                    </p>
                    <p className='text-[10px] text-slate-400 mt-2'>
                      — Marcus C., 4h ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Individual Student Progress */}
          <div className='bg-white rounded-[32px] border border-slate-200 shadow-sm p-8'>
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center'>
                  <Users className='w-5 h-5 text-emerald-600' />
                </div>
                <div>
                  <h3 className='text-xl font-bold text-slate-900'>
                    Individual Progress
                  </h3>
                  <p className='text-xs text-slate-500 font-medium'>
                    Track each student's skill development
                  </p>
                </div>
              </div>
              <button className='px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2'>
                <Filter className='w-4 h-4' /> Filter
              </button>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-slate-100'>
                    <th className='text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase'>
                      Student
                    </th>
                    <th className='text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase'>
                      Program
                    </th>
                    <th className='text-center py-3 px-4 text-xs font-bold text-slate-500 uppercase'>
                      Before
                    </th>
                    <th className='text-center py-3 px-4 text-xs font-bold text-slate-500 uppercase'>
                      After
                    </th>
                    <th className='text-center py-3 px-4 text-xs font-bold text-slate-500 uppercase'>
                      Growth
                    </th>
                    <th className='text-center py-3 px-4 text-xs font-bold text-slate-500 uppercase'>
                      Workshops
                    </th>
                    <th className='text-center py-3 px-4 text-xs font-bold text-slate-500 uppercase'>
                      Reflections
                    </th>
                    <th className='text-right py-3 px-4 text-xs font-bold text-slate-500 uppercase'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {studentProgressData.map((student) => (
                    <tr
                      key={student.id}
                      className='border-b border-slate-50 hover:bg-slate-50 transition-colors'
                    >
                      <td className='py-4 px-4'>
                        <div className='flex items-center gap-3'>
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className='w-10 h-10 rounded-full object-cover'
                          />
                          <div>
                            <p className='font-bold text-sm text-slate-900'>
                              {student.name}
                            </p>
                            <p className='text-[10px] text-slate-500'>
                              {student.lastActive}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='py-4 px-4'>
                        <span className='text-sm text-slate-600'>
                          {student.program}
                        </span>
                      </td>
                      <td className='py-4 px-4 text-center'>
                        <span className='text-sm font-bold text-red-600'>
                          {student.skillBefore}%
                        </span>
                      </td>
                      <td className='py-4 px-4 text-center'>
                        <span className='text-sm font-bold text-green-600'>
                          {student.skillAfter}%
                        </span>
                      </td>
                      <td className='py-4 px-4 text-center'>
                        <span className='px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold'>
                          +{student.skillAfter - student.skillBefore}%
                        </span>
                      </td>
                      <td className='py-4 px-4 text-center'>
                        <span className='text-sm font-bold text-slate-700'>
                          {student.workshopsAttended}
                        </span>
                      </td>
                      <td className='py-4 px-4 text-center'>
                        <span className='text-sm font-bold text-slate-700'>
                          {student.reflections}
                        </span>
                      </td>
                      <td className='py-4 px-4 text-right'>
                        <button className='p-2 hover:bg-slate-100 rounded-lg transition-colors'>
                          <Eye className='w-4 h-4 text-slate-400' />
                        </button>
                        <button className='p-2 hover:bg-slate-100 rounded-lg transition-colors'>
                          <MessageCircle className='w-4 h-4 text-slate-400' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Workshop Creation Modal */}
      <WorkshopCreationModal
        isOpen={isCreatingWorkshop}
        onClose={() => setIsCreatingWorkshop(false)}
        skillGap={selectedSkillGap}
        onComplete={handleWorkshopComplete}
      />
    </div>
  );
};

export default AdvisorJourneyDashboard;
