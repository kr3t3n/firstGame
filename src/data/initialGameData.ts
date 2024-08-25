import { Town, Player, Good, GameState } from '../types';
import { calculatePrice } from '../services/marketSystem';

const allGoods: Good[] = [
  { name: 'Tea', basePrice: 10, price: 10, category: 'Food & Drink' },
  { name: 'Cloth', basePrice: 15, price: 15, category: 'Textiles' },
  { name: 'Spices', basePrice: 20, price: 20, category: 'Food & Drink' },
  { name: 'Wine', basePrice: 12, price: 12, category: 'Food & Drink' },
  { name: 'Cheese', basePrice: 8, price: 8, category: 'Food & Drink' },
  { name: 'Silk', basePrice: 25, price: 25, category: 'Textiles' },
  { name: 'Tulips', basePrice: 5, price: 5, category: 'Agriculture' },
  { name: 'Pottery', basePrice: 18, price: 18, category: 'Crafts' },
  { name: 'Fish', basePrice: 7, price: 7, category: 'Food & Drink' },
];

const generateTownGoods = (town: string): Good[] => {
  return allGoods.map(good => ({
    ...good,
    price: calculatePrice(good.basePrice, town, good.name),
  }));
};

export const initialGameState: GameState = {
  player: {
    name: 'Player',
    money: 1000,
    inventory: [],
    currentTown: 'London',
    skills: {
      negotiation: 0,
      logistics: 0,
      marketKnowledge: 0,
    },
    skillPoints: 0,
  },
  towns: [
    { name: 'London', goods: generateTownGoods('London') },
    { name: 'Paris', goods: generateTownGoods('Paris') },
    { name: 'Amsterdam', goods: generateTownGoods('Amsterdam') },
  ],
  currentDate: new Date(1800, 0, 1), // January 1, 1800
  energy: 100,
  maxEnergy: 100,
  news: [],
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

export const initialTowns: Town[] = [
  { name: 'London', goods: generateTownGoods('London') },
  { name: 'Paris', goods: generateTownGoods('Paris') },
  { name: 'Amsterdam', goods: generateTownGoods('Amsterdam') },
];

export const initialPlayerData: Player = {
  money: 100,
  currentTown: 'London',
  inventory: [],
  skills: {
    negotiation: 1,
    marketKnowledge: 1,
    logistics: 1,
  },
  skillPoints: 3,
};