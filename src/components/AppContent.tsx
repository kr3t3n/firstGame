import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import GameBoard from './GameBoard';
import Header from './Header';
import BottomNav from './BottomNav';
import HelpScreen from './HelpScreen';
import WelcomeScreen from './WelcomeScreen';
import { getUserPreference, updateUserPreference } from '../utils/userPreferences';

interface HeaderProps {
  onShowHelp: () => void;
}

const AppContent: React.FC = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkWelcomeScreen = async () => {
      if (user) {
        const hasSeenWelcome = await getUserPreference(user.uid, 'hasSeenWelcome');
        setShowWelcome(!hasSeenWelcome);
      } else {
        const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
        setShowWelcome(hasSeenWelcome !== 'true');
      }
    };

    checkWelcomeScreen();
  }, [user]);

  const handleShowHelp = () => setShowHelp(true);
  const handleCloseHelp = () => setShowHelp(false);

  const handleCloseWelcome = (dontShowAgain: boolean) => {
    setShowWelcome(false);
    if (user) {
      updateUserPreference(user.uid, 'hasSeenWelcome', true);
    } else if (dontShowAgain) {
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onShowHelp={handleShowHelp} />
      <main className="flex-grow">
        <GameBoard />
      </main>
      <BottomNav onShowHelp={handleShowHelp} />
      {showHelp && <HelpScreen onClose={handleCloseHelp} />}
      {showWelcome && <WelcomeScreen onClose={handleCloseWelcome} />}
    </div>
  );
};

export default AppContent;