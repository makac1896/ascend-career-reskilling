import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { RadarDataPoint } from '../types';
import { MoreHorizontal, Calendar, ArrowUpRight } from 'lucide-react';

const data: RadarDataPoint[] = [
  { subject: 'Ethical Judgment', A: 140, fullMark: 150 },
  { subject: 'Emotional Intel.', A: 120, fullMark: 150 }, 
  { subject: 'Cognitive Flex.', A: 150, fullMark: 150 }, 
  { subject: 'Systems Analysis', A: 90, fullMark: 150 },
  { subject: 'Crit. Reasoning', A: 110, fullMark: 150 },
  { subject: 'Negotiation', A: 130, fullMark: 150 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 rounded-xl shadow-xl border border-ascend-border">
        <h4 className="font-bold text-ascend-text text-sm mb-1">{label}</h4>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-ascend-blue"></div>
            <span className="text-xs font-medium text-ascend-subtext">Intensity:</span>
            <span className="font-bold text-ascend-blue text-sm">{payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

const IndustryRadar: React.FC = () => {
  return (
    <div className="h-full flex flex-col relative">
        
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
            <h3 className="text-xl font-bold text-ascend-text tracking-tight">Human Skill Radar</h3>
            <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                    <ArrowUpRight className="w-3 h-3 text-green-600 mr-1" />
                    <span className="text-green-700 font-bold text-xs">+2.4% Growth</span>
                </div>
                <span className="text-ascend-subtext text-xs font-medium">vs last month</span>
            </div>
        </div>
        <div className="flex items-center gap-2">
             <button className="bg-white border border-ascend-border text-ascend-subtext hover:text-ascend-blue p-2.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                <Calendar className="w-4 h-4" />
             </button>
             <button className="bg-white border border-ascend-border text-ascend-subtext hover:text-ascend-blue p-2.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                <MoreHorizontal className="w-4 h-4" />
             </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 w-full min-h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#E0E5F2" />
            <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#A3AED0', fontSize: 11, fontWeight: 700, dy: 4 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />

            <Radar
              name="Market Demand"
              dataKey="A"
              stroke="#4318FF"
              strokeWidth={3}
              fill="#4318FF"
              fillOpacity={0.15}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stats - Added Borders */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-crisp border border-ascend-border flex flex-col items-center hover:border-ascend-blue transition-colors cursor-default group">
            <span className="text-[10px] font-bold text-ascend-subtext uppercase tracking-wider mb-1">Top Vector</span>
            <span className="text-lg font-extrabold text-ascend-text group-hover:text-ascend-blue transition-colors">Cognitive Flex.</span>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-crisp border border-ascend-border flex flex-col items-center hover:border-ascend-blue transition-colors cursor-default group">
            <span className="text-[10px] font-bold text-ascend-subtext uppercase tracking-wider mb-1">Lowest Supply</span>
            <span className="text-lg font-extrabold text-ascend-text group-hover:text-ascend-blue transition-colors">Ethical Lead.</span>
        </div>
      </div>
    </div>
  );
};

export default IndustryRadar;