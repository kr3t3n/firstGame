import { Good, GameState } from '../types';

const technologyTimeline: { [key: number]: Good[] } = {
  1800: [
    { name: 'Cotton', basePrice: 20, price: 20, previousPrice: 20, category: 'Textile' },
    { name: 'Iron', basePrice: 30, price: 30, previousPrice: 30, category: 'Metal' },
  ],
  1825: [
    { name: 'Steam Engine', basePrice: 100, price: 100, previousPrice: 100, category: 'Industrial' },
    { name: 'Coal', basePrice: 15, price: 15, previousPrice: 15, category: 'Resource' },
  ],
  1850: [
    { name: 'Telegraph', basePrice: 50, price: 50, previousPrice: 50, category: 'Communication' },
    { name: 'Steel', basePrice: 40, price: 40, previousPrice: 40, category: 'Metal' },
  ],
  1875: [
    { name: 'Telephone', basePrice: 60, price: 60, previousPrice: 60, category: 'Communication' },
    { name: 'Light Bulb', basePrice: 30, price: 30, previousPrice: 30, category: 'Industrial' },
  ],
  1900: [
    { name: 'Automobile', basePrice: 500, price: 500, previousPrice: 500, category: 'Transportation' },
    { name: 'Oil', basePrice: 25, price: 25, previousPrice: 25, category: 'Resource' },
  ],
  1925: [
    { name: 'Radio', basePrice: 40, price: 40, previousPrice: 40, category: 'Communication' },
    { name: 'Refrigerator', basePrice: 80, price: 80, previousPrice: 80, category: 'Appliance' },
  ],
  1950: [
    { name: 'Television', basePrice: 200, price: 200, previousPrice: 200, category: 'Entertainment' },
    { name: 'Plastic', basePrice: 10, price: 10, previousPrice: 10, category: 'Material' },
  ],
  1975: [
    { name: 'Personal Computer', basePrice: 1000, price: 1000, previousPrice: 1000, category: 'Technology' },
    { name: 'Microchip', basePrice: 50, price: 50, previousPrice: 50, category: 'Technology' },
  ],
  2000: [
    { name: 'Mobile Phone', basePrice: 300, price: 300, previousPrice: 300, category: 'Communication' },
    { name: 'Internet Service', basePrice: 50, price: 50, previousPrice: 50, category: 'Technology' },
  ],
};

export const getNewGoodsForTechnology = (currentYear: number, previousYear: number): Good[] => {
  const newGoods: Good[] = [];
  for (const [techYear, goods] of Object.entries(technologyTimeline)) {
    const year = parseInt(techYear);
    if (currentYear >= year && previousYear < year) {
      newGoods.push(...goods);
    }
  }
  return newGoods;
};

export const unlockTechnology = (state: GameState, technology: string): GameState => {
  // Implementation for unlocking technology
  return state;
};