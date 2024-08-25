import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import Tooltip from './Tooltip';

interface BottomNavBarProps {
  onEndTurn: () => void;
  onToggleAllSections: () => void;
  allSectionsExpanded: boolean;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ onEndTurn, onToggleAllSections, allSectionsExpanded }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md p-2 flex justify-between items-center md:hidden">
      <Tooltip content="Toggle visibility of all game sections">
        <button
          onClick={onToggleAllSections}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1.5 px-3 rounded-md text-sm transition duration-150 ease-in-out"
        >
          {allSectionsExpanded ? 'Collapse' : 'Expand'}
        </button>
      </Tooltip>
      <Tooltip content="End the current turn and advance time">
        <button
          onClick={onEndTurn}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 rounded-md text-sm transition duration-150 ease-in-out"
        >
          End Turn
        </button>
      </Tooltip>
    </div>
  );
};

export default BottomNavBar;