import React, { createContext, useContext, useReducer, useState, useCallback } from 'react';
import { Town, Good, GameState, GameAction, NewsItem, TradeRoute } from '../types';
import { initialTowns, initialPlayerData } from '../data/initialGameData';
import { gameReducer, generateNewsEvents } from '../reducers/gameReducer';
import { generateEvents } from '../services/eventSystem';

// Add this at the top of the file
const initialExpandedSections = {
  resources: true,
  energy: true,
  character: true,
  news: true,
  town: true,
  travel: true,
  market: true,
  inventory: true,
};

interface GameStateContextType {
  state: GameState;
  advanceTime: () => void;
  updateTownPrices: () => void;
  upgradeSkill: (skill: keyof GameState['player']['skills']) => void;
  useEnergy: (amount: number) => void;
  addNews: (newsItem: NewsItem) => void;
  buyGood: (good: Good, quantity: number) => void;
  sellGood: (good: Good, quantity: number) => void;
  travel: (townName: string) => void;
  expandedSections: { [key: string]: boolean };
  toggleSection: (section: keyof typeof initialExpandedSections, value?: boolean) => void;
  updateTradeRoute: (updatedRoute: TradeRoute) => void;
  endTurn: () => void;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

const initialState: GameState = {
  currentDate: new Date(1800, 0, 1),
  towns: initialTowns,
  player: initialPlayerData,
  energy: 100,
  maxEnergy: 100,
  news: [] as NewsItem[], // Explicitly type this as NewsItem[]
  unlockedTechnologies: [],
  tradeRoutes: [], // Added this line
};

export const GameStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [expandedSections, setExpandedSections] = useState({
    resources: true,
    energy: true,
    character: true,
    news: true,
    town: true,
    travel: true,
    market: true,
    inventory: true,
  });

  // Update the toggleSection implementation
  const toggleSection = useCallback((section: keyof typeof initialExpandedSections, value?: boolean) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: value !== undefined ? value : !prev[section],
    }));
  }, []);

  const updateTradeRoute = useCallback((updatedRoute: TradeRoute) => {
    dispatch({ type: 'UPDATE_TRADE_ROUTE', payload: updatedRoute });
  }, []);

  const travel = useCallback((townName: string) => {
    if (townName) {
      dispatch({ type: 'TRAVEL', payload: townName });
    }
  }, [dispatch]);

  const advanceTime = useCallback(async () => {
    dispatch({ type: 'PROGRESS_TIME' });
    try {
      const newEvents = await generateEvents(state.currentDate, state);
      newEvents.forEach(event => dispatch({ type: 'ADD_NEWS', payload: event }));
    } catch (error) {
      console.error("Error generating news:", error);
      // Optionally, you can dispatch an error news item here
      dispatch({ type: 'ADD_NEWS', payload: {
        headline: "News Unavailable",
        body: "We apologize, but the latest news couldn't be retrieved at this time.",
        imageUrl: "https://via.placeholder.com/400x200?text=News+Unavailable",
        date: state.currentDate.toISOString()
      }});
    }
  }, [state]);

  const updateTownPrices = useCallback(() => {
    dispatch({ type: 'UPDATE_TOWN_PRICES' });
  }, []);

  const upgradeSkill = useCallback((skill: keyof GameState['player']['skills']) => {
    dispatch({ type: 'UPGRADE_SKILL', payload: skill });
  }, []);

  const useEnergy = useCallback((amount: number) => {
    dispatch({ type: 'USE_ENERGY', payload: amount });
  }, []);

  const addNews = useCallback((newsItem: NewsItem) => {
    dispatch({ type: 'ADD_NEWS', payload: newsItem });
  }, []);

  const buyGood = useCallback((good: Good, quantity: number) => {
    dispatch({ type: 'BUY_GOOD', payload: { good, quantity } });
  }, []);

  const sellGood = useCallback((good: Good, quantity: number) => {
    dispatch({ type: 'SELL_GOOD', payload: { good, quantity } });
  }, []);

  const endTurn = useCallback(async () => {
    dispatch({ type: 'PROGRESS_TIME' });
    dispatch({ type: 'UPDATE_TOWN_PRICES' });
    
    try {
      const newEvents = await generateNewsEvents(state);
      newEvents.forEach(event => {
        if (isNewsItem(event)) {
          dispatch({ type: 'ADD_NEWS', payload: event });
        } else {
          console.error('Invalid NewsItem:', event);
        }
      });
    } catch (error) {
      console.error("Error generating news:", error);
      dispatch({ type: 'ADD_NEWS', payload: {
        headline: "News Unavailable",
        body: "We apologize, but the latest news couldn't be retrieved at this time.",
        imageUrl: "https://via.placeholder.com/400x200?text=News+Unavailable",
        date: state.currentDate.toISOString()
      }});
    }
  }, [dispatch, state]);

  // Add this type guard function
  function isNewsItem(item: any): item is NewsItem {
    return (
      typeof item === 'object' &&
      typeof item.headline === 'string' &&
      typeof item.body === 'string' &&
      typeof item.imageUrl === 'string' &&
      typeof item.date === 'string'
    );
  }

  return (
    <GameStateContext.Provider value={{ 
      state, 
      advanceTime, 
      updateTownPrices, 
      upgradeSkill,
      useEnergy,
      addNews,
      buyGood,
      sellGood,
      travel,
      expandedSections,
      toggleSection,
      updateTradeRoute,
      endTurn
    }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};