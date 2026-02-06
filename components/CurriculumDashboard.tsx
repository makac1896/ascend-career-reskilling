import React, { useState } from "react";
import {
  Play,
  Clock,
  Users,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Zap,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  LayoutGrid,
  List,
  Sparkles,
  Tag,
  Hash,
  Trophy,
  Lightbulb,
  X,
  TrendingUp,
  MessageCircle,
  Send,
  Calendar,
  Target,
  Bell,
  Settings,
  BarChart3,
  PenTool,
  Save,
  Eye,
  RefreshCw,
} from "lucide-react";
import { GlassDNA, ClayCube, GlassGlobe, GlassLightning } from "./GlassIcons";

// Course Management Modal Component
interface CourseManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: (typeof initiatives)[0] | null;
}

const CourseManageModal: React.FC<CourseManageModalProps> = ({
  isOpen,
  onClose,
  course,
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "students" | "content" | "analytics"
  >("overview");
  const [notificationSent, setNotificationSent] = useState(false);

  if (!isOpen || !course) return null;

  const studentData = [
    {
      name: "Aiyana Youngblood",
      progress: 78,
      lastActive: "2h ago",
      status: "active",
    },
    {
      name: "Marcus Chen",
      progress: 92,
      lastActive: "30m ago",
      status: "active",
    },
    {
      name: "Priya Sharma",
      progress: 45,
      lastActive: "1d ago",
      status: "at-risk",
    },
    {
      name: "Jordan Williams",
      progress: 88,
      lastActive: "1h ago",
      status: "active",
    },
    {
      name: "Alex Rivera",
      progress: 34,
      lastActive: "3d ago",
      status: "at-risk",
    },
  ];

  const handleSendReminder = () => {
    setNotificationSent(true);
    setTimeout(() => setNotificationSent(false), 3000);
  };

  return (
    <div className='fixed inset-0 z-[200] flex items-center justify-center p-6'>
      <div
        className='absolute inset-0 bg-slate-900/60 backdrop-blur-md'
        onClick={onClose}
      ></div>

      <div className='relative bg-white rounded-[32px] w-full max-w-5xl max-h-[90vh] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col'>
        {/* Header */}
        <div className='p-6 border-b border-slate-100 flex items-center justify-between shrink-0'>
          <div className='flex items-center gap-4'>
            <div className='w-14 h-14 rounded-2xl overflow-hidden'>
              <img
                src={course.image}
                alt={course.title}
                className='w-full h-full object-cover'
              />
            </div>
            <div>
              <h3 className='font-black text-slate-900 text-xl'>
                {course.title}
              </h3>
              <p className='text-sm text-slate-500 font-medium'>
                {course.dept} • {course.partner}
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

        {/* Tab Navigation */}
        <div className='px-6 border-b border-slate-100 flex gap-1 shrink-0'>
          {[
            {
              id: "overview",
              label: "Overview",
              icon: <Eye className='w-4 h-4' />,
            },
            {
              id: "students",
              label: "Students",
              icon: <Users className='w-4 h-4' />,
            },
            {
              id: "content",
              label: "Content",
              icon: <BookOpen className='w-4 h-4' />,
            },
            {
              id: "analytics",
              label: "Analytics",
              icon: <BarChart3 className='w-4 h-4' />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3.5 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto p-6'>
          {activeTab === "overview" && (
            <div className='space-y-6 animate-in fade-in duration-300'>
              {/* Quick Stats */}
              <div className='grid grid-cols-4 gap-4'>
                <div className='bg-blue-50 rounded-2xl p-5 border border-blue-100'>
                  <Users className='w-5 h-5 text-blue-600 mb-2' />
                  <p className='text-2xl font-black text-slate-900'>
                    {course.enrolled}
                  </p>
                  <p className='text-xs font-bold text-slate-500'>Enrolled</p>
                </div>
                <div className='bg-emerald-50 rounded-2xl p-5 border border-emerald-100'>
                  <Trophy className='w-5 h-5 text-emerald-600 mb-2' />
                  <p className='text-2xl font-black text-slate-900'>
                    {course.gapClosure}%
                  </p>
                  <p className='text-xs font-bold text-slate-500'>
                    Gap Closure
                  </p>
                </div>
                <div className='bg-purple-50 rounded-2xl p-5 border border-purple-100'>
                  <TrendingUp className='w-5 h-5 text-purple-600 mb-2' />
                  <p className='text-2xl font-black text-slate-900'>+12%</p>
                  <p className='text-xs font-bold text-slate-500'>This Week</p>
                </div>
                <div className='bg-orange-50 rounded-2xl p-5 border border-orange-100'>
                  <Target className='w-5 h-5 text-orange-600 mb-2' />
                  <p className='text-2xl font-black text-slate-900'>4.8</p>
                  <p className='text-xs font-bold text-slate-500'>
                    Satisfaction
                  </p>
                </div>
              </div>

              {/* Course Rationale */}
              <div className='bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200'>
                <div className='flex items-center gap-2 mb-3'>
                  <Sparkles className='w-5 h-5 text-blue-500' />
                  <h4 className='font-bold text-slate-800'>
                    Why This Course Exists
                  </h4>
                </div>
                <p className='text-sm text-slate-600 leading-relaxed'>
                  "{course.rationale}"
                </p>
              </div>

              {/* Quick Actions */}
              <div className='grid grid-cols-2 gap-4'>
                <button
                  onClick={handleSendReminder}
                  className='p-5 bg-white border-2 border-slate-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition-all text-left group'
                >
                  <div className='flex items-center gap-3 mb-2'>
                    <Bell className='w-5 h-5 text-blue-500' />
                    <span className='font-bold text-slate-800'>
                      Send Reminder
                    </span>
                  </div>
                  <p className='text-xs text-slate-500'>
                    Notify all enrolled students
                  </p>
                  {notificationSent && (
                    <div className='mt-2 flex items-center gap-2 text-emerald-600'>
                      <CheckCircle2 className='w-4 h-4' />
                      <span className='text-xs font-bold'>
                        Sent to {course.enrolled} students!
                      </span>
                    </div>
                  )}
                </button>
                <button className='p-5 bg-white border-2 border-slate-200 rounded-2xl hover:border-purple-300 hover:bg-purple-50 transition-all text-left'>
                  <div className='flex items-center gap-3 mb-2'>
                    <Calendar className='w-5 h-5 text-purple-500' />
                    <span className='font-bold text-slate-800'>
                      Schedule Session
                    </span>
                  </div>
                  <p className='text-xs text-slate-500'>
                    Add a new workshop session
                  </p>
                </button>
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div className='space-y-4 animate-in fade-in duration-300'>
              {/* At-Risk Alert */}
              <div className='bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4'>
                <div className='w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center'>
                  <AlertCircle className='w-5 h-5 text-amber-600' />
                </div>
                <div className='flex-1'>
                  <p className='font-bold text-amber-800'>2 students at risk</p>
                  <p className='text-xs text-amber-600'>
                    They haven't engaged in 3+ days
                  </p>
                </div>
                <button className='px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 transition-colors'>
                  Reach Out
                </button>
              </div>

              {/* Student List */}
              <div className='bg-white border border-slate-200 rounded-2xl overflow-hidden'>
                <table className='w-full'>
                  <thead className='bg-slate-50 border-b border-slate-200'>
                    <tr>
                      <th className='text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase'>
                        Student
                      </th>
                      <th className='text-center py-3 px-4 text-xs font-bold text-slate-500 uppercase'>
                        Progress
                      </th>
                      <th className='text-center py-3 px-4 text-xs font-bold text-slate-500 uppercase'>
                        Last Active
                      </th>
                      <th className='text-center py-3 px-4 text-xs font-bold text-slate-500 uppercase'>
                        Status
                      </th>
                      <th className='text-right py-3 px-4 text-xs font-bold text-slate-500 uppercase'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.map((student, i) => (
                      <tr
                        key={i}
                        className='border-b border-slate-100 hover:bg-slate-50'
                      >
                        <td className='py-4 px-4'>
                          <div className='flex items-center gap-3'>
                            <div className='w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold'>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className='font-bold text-sm text-slate-800'>
                              {student.name}
                            </span>
                          </div>
                        </td>
                        <td className='py-4 px-4'>
                          <div className='flex items-center justify-center gap-2'>
                            <div className='w-20 h-2 bg-slate-100 rounded-full overflow-hidden'>
                              <div
                                className={`h-full rounded-full ${student.progress > 70 ? "bg-emerald-500" : student.progress > 40 ? "bg-amber-500" : "bg-red-500"}`}
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className='text-xs font-bold text-slate-600'>
                              {student.progress}%
                            </span>
                          </div>
                        </td>
                        <td className='py-4 px-4 text-center'>
                          <span className='text-xs font-medium text-slate-500'>
                            {student.lastActive}
                          </span>
                        </td>
                        <td className='py-4 px-4 text-center'>
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              student.status === "active"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {student.status === "active" ? "Active" : "At Risk"}
                          </span>
                        </td>
                        <td className='py-4 px-4 text-right'>
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
          )}

          {activeTab === "content" && (
            <div className='space-y-4 animate-in fade-in duration-300'>
              <div className='flex justify-between items-center mb-4'>
                <h4 className='font-bold text-slate-800'>Course Modules</h4>
                <button className='px-4 py-2 bg-blue-500 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-colors flex items-center gap-2'>
                  <Plus className='w-4 h-4' /> Add Module
                </button>
              </div>

              {[
                {
                  title: "Introduction & Context",
                  duration: "45 min",
                  status: "published",
                },
                {
                  title: "Core Concepts",
                  duration: "1h 20min",
                  status: "published",
                },
                {
                  title: "Hands-on Workshop",
                  duration: "2h",
                  status: "published",
                },
                {
                  title: "Assessment & Reflection",
                  duration: "30 min",
                  status: "draft",
                },
              ].map((module, i) => (
                <div
                  key={i}
                  className='flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors'
                >
                  <div className='w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 font-bold'>
                    {i + 1}
                  </div>
                  <div className='flex-1'>
                    <p className='font-bold text-slate-800'>{module.title}</p>
                    <p className='text-xs text-slate-500'>{module.duration}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      module.status === "published"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {module.status}
                  </span>
                  <button className='p-2 hover:bg-slate-100 rounded-lg transition-colors'>
                    <PenTool className='w-4 h-4 text-slate-400' />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "analytics" && (
            <div className='space-y-6 animate-in fade-in duration-300'>
              <div className='bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white'>
                <h4 className='font-bold text-lg mb-4'>Course Performance</h4>
                <div className='grid grid-cols-3 gap-6'>
                  <div>
                    <p className='text-3xl font-black'>{course.gapClosure}%</p>
                    <p className='text-blue-200 text-sm'>Skill Gap Closed</p>
                  </div>
                  <div>
                    <p className='text-3xl font-black'>89%</p>
                    <p className='text-blue-200 text-sm'>Completion Rate</p>
                  </div>
                  <div>
                    <p className='text-3xl font-black'>+23%</p>
                    <p className='text-blue-200 text-sm'>Avg. Skill Growth</p>
                  </div>
                </div>
              </div>

              <div className='bg-white border border-slate-200 rounded-2xl p-5'>
                <h4 className='font-bold text-slate-800 mb-4'>
                  Weekly Engagement
                </h4>
                <div className='flex items-end gap-2 h-32'>
                  {[40, 65, 80, 55, 90, 75, 85].map((h, i) => (
                    <div
                      key={i}
                      className='flex-1 flex flex-col items-center gap-2'
                    >
                      <div
                        className='w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600'
                        style={{ height: `${h}%` }}
                      ></div>
                      <span className='text-[10px] font-bold text-slate-400'>
                        {["M", "T", "W", "T", "F", "S", "S"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='p-6 border-t border-slate-100 flex justify-between shrink-0'>
          <button
            onClick={onClose}
            className='px-6 py-3 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-xl transition-colors'
          >
            Close
          </button>
          <div className='flex gap-3'>
            <button className='px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2'>
              <RefreshCw className='w-4 h-4' /> Sync Data
            </button>
            <button className='px-6 py-3 bg-blue-500 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors flex items-center gap-2'>
              <Save className='w-4 h-4' /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Mock Data with Fixed Imagery & Rationale ---
const initiatives = [
  {
    id: 1,
    title: "Algorithmic Auditing for Finance",
    dept: "Finance Dept.",
    status: "Active",
    enrolled: 142,
    gapClosure: 78,
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop",
    tags: ["FinTech", "Verification"],
    partner: "Deloitte",
    nextSession: "Tomorrow, 2:00 PM",
    theme: "violet",
    rationale:
      "Audit firms reveal 80% of entry-level analyst roles now require Python validation skills, displacing Excel.",
  },
  {
    id: 2,
    title: "Clinical Empathy in AI Triage",
    dept: "Medical School",
    status: "Proposed",
    enrolled: 0,
    gapClosure: 45,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    tags: ["Bio-Ethics", "Student Agency"],
    partner: "Pfizer",
    nextSession: "Pending Approval",
    theme: "teal",
    rationale:
      "Patient advocacy groups flagged 'AI Triage' as a high-risk failure point in recent clinical trials. Critical gap.",
  },
  {
    id: 3,
    title: "Generative Design for MFG",
    dept: "School of Engineering",
    status: "Active",
    enrolled: 89,
    gapClosure: 92,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    tags: ["Supply Chain", "3D Modeling"],
    partner: "Tesla",
    nextSession: "In Progress",
    theme: "orange",
    rationale:
      "Automotive supply chains are shifting to generative parts; current syllabus focuses only on traditional casting.",
  },
  {
    id: 4,
    title: "Legal Prompt Engineering",
    dept: "Law School",
    status: "Completed",
    enrolled: 210,
    gapClosure: 100,
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop",
    tags: ["Law", "Logic"],
    partner: "Baker McKenzie",
    nextSession: "Cohort Closed",
    theme: "blue",
    rationale:
      "Associates spend 40% of time prompting LLMs. ABA guidance suggests new ethics standard for AI interaction.",
  },
  {
    id: 5,
    title: "Crisis Ops: Supply Chain",
    dept: "Business School",
    status: "Active",
    enrolled: 320,
    gapClosure: 65,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    tags: ["Logistics", "Strategy"],
    partner: "Maersk",
    nextSession: "Live Now",
    theme: "pink",
    rationale:
      "Global disruptions require real-time scenario planning. Static case studies are failing to prepare grads.",
  },
  {
    id: 6,
    title: "The Ethics of Deepfakes",
    dept: "Journalism",
    status: "Proposed",
    enrolled: 0,
    gapClosure: 30,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    tags: ["Media", "Verification"],
    partner: "NY Times",
    nextSession: "Needs Funding",
    theme: "yellow",
    rationale:
      "Verification is now a primary skill for investigative desks. Deepfake detection tools are absent in current lab.",
  },
];

// Helper for "Juicy" Color Themes
const getThemeStyles = (theme: string) => {
  switch (theme) {
    case "violet":
      return {
        bg: "bg-violet-50",
        border: "border-violet-100",
        accent: "bg-violet-500",
        text: "text-violet-700",
        lightAccent: "bg-violet-200",
        gradient: "from-violet-500 to-purple-600",
        shadow: "shadow-violet-200",
      };
    case "teal":
      return {
        bg: "bg-teal-50",
        border: "border-teal-100",
        accent: "bg-teal-500",
        text: "text-teal-700",
        lightAccent: "bg-teal-200",
        gradient: "from-teal-500 to-emerald-500",
        shadow: "shadow-teal-200",
      };
    case "orange":
      return {
        bg: "bg-orange-50",
        border: "border-orange-100",
        accent: "bg-orange-500",
        text: "text-orange-700",
        lightAccent: "bg-orange-200",
        gradient: "from-orange-500 to-red-500",
        shadow: "shadow-orange-200",
      };
    case "pink":
      return {
        bg: "bg-pink-50",
        border: "border-pink-100",
        accent: "bg-pink-500",
        text: "text-pink-700",
        lightAccent: "bg-pink-200",
        gradient: "from-pink-500 to-rose-600",
        shadow: "shadow-pink-200",
      };
    case "yellow":
      return {
        bg: "bg-yellow-50",
        border: "border-yellow-200", // slightly darker border for visibility
        accent: "bg-yellow-500",
        text: "text-yellow-700",
        lightAccent: "bg-yellow-200",
        gradient: "from-yellow-400 to-orange-400",
        shadow: "shadow-yellow-200",
      };
    default:
      return {
        bg: "bg-blue-50",
        border: "border-blue-100",
        accent: "bg-blue-500",
        text: "text-blue-700",
        lightAccent: "bg-blue-200",
        gradient: "from-blue-500 to-indigo-600",
        shadow: "shadow-blue-200",
      };
  }
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles = {
    Active: "bg-green-500 text-white shadow-[0_4px_0_#15803d]",
    Proposed: "bg-blue-500 text-white shadow-[0_4px_0_#1d4ed8]",
    Completed: "bg-slate-700 text-slate-200 shadow-[0_4px_0_#0f172a]",
  };

  return (
    <span
      className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider flex items-center gap-2 transform active:translate-y-[2px] active:shadow-none transition-all ${styles[status as keyof typeof styles] || styles.Active}`}
    >
      {status === "Active" && <Zap className='w-3.5 h-3.5 fill-current' />}
      {status}
    </span>
  );
};

const InitiativeCard: React.FC<{
  data: (typeof initiatives)[0];
  onManage: () => void;
}> = ({ data, onManage }) => {
  const styles = getThemeStyles(data.theme);
  const isLive = data.status === "Active";

  return (
    <div
      className={`group relative bg-white rounded-[32px] border-2 ${styles.border} hover:border-transparent hover:ring-4 hover:ring-offset-2 ${styles.text.replace("text-", "ring-")} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-[650px] overflow-hidden`}
    >
      {/* Image Header */}
      <div className='h-48 relative shrink-0 overflow-hidden'>
        <img
          src={data.image}
          alt={data.title}
          className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out'
        />

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80'></div>

        {/* Status Badge */}
        <div className='absolute top-5 left-5 z-20'>
          <StatusBadge status={data.status} />
        </div>

        {/* Menu Button */}
        <div className='absolute top-5 right-5 z-20'>
          <button className='w-10 h-10 rounded-xl bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/20 text-white transition-all flex items-center justify-center'>
            <MoreHorizontal className='w-6 h-6' />
          </button>
        </div>

        {/* Title Overlay */}
        <div className='absolute bottom-0 left-0 p-6 w-full z-20'>
          <div className='flex items-center gap-2 mb-2'>
            <span
              className={`px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-extrabold uppercase tracking-widest`}
            >
              {data.dept}
            </span>
          </div>
          <h3 className='text-2xl font-extrabold text-white leading-tight shadow-sm line-clamp-2 drop-shadow-md'>
            {data.title}
          </h3>
        </div>
      </div>

      {/* Body Content - Now tinted based on theme */}
      <div className={`p-6 flex flex-col flex-1 ${styles.bg} relative`}>
        {/* Partner Info */}
        <div className='flex items-center gap-3 mb-5'>
          <div className='w-10 h-10 rounded-xl bg-white border-2 border-white shadow-sm flex items-center justify-center text-xl font-black text-slate-700'>
            {data.partner.charAt(0)}
          </div>
          <div>
            <span className='text-[10px] font-bold text-slate-400 uppercase tracking-wide'>
              Powered By
            </span>
            <h4 className='text-sm font-bold text-slate-800'>{data.partner}</h4>
          </div>
          <div className='ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-slate-100 shadow-sm'>
            <Clock className={`w-3.5 h-3.5 ${styles.text}`} />
            <span className='text-xs font-bold text-slate-600'>
              {data.status === "Active" ? "Live Now" : "Pending"}
            </span>
          </div>
        </div>

        {/* Signal Intelligence Box - The "Why" */}
        <div className='mb-5 bg-white/60 p-4 rounded-2xl border border-white/50 shadow-sm backdrop-blur-sm relative overflow-hidden group/box'>
          <div
            className={`absolute top-0 left-0 w-1 h-full ${styles.accent} opacity-40`}
          ></div>
          <div className='flex items-center gap-2 mb-2'>
            <div className={`p-1 rounded-md ${styles.lightAccent}`}>
              <Sparkles className={`w-3 h-3 ${styles.text}`} />
            </div>
            <span
              className={`text-[10px] font-extrabold uppercase tracking-wider ${styles.text} opacity-80`}
            >
              Why this matters
            </span>
          </div>
          <p className='text-xs font-semibold text-slate-700 leading-relaxed relative z-10'>
            "{data.rationale}"
          </p>
        </div>

        {/* Data Grid - Floating White Cards */}
        <div className='grid grid-cols-2 gap-3 mb-6'>
          <div className='bg-white p-3 rounded-2xl shadow-sm border border-slate-100'>
            <div className='flex items-center gap-2 mb-1'>
              <Users className='w-4 h-4 text-slate-400' />
              <span className='text-[10px] font-bold text-slate-400 uppercase'>
                Enrolled
              </span>
            </div>
            <span className='text-2xl font-black text-slate-800'>
              {data.enrolled}
            </span>
          </div>

          <div className='bg-white p-3 rounded-2xl shadow-sm border border-slate-100'>
            <div className='flex items-center gap-2 mb-1'>
              <Hash className='w-4 h-4 text-slate-400' />
              <span className='text-[10px] font-bold text-slate-400 uppercase'>
                Tag
              </span>
            </div>
            <div className='flex flex-wrap gap-1'>
              <span className={`text-xs font-bold ${styles.text} truncate`}>
                {data.tags[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Juicy Progress Section */}
        <div className='mt-auto'>
          <div className='flex justify-between items-end mb-2'>
            <div className='flex items-center gap-1.5'>
              <Trophy className={`w-4 h-4 ${styles.text}`} />
              <span className='text-xs font-black text-slate-500 uppercase tracking-wider'>
                Gap Closure
              </span>
            </div>
            <span className={`text-xl font-black ${styles.text}`}>
              {data.gapClosure}%
            </span>
          </div>

          {/* The "Tube" Progress Bar */}
          <div
            className={`w-full h-4 ${styles.lightAccent} rounded-full overflow-hidden relative mb-6`}
          >
            <div
              className={`h-full rounded-full bg-gradient-to-r ${styles.gradient} relative`}
              style={{ width: `${data.gapClosure}%` }}
            >
              {/* Inner Highlight for 3D effect */}
              <div className='absolute top-1 left-1 right-1 h-1 bg-white/30 rounded-full'></div>
            </div>
          </div>

          {/* Persistent Action Button */}
          <button
            onClick={onManage}
            className={`w-full py-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 text-white ${styles.accent} hover:brightness-110 active:scale-95 group-hover:shadow-lg`}
          >
            Manage Course <ArrowUpRight className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  );
};

const CurriculumDashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState<
    (typeof initiatives)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleManageCourse = (course: (typeof initiatives)[0]) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <div className='flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-10 animate-in fade-in duration-500'>
      {/* Course Management Modal */}
      <CourseManageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={selectedCourse}
      />

      {/* Cinematic Hero Section */}
      <div className='w-full h-[280px] rounded-[40px] relative overflow-hidden group shadow-xl'>
        <img
          src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop'
          className='w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[2s]'
          alt='Hero'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-blue-950/95 via-indigo-950/80 to-transparent'></div>

        <div className='absolute inset-0 p-12 flex flex-col justify-center max-w-2xl z-20'>
          <div className='flex items-center gap-3 mb-4'>
            <span className='px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-[10px] font-bold uppercase tracking-widest shadow-lg'>
              Courses 2.0
            </span>
            <span className='px-3 py-1 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-300 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg'>
              <Zap className='w-3 h-3' /> System Optimal
            </span>
          </div>
          <h1 className='text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight'>
            Closing the{" "}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300'>
              Skills Gap
            </span>
          </h1>
          <p className='text-blue-100/80 text-lg font-medium mb-8 leading-relaxed max-w-lg'>
            Manage real-world projects across 14 departments. Current progress:{" "}
            <span className='text-white font-bold'>
              12% growth week-over-week.
            </span>
          </p>

          <div className='flex gap-4'>
            <button className='px-6 py-3.5 bg-white text-ascend-blue rounded-xl font-bold text-sm shadow-glow hover:bg-blue-50 transition-all flex items-center gap-2 hover:scale-105 active:scale-95'>
              <Plus className='w-4 h-4' /> New Project
            </button>
            <button className='px-6 py-3.5 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-sm hover:bg-white/20 transition-all backdrop-blur-md'>
              View Analytics
            </button>
          </div>
        </div>

        {/* Decorative Floating Glass Elements */}
        <div className='absolute right-20 top-1/2 -translate-y-1/2 hidden lg:block z-10 pointer-events-none'>
          <div className='w-24 h-24 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl animate-bounce duration-[3000ms]'>
            <GlassGlobe className='w-16 h-16 opacity-80' />
          </div>
        </div>
        <div className='absolute right-60 bottom-10 hidden lg:block z-10 pointer-events-none'>
          <div className='w-20 h-20 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl animate-pulse duration-[4000ms]'>
            <GlassDNA className='w-14 h-14 opacity-80' />
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className='flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-30 py-4 backdrop-blur-xl bg-ascend-bg/80 -mx-4 px-4 border-b border-ascend-border/50'>
        <div className='flex items-center gap-1.5 bg-white p-1.5 rounded-xl shadow-sm border border-ascend-border'>
          {["All", "Active", "Proposed", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${filter === tab ? "bg-ascend-blue text-white shadow-md" : "text-ascend-subtext hover:text-ascend-text hover:bg-gray-50"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className='flex items-center gap-3 w-full md:w-auto'>
          <div className='relative group'>
            <Search className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ascend-subtext group-focus-within:text-ascend-blue' />
            <input
              type='text'
              placeholder='Search projects...'
              className='pl-9 pr-4 py-2.5 bg-white border border-ascend-border rounded-xl text-sm font-medium outline-none focus:ring-2 ring-ascend-blue/20 w-64 shadow-sm transition-all'
            />
          </div>
          <div className='flex gap-1 bg-white p-1 rounded-xl border border-ascend-border shadow-sm'>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-gray-100 text-ascend-text" : "text-ascend-subtext hover:bg-gray-50"}`}
            >
              <LayoutGrid className='w-4 h-4' />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-gray-100 text-ascend-text" : "text-ascend-subtext hover:bg-gray-50"}`}
            >
              <List className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>

      {/* The Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {initiatives
          .filter((i) => filter === "All" || i.status === filter)
          .map((item) => (
            <InitiativeCard
              key={item.id}
              data={item}
              onManage={() => handleManageCourse(item)}
            />
          ))}

        {/* "Add New" Placeholder Card */}
        <div className='group rounded-[32px] border-4 border-dashed border-gray-200 bg-gray-50/50 hover:bg-blue-50 hover:border-blue-300 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 h-[650px]'>
          <div className='w-24 h-24 rounded-3xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:shadow-lg group-hover:rotate-3'>
            <Plus className='w-10 h-10 text-gray-300 group-hover:text-blue-500 transition-colors' />
          </div>
          <h3 className='text-xl font-black text-gray-400 group-hover:text-blue-600 transition-colors'>
            Start New Project
          </h3>
          <p className='text-xs font-bold text-gray-300 mt-2 uppercase tracking-widest group-hover:text-blue-400'>
            Launch a new lab
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurriculumDashboard;
