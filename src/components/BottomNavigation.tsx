import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { formatDate } from '../utils/timeUtils';

const BottomNavigation: React.FC = () => {
  const { state } = useGameState();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex justify-around items-center md:hidden">
      <button className="text-blue-500">Inventory</button>
      <button className="text-blue-500">Market</button>
      <button className="text-blue-500">Travel</button>
      <div className="text-sm bg-gray-100 px-3 py-1 rounded-full shadow-inner">
        <span className="font-medium">{formatDate(state.currentDate)}</span>
      </div>
    </nav>
  );
};

export default BottomNavigation;