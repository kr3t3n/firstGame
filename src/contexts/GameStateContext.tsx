import React, { createContext, useContext, useReducer, ReactNode, useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { gameReducer, generateNewsEvents } from '../reducers/gameReducer';
import { initialGameState } from '../data/initialGameData';
import { GameState, GameAction, Good, NewsItem, Player, TradeRoute, Town } from '../types';
import { advanceTime } from '../utils/timeUtils';
import { auth, firestore } from '../firebase/config';
import { User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { generateNews } from '../services/newsSystem';
import { saveGameToFirestore, loadGameFromFirestore, autoSaveGame } from '../services/firestoreService';
import * as actions from '../flux/actions';

interface GameStateContextType {
  state: GameState;
  user: User | null;
  buyGood: (good: Good, quantity: number) => void;
  sellGood: (good: Good, quantity: number) => void;
  travel: (townName: string) => void;
  endTurn: () => void;
  newGame: () => Promise<void>;
  toggleSection: (sectionName: string, value?: boolean) => void;
  upgradeSkill: (skillName: keyof Player['skills']) => void;
  newsRef: React.Ref<any>;
  isLoading: boolean;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [user, setUser] = useState<User | null>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        try {
          setIsLoading(true);
          const savedState = await loadGameFromFirestore(user.uid);
          if (savedState) {
            dispatch({ type: 'LOAD_GAME', payload: savedState });
          }
        } catch (error) {
          // Handle error silently or show a user-friendly message
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && state && !isLoading) {
      autoSaveGame(user.uid, state);
    }
  }, [state, user, isLoading]);

  const autosave = useCallback((newState: GameState) => {
    if (user) {
      autoSaveGame(user.uid, newState);
    }
  }, [user]);

  const buyGood = useCallback((good: Good, quantity: number) => {
    const cost = good.price * quantity;
    dispatch({ type: 'BUY_GOOD', payload: { good, quantity, cost } });
  }, [dispatch]);

  const sellGood = useCallback((good: Good, quantity: number) => {
    dispatch({ type: 'SELL_GOOD', payload: { good, quantity } });
  }, [dispatch]);

  const travel = useCallback((townName: string) => {
    actions.travel(dispatch, townName);
  }, [dispatch]);

  const endTurn = useCallback(() => {
    console.log('Energy before end turn:', state.energy);
    dispatch({ type: 'END_TURN' });
  }, [dispatch, state]);

  useEffect(() => {
    console.log('Current state after update:', state);
  }, [state]);

  const newGame = useCallback(async () => {
    dispatch({ type: 'NEW_GAME' });
    autosave(initialGameState);
  }, [dispatch, autosave]);

  const upgradeSkill = useCallback((skill: keyof Player['skills']) => {
    actions.upgradeSkill(dispatch, skill);
  }, [dispatch]);

  const toggleSection = useCallback((section: string) => {
    dispatch({ 
      type: 'TOGGLE_SECTION', 
      payload: { section, value: !state.expandedSections[section] } 
    });
  }, [dispatch, state.expandedSections]);

  const contextValue = useMemo(() => ({
    state,
    user,
    buyGood,
    sellGood,
    travel,
    endTurn,
    newGame,
    toggleSection,
    upgradeSkill,
    newsRef,
    isLoading
  }), [state, user, buyGood, sellGood, travel, endTurn, newGame, toggleSection, upgradeSkill, newsRef, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <GameStateContext.Provider value={contextValue}>
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