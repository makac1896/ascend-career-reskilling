import React from 'react';
import { 
    Activity, 
    Users, 
    MessageSquare, 
    TrendingUp, 
    AlertCircle, 
    CheckCircle2, 
    ArrowUpRight, 
    RefreshCw, 
    BrainCircuit,
    MoreHorizontal,
    Filter
} from 'lucide-react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';

// Mock Data for Agency Chart
const agencyData = [
  { time: '10am', studentInput: 20, aiOutput: 80 },
  { time: '11am', studentInput: 35, aiOutput: 75 },
  { time: '12pm', studentInput: 50, aiOutput: 60 },
  { time: '1pm', studentInput: 65, aiOutput: 45 }, // Crossover point (Ideal)
  { time: '2pm', studentInput: 72, aiOutput: 40 },
  { time: '3pm', studentInput: 68, aiOutput: 42 },
];

const satisfactionData = [
    { name: 'Deloitte', score: 92 },
    { name: 'Pfizer', score: 88 },
    { name: 'Tesla', score: 95 },
    { name: 'CVS', score: 78 },
];

const feedbackFeed = [
    {
        id: 1,
        type: 'success',
        student: 'Sarah Jenkins',
        lab: 'Bio-Ethics Simulator',
        message: 'Successfully identified hallucinations in the patient logs. Did not accept first draft.',
        time: '12m ago'
    },
    {
        id: 2,
        type: 'warning',
        student: 'Marcus Chen',
        lab: 'FinTech Audit',
        message: 'Accepted AI generated risk model without verifying base assumptions. Intervention needed.',
        time: '45m ago'
    },
    {
        id: 3,
        type: 'success',
        student: 'Team Alpha',
        lab: 'Supply Chain War Room',
        message: 'Used AI to generate 4 scenarios, then applied human judgment to select the ethical option.',
        time: '1h ago'
    }
];

const StatCard: React.FC<{ label: string; value: string; sub: string; icon: React.ReactNode; trend?: 'up' | 'down' }> = ({ label, value, sub, icon, trend }) => (
    <div className="bg-white p-6 rounded-2xl border border-ascend-border shadow-crisp hover:shadow-lg hover:border-ascend-blue/30 transition-all group">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-gray-50 text-ascend-text border border-gray-100 group-hover:bg-ascend-blue group-hover:text-white transition-colors">
                {icon}
            </div>
            {trend && (
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                    {trend === 'up' ? '+4.2%' : '-1.8%'}
                </span>
            )}
        </div>
        <h4 className="text-3xl font-bold text-ascend-text mb-1 tracking-tight">{value}</h4>
        <p className="text-xs font-bold text-ascend-subtext uppercase tracking-wide">{label}</p>
        <p className="text-xs text-ascend-subtext mt-2 font-medium">{sub}</p>
    </div>
);

const ObserveDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-10 animate-in fade-in duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
                <h2 className="text-3xl font-bold text-ascend-text tracking-tight mb-2">Observation Deck</h2>
                <p className="text-ascend-subtext text-sm font-medium">Real-time telemetry on Student-AI synergy and process quality.</p>
            </div>
            <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-ascend-border rounded-xl text-xs font-bold text-ascend-subtext hover:text-ascend-text shadow-sm hover:shadow-md transition-all">
                    <Filter className="w-4 h-4" /> Filter Views
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-ascend-text text-white rounded-xl text-xs font-bold hover:bg-gray-800 shadow-lg transition-all">
                    <RefreshCw className="w-4 h-4" /> Live Sync
                </button>
            </div>
        </div>

        {/* Top KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                label="Human Agency Score" 
                value="78/100" 
                sub="Students actively directing the tool."
                icon={<BrainCircuit className="w-6 h-6" />}
                trend="up"
            />
            <StatCard 
                label="Avg. Iteration Rate" 
                value="4.2x" 
                sub="Refinements per prompt session."
                icon={<RefreshCw className="w-6 h-6" />}
                trend="up"
            />
            <StatCard 
                label="Partner Satisfaction" 
                value="92%" 
                sub="NPS from Industry Mentors."
                icon={<CheckCircle2 className="w-6 h-6" />}
                trend="up"
            />
            <StatCard 
                label="Active Labs" 
                value="14" 
                sub="Live Simulations running now."
                icon={<Activity className="w-6 h-6" />}
            />
        </div>

        {/* Main Chart Section: The Synergy Loop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[450px]">
            {/* Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-ascend-border shadow-sm p-8 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-ascend-text">Agency vs. Automation</h3>
                        <p className="text-xs text-ascend-subtext font-medium">Monitoring the balance of Human Input (Green) vs Raw AI Output (Purple).</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-ascend-subtext">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div> Human
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-ascend-subtext">
                            <div className="w-3 h-3 rounded-full bg-ascend-blue"></div> AI Tool
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={agencyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorHuman" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4318FF" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#4318FF" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E5F2" />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#A3AED0', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#A3AED0', fontSize: 12}} />
                            <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0px 10px 30px rgba(0,0,0,0.1)'}} />
                            <Area type="monotone" dataKey="studentInput" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorHuman)" />
                            <Area type="monotone" dataKey="aiOutput" stroke="#4318FF" strokeWidth={3} fillOpacity={1} fill="url(#colorAI)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Partner Scores */}
            <div className="lg:col-span-1 bg-white rounded-2xl border border-ascend-border shadow-sm p-8 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-ascend-text">Partner Feedback</h3>
                    <MoreHorizontal className="w-5 h-5 text-ascend-subtext cursor-pointer hover:text-ascend-text" />
                </div>
                
                <div className="flex-1 space-y-5">
                    {satisfactionData.map((p, i) => (
                        <div key={i} className="group">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-ascend-text">{p.name}</span>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${p.score >= 90 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {p.score}/100
                                </span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ${p.score >= 90 ? 'bg-green-500' : 'bg-yellow-500'}`} 
                                    style={{ width: `${p.score}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100">
                    <p className="text-xs text-ascend-subtext italic leading-relaxed">
                        "The cohort from the FinTech simulation demonstrated significantly higher skepticism of AI outputs than previous years."
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                        <div className="w-6 h-6 rounded-full bg-gray-200">
                            <img src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff" className="rounded-full" alt="Partner" />
                        </div>
                        <span className="text-xs font-bold text-ascend-text">Head of Audit, Deloitte</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom Row: Live Pulse Feed */}
        <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-2xl border border-ascend-border shadow-sm p-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-ascend-text">Live Signal Pulse</h3>
                        <p className="text-xs text-ascend-subtext">Real-time engagement telemetry from active simulations.</p>
                    </div>
                    <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {feedbackFeed.map((item) => (
                        <div key={item.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-ascend-blue/20 hover:shadow-md transition-all cursor-default">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    {item.type === 'success' ? (
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <AlertCircle className="w-4 h-4 text-orange-500" />
                                    )}
                                    <span className="text-xs font-bold text-ascend-text">{item.lab}</span>
                                </div>
                                <span className="text-[10px] font-bold text-ascend-subtext">{item.time}</span>
                            </div>
                            <p className="text-sm text-ascend-text font-medium leading-snug mb-3">
                                "{item.message}"
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                                    {item.student.charAt(0)}
                                </span>
                                <span className="text-xs text-ascend-subtext font-bold">{item.student}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    </div>
  );
};

export default ObserveDashboard;