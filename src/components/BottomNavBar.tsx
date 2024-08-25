import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { FaQuestionCircle, FaHourglassEnd } from 'react-icons/fa';
import { formatDate } from '../utils/timeUtils';

interface BottomNavBarProps {
  onShowHelp: () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ onShowHelp }) => {
  const { endTurn, state } = useGameState();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-2 flex justify-between items-center md:hidden">
      <button
        onClick={onShowHelp}
        className="flex flex-col items-center text-blue-500"
      >
        <FaQuestionCircle className="text-2xl" />
        <span className="text-xs">Help</span>
      </button>
      <div className="text-sm bg-gray-100 px-3 py-1 rounded-full shadow-inner">
        <span className="font-medium">{formatDate(state.currentDate)}</span>
      </div>
      <button
        onClick={endTurn}
        className="flex flex-col items-center text-green-500"
      >
        <FaHourglassEnd className="text-2xl" />
        <span className="text-xs">End Turn</span>
      </button>
    </nav>
  );
};

export default BottomNavBar;