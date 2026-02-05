import React from 'react';
import { Activity, RefreshCw, AlertCircle, CheckCircle2, Search } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';

const data = [
  { name: 'Wk 1', iterations: 2.4 },
  { name: 'Wk 2', iterations: 3.1 },
  { name: 'Wk 3', iterations: 4.8 }, // Spike
  { name: 'Wk 4', iterations: 4.2 },
  { name: 'Wk 5', iterations: 5.5 }, // Peak
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-lg shadow-lg border border-ascend-border text-xs">
          <p className="font-bold text-ascend-text">{label}</p>
          <p className="text-ascend-blue font-medium">Avg. {payload[0].value} refinements</p>
        </div>
      );
    }
    return null;
  };

const FrictionLogs: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-ascend-border shadow-sm h-full flex flex-col relative overflow-hidden group hover:border-ascend-blue/30 transition-all">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold text-ascend-subtext uppercase tracking-widest">Module: Observe</span>
                </div>
                <h3 className="text-xl font-bold text-ascend-text tracking-tight">Friction Engine</h3>
            </div>
            <div className="bg-orange-50 text-orange-600 p-2 rounded-lg">
                <Activity className="w-5 h-5" />
            </div>
        </div>

        {/* Main Metric */}
        <div className="flex items-end gap-3 mb-6">
            <h2 className="text-4xl font-bold text-ascend-text">5.2x</h2>
            <p className="text-sm font-medium text-ascend-subtext mb-1.5">Avg. AI Refinements per Task</p>
        </div>

        {/* Chart */}
        <div className="h-32 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#A3AED0', fontSize: 10, fontWeight: 600}} 
                        dy={5}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: '#F4F7FE'}} />
                    <Bar dataKey="iterations" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 4 ? '#F97316' : '#E0E5F2'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Insight Item */}
        <div className="mt-auto bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
                <h5 className="text-sm font-bold text-ascend-text mb-1">Process Alert</h5>
                <p className="text-xs text-ascend-subtext leading-relaxed">
                    Students in <span className="font-bold text-ascend-text">Bio-Ethics</span> are regenerating outputs <span className="font-bold text-orange-500">30% more</span> than average. Curriculum intervention recommended.
                </p>
            </div>
        </div>
    </div>
  );
};

export default FrictionLogs;