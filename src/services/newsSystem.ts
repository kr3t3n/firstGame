import { GameState, NewsItem, Town, Good } from '../types';

const generateDetailedNews = (state: GameState, currentDate: Date): NewsItem => {
  const towns = state.towns;
  let newsBody = "";
  let newsTitle = "";

  // Analyze market trends across all towns
  const marketTrends: { [key: string]: { up: number, down: number, stable: number } } = {};
  towns.forEach(town => {
    town.goods.forEach(good => {
      if (!marketTrends[good.name]) {
        marketTrends[good.name] = { up: 0, down: 0, stable: 0 };
      }
      const priceChange = ((good.price - good.previousPrice) / good.previousPrice) * 100;
      if (priceChange > 3) marketTrends[good.name].up++;
      else if (priceChange < -3) marketTrends[good.name].down++;
      else marketTrends[good.name].stable++;
    });
  });

  // Determine the most significant market trend
  let significantGood = "";
  let significantTrend = "";
  let maxTrendCount = 0;
  for (const [good, trends] of Object.entries(marketTrends)) {
    if (trends.up > maxTrendCount) {
      significantGood = good;
      significantTrend = "rising";
      maxTrendCount = trends.up;
    }
    if (trends.down > maxTrendCount) {
      significantGood = good;
      significantTrend = "falling";
      maxTrendCount = trends.down;
    }
  }

  if (significantGood) {
    newsTitle = `${significantGood} Prices ${significantTrend.charAt(0).toUpperCase() + significantTrend.slice(1)} Across Markets`;
    newsBody += `The ${significantGood} market is experiencing a significant ${significantTrend} trend across multiple cities. `;
  } else {
    newsTitle = "Market Stability Prevails";
    newsBody += "Markets across cities are showing relative stability with no significant price movements. ";
  }

  // Add details about each city
  towns.forEach(town => {
    newsBody += `In ${town.name}, `;
    const risingGoods = town.goods.filter(good => ((good.price - good.previousPrice) / good.previousPrice) > 0.05);
    const fallingGoods = town.goods.filter(good => ((good.price - good.previousPrice) / good.previousPrice) < -0.05);
    
    if (risingGoods.length > 0) {
      newsBody += `prices for ${risingGoods.map(g => g.name).join(', ')} are on the rise. `;
    }
    if (fallingGoods.length > 0) {
      newsBody += `prices for ${fallingGoods.map(g => g.name).join(', ')} are decreasing. `;
    }
    if (risingGoods.length === 0 && fallingGoods.length === 0) {
      newsBody += `the market remains stable. `;
    }
  });

  // Add a general trading advice
  newsBody += `Traders are advised to carefully consider their buying and selling strategies in light of these market conditions.`;

  return {
    date: currentDate,
    title: newsTitle,
    body: newsBody
  };
};

export const generateNews = (state: GameState, currentDate: Date): NewsItem[] => {
  return [generateDetailedNews(state, currentDate)];
};