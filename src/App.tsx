import React from 'react';
import { GameStateProvider } from './contexts/GameStateContext';
import { AuthProvider } from './contexts/AuthContext';
import AppContent from './components/AppContent'; // We'll create this component

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GameStateProvider>
        <AppContent />
      </GameStateProvider>
    </AuthProvider>
  );
};

export default App;