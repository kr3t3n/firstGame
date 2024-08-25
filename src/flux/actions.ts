import { Dispatch } from 'react';
import { GameAction, Good, Player, NewsItem } from '../types';

export const buyGood = (dispatch: Dispatch<GameAction>, good: Good, quantity: number) => {
  if (!good || typeof good.price !== 'number') {
    console.error('Invalid good or price:', good);
    return;
  }
  const cost = good.price * quantity;
  console.log('Buying good:', good.name, 'Quantity:', quantity, 'Cost:', cost);
  dispatch({ type: 'BUY_GOOD', payload: { good, quantity, cost } });
};

export const sellGood = (dispatch: Dispatch<GameAction>, good: Good, quantity: number) => {
  console.log('Selling good:', good.name, 'Quantity:', quantity, 'Price:', good.price);
  dispatch({ type: 'SELL_GOOD', payload: { good, quantity } });
};

export const travel = (dispatch: Dispatch<GameAction>, townName: string) => {
  dispatch({ type: 'TRAVEL', payload: townName });
};

export const endTurn = (dispatch: Dispatch<GameAction>, newDate: Date, newEvents: NewsItem[]) => {
  dispatch({ type: 'PROGRESS_TIME', payload: { newDate, newEvents } });
  dispatch({ type: 'UPDATE_TOWN_PRICES' });
};

export const upgradeSkill = (dispatch: Dispatch<GameAction>, skill: keyof Player['skills']) => {
  dispatch({ type: 'UPGRADE_SKILL', payload: skill });
};

export const toggleSection = (dispatch: Dispatch<GameAction>, section: string, value: boolean) => {
  dispatch({ type: 'TOGGLE_SECTION', payload: { section, value } });
};

// Define your actions here
export const someAction = (good: Good) => {
  // Action implementation
};

// ... other actions