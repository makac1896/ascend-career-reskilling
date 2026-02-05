import React from 'react';
import IndustryRadar from './IndustryRadar';
import MarketStream from './MarketStream';
import { Radio, Database, Globe } from 'lucide-react';

interface IngestionDashboardProps {
    onAction: (action: string, item: string) => void;
}

const IngestionDashboard: React.FC<IngestionDashboardProps> = ({ onAction }) => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-10 animate-in fade-in duration-500">
        
        <div className="flex items-center justify-between">
             <div>
                <h2 className="text-3xl font-bold text-ascend-text tracking-tight mb-2">Ingestion Engine</h2>
                <p className="text-ascend-subtext text-sm font-medium">Global radar scanning for external skill signals.</p>
            </div>
            <div className="flex items-center gap-4 bg-white border border-ascend-border px-4 py-2 rounded-xl shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-ascend-text">Live Feed Active</span>
                </div>
                <div className="w-px h-4 bg-gray-200"></div>
                <div className="flex items-center gap-2 text-ascend-subtext">
                    <Globe className="w-4 h-4" />
                    <span className="text-xs font-bold">4 Sources Connected</span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[600px]">
            {/* Left: The Radar (Hero Visualization) */}
            <div className="lg:col-span-7 panel-base p-8 h-[600px] flex flex-col relative overflow-hidden">
                 {/* Background decoration */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                 
                 <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="p-2 bg-ascend-blue/10 text-ascend-blue rounded-lg">
                        <Radio className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-ascend-text">Market Signal Radar</h3>
                        <p className="text-xs text-ascend-subtext">Real-time skills taxonomy mapping.</p>
                    </div>
                 </div>

                 <div className="flex-1">
                    <IndustryRadar />
                 </div>
            </div>

            {/* Right: The Stream (Feed) */}
            <div className="lg:col-span-5 panel-base p-8 h-[600px] flex flex-col">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <Database className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-ascend-text">Raw Ingestion</h3>
                        <p className="text-xs text-ascend-subtext">Unfiltered job reqs & reports.</p>
                    </div>
                 </div>
                 <MarketStream onAction={onAction} />
            </div>
        </div>
    </div>
  );
};

export default IngestionDashboard;