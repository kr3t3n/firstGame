import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { FaQuestionCircle, FaHourglassEnd } from 'react-icons/fa';

interface BottomNavProps {
  onShowHelp: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onShowHelp }) => {
  const { state, endTurn } = useGameState();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 md:hidden">
      <div className="flex justify-between items-center">
        <button onClick={onShowHelp} className="p-2 text-center text-blue-500">
          <FaQuestionCircle className="mx-auto text-xl" />
          <span className="text-xs">Help</span>
        </button>
        <div className="text-center">
          <span className="text-sm font-bold">{state.currentDate.getFullYear()}</span>
        </div>
        <button
          onClick={endTurn}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex flex-col items-center"
        >
          <FaHourglassEnd className="mx-auto text-xl" />
          <span className="text-xs">End Turn</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;