import React from 'react';
import { FaDollarSign, FaBolt } from 'react-icons/fa';
import { useGameState } from '../contexts/GameStateContext';

const BottomNavigation: React.FC = () => {
  const { state } = useGameState();

  if (!state || !state.player) {
    return null;
  }

  const displayMoney = typeof state.player.money === 'number' && !isNaN(state.player.money)
    ? state.player.money.toFixed(2)
    : '0.00';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around items-center md:hidden">
      <div className="flex items-center">
        <FaDollarSign className="text-green-500 mr-1" />
        <span className="font-bold">{displayMoney}</span>
      </div>
      <div className="flex items-center">
        <FaBolt className="text-yellow-500 mr-1" />
        <span className="font-bold">{state.energy}/{state.maxEnergy}</span>
      </div>
    </div>
  );
};

export default BottomNavigation;