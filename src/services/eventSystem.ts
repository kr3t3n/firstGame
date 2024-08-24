import { GameState, NewsItem } from '../types';
import axios from 'axios';

// Use the correct backend URL
const BACKEND_URL = 'https://b72472e4-e722-40e9-a26a-79d0eb9794cd-00-1x63bl89nhgy2.janeway.replit.dev:5174';

const generateHeadline = (gameState: GameState): string => {
  const headlines = [
    `Trade Routes Shift as ${gameState.player.currentTown} Experiences Economic Boom`,
    `${gameState.unlockedTechnologies.length > 0 ? `New Technology '${gameState.unlockedTechnologies[gameState.unlockedTechnologies.length - 1]}'` : 'Technological Advancements'} Reshape Industry in ${gameState.player.currentTown}`,
    `Political Tensions Affect Commerce in ${gameState.towns[Math.floor(Math.random() * gameState.towns.length)].name}`,
    `Natural Disaster Disrupts Supply Chains in ${gameState.towns[Math.floor(Math.random() * gameState.towns.length)].name}`,
    `${gameState.player.currentTown} Merchants Adapt to Changing Market Conditions`,
  ];
  return headlines[Math.floor(Math.random() * headlines.length)];
};

const generateBody = (gameState: GameState): string => {
  const currentTown = gameState.player.currentTown;
  const randomTown = gameState.towns[Math.floor(Math.random() * gameState.towns.length)].name;
  const randomGood = gameState.towns.flatMap(town => town.goods)[Math.floor(Math.random() * gameState.towns.flatMap(town => town.goods).length)].name;
  const latestTech = gameState.unlockedTechnologies.length > 0 ? gameState.unlockedTechnologies[gameState.unlockedTechnologies.length - 1] : 'recent technological advancements';

  const bodies = [
    `Recent developments in ${currentTown} have led to significant changes in the trading landscape. Merchants and traders are advised to stay alert and adjust their strategies accordingly. The price of ${randomGood} has been particularly volatile.`,
    `The introduction of ${latestTech} has created new opportunities for savvy traders. Markets in ${randomTown} are experiencing unprecedented growth, while traditional industries in ${currentTown} face challenges adapting to the new economic reality.`,
    `Political tensions between ${currentTown} and ${randomTown} have resulted in trade restrictions. Traders are seeking alternative routes and goods to maintain their profits. Experts suggest focusing on ${randomGood} as a potential high-yield investment.`,
    `A natural disaster in ${randomTown} has disrupted supply chains across the region. Prices for essential goods are skyrocketing, with ${randomGood} seeing the most dramatic increases. Traders in ${currentTown} are scrambling to meet demand.`,
    `Market analysts in ${currentTown} report shifting consumer preferences, likely influenced by ${latestTech}. Traders who can anticipate these changes stand to make substantial profits, particularly in the ${randomGood} market.`,
  ];
  return bodies[Math.floor(Math.random() * bodies.length)];
};

const generateNewsImage = async (headline: string, body: string): Promise<string> => {
  try {
    const response = await axios.post(`${BACKEND_URL}/openai/image`, { prompt: `${headline}: ${body}` });
    return response.data.image_url;
  } catch (error) {
    console.error("Error generating image with OpenAI:", error);
    return "https://via.placeholder.com/400x200?text=News+Image+Unavailable";
  }
};

export const generateEvents = async (currentDate: Date, gameState: GameState): Promise<NewsItem[]> => {
  const headline = generateHeadline(gameState);
  const body = generateBody(gameState);
  
  try {
    const imageUrl = await generateNewsImage(headline, body);
    return [{
      headline,
      body,
      imageUrl,
      date: currentDate.toISOString()
    }];
  } catch (error) {
    console.error("Error generating news:", error);
    return [{
      headline,
      body,
      imageUrl: "https://via.placeholder.com/400x200?text=News+Image+Unavailable",
      date: currentDate.toISOString()
    }];
  }
};