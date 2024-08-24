import { Town, Player, Good } from '../types';

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

export const calculatePrice = (basePrice: number, town: string, goodName: string): number => {
  const localGoods: { [key: string]: string[] } = {
    'London': ['Tea', 'Cloth'],
    'Paris': ['Wine', 'Cheese'],
    'Amsterdam': ['Tulips', 'Fish'],
  };

  const isLocal = localGoods[town]?.includes(goodName);
  const distanceFactor = isLocal ? 1 : 1.5 + Math.random() * 0.5;
  return Math.round(basePrice * distanceFactor * 100) / 100;
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