export interface Good {
  name: string;
  price: number;
  basePrice: number;
  category?: string;
  quantity?: number;
}

export type Trend = {
  trend: 'up' | 'down' | 'stable';
  strength: number;
};

export interface Town {
  name: string;
  goods: Good[];
}

export interface Player {
  money: number;
  currentTown: string;
  inventory: (Good & { quantity: number })[];
  skills: {
    negotiation: number;
    marketKnowledge: number;
    logistics: number;
  };
  skillPoints: number;
}

export interface NewsItem {
  headline: string;
  body: string;
  date: string;
  imageUrl?: string;
}

export interface GameState {
  currentDate: Date;
  towns: Town[];
  player: Player;
  energy: number;
  maxEnergy: number;
  news: NewsItem[];
  tradeRoutes: TradeRoute[];
  unlockedTechnologies: string[];
}

export type GameAction =
  | { type: 'PROGRESS_TIME' }
  | { type: 'UPDATE_TOWN_PRICES' }
  | { type: 'UPGRADE_SKILL'; payload: keyof Player['skills'] }
  | { type: 'USE_ENERGY'; payload: number }
  | { type: 'ADD_NEWS'; payload: NewsItem }
  | { type: 'BUY_GOOD'; payload: { good: Good; quantity: number } }
  | { type: 'SELL_GOOD'; payload: { good: Good; quantity: number } }
  | { type: 'TRAVEL'; payload: string }
  | { type: 'AUTO_EXECUTE_TURN' }
  | { type: 'UPDATE_STATE'; payload: GameState }
  | { type: 'UPDATE_TRADE_ROUTE'; payload: TradeRoute }
  | { type: 'LOAD_GAME'; payload: GameState }
  | { type: 'NEW_GAME' };

export interface TradeRoute {
  id: string;
  fromTown: string;
  toTown: string;
  goods: string[];
  quantity: number;
  buyThreshold: number;
  sellThreshold: number;
}