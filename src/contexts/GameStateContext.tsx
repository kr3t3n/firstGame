import React, { createContext, useContext, useReducer, ReactNode, useCallback, useState, useEffect } from 'react';
import { gameReducer } from '../reducers/gameReducer';
import { initialGameState } from '../data/initialGameData';
import { GameState, GameAction, Good, NewsItem } from '../types';
import { upgradeSkill as upgradeSkillAction } from '../flux/actions';
import { calculateTurnLength, advanceTime } from '../utils/timeUtils';
import { generateEvents } from '../services/eventSystem';

interface GameStateContextType {
  state: GameState;
  buyGood: (good: Good, quantity: number) => void;
  sellGood: (good: Good, quantity: number) => void;
  travel: (townName: string) => void;
  endTurn: () => void;
  addNews: (news: NewsItem) => void;
  toggleSection: (section: string, value?: boolean) => void;
  expandedSections: {
    [key: string]: boolean;
  };
  upgradeSkill: (skill: string) => void;
  setCurrentNewsIndex: (index: number) => void;
  saveGame: () => void;
  loadGame: () => void;
  newGame: () => void;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const buyGood = (good: Good, quantity: number) => {
    dispatch({ type: 'BUY_GOOD', payload: { good, quantity } });
  };

  const sellGood = (good: Good, quantity: number) => {
    dispatch({ type: 'SELL_GOOD', payload: { good, quantity } });
  };

  const travel = (townName: string) => {
    dispatch({ type: 'TRAVEL', payload: townName });
  };

  const endTurn = useCallback(() => {
    const turnLength = calculateTurnLength(state.currentDate.getFullYear());
    const newDate = advanceTime(state.currentDate, turnLength);
    const newEvents = generateEvents(newDate, state);
    
    dispatch({ type: 'PROGRESS_TIME', payload: { newDate, newEvents } });
    dispatch({ type: 'UPDATE_TOWN_PRICES' });
    
    // Reset the current news index to 0 to show the latest news
    setCurrentNewsIndex(0);
  }, [state]);

  const addNews = (news: NewsItem) => {
    dispatch({ type: 'ADD_NEWS', payload: news });
  };

  const toggleSection = (section: string, value?: boolean) => {
    dispatch({ 
      type: 'TOGGLE_SECTION', 
      payload: { section, value: value !== undefined ? value : !state.expandedSections[section] } 
    });
  };

  const upgradeSkill = (skill: string) => {
    upgradeSkillAction(dispatch, skill);
  };

  const saveGame = useCallback(() => {
    localStorage.setItem('gameState', JSON.stringify(state));
  }, [state]);

  const loadGame = useCallback(() => {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      parsedState.currentDate = new Date(parsedState.currentDate); // Convert date string back to Date object
      dispatch({ type: 'LOAD_GAME', payload: parsedState });
    }
  }, []);

  const newGame = useCallback(() => {
    dispatch({ type: 'NEW_GAME' });
  }, []);

  // Load saved game on initial render
  useEffect(() => {
    loadGame();
  }, []);

  return (
    <GameStateContext.Provider value={{ 
      state, 
      buyGood, 
      sellGood, 
      travel, 
      endTurn, 
      addNews, 
      toggleSection, 
      expandedSections: state.expandedSections, 
      upgradeSkill,
      setCurrentNewsIndex,
      saveGame,
      loadGame,
      newGame
    }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};