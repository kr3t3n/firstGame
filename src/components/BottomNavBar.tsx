import React from 'react';
import { useGameState } from '../contexts/GameStateContext';

interface BottomNavBarProps {
  onToggleAllSections: () => void;
  allSectionsExpanded: boolean;
  onEndTurn: () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ onToggleAllSections, allSectionsExpanded, onEndTurn }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center md:hidden">
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={onToggleAllSections}
      >
        {allSectionsExpanded ? 'Collapse All' : 'Expand All'}
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onEndTurn}
      >
        End Turn
      </button>
    </div>
  );
};

export default BottomNavBar;