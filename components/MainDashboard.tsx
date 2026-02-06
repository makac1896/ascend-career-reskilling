import React from 'react';
import { BarChart2, Settings, Layers, Briefcase, ArrowUpRight, Activity, Zap, Globe, Cpu, Sparkles, Command, ArrowRight } from 'lucide-react';
import MarketAnalytics from './MarketAnalytics';
import OpportunityDock from './OpportunityDock';
import FrictionLogs from './FrictionLogs';
import TalentDraftBoard from './TalentDraftBoard';
import { GlassGlobe, GlassLightning, ClayCube, GlassDNA } from './GlassIcons';

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

const GlassStatCard: React.FC<{ label: string; value: string; sub: string; icon: React.ReactNode; color: string; trend: string }> = ({ label, value, sub, icon, color, trend }) => (
    <div className="relative overflow-hidden bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-white/60 shadow-lg group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:bg-white/80">
        {/* Decorative Background Blob */}
        <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-2xl ${color}`}></div>
        
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color} bg-opacity-10 text-current border border-black/5 shadow-inner`}>
                    {/* Icon Container: extract color class for text */}
                    <div className={color.replace('bg-', 'text-').replace('500', '600')}>
                        {icon}
                    </div>
                 </div>
                 <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border ${trend.includes('+') ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                    {trend.includes('+') ? <ArrowUpRight className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                    {trend}
                 </span>
            </div>
            
            <div className="flex flex-col gap-1">
                 <h4 className="text-3xl font-extrabold text-ascend-text tracking-tight">{value}</h4>
                 <p className="text-xs font-bold text-ascend-subtext uppercase tracking-widest">{label}</p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100/50 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${color}`}></div>
                <span className="text-xs text-ascend-subtext font-medium">{sub}</span>
            </div>
        </div>
    </div>
);

const SectionHeader: React.FC<{ title: string; subtitle: string; icon: React.ReactNode }> = ({ title, subtitle, icon }) => (
    <div className="flex items-center gap-4 mb-10">
        <div className="w-10 h-10 rounded-xl bg-ascend-text text-white flex items-center justify-center shadow-lg">
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-bold text-ascend-text tracking-tight">{title}</h3>
            <p className="text-xs font-bold text-ascend-subtext uppercase tracking-wide">{subtitle}</p>
        </div>
    </div>
);

const MainDashboard: React.FC<MainDashboardProps> = ({
    onAction,
    onDeepAnalysis,
    onLaunchWorkshop,
    onDismissOpportunity,
    onViewDeck,
    onAutoDraft,
    onCandidateClick,
    onViewPipeline
}) => {
  return (
    <div className="flex flex-col gap-24 w-full max-w-[1600px] mx-auto pb-32 animate-in fade-in duration-500">
        
        {/* HERO SECTION: The Command Bridge */}
        <section className="relative w-full h-[340px] rounded-[40px] overflow-hidden shadow-2xl group shrink-0">
             {/* Background Image with Parallax Feel */}
             <div className="absolute inset-0 bg-gray-900">
                <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                    className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-[2000ms]"
                    alt="Global Network"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-900/40"></div>
             </div>

             {/* Content Overlay */}
             <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                 {/* Top Row */}
                 <div className="flex flex-col lg:flex-row justify-between items-start">
                    <div className="mb-6 lg:mb-0">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-glow">
                                <Globe className="w-3 h-3 animate-pulse" /> Global Sensor Network
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                                <Zap className="w-3 h-3" /> Grid Optimal
                            </span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-2">
                            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Synchronized</span>
                        </h1>
                        <p className="text-slate-300 font-medium text-lg max-w-xl leading-relaxed">
                            Ascend OS is currently orchestrating 2,543 active skill signals across 14 university departments.
                        </p>
                    </div>

                    {/* Right Side: Floating Glass Weather Widget */}
                    <div className="hidden lg:flex flex-col items-end gap-3">
                        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg">
                            <div className="text-right">
                                <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Next Cycle</p>
                                <p className="text-xl font-bold text-white">14h 32m</p>
                            </div>
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                                <Command className="w-6 h-6 text-blue-300 animate-spin-slow" />
                            </div>
                        </div>
                    </div>
                 </div>

                 {/* Bottom Row Actions */}
                 <div className="flex items-center gap-4">
                     <button 
                        onClick={onLaunchWorkshop}
                        className="px-6 py-3.5 bg-white text-ascend-blue rounded-xl font-bold text-sm shadow-glow hover:bg-gray-50 transition-all flex items-center gap-2 group/btn"
                     >
                         <Sparkles className="w-4 h-4" />
                         Launch Intervention
                         <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
                     </button>
                     <button 
                        onClick={onViewDeck}
                        className="px-6 py-3.5 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-sm hover:bg-white/20 transition-all backdrop-blur-md"
                     >
                         View System Report
                     </button>
                 </div>
             </div>
        </section>
        
        {/* Module 0: System Vital Signs (Levitating Cards) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 px-4 relative z-20">
            <GlassStatCard 
                label="Skills Tracked" 
                value="2,543" 
                sub="Across 14 major industries"
                icon={<BarChart2 className="w-6 h-6"/>} 
                color="bg-blue-500"
                trend="+12% Signals"
            />
            <GlassStatCard 
                label="Skill Gaps" 
                value="12" 
                sub="Critical interventions needed"
                icon={<Settings className="w-6 h-6"/>} 
                color="bg-red-500"
                trend="Urgent"
            />
            <GlassStatCard 
                label="Active Labs" 
                value="48" 
                sub="Students currently enrolled"
                icon={<Layers className="w-6 h-6"/>} 
                color="bg-purple-500"
                trend="Stable"
            />
            <GlassStatCard 
                label="Partner Network" 
                value="142" 
                sub="Corporate data sources"
                icon={<Briefcase className="w-6 h-6"/>} 
                color="bg-indigo-500"
                trend="+3 New"
            />
        </section>

        {/* Intelligence Layer 1: PLAN */}
        <section className="w-full">
            <SectionHeader 
                title="Intelligence Layer" 
                subtitle="Module 1: Plan" 
                icon={<Cpu className="w-5 h-5" />} 
            />
            <div className="bg-white rounded-[32px] p-8 border border-ascend-border shadow-soft w-full h-auto">
                 <MarketAnalytics onDeepAnalysis={onDeepAnalysis} />
            </div>
        </section>

        {/* Intelligence Layer 2: COORDINATE */}
        <section className="w-full">
             <SectionHeader 
                title="Orchestration Layer" 
                subtitle="Module 2: Coordinate" 
                icon={<Command className="w-5 h-5" />} 
            />
            <div className="bg-white rounded-[32px] p-8 border border-ascend-border shadow-soft w-full h-auto">
                <OpportunityDock 
                    onLaunchWorkshop={onLaunchWorkshop} 
                    onDismiss={onDismissOpportunity}
                    onViewDeck={onViewDeck}
                    onAutoDraft={onAutoDraft}
                />
            </div>
        </section>

        {/* Intelligence Layer 3: OBSERVE & MONITOR */}
        <section className="w-full">
            <SectionHeader 
                title="Telemetry Layer" 
                subtitle="Modules 3 & 4: Observe / Monitor" 
                icon={<Activity className="w-5 h-5" />} 
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full h-auto">
                {/* Observe: Friction Logs */}
                <div className="w-full h-auto">
                        <FrictionLogs />
                </div>
                
                {/* Monitor: Draft Board */}
                <div className="w-full h-auto">
                        <TalentDraftBoard 
                        onCandidateClick={onCandidateClick} 
                        onViewPipeline={onViewPipeline}
                    />
                </div>
            </div>
        </section>

    </div>
  );
};

export default MainDashboard;