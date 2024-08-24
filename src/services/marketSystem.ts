import { Good, Trend } from '../types';

export const generateMarketSentiment = (good: Good, marketKnowledge: number): Trend => {
  const trend: 'up' | 'down' | 'stable' = Math.random() < 0.33 ? 'up' : Math.random() < 0.66 ? 'down' : 'stable';
  const strength = Math.random();
  return { trend, strength };
};