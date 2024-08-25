import { Town, Player, Good, GameState } from '../types';
import { calculatePrice } from '../services/marketSystem';
import { generateNews } from '../services/newsSystem';
import { generateMarketSentiment } from '../services/marketSystem';

const allGoods: Good[] = [
  { name: 'Tea', basePrice: 10, price: 10, previousPrice: 10, category: 'Food & Drink' },
  { name: 'Cloth', basePrice: 15, price: 15, previousPrice: 15, category: 'Textiles' },
  { name: 'Spices', basePrice: 20, price: 20, previousPrice: 20, category: 'Food & Drink' },
  { name: 'Wine', basePrice: 12, price: 12, previousPrice: 12, category: 'Food & Drink' },
  { name: 'Cheese', basePrice: 8, price: 8, previousPrice: 8, category: 'Food & Drink' },
  { name: 'Silk', basePrice: 25, price: 25, previousPrice: 25, category: 'Textiles' },
  { name: 'Tulips', basePrice: 5, price: 5, previousPrice: 5, category: 'Agriculture' },
  { name: 'Pottery', basePrice: 18, price: 18, previousPrice: 18, category: 'Crafts' },
  { name: 'Fish', basePrice: 7, price: 7, previousPrice: 7, category: 'Food & Drink' },
];

const generateTownGoods = (town: string): Good[] => {
  return allGoods.map(good => ({
    ...good,
    price: calculatePrice(good.basePrice, town, good.name),
    previousPrice: good.basePrice,
    marketSentiment: generateMarketSentiment(good, startDate),
  }));
};

const startDate = new Date(1800, 0, 1); // January 1, 1800

const initialTowns: Town[] = [
  { name: 'London', goods: generateTownGoods('London') },
  { name: 'Paris', goods: generateTownGoods('Paris') },
  { name: 'Amsterdam', goods: generateTownGoods('Amsterdam') },
];

const initialPlayerData: Player = {
  money: 1000, // Make sure this is set to the correct starting amount
  inventory: [],
  currentTown: 'London',
  skills: {
    negotiation: 0,
    logistics: 0,
    marketKnowledge: 0,
  },
  skillPoints: 0,
};

const initialGameStateWithoutNews: Omit<GameState, 'news'> = {
  player: initialPlayerData,
  towns: initialTowns,
  currentDate: startDate,
  energy: 100,
  maxEnergy: 100,
  unlockedTechnologies: [],
  tradeRoutes: [],
  expandedSections: {
    playerInfo: true,
    town: true,
    marketAndTravel: true,
    inventory: true,
    news: true,
  },
};

export const initialGameState: GameState = {
  ...initialGameStateWithoutNews,
  currentDate: startDate,
  news: generateNews(initialGameStateWithoutNews as GameState, startDate),
};

// Comment out or remove this line
// console.log('Initial game state:', initialGameState);

export { initialTowns, initialPlayerData };