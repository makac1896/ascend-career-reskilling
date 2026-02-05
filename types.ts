export interface MarketSignal {
  id: string;
  companyName: string;
  logoInitial: string; // Using initial for simplicity if logo url missing
  message: string;
  tag: string;
  tagType: 'demand' | 'trend' | 'alert';
  timestamp: string;
}

export interface Opportunity {
  id: string;
  title: string;
  subtext: string;
  type: 'partner' | 'skill';
  iconType: 'handshake' | 'cube';
}

export interface RadarDataPoint {
  subject: string;
  A: number; // Market Demand Intensity
  fullMark: number;
}