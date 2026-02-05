import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Sparkles, BrainCircuit, Lightbulb } from 'lucide-react';

const data = [
  { name: 'Jan', sysThink: 4000, ethics: 2400, cogFlex: 2400 },
  { name: 'Feb', sysThink: 3000, ethics: 1398, cogFlex: 2210 },
  { name: 'Mar', sysThink: 2000, ethics: 6800, cogFlex: 2290 },
  { name: 'Apr', sysThink: 2780, ethics: 3908, cogFlex: 2000 },
  { name: 'May', sysThink: 1890, ethics: 4800, cogFlex: 2181 },
  { name: 'Jun', sysThink: 2390, ethics: 3800, cogFlex: 2500 },
  { name: 'Jul', sysThink: 3490, ethics: 4300, cogFlex: 2100 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-ascend-border text-xs z-50">
        <p className="font-bold text-ascend-text mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-ascend-subtext capitalize">
                    {entry.name === 'sysThink' ? 'Systems Thinking' : entry.name === 'ethics' ? 'Ethical Lead.' : 'Cog. Flex.'}
                </span>
                <span className="font-bold text-ascend-text">{entry.value.toLocaleString()}</span>
            </div>
        ))}
      </div>
    );
  }
  return null;
};

interface MarketAnalyticsProps {
    onDeepAnalysis: () => void;
}

const MarketAnalytics: React.FC<MarketAnalyticsProps> = ({ onDeepAnalysis }) => {
  const [filter, setFilter] = useState<'1W' | '1M' | '1Y'>('1M');

  return (
    <div className="flex flex-col w-full gap-8 pb-4">
      
      {/* Top Section: Chart */}
      <div className="flex flex-col w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
                <h3 className="text-2xl font-bold text-ascend-text tracking-tight flex items-center gap-2">
                    Market Trajectory
                </h3>
            </div>
            
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 p-1.5 rounded-lg">
                {['1W', '1M', '1Y'].map((f) => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${filter === f ? 'bg-white text-ascend-text shadow-sm border border-gray-100' : 'text-ascend-subtext hover:text-ascend-text'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>
          </div>

          {/* Chart - Fixed Height for Stability */}
          <div className="w-full h-[320px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSysThink" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4318FF" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4318FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEthics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#05CD99" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#05CD99" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E5F2" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#A3AED0', fontSize: 11, fontWeight: 500}} 
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#A3AED0', fontSize: 11, fontWeight: 500}} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#4318FF', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area 
                    type="monotone" 
                    dataKey="sysThink" 
                    stroke="#4318FF" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorSysThink)" 
                />
                <Area 
                    type="monotone" 
                    dataKey="ethics" 
                    stroke="#05CD99" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorEthics)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
      </div>

      {/* Bottom Section: AI Executive Summary (Horizontal Layout) */}
      <div className="w-full bg-gradient-to-r from-blue-50/80 to-indigo-50/30 rounded-2xl border border-blue-100 p-6 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group">
          
          {/* Decorative Blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-40 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:opacity-50 transition-opacity"></div>

          {/* AI Header */}
          <div className="flex items-center gap-4 min-w-max relative z-10 md:border-r border-blue-200 md:pr-8 border-b md:border-b-0 pb-6 md:pb-0 w-full md:w-auto">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-ascend-blue border border-blue-100 group-hover:scale-110 transition-transform">
                  <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                  <h4 className="font-bold text-ascend-text text-base">AI Executive Summary</h4>
                  <p className="text-xs text-ascend-subtext font-bold uppercase tracking-wider">Live Analysis</p>
              </div>
          </div>

          {/* Insights Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full relative z-10">
              {/* Insight 1 */}
              <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-purple-700 uppercase tracking-wide block mb-1">Velocity Alert</span>
                    <p className="text-sm text-ascend-text leading-snug font-medium">
                        <span className="font-bold">Systems Thinking</span> demand rose <span className="font-bold text-green-600">+12%</span> vs narrow coding roles.
                    </p>
                  </div>
              </div>

              {/* Insight 2 */}
              <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                  </div>
                   <div>
                    <span className="text-xs font-extrabold text-green-700 uppercase tracking-wide block mb-1">Supply Gap</span>
                    <p className="text-sm text-ascend-text leading-snug font-medium">
                        <span className="font-bold">Ethical Leadership</span> roles unfilled for 45d. <span className="underline decoration-green-300 decoration-2">Intervention needed.</span>
                    </p>
                  </div>
              </div>
          </div>

          {/* Action Button */}
          <div className="relative z-10 w-full md:w-auto">
              <button 
                onClick={onDeepAnalysis}
                className="w-full md:w-auto whitespace-nowrap bg-white border border-blue-200 text-ascend-blue text-xs font-bold py-3 px-5 rounded-xl shadow-sm hover:shadow-md hover:bg-blue-50 transition-all flex items-center justify-center gap-2 hover:scale-105"
              >
                  <Lightbulb className="w-4 h-4" />
                  Deep Analysis
              </button>
          </div>
      </div>

    </div>
  );
};

export default MarketAnalytics;