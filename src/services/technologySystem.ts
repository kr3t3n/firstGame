import { Good } from '../types';

const technologies = [
  { name: 'Steam Power', year: 1820, goods: [
    { name: 'Steam Engine', category: 'Industrial' },
    { name: 'Coal', category: 'Raw Materials' }
  ]},
  { name: 'Electricity', year: 1880, goods: [
    { name: 'Light Bulb', category: 'Industrial' },
    { name: 'Copper Wire', category: 'Raw Materials' }
  ]},
  { name: 'Automobile', year: 1900, goods: [
    { name: 'Car', category: 'Transportation' },
    { name: 'Gasoline', category: 'Fuel' }
  ]},
  { name: 'Computer', year: 1950, goods: [
    { name: 'Personal Computer', category: 'Electronics' },
    { name: 'Microchip', category: 'Electronics' }
  ]},
  { name: 'Internet', year: 1990, goods: [
    { name: 'Web Server', category: 'Technology' },
    { name: 'Fiber Optic Cable', category: 'Infrastructure' }
  ]},
];

export const unlockTechnology = (currentDate: Date, unlockedTechnologies: string[]): string | null => {
  const year = currentDate.getFullYear();
  const newTech = technologies.find(tech => tech.year <= year && !unlockedTechnologies.includes(tech.name));
  return newTech ? newTech.name : null;
};

export const getNewGoodsForTechnology = (technology: string): Good[] => {
  const tech = technologies.find(t => t.name === technology);
  return tech ? tech.goods.map(good => ({ 
    name: good.name,
    basePrice: Math.random() * 100 + 50,
    price: Math.random() * 100 + 50,
    category: good.category,
    quantity: 0
  })) : [];
};