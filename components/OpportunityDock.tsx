import React from 'react';
import { GlassHandshake, ClayCube, GlassDNA, GlassLeaf, GlassLightning } from './GlassIcons';
import { ArrowRight, Sparkles, Target, Zap, TrendingUp, Briefcase, Mail, Layers, Calendar, PenTool } from 'lucide-react';

interface InterventionProps {
    title: string;
    provider: string;
    demandMetric: string;
    supplyMetric: string;
    actionType: string;
    actionName: string;
    matchScore: number;
    icon: React.ReactNode;
    theme: 'purple' | 'green' | 'blue' | 'orange';
    ctaLabel: string;
    ctaIcon: React.ReactNode;
    onLaunch?: () => void;
    onAutoDraft?: () => void;
}

const InterventionCard: React.FC<InterventionProps> = ({ 
    title, provider, demandMetric, supplyMetric, actionType, actionName, matchScore, icon, theme, ctaLabel, ctaIcon, onLaunch, onAutoDraft 
}) => {
    
    const themeColors = {
        purple: { 
            border: 'border-purple-200', 
            bg: 'bg-purple-50', 
            text: 'text-purple-700', 
            btn: 'bg-purple-600 hover:bg-purple-700', 
            bar: 'bg-purple-500',
        },
        green: { 
            border: 'border-green-200', 
            bg: 'bg-green-50', 
            text: 'text-green-700', 
            btn: 'bg-green-600 hover:bg-green-700', 
            bar: 'bg-green-500',
        },
        blue: { 
            border: 'border-blue-200', 
            bg: 'bg-blue-50', 
            text: 'text-blue-700', 
            btn: 'bg-blue-600 hover:bg-blue-700', 
            bar: 'bg-blue-500',
        },
        orange: { 
            border: 'border-orange-200', 
            bg: 'bg-orange-50', 
            text: 'text-orange-700', 
            btn: 'bg-orange-600 hover:bg-orange-700', 
            bar: 'bg-orange-500',
        },
    }[theme];

    return (
        <div className="min-w-[450px] h-full bg-white rounded-2xl shadow-crisp border border-ascend-border hover:shadow-xl hover:border-ascend-blue/40 transition-all duration-300 flex flex-col group overflow-hidden relative">
             {/* Top Accent Line */}
            <div className={`h-1.5 w-full ${themeColors.bar}`}></div>

            <div className="p-7 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                            {icon}
                        </div>
                        <div>
                            <h4 className="font-bold text-ascend-text text-lg leading-tight mb-1">{title}</h4>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                <span className="text-xs font-bold text-ascend-subtext uppercase tracking-wide">{provider}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className={`flex items-center gap-1 ${themeColors.bg} px-2.5 py-1 rounded-md border ${themeColors.border}`}>
                            <Zap className={`w-3.5 h-3.5 ${themeColors.text}`} />
                            <span className={`text-[11px] font-extrabold uppercase ${themeColors.text}`}>Urgent</span>
                        </div>
                    </div>
                </div>

                {/* The Gap Metric Visualization */}
                <div className="mb-8 bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                         <span className="text-[10px] font-bold text-ascend-subtext uppercase tracking-wider flex items-center gap-2">
                            <TrendingUp className="w-3.5 h-3.5" /> Market Demand
                         </span>
                         <span className="text-xs font-bold text-ascend-text">{demandMetric}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-ascend-text w-[95%] rounded-full"></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                         <span className="text-[10px] font-bold text-ascend-subtext uppercase tracking-wider flex items-center gap-2">
                            <Briefcase className="w-3.5 h-3.5" /> Uni. Supply
                         </span>
                         <span className={`text-xs font-bold ${themeColors.text}`}>{supplyMetric}</span>
                    </div>
                     <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full ${themeColors.bar} w-[15%] rounded-full`}></div>
                    </div>
                </div>

                {/* The Solution Box */}
                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-ascend-subtext uppercase tracking-widest">Recommended Strategy</span>
                         <div className="flex items-center gap-1">
                            <Target className={`w-3.5 h-3.5 ${themeColors.text}`} />
                            <span className={`text-[11px] font-bold ${themeColors.text}`}>{matchScore}% Match</span>
                         </div>
                    </div>
                    
                    <div className="mb-6 border-l-4 pl-4 border-gray-200">
                        <div className="text-[10px] uppercase font-bold text-ascend-subtext mb-1">{actionType}</div>
                        <h5 className="text-base font-bold text-ascend-text leading-snug">
                            {actionName}
                        </h5>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-3">
                        <button 
                            onClick={onLaunch}
                            className={`col-span-4 py-3 rounded-xl ${themeColors.btn} text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-95`}
                        >
                            {ctaLabel}
                            {ctaIcon}
                        </button>
                        <button 
                            onClick={onAutoDraft}
                            className="col-span-1 border border-ascend-border rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors text-ascend-subtext hover:text-ascend-text active:scale-95"
                        >
                            <Sparkles className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface OpportunityDockProps {
    onLaunchWorkshop?: () => void;
    onDismiss?: () => void;
    onViewDeck?: () => void;
    onAutoDraft?: () => void;
}

const OpportunityDock: React.FC<OpportunityDockProps> = ({ onLaunchWorkshop, onDismiss, onViewDeck, onAutoDraft }) => {
  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-ascend-text tracking-tight">Strategic Opportunities</h3>
            <span className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full border border-red-100 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                4 Critical Gaps Identified
            </span>
          </div>
          <div className="flex gap-2">
              <button 
                onClick={onDismiss}
                className="text-xs font-bold text-ascend-subtext hover:text-ascend-text px-4 py-2 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 transition-all"
              >
                  Dismiss All
              </button>
              <button 
                onClick={onViewDeck}
                className="text-xs font-bold text-ascend-blue hover:text-blue-700 bg-white border border-blue-100 px-5 py-2 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                  View Full Deck
              </button>
          </div>
      </div>

      <div className="flex-1 pb-4 overflow-x-auto scrollbar-hide flex gap-8 items-stretch w-full px-1">
         
         <InterventionCard 
            title="Gen-AI Ethics Pulse"
            provider="Detected via OpenAI"
            demandMetric="High Engagement"
            supplyMetric="Low Awareness"
            actionType="Student Email Blast"
            actionName="Send 'Red Team' Prompting Guide to CS Dept."
            matchScore={99}
            theme="purple"
            icon={<GlassLightning className="w-8 h-8" />}
            ctaLabel="Deploy Blast"
            ctaIcon={<Mail className="w-4 h-4" />}
            onLaunch={onLaunchWorkshop}
            onAutoDraft={onAutoDraft}
         />

         <InterventionCard 
            title="Sustainable Finance"
            provider="Detected via BlackRock"
            demandMetric="450 Open Roles"
            supplyMetric="12 Active Grads"
            actionType="Micro-Course"
            actionName="Deploy 'ESG Investing' Module to Finance Dept."
            matchScore={94}
            theme="green"
            icon={<GlassLeaf className="w-8 h-8" />}
            ctaLabel="Configure Module"
            ctaIcon={<Layers className="w-4 h-4" />}
            onLaunch={onLaunchWorkshop}
            onAutoDraft={onAutoDraft}
         />

         <InterventionCard 
            title="Crisis Response Ops"
            provider="Detected via Tesla"
            demandMetric="Spike in Risk Roles"
            supplyMetric="Theory Only"
            actionType="Live Simulation"
            actionName="Host 'Supply Chain Shortage' War Room Event."
            matchScore={88}
            theme="blue"
            icon={<ClayCube className="w-8 h-8" />}
            ctaLabel="Schedule Live Event"
            ctaIcon={<Calendar className="w-4 h-4" />}
            onLaunch={onLaunchWorkshop}
            onAutoDraft={onAutoDraft}
         />

          <InterventionCard 
            title="Telehealth Protocols"
            provider="Detected via CVS Health"
            demandMetric="Urgent Shift"
            supplyMetric="Outdated Labs"
            actionType="Capstone Project"
            actionName="Launch 'Remote Care' Design Sprint Semester."
            matchScore={82}
            theme="orange"
            icon={<GlassDNA className="w-8 h-8" />}
            ctaLabel="Initialize Semester"
            ctaIcon={<PenTool className="w-4 h-4" />}
            onLaunch={onLaunchWorkshop}
            onAutoDraft={onAutoDraft}
         />
      </div>
    </div>
  );
};

export default OpportunityDock;