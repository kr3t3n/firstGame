import { Good, Trend, Town } from '../types';

export const generateMarketSentiment = (good: Good, date: Date): Trend => {
  // This is a placeholder implementation. Replace with your actual market simulation logic.
  const random = Math.random();
  let trend: 'up' | 'down' | 'stable';
  let strength: number;

  if (random < 0.4) {
    trend = 'up';
    strength = Math.random();
  } else if (random < 0.8) {
    trend = 'down';
    strength = Math.random();
  } else {
    trend = 'stable';
    strength = Math.random() * 0.3; // Stable trends have lower strength
  }

  return { trend, strength };
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

export const updateMarketPrices = (towns: Town[], currentDate: Date): Town[] => {
  return towns.map(town => ({
    ...town,
    goods: town.goods.map((good: Good) => ({
      ...good,
      previousPrice: good.price,
      price: calculatePrice(good.basePrice, town.name, good.name)
    }))
  }));
};