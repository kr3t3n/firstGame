import { Dispatch } from 'react';
import { GameAction } from '../types';

class Dispatcher {
  private listeners: Dispatch<GameAction>[] = [];

  register(listener: Dispatch<GameAction>) {
    this.listeners.push(listener);
  }

  dispatch(action: GameAction) {
    this.listeners.forEach(listener => listener(action));
  }
}

export const dispatcher = new Dispatcher();