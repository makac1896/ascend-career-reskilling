import React from 'react';
import { Award, CheckCircle, ExternalLink, ChevronRight, User } from 'lucide-react';

const candidates = [
    { name: "J. Anderson", artifact: "Crisis Response Plan", verifiedBy: "Deloitte", score: 98, img: "https://i.pravatar.cc/150?u=1" },
    { name: "S. Chen", artifact: "Ethical AI Framework", verifiedBy: "Pfizer", score: 96, img: "https://i.pravatar.cc/150?u=2" },
    { name: "M. Davids", artifact: "Supply Chain Audit", verifiedBy: "Tesla", score: 94, img: "https://i.pravatar.cc/150?u=3" },
];

interface TalentDraftBoardProps {
    onCandidateClick?: (name: string) => void;
    onViewPipeline?: () => void;
}

const CandidateRow: React.FC<{ data: typeof candidates[0], onClick?: () => void }> = ({ data, onClick }) => (
    <div 
        onClick={onClick}
        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group"
    >
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                <img src={data.img} alt={data.name} className="w-full h-full object-cover" />
            </div>
            <div>
                <h5 className="text-sm font-bold text-ascend-text group-hover:text-ascend-blue transition-colors">{data.name}</h5>
                <p className="text-[10px] font-medium text-ascend-subtext">{data.artifact}</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
                <div className="flex items-center gap-1 justify-end">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-[10px] font-bold text-ascend-text uppercase">Verified</span>
                </div>
                <span className="text-[10px] font-medium text-ascend-subtext">by {data.verifiedBy}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-green-50 text-green-700 font-extrabold text-xs flex items-center justify-center border border-green-100">
                {data.score}
            </div>
        </div>
    </div>
);

const TalentDraftBoard: React.FC<TalentDraftBoardProps> = ({ onCandidateClick, onViewPipeline }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-ascend-border shadow-sm h-full flex flex-col relative group hover:border-ascend-blue/30 transition-all">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
            <div>
                <div className="flex items-center gap-2 mb-1">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold text-ascend-subtext uppercase tracking-widest">Module: Monitor</span>
                </div>
                <h3 className="text-xl font-bold text-ascend-text tracking-tight">Talent Draft Board</h3>
            </div>
             <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                <Award className="w-5 h-5" />
            </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto -mx-2 px-2 space-y-1 custom-scrollbar">
            {candidates.map((c, i) => (
                <CandidateRow 
                    key={i} 
                    data={c} 
                    onClick={() => onCandidateClick?.(c.name)}
                />
            ))}
             <div className="p-3 border-t border-dashed border-gray-200 mt-2 text-center">
                 <span className="text-xs text-ascend-subtext font-medium">+ 142 Verified Artifacts this week</span>
            </div>
        </div>

        {/* Footer Action */}
        <div className="mt-4 pt-2">
            <button 
                onClick={onViewPipeline}
                className="w-full py-3 bg-ascend-text text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors shadow-lg active:scale-95"
            >
                View Full Pipeline
                <ChevronRight className="w-3.5 h-3.5" />
            </button>
        </div>
    </div>
  );
};

export default TalentDraftBoard;