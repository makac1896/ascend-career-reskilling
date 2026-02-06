import React, { useState } from 'react';
import { FileText, Zap, TrendingUp, MoreHorizontal, ArrowRight, Activity, Loader2 } from 'lucide-react';

const skillOpportunities = [
  {
    id: '1',
    skill: 'Clinical Empathy',
    sector: 'Healthcare',
    roles: 850,
    growth: '+12%',
    urgency: 'High',
    color: 'bg-blue-500',
    initial: 'C'
  },
  {
    id: '2',
    skill: 'Strategic Foresight',
    sector: 'Finance',
    roles: 1240,
    growth: '+24%',
    urgency: 'Critical',
    color: 'bg-green-500',
    initial: 'S'
  },
  {
    id: '3',
    skill: 'Creative Curation',
    sector: 'Media',
    roles: 320,
    growth: '+8%',
    urgency: 'Medium',
    color: 'bg-purple-500',
    initial: 'C'
  },
  {
    id: '4',
    skill: 'Ethical Governance',
    sector: 'FinTech',
    roles: 510,
    growth: '+15%',
    urgency: 'High',
    color: 'bg-orange-500',
    initial: 'E'
  },
  {
    id: '5',
    skill: 'Systems Thinking',
    sector: 'Logistics',
    roles: 620,
    growth: '+18%',
    urgency: 'Medium',
    color: 'bg-indigo-500',
    initial: 'S'
  },
  {
    id: '6',
    skill: 'Conflict Negotiation',
    sector: 'Legal',
    roles: 140,
    growth: '+30%',
    urgency: 'Critical',
    color: 'bg-pink-500',
    initial: 'C'
  }
];

interface ActionButtonProps {
    icon: React.ReactNode; 
    label: string; 
    primary?: boolean;
    onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, primary, onClick }) => (
    <button 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
        primary 
        ? 'bg-ascend-blue text-white shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02]' 
        : 'bg-white border border-ascend-border text-ascend-subtext hover:text-ascend-text hover:border-gray-300 hover:bg-gray-50'
    }`}>
        {icon}
        {label}
    </button>
);

interface MarketStreamProps {
    onAction: (action: string, item: string) => void;
}

const SkillCard: React.FC<{ data: typeof skillOpportunities[0], onAction: MarketStreamProps['onAction'] }> = ({ data, onAction }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-ascend-border shadow-sm hover:shadow-md transition-all group mb-4 relative overflow-hidden">
        
        {/* Hover Highlight Line */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-ascend-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <div className="flex justify-between items-start mb-5 pl-2">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${data.color} flex items-center justify-center text-white font-bold text-xl shadow-sm`}>
                    {data.initial}
                </div>
                <div>
                    <h4 className="font-bold text-ascend-text text-base leading-tight group-hover:text-ascend-blue transition-colors mb-0.5">{data.skill}</h4>
                    <span className="text-xs font-bold text-ascend-subtext uppercase tracking-wide">{data.sector}</span>
                </div>
            </div>
            <div className="text-right">
                <div className="flex items-center gap-1.5 justify-end">
                    <Activity className="w-4 h-4 text-green-500" />
                    <span className="text-base font-extrabold text-ascend-text">{data.roles}</span>
                </div>
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md mt-1 inline-block">{data.growth} Demand</span>
            </div>
        </div>

        {/* Action Grid */}
        <div className="flex gap-3 pl-2">
            <ActionButton 
                primary 
                icon={<Zap className="w-3.5 h-3.5" />} 
                label="Plan" 
                onClick={() => onAction('plan', data.skill)}
            />
            <ActionButton 
                icon={<FileText className="w-3.5 h-3.5" />} 
                label="Report" 
                onClick={() => onAction('report', data.skill)}
            />
            <ActionButton 
                icon={<TrendingUp className="w-3.5 h-3.5" />} 
                label="Analyze" 
                onClick={() => onAction('analyze', data.skill)}
            />
        </div>
    </div>
  );
};

const MarketStream: React.FC<MarketStreamProps> = ({ onAction }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
            <h3 className="text-2xl font-bold text-ascend-text tracking-tight">Capability Stream</h3>
            <p className="text-xs text-ascend-subtext font-medium mt-1">Live feed of enduring skill gaps.</p>
        </div>
        <button className="bg-white border border-ascend-border text-ascend-text p-2.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      {/* Infinite Scroll Container */}
      <div className="flex-1 overflow-y-auto pr-3 -mr-3 space-y-2 pb-2 custom-scrollbar">
        {skillOpportunities.map((item) => (
          <SkillCard key={item.id} data={item} onAction={onAction} />
        ))}
        {skillOpportunities.map((item) => (
          <SkillCard key={`dup-${item.id}`} data={item} onAction={onAction} />
        ))}
      </div>
      
      <div className="mt-4 text-center">
         <button 
            onClick={handleLoadMore}
            disabled={isLoading}
            className="text-xs font-bold text-ascend-blue hover:text-blue-700 flex items-center justify-center gap-1 w-full py-3 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
        >
            {isLoading ? (
                <>Loading Signals <Loader2 className="w-3.5 h-3.5 animate-spin" /></>
            ) : (
                <>Load More Signals <ArrowRight className="w-3.5 h-3.5" /></>
            )}
         </button>
      </div>
    </div>
  );
};

export default MarketStream;