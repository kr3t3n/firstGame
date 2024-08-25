import { Good } from '../types';

export const generateMarketSentiment = (good: Good, marketKnowledgeLevel: number) => {
  // Implement the market sentiment logic here
  // This is a placeholder implementation
  const trend = Math.random() > 0.5 ? 'up' : 'down';
  const strength = Math.random();
  return { trend, strength, good };
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