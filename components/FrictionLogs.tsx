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
    <div className="bg-white rounded-[32px] p-10 border border-ascend-border shadow-soft h-full flex flex-col relative overflow-hidden group hover:border-ascend-blue/30 transition-all">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
                    <span className="text-[11px] font-extrabold text-ascend-subtext uppercase tracking-widest">Module: Observe</span>
                </div>
                <h3 className="text-2xl font-bold text-ascend-text tracking-tight">Friction Engine</h3>
            </div>
            <div className="bg-orange-50 text-orange-600 p-3 rounded-2xl">
                <Activity className="w-6 h-6" />
            </div>
        </div>

        {/* Main Metric */}
        <div className="flex items-baseline gap-4 mb-8">
            <h2 className="text-5xl font-extrabold text-ascend-text tracking-tighter">5.2x</h2>
            <p className="text-sm font-bold text-ascend-subtext">Avg. AI Refinements per Task</p>
        </div>

        {/* Chart - Increased Height for Breathing Room */}
        <div className="h-64 w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#A3AED0', fontSize: 11, fontWeight: 700}} 
                        dy={10}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: '#F4F7FE', radius: 4}} />
                    <Bar dataKey="iterations" radius={[6, 6, 0, 0]} barSize={40}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 4 ? '#F97316' : '#E0E5F2'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Insight Item */}
        <div className="mt-auto bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-start gap-4">
            <RefreshCw className="w-6 h-6 text-orange-500 mt-1 shrink-0" />
            <div>
                <h5 className="text-sm font-bold text-ascend-text mb-2">Process Alert</h5>
                <p className="text-sm text-ascend-subtext leading-relaxed">
                    Students in <span className="font-bold text-ascend-text">Bio-Ethics</span> are regenerating outputs <span className="font-bold text-orange-500">30% more</span> than average. Curriculum intervention recommended.
                </p>
            </div>
        </div>
    </div>
  );
};

export default FrictionLogs;