import { GameState, NewsItem, Town, Good } from '../types';

const generateCityNews = (town: Town): NewsItem => {
  const events = [
    {
      headline: `Economic Boom in ${town.name}`,
      body: `The economy of ${town.name} is thriving, leading to increased demand for luxury goods. Traders are flocking to the city to capitalize on the growing market.`,
      imageUrl: `https://placehold.co/600x400?text=Economic+Boom+in+${encodeURIComponent(town.name)}`,
      date: new Date()
    },
    {
      headline: `Trade Festival Begins in ${town.name}`,
      body: `A grand trade festival has kicked off in ${town.name}, attracting merchants from all corners of the world. Expect bustling markets and unique trading opportunities in the coming days.`,
      imageUrl: `https://placehold.co/600x400?text=Trade+Festival+in+${encodeURIComponent(town.name)}`,
      date: new Date()
    },
    // Add more city-specific events...
  ];
  return events[Math.floor(Math.random() * events.length)];
};

const generateGlobalNews = (): NewsItem => {
  const events = [
    {
      headline: "New Trade Agreement Signed",
      body: "A groundbreaking trade agreement has been signed between major powers, promising to reduce tariffs and streamline customs procedures. This development is expected to significantly boost international trade volumes and potentially lower prices for imported goods. Traders should prepare for increased competition but also new opportunities in foreign markets. Keep an eye on goods that were previously subject to high tariffs, as they may now become more profitable to trade.",
      imageUrl: "https://placehold.co/600x400?text=Trade+Agreement+Signed",
      date: new Date()
    },
    {
      headline: "Global Economic Crisis Looms",
      body: "Economic indicators are pointing towards a potential global crisis. Markets worldwide are experiencing volatility, and demand for luxury goods is decreasing. Traders are advised to be cautious and consider focusing on essential goods which tend to maintain stable demand even in economic downturns. It may be wise to diversify your inventory and trade routes to mitigate risks. Stay informed about economic policies that may be implemented to combat the crisis.",
      imageUrl: "https://placehold.co/600x400?text=Economic+Crisis+Warning",
      date: new Date()
    },
    // Add more detailed global events...
  ];
  return events[Math.floor(Math.random() * events.length)];
};

const technologicalEvents = [
  "A new loom design revolutionizes textile production, increasing efficiency by 50%.",
  "Improved shipbuilding techniques allow for larger cargo holds and faster travel times.",
  "The invention of the printing press leads to rapid spread of knowledge and literacy.",
  "Advancements in metallurgy result in stronger and lighter materials for tools and weapons.",
  "A breakthrough in agriculture techniques promises to increase crop yields significantly."
];

const generateTechNews = (year: number): NewsItem => ({
  headline: `Technological Breakthrough of ${year}`,
  body: technologicalEvents[Math.floor(Math.random() * technologicalEvents.length)],
  date: new Date(),
  imageUrl: "https://placehold.co/600x400?text=Tech+News",
});

const historicalEvents = [
  "The Renaissance begins, ushering in a new era of art, culture, and scientific inquiry.",
  "The discovery of the New World opens up unprecedented trade opportunities.",
  "The Industrial Revolution takes hold, transforming manufacturing and urban landscapes.",
  "A new philosophical movement challenges traditional economic thinking.",
  "A major peace treaty is signed, reshaping political boundaries and trade routes."
];

const generateHistoricalNews = (year: number): NewsItem => ({
  headline: `Historical Milestone: ${year}`,
  body: historicalEvents[Math.floor(Math.random() * historicalEvents.length)],
  date: new Date(),
  imageUrl: "https://placehold.co/600x400?text=Historical+Event",
});

const generateMarketTrendNews = (goods: Good[]): NewsItem => {
  const good = goods[0];
  const trend = good.price > good.previousPrice ? "rising" : "falling";
  const reason = good.price > good.previousPrice ? 
    "due to increased demand and limited supply" : 
    "as markets become saturated and demand wanes";
  
  return {
    headline: `Market Alert: ${good.name} Prices ${trend.charAt(0).toUpperCase() + trend.slice(1)}`,
    body: `The price of ${good.name} is ${trend} ${reason}. Traders are advised to adjust their strategies accordingly.`,
    date: new Date(),
    imageUrl: `https://placehold.co/600x400?text=${encodeURIComponent(good.name)}+Price+${trend.charAt(0).toUpperCase() + trend.slice(1)}`,
  };
};

export const generateNews = (state: GameState, newDate: Date): NewsItem[] => {
  const newsItems: NewsItem[] = [];

  // Generate town-specific news
  const currentTown = state.towns.find(t => t.name === state.player.currentTown);
  if (currentTown) {
    newsItems.push({
      ...generateCityNews(currentTown),
      date: newDate
    });
  }

  // Generate market trend news based on price changes
  const significantPriceChanges = state.towns.flatMap(town => 
    town.goods.filter(good => Math.abs(good.price - good.previousPrice) / good.previousPrice > 0.1)
  );
  if (significantPriceChanges.length > 0) {
    const randomGood = significantPriceChanges[Math.floor(Math.random() * significantPriceChanges.length)];
    newsItems.push({
      ...generateMarketTrendNews([randomGood]),
      date: newDate
    });
  }

  // Generate global news
  if (Math.random() < 0.3) {
    newsItems.push({...generateGlobalNews(), date: newDate});
  }

  // Generate tech news if it's a new year
  const currentYear = state.currentDate.getFullYear();
  const newYear = newDate.getFullYear();
  if (newYear > currentYear) {
    newsItems.push({
      ...generateTechNews(newYear),
      date: newDate
    });
  }

  // Ensure we have at least one news item
  if (newsItems.length === 0) {
    newsItems.push({...generateGlobalNews(), date: newDate});
  }

  return newsItems;
};