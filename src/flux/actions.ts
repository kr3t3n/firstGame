import { Dispatch } from 'react';
import { GameAction, Good } from '../types';

export const buyGood = (dispatch: Dispatch<GameAction>, good: Good, quantity: number) => {
  dispatch({ type: 'BUY_GOOD', payload: { good, quantity } });
};

export const sellGood = (dispatch: Dispatch<GameAction>, good: Good, quantity: number) => {
  dispatch({ type: 'SELL_GOOD', payload: { good, quantity } });
};

export const travel = (dispatch: Dispatch<GameAction>, townName: string) => {
  dispatch({ type: 'TRAVEL', payload: townName });
};

export const endTurn = (dispatch: Dispatch<GameAction>) => {
  dispatch({ type: 'PROGRESS_TIME' });
  dispatch({ type: 'UPDATE_TOWN_PRICES' });
};

export const upgradeSkill = (dispatch: Dispatch<GameAction>, skill: string) => {
  dispatch({ type: 'UPGRADE_SKILL', payload: skill });
};

// Define your actions here
export const someAction = (good: Good) => {
  // Action implementation
};

// ... other actions