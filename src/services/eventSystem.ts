import { GameState, NewsItem } from '../types';

const newsTemplates = [
  {
    title: "Trade Routes Expand as New Technology Emerges",
    body: "Recent advancements in transportation have opened up new trade routes, promising economic growth for savvy merchants.",
    imageUrl: "https://placehold.co/600x400?text=Trade+Routes+Expand"
  },
  {
    title: "Market Fluctuations Cause Uncertainty",
    body: "Unexpected shifts in supply and demand have led to volatile prices in key commodities. Traders are advised to stay alert.",
    imageUrl: "https://placehold.co/600x400?text=Market+Fluctuations"
  },
  {
    title: "New Luxury Goods in High Demand",
    body: "A surge in wealth among the upper class has created a booming market for exotic and luxury items.",
    imageUrl: "https://placehold.co/600x400?text=Luxury+Goods+Demand"
  },
  {
    title: "Political Tensions Affect Trade Relations",
    body: "Diplomatic disputes between major trading powers have resulted in new tariffs and trade restrictions.",
    imageUrl: "https://placehold.co/600x400?text=Political+Tensions"
  },
  {
    title: "Technological Breakthrough Revolutionizes Industry",
    body: "A groundbreaking invention promises to transform manufacturing processes and create new economic opportunities.",
    imageUrl: "https://placehold.co/600x400?text=Tech+Breakthrough"
  }
];

export const generateEvents = (newDate: Date, state: GameState): NewsItem[] => {
  const numberOfEvents = Math.floor(Math.random() * 3) + 1; // Generate 1 to 3 events
  const newEvents: NewsItem[] = [];

  for (let i = 0; i < numberOfEvents; i++) {
    const randomTemplate = newsTemplates[Math.floor(Math.random() * newsTemplates.length)];
    newEvents.push({
      ...randomTemplate,
      date: newDate,
    });
  }

  return newEvents;
};