import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { FaHourglassEnd, FaDollarSign, FaBolt } from 'react-icons/fa';
import { formatDate } from '../utils/timeUtils';

interface BottomNavProps {
  onShowHelp: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onShowHelp }) => {
  const { state, endTurn } = useGameState();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 md:hidden">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start">
          <span className="text-lg font-bold flex items-center">
            <FaDollarSign className="text-yellow-500 mr-1 text-xl" />
            {state.player.money.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-lg font-bold flex items-center mt-1">
            <FaBolt className="text-blue-500 mr-1 text-xl" />
            {state.energy}/{state.maxEnergy}
          </span>
        </div>
        <div className="text-center flex items-center">
          <svg className="w-5 h-5 mr-1 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span className="text-lg font-bold">{formatDate(state.currentDate)}</span>
        </div>
        <button
          onClick={endTurn}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex flex-col items-center"
        >
          <FaHourglassEnd className="text-3xl mb-1" />
          <span className="text-sm font-semibold">End Turn</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;