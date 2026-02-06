import React from 'react';
import { Award, CheckCircle, ExternalLink, ChevronRight, User } from 'lucide-react';

const candidates = [
    { name: "J. Anderson", project: "Crisis Response Plan", verifiedBy: "Deloitte", score: 98, img: "https://i.pravatar.cc/150?u=1" },
    { name: "S. Chen", project: "Ethical AI Framework", verifiedBy: "Pfizer", score: 96, img: "https://i.pravatar.cc/150?u=2" },
    { name: "M. Davids", project: "Supply Chain Audit", verifiedBy: "Tesla", score: 94, img: "https://i.pravatar.cc/150?u=3" },
    { name: "A. Patel", project: "ESG Risk Model", verifiedBy: "BlackRock", score: 92, img: "https://i.pravatar.cc/150?u=4" },
];

interface TalentDraftBoardProps {
    onCandidateClick?: (name: string) => void;
    onViewPipeline?: () => void;
}

const CandidateRow: React.FC<{ data: typeof candidates[0], onClick?: () => void }> = ({ data, onClick }) => (
    <div 
        onClick={onClick}
        className="flex items-center justify-between p-5 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group border border-transparent hover:border-gray-100"
    >
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-md overflow-hidden shrink-0">
                <img src={data.img} alt={data.name} className="w-full h-full object-cover" />
            </div>
            <div>
                <h5 className="text-base font-bold text-ascend-text group-hover:text-ascend-blue transition-colors mb-0.5">{data.name}</h5>
                <p className="text-xs font-semibold text-ascend-subtext">{data.project}</p>
            </div>
        </div>
        <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
                <div className="flex items-center gap-1.5 justify-end">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-[10px] font-extrabold text-ascend-text uppercase tracking-wide">Verified</span>
                </div>
                <span className="text-[10px] font-medium text-ascend-subtext">by {data.verifiedBy}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-700 font-extrabold text-sm flex items-center justify-center border border-green-100 shadow-sm">
                {data.score}
            </div>
        </div>
    </div>
);

const TalentDraftBoard: React.FC<TalentDraftBoardProps> = ({ onCandidateClick, onViewPipeline }) => {
  return (
    <div className="bg-white rounded-[32px] p-10 border border-ascend-border shadow-soft h-full flex flex-col relative group hover:border-ascend-blue/30 transition-all">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
            <div>
                <div className="flex items-center gap-2 mb-2">
                     <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[11px] font-extrabold text-ascend-subtext uppercase tracking-widest">Module: Top Performers</span>
                </div>
                <h3 className="text-2xl font-bold text-ascend-text tracking-tight">Student Showcase</h3>
            </div>
             <div className="bg-green-50 text-green-600 p-3 rounded-2xl">
                <Award className="w-6 h-6" />
            </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto -mx-2 px-2 space-y-3 custom-scrollbar mb-6">
            {candidates.map((c, i) => (
                <CandidateRow 
                    key={i} 
                    data={c} 
                    onClick={() => onCandidateClick?.(c.name)}
                />
            ))}
             <div className="p-4 border-2 border-dashed border-gray-100 rounded-2xl mt-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                 <span className="text-xs text-ascend-subtext font-bold">+ 142 Verified Projects pending review</span>
            </div>
        </div>

        {/* Footer Action */}
        <div className="mt-auto">
            <button 
                onClick={onViewPipeline}
                className="w-full py-4 bg-ascend-text text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors shadow-lg active:scale-95 tracking-wide"
            >
                View Full List
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    </div>
  );
};

export default TalentDraftBoard;