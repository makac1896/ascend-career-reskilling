import React, { useState } from 'react';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import { 
    MoreHorizontal, 
    Calendar, 
    TrendingUp, 
    TrendingDown, 
    Users, 
    Award, 
    CheckCircle2, 
    Clock, 
    Video, 
    MapPin, 
    ArrowRight,
    Search,
    Filter,
    Download,
    Share2,
    Briefcase,
    GraduationCap,
    ChevronLeft,
    ChevronRight,
    Plus,
    LayoutGrid,
    List,
    AlertCircle,
    User,
    ChevronDown,
    CalendarDays
} from 'lucide-react';
import { GlassGlobe } from './GlassIcons';

// --- Types & Mock Data for List View ---

interface Major {
    id: string;
    name: string;
    department: string;
    cohort: string;
    students: number;
    status: 'Healthy' | 'At Risk' | 'Review Needed';
    nextReview: string;
    dean: string;
    deanImg: string;
    placementRate: number;
    tags: string[];
}

const majorsData: Major[] = [
    {
        id: '1',
        name: 'Bio-Medical Engineering',
        department: 'Engineering',
        cohort: 'Class of \'25',
        students: 142,
        status: 'Healthy',
        nextReview: 'Today',
        dean: 'Dr. Sarah Connor',
        deanImg: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        placementRate: 98,
        tags: ['High Demand', 'AI Track']
    },
    {
        id: '2',
        name: 'Digital Ethics & Law',
        department: 'Law School',
        cohort: 'Class of \'24',
        students: 85,
        status: 'At Risk',
        nextReview: 'Tomorrow',
        dean: 'Prof. A. Smith',
        deanImg: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        placementRate: 72,
        tags: ['Curriculum Gap']
    },
    {
        id: '3',
        name: 'FinTech & Algo Trading',
        department: 'Business',
        cohort: 'MBA \'25',
        students: 210,
        status: 'Review Needed',
        nextReview: 'In 2 Days',
        dean: 'Dr. J. Keynes',
        deanImg: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
        placementRate: 94,
        tags: ['Top Performer']
    },
    {
        id: '4',
        name: 'Computational Journalism',
        department: 'Media',
        cohort: 'Class of \'26',
        students: 64,
        status: 'Healthy',
        nextReview: 'Next Week',
        dean: 'L. Lane',
        deanImg: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
        placementRate: 88,
        tags: ['Emerging']
    },
     {
        id: '5',
        name: 'Sustainable Architecture',
        department: 'Design',
        cohort: 'Class of \'25',
        students: 112,
        status: 'Healthy',
        nextReview: 'Next Week',
        dean: 'F. Lloyd',
        deanImg: 'https://i.pravatar.cc/150?u=a042581f4e29026704a',
        placementRate: 91,
        tags: ['Green Tech']
    }
];

// --- Mock Data for Detail View ---
const competencyData = [
  { month: 'Aug', cohort: 45, market: 50 },
  { month: 'Sep', cohort: 48, market: 52 },
  { month: 'Oct', cohort: 55, market: 55 }, // Catch up
  { month: 'Nov', cohort: 62, market: 58 }, // Overtake
  { month: 'Dec', cohort: 70, market: 60 },
  { month: 'Jan', cohort: 68, market: 62 },
  { month: 'Feb', cohort: 78, market: 65 }, // Peak
];

const scheduledInterventions = [
    { id: 1, title: "Ethical AI Frameworks", time: "09:30 AM", date: "Tue, 11 Jul", type: "Zoom Lab", facilitator: "Dr. Al-Fayed" },
    { id: 2, title: "Python for Finance", time: "02:00 PM", date: "Tue, 11 Jul", type: "Live Workshop", facilitator: "Deloitte Team" },
    { id: 3, title: "Supply Chain Crisis Sim", time: "10:00 AM", date: "Wed, 12 Jul", type: "VR Module", facilitator: "Tesla Ops" },
    { id: 4, title: "Resume Audit Sprint", time: "04:00 PM", date: "Thu, 13 Jul", type: "Career Ctr", facilitator: "Peer Review" }
];

const skillGaps = [
    { skill: "Prompt Engineering", score: 71, trend: 'down', label: "Critical Gap" },
    { skill: "Data Ethics", score: 92, trend: 'up', label: "On Track" },
    { skill: "Strategic Foresight", score: 33, trend: 'down', label: "Urgent" },
    { skill: "Conflict Negotiation", score: 56, trend: 'up', label: "Improving" },
    { skill: "Systems Thinking", score: 79, trend: 'up', label: "Stable" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-xl border border-ascend-border text-xs">
          <h4 className="font-bold text-ascend-text mb-2">{label}</h4>
          <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-ascend-blue"></div>
                  <span className="text-ascend-subtext">Cohort Avg:</span>
                  <span className="font-bold text-ascend-text">{payload[0].value}%</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                  <span className="text-ascend-subtext">Market Baseline:</span>
                  <span className="font-bold text-ascend-text">{payload[1].value}%</span>
              </div>
          </div>
        </div>
      );
    }
    return null;
  };

// --- Sub-Components ---

// 1. MAJORS LIST VIEW (The "Precursor" Screen)
const MajorsList: React.FC<{ onSelect: (id: string) => void }> = ({ onSelect }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Left Sidebar: Calendar & Filters */}
            <div className="w-full lg:w-[280px] bg-white rounded-3xl border border-ascend-border shadow-sm p-6 flex flex-col gap-8 shrink-0 h-fit">
                {/* Mini Calendar Widget */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-ascend-text text-lg">March 2025</h4>
                        <div className="flex gap-1">
                            <button className="p-1 hover:bg-gray-100 rounded-md"><ChevronLeft className="w-4 h-4 text-ascend-subtext" /></button>
                            <button className="p-1 hover:bg-gray-100 rounded-md"><ChevronRight className="w-4 h-4 text-ascend-subtext" /></button>
                        </div>
                    </div>
                    {/* Visual Calendar Grid (Static for UI) */}
                    <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-ascend-subtext mb-2">
                        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-slate-600">
                        {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                            <div key={day} className={`p-1.5 rounded-full cursor-pointer hover:bg-blue-50 ${day === 23 ? 'bg-ascend-blue text-white shadow-md' : ''}`}>
                                {day}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Reviews */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-ascend-text">Upcoming Reviews</h4>
                        <span className="text-xs font-bold text-ascend-blue cursor-pointer hover:underline">View All</span>
                    </div>
                    <div className="space-y-3">
                         <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-blue-50 hover:border-blue-100 transition-colors">
                             <div className="flex items-center gap-2 mb-1">
                                 <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                 <span className="text-xs font-bold text-ascend-text">Bio-Ethics Audit</span>
                             </div>
                             <p className="text-[10px] text-ascend-subtext font-bold uppercase ml-3.5">09:00 AM - 10:00 AM</p>
                         </div>
                         <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-blue-50 hover:border-blue-100 transition-colors">
                             <div className="flex items-center gap-2 mb-1">
                                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                 <span className="text-xs font-bold text-ascend-text">FinTech Strategy</span>
                             </div>
                             <p className="text-[10px] text-ascend-subtext font-bold uppercase ml-3.5">11:30 AM - 12:30 PM</p>
                         </div>
                    </div>
                </div>
            </div>

            {/* Main Content: List of Majors */}
            <div className="flex-1 flex flex-col gap-6">
                
                {/* Header Controls */}
                <div className="bg-white rounded-2xl p-4 border border-ascend-border shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <h3 className="text-xl font-bold text-ascend-text whitespace-nowrap">Academic Units</h3>
                        <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
                        <div className="relative group w-full md:w-64">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ascend-subtext group-focus-within:text-ascend-blue" />
                            <input 
                                type="text" 
                                placeholder="Search majors, deans..." 
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 ring-ascend-blue/20 transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                         <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-ascend-border rounded-xl text-sm font-bold text-ascend-subtext hover:text-ascend-text hover:bg-gray-50 transition-colors">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                         <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-ascend-blue text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-md transition-all hover:scale-105 active:scale-95">
                            <Plus className="w-4 h-4" /> Add Unit
                        </button>
                    </div>
                </div>

                {/* List Header */}
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-ascend-text">Active Cohorts</span>
                         <div className="flex gap-1 ml-4">
                            <button className="px-3 py-1 rounded-lg bg-green-50 text-green-600 text-xs font-bold hover:bg-green-100 transition-colors">Healthy</button>
                            <button className="px-3 py-1 rounded-lg bg-white text-ascend-subtext text-xs font-bold hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors">At Risk</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-ascend-border">
                        <button className="p-1.5 rounded-md bg-gray-100 text-ascend-text"><List className="w-4 h-4" /></button>
                        <button className="p-1.5 rounded-md text-ascend-subtext hover:bg-gray-50"><LayoutGrid className="w-4 h-4" /></button>
                    </div>
                </div>

                {/* List Items */}
                <div className="flex flex-col gap-3">
                    {majorsData.map((major) => (
                        <div 
                            key={major.id}
                            onClick={() => onSelect(major.id)}
                            className="group bg-white rounded-xl p-0 border border-ascend-border shadow-sm hover:shadow-lg hover:border-ascend-blue/30 transition-all cursor-pointer flex items-stretch overflow-hidden"
                        >
                            {/* Left Status Bar */}
                            <div className={`w-1.5 ${
                                major.status === 'Healthy' ? 'bg-green-500' : 
                                major.status === 'At Risk' ? 'bg-red-500' : 'bg-orange-500'
                            }`}></div>

                            <div className="flex-1 flex flex-col md:flex-row items-center p-5 gap-6">
                                
                                {/* Time/Status Column */}
                                <div className="flex flex-col items-start w-full md:w-32 shrink-0 border-b md:border-b-0 md:border-r border-gray-100 pb-3 md:pb-0 md:pr-6">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Clock className="w-4 h-4 text-ascend-subtext" />
                                        <span className="text-xs font-bold text-ascend-text">{major.nextReview}</span>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                        major.status === 'Healthy' ? 'bg-green-50 text-green-600' : 
                                        major.status === 'At Risk' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                                    }`}>
                                        {major.status}
                                    </span>
                                </div>

                                {/* Main Info */}
                                <div className="flex-1 w-full">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h4 className="text-lg font-bold text-ascend-text group-hover:text-ascend-blue transition-colors">{major.name}</h4>
                                        <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wide border border-gray-200">
                                            {major.department}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-medium text-ascend-subtext">
                                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {major.students} Students</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> {major.cohort}</span>
                                    </div>
                                </div>

                                {/* Facilitator & Actions */}
                                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gray-100 border border-white shadow-sm overflow-hidden">
                                            <img src={major.deanImg} alt={major.dean} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-ascend-text">{major.dean}</span>
                                            <span className="block text-[10px] text-ascend-subtext uppercase">Dean</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                         <div className="flex flex-col items-end mr-4">
                                            <div className="flex items-center gap-1">
                                                <Users className="w-3.5 h-3.5 text-ascend-subtext" />
                                                <span className="text-xs font-bold text-ascend-text">{major.placementRate}/100</span>
                                            </div>
                                            <span className="text-[10px] text-ascend-subtext">Placed</span>
                                         </div>

                                        <button className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-ascend-blue hover:text-white text-ascend-subtext flex items-center justify-center transition-all">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                        <button className="w-8 h-8 rounded-lg bg-transparent hover:bg-gray-50 text-ascend-subtext flex items-center justify-center transition-all">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};


// 2. COHORT DETAIL VIEW (The Previous Dashboard)
const CohortDetail: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="animate-in slide-in-from-right-8 fade-in duration-500">
            {/* Top Header with Back Button */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div className="flex items-start gap-4">
                    <button 
                        onClick={onBack}
                        className="mt-1 p-2 rounded-xl bg-white border border-ascend-border hover:bg-gray-50 text-ascend-subtext hover:text-ascend-text transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-3xl font-bold text-ascend-text tracking-tight mb-2">Cohort Performance Report</h2>
                        <div className="flex items-center gap-2 text-ascend-subtext text-sm font-medium">
                            <span className="px-2 py-0.5 rounded-md bg-white border border-gray-200 text-xs font-bold uppercase tracking-wider">Major</span>
                            <span>Bio-Medical Engineering (Class of '25)</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-ascend-border rounded-xl text-sm font-bold text-ascend-subtext hover:text-ascend-text shadow-sm hover:shadow-md transition-all">
                        <Download className="w-4 h-4" /> Export PDF
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-ascend-text text-white rounded-xl text-sm font-bold hover:bg-gray-800 shadow-lg transition-all">
                        <Share2 className="w-4 h-4" /> Share Report
                    </button>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-8">
                
                {/* LEFT COLUMN (Main Content) */}
                <div className="flex-1 flex flex-col gap-8">
                    
                    {/* Top Row: Profile + KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Profile / Cohort Card (Airbnb Style) */}
                        <div className="bg-white rounded-[32px] border border-ascend-border shadow-soft relative overflow-hidden group flex flex-col">
                            {/* Banner Image */}
                            <div className="h-48 relative w-full overflow-hidden">
                                <img 
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                                    alt="Cohort Banner" 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                
                                <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-extrabold text-white uppercase tracking-wider shadow-sm border border-white/20">
                                        Cohort Profile
                                    </span>
                                    <button className="p-2 bg-white/20 backdrop-blur-md hover:bg-white rounded-full transition-all text-white hover:text-ascend-text border border-white/20">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="px-8 pb-8 pt-4 flex-1 flex flex-col relative">
                                <div className="absolute -top-12 right-8">
                                    <div className="relative w-20 h-20 rounded-2xl bg-white p-1.5 shadow-xl rotate-3 group-hover:rotate-6 transition-transform duration-300">
                                        <div className="w-full h-full rounded-xl bg-ascend-blue flex items-center justify-center text-white text-2xl font-black">
                                            B
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full border-4 border-white shadow-sm">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6 mt-1">
                                    <h3 className="text-2xl font-black text-ascend-text mb-1 leading-tight group-hover:text-ascend-blue transition-colors">Bio-Medical Engineering</h3>
                                    <div className="flex items-center gap-2 text-ascend-subtext">
                                        <GraduationCap className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-wide">Spring 2025 Cohort</span>
                                    </div>
                                </div>

                                <div className="flex justify-between gap-3 mt-auto">
                                    <div className="flex-1 bg-gray-50 rounded-2xl p-3 border border-gray-100 flex flex-col justify-center items-center group/stat hover:border-blue-200 transition-colors">
                                        <span className="text-2xl font-black text-ascend-text mb-0.5">142</span>
                                        <span className="text-[10px] font-bold text-ascend-subtext uppercase tracking-wider">Students</span>
                                    </div>
                                    <div className="flex-1 bg-gray-50 rounded-2xl p-3 border border-gray-100 flex flex-col justify-center items-center group/stat hover:border-green-200 transition-colors">
                                        <span className="text-2xl font-black text-ascend-text mb-0.5 text-green-600">98%</span>
                                        <span className="text-[10px] font-bold text-ascend-subtext uppercase tracking-wider">Placed</span>
                                    </div>
                                    <div className="flex-1 bg-gray-50 rounded-2xl p-3 border border-gray-100 flex flex-col justify-center items-center group/stat hover:border-orange-200 transition-colors">
                                        <span className="text-2xl font-black text-ascend-text mb-0.5">12</span>
                                        <span className="text-[10px] font-bold text-ascend-subtext uppercase tracking-wider">Labs</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Gradient KPI Cards */}
                        <div className="flex flex-col gap-6">
                            <div className="flex-1 rounded-[32px] p-8 bg-gradient-to-br from-[#FF9A9E] to-[#FECFEF] relative overflow-hidden shadow-soft group hover:scale-[1.02] transition-transform">
                                <div className="relative z-10 text-slate-800">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-white/30 backdrop-blur-md rounded-2xl shadow-sm">
                                            <Briefcase className="w-6 h-6 text-slate-900" />
                                        </div>
                                        <div className="bg-white/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                                            <Clock className="w-4 h-4 text-slate-900" />
                                        </div>
                                    </div>
                                    <h3 className="text-4xl font-extrabold mb-1">83%</h3>
                                    <p className="text-sm font-bold opacity-70 uppercase tracking-widest mb-6">Placement Velocity</p>
                                    <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                                        <div className="h-full w-[83%] bg-white/80 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 rounded-[32px] p-8 bg-gradient-to-br from-[#a18cd1] to-[#fbc2eb] relative overflow-hidden shadow-soft group hover:scale-[1.02] transition-transform">
                                <div className="relative z-10 text-white">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-sm border border-white/10">
                                            <GlassGlobe className="w-6 h-6" />
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-4xl font-extrabold mb-1">56%</h3>
                                    <p className="text-sm font-bold opacity-80 uppercase tracking-widest mb-6">Industry Alignment</p>
                                    <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
                                        <div className="h-full w-[56%] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Connections Bar */}
                    <div className="bg-white rounded-[24px] px-8 py-6 shadow-soft border border-ascend-border flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-bold text-ascend-subtext uppercase tracking-wide">Data Sources Connected</span>
                            <span className="bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                3 Active
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center p-2 grayscale hover:grayscale-0 transition-all cursor-pointer">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" className="w-full h-full object-contain" />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center p-2 grayscale hover:grayscale-0 transition-all cursor-pointer">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Canvas_logo_only.svg/1024px-Canvas_logo_only.svg.png" alt="Canvas" className="w-full h-full object-contain" />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center p-2 grayscale hover:grayscale-0 transition-all cursor-pointer">
                                <Briefcase className="w-5 h-5 text-gray-500" />
                            </div>
                            <button className="w-10 h-10 rounded-full bg-white border border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                                <MoreHorizontal className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Bottom Chart: Competency Growth */}
                    <div className="bg-white rounded-[32px] p-8 shadow-soft border border-ascend-border">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-ascend-text">Competency Velocity</h3>
                                <p className="text-xs text-ascend-subtext font-medium mt-1">Cohort skill acquisition vs. Market Demand baseline.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-ascend-subtext">Range:</span>
                                <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-bold text-ascend-text hover:bg-gray-100 transition-colors">
                                    Last Semester <ArrowRight className="w-3 h-3 rotate-90" />
                                </button>
                            </div>
                        </div>
                        
                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={competencyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorCohort" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4318FF" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#4318FF" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#FB7185" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#FB7185" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E5F2" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#A3AED0', fontSize: 12}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#A3AED0', fontSize: 12}} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#A3AED0', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                    <Area 
                                        type="monotone" 
                                        dataKey="cohort" 
                                        stroke="#4318FF" 
                                        strokeWidth={4} 
                                        fillOpacity={1} 
                                        fill="url(#colorCohort)" 
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="market" 
                                        stroke="#FB7185" 
                                        strokeWidth={3} 
                                        strokeDasharray="5 5"
                                        fillOpacity={1} 
                                        fill="url(#colorMarket)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex gap-6 mt-6 justify-center">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-ascend-blue"></div>
                                <span className="text-xs font-bold text-ascend-text">Cohort Performance</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                                <span className="text-xs font-bold text-ascend-text">Market Baseline</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT SIDEBAR */}
                <div className="w-full xl:w-[400px] flex flex-col gap-8">
                    
                    {/* Upcoming Interventions */}
                    <div className="bg-white rounded-[32px] p-8 shadow-soft border border-ascend-border h-full flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-ascend-text">Scheduled Labs</h3>
                            <div className="p-2 bg-gray-50 rounded-xl">
                                <Calendar className="w-5 h-5 text-ascend-subtext" />
                            </div>
                        </div>

                        <div className="flex-1 space-y-6">
                            {scheduledInterventions.map((item) => (
                                <div key={item.id} className="group cursor-pointer">
                                    <div className="flex items-start gap-4 mb-3">
                                        <div className="flex flex-col items-center min-w-[50px]">
                                            <span className="text-xs font-bold text-ascend-subtext uppercase">{item.date.split(',')[0]}</span>
                                            <span className="text-lg font-extrabold text-ascend-text">{item.date.split(' ')[2]}</span>
                                        </div>
                                        <div className="flex-1 p-4 rounded-2xl bg-gray-50 border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                                            <div className="flex justify-between items-start mb-1">
                                                <h5 className="font-bold text-ascend-text text-sm group-hover:text-ascend-blue transition-colors">{item.title}</h5>
                                                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-ascend-blue -rotate-45" />
                                            </div>
                                            <p className="text-xs text-ascend-subtext font-medium mb-3">{item.facilitator}</p>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                                                    <Clock className="w-3 h-3" /> {item.time}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 bg-blue-100/50 px-2 py-0.5 rounded-full">
                                                    {item.type === 'Zoom Lab' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                                                    {item.type}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button className="mt-6 w-full py-3 rounded-xl border border-ascend-border text-xs font-bold text-ascend-subtext hover:text-ascend-text hover:bg-gray-50 transition-colors">
                            View Full Calendar
                        </button>
                    </div>

                    {/* Skill Gap Analysis */}
                    <div className="bg-white rounded-[32px] p-8 shadow-soft border border-ascend-border h-full flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold text-ascend-text">Skill Gaps</h3>
                            <Filter className="w-5 h-5 text-ascend-subtext" />
                        </div>
                        <p className="text-xs text-ascend-subtext font-medium mb-8">Most common deficits in student artifacts.</p>

                        <div className="space-y-6">
                            {skillGaps.map((skill, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-bold text-ascend-text">{skill.skill}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-ascend-text">{skill.score}%</span>
                                            {skill.trend === 'down' ? (
                                                <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                                                    <TrendingDown className="w-3 h-3 text-red-500" />
                                                </div>
                                            ) : (
                                                <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                                                    <TrendingUp className="w-3 h-3 text-blue-500" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                                        <div 
                                            className={`h-full rounded-full ${
                                                skill.score < 50 ? 'bg-red-500' : 
                                                skill.score < 80 ? 'bg-ascend-blue' : 'bg-green-500'
                                            }`} 
                                            style={{ width: `${skill.score}%` }}
                                        ></div>
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                        skill.label === 'Critical Gap' || skill.label === 'Urgent' ? 'text-red-500' : 'text-gray-400'
                                    }`}>
                                        {skill.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// 3. MAIN REPORTS CONTAINER
const ReportsDashboard: React.FC = () => {
    const [selectedCohortId, setSelectedCohortId] = useState<string | null>(null);

    // If a cohort is selected, show the detail view
    if (selectedCohortId) {
        return <CohortDetail onBack={() => setSelectedCohortId(null)} />;
    }

    // Otherwise, show the list of majors (The Precursor Screen)
    return <MajorsList onSelect={(id) => setSelectedCohortId(id)} />;
};

export default ReportsDashboard;