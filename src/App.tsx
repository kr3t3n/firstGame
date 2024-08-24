import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GameStateProvider } from './contexts/GameStateContext';
import GameBoard from './components/GameBoard';

const App: React.FC = () => {
  return (
    <Router>
      <GameStateProvider>
        <Routes>
          <Route path="/" element={<GameBoard />} />
        </Routes>
      </GameStateProvider>
    </Router>
  );
};

export default App;