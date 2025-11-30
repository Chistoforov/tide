export type TideState = 'high' | 'low';

export interface TideExtreme {
  type: 'High' | 'Low';
  time: string;
  height: string;
  timestamp: number;
}

export interface TideData {
  currentState: TideState;
  currentStateStart: TideExtreme | null; // Время начала текущего состояния
  nextExtreme: TideExtreme;
  lastUpdated: string;
}

// Stormglass API Response Types
export interface StormglassTideExtreme {
  time: string;
  type: 'high' | 'low';
  height: number;
}

export interface StormglassResponse {
  data: StormglassTideExtreme[];
  meta: {
    cost: number;
    dailyQuota: number;
    end: string;
    lat: number;
    lng: number;
    requestCount: number;
    start: string;
  };
}


