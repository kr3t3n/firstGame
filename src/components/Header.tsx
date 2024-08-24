import React from 'react';
import { useGameState } from '../contexts/GameStateContext';

interface HeaderProps {
  onToggleAllSections: () => void;
  allSectionsExpanded: boolean;
  onEndTurn: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleAllSections, allSectionsExpanded, onEndTurn }) => {
  const { state } = useGameState();

  if (!state) {
    return null;
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={onToggleAllSections}
      >
        {allSectionsExpanded ? 'Collapse All' : 'Expand All'}
      </button>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Family Business Tycoon</h1>
        <p>{formatDate(state.currentDate)}</p>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onEndTurn}
      >
        End Turn
      </button>
    </header>
  );
};

export default Header;