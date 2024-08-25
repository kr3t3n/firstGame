import React from 'react';
import { GameStateProvider } from './contexts/GameStateContext';
import GameBoard from './components/GameBoard';

const App: React.FC = () => {
  return (
    <GameStateProvider>
      <GameBoard />
    </GameStateProvider>
  );
};

export default App;