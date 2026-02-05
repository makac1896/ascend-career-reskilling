import React from 'react';
import { BarChart2, Settings, Layers, Briefcase } from 'lucide-react';
import MarketAnalytics from './MarketAnalytics';
import OpportunityDock from './OpportunityDock';
import FrictionLogs from './FrictionLogs';
import TalentDraftBoard from './TalentDraftBoard';

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

const StatCard: React.FC<{ label: string; value: string; icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="bg-white rounded-card p-6 flex items-center gap-6 shadow-sm border border-ascend-border hover:shadow-lg hover:border-ascend-blue/30 transition-all cursor-default group">
        <div className="w-16 h-16 rounded-full bg-ascend-light-blue flex items-center justify-center text-ascend-blue group-hover:bg-ascend-blue group-hover:text-white transition-colors">
            {icon}
        </div>
        <div>
            <p className="text-ascend-subtext text-sm font-bold uppercase tracking-wider mb-1">{label}</p>
            <h4 className="text-3xl font-bold text-ascend-text">{value}</h4>
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
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-10 animate-in fade-in duration-500">
        
        {/* Module 0: System Health (Stats) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Skills Tracked" value="2,543" icon={<BarChart2 className="w-8 h-8"/>} />
            <StatCard label="Human Gaps" value="12" icon={<Settings className="w-8 h-8"/>} />
            <StatCard label="Curriculums" value="48" icon={<Layers className="w-8 h-8"/>} />
            <StatCard label="Industry Partners" value="142" icon={<Briefcase className="w-8 h-8"/>} />
        </div>

        {/* Module 1: Plan (Analytics Summary) */}
        <div className="h-auto lg:h-[400px]">
             <MarketAnalytics onDeepAnalysis={onDeepAnalysis} />
        </div>

        {/* Module 2: Coordinate (The Dock) */}
        <div className="panel-base p-8 w-full">
            <OpportunityDock 
                onLaunchWorkshop={onLaunchWorkshop} 
                onDismiss={onDismissOpportunity}
                onViewDeck={onViewDeck}
                onAutoDraft={onAutoDraft}
            />
        </div>

        {/* Module 3 & 4: Observe & Monitor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[400px]">
            {/* Observe: Friction Logs */}
            <div className="h-full">
                    <FrictionLogs />
            </div>
            
            {/* Monitor: Draft Board */}
            <div className="h-full">
                    <TalentDraftBoard 
                    onCandidateClick={onCandidateClick} 
                    onViewPipeline={onViewPipeline}
                />
            </div>
        </div>

    </div>
  );
};

export default MainDashboard;