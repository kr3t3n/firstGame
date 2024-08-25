import { GameState, NewsItem } from '../types';

const newsTemplates = [
  {
    headline: "Trade Routes Expand as New Technology Emerges",
    body: "Recent advancements in transportation have opened up new trade routes, promising economic growth for savvy merchants.",
    imageUrl: "https://placehold.co/600x400?text=Trade+Routes+Expand"
  },
  {
    headline: "Market Fluctuations Cause Uncertainty",
    body: "Unexpected shifts in supply and demand have led to volatile prices in key commodities. Traders are advised to stay alert.",
    imageUrl: "https://placehold.co/600x400?text=Market+Fluctuations"
  },
  {
    headline: "New Luxury Goods in High Demand",
    body: "A surge in wealth among the upper class has created a booming market for exotic and luxury items.",
    imageUrl: "https://placehold.co/600x400?text=Luxury+Goods+Demand"
  },
  {
    headline: "Political Tensions Affect Trade Relations",
    body: "Diplomatic disputes between major trading powers have resulted in new tariffs and trade restrictions.",
    imageUrl: "https://placehold.co/600x400?text=Political+Tensions"
  },
  {
    headline: "Technological Breakthrough Revolutionizes Industry",
    body: "A groundbreaking invention promises to transform manufacturing processes and create new economic opportunities.",
    imageUrl: "https://placehold.co/600x400?text=Tech+Breakthrough"
  }
];

export const generateEvents = (currentDate: Date, gameState: GameState): NewsItem[] => {
  const shouldGenerateNews = Math.random() < 0.7; // 70% chance to generate news
  
  if (shouldGenerateNews) {
    const template = newsTemplates[Math.floor(Math.random() * newsTemplates.length)];
    return [{
      ...template,
      date: currentDate.toISOString()
    }];
  }
  
  return []; // Return an empty array if no news is generated
};