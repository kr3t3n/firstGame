import React, { useState } from 'react';
import { GameStateProvider } from './contexts/GameStateContext';
import { AuthProvider } from './contexts/AuthContext';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HelpScreen from './components/HelpScreen';

// Add onShowHelp prop to HeaderProps interface
interface HeaderProps {
  onShowHelp: () => void;
}

// Update the Header component usage
<Header onShowHelp={() => {/* Add your logic here */}} />

const App: React.FC = () => {
  const [showHelp, setShowHelp] = useState(false);

  const handleShowHelp = () => {
    setShowHelp(true);
  };

  const handleCloseHelp = () => {
    setShowHelp(false);
  };

  return (
    <AuthProvider>
      <GameStateProvider>
        <div className="flex flex-col min-h-screen">
          <Header onShowHelp={handleShowHelp} />
          <main className="flex-grow">
            <GameBoard />
          </main>
          <BottomNav onShowHelp={handleShowHelp} />
          {showHelp && <HelpScreen onClose={handleCloseHelp} />}
        </div>
      </GameStateProvider>
    </AuthProvider>
  );
};

export default App;