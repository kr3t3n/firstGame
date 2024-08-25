import React, { useState } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { formatDate } from '../utils/timeUtils';
import Tooltip from './Tooltip';
import SaveConfirmationModal from './SaveConfirmationModal';

interface HeaderProps {
  onEndTurn: () => void;
  onToggleAllSections: () => void;
  allSectionsExpanded: boolean;
  currentDate: Date;
}

const Header: React.FC<HeaderProps> = ({ onEndTurn, onToggleAllSections, allSectionsExpanded, currentDate }) => {
  const { saveGame, newGame } = useGameState();
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [showNewGameConfirmation, setShowNewGameConfirmation] = useState(false);

  const handleSaveGame = () => {
    saveGame();
    setShowSaveConfirmation(true);
  };

  const handleNewGame = () => {
    setShowNewGameConfirmation(true);
  };

  const confirmNewGame = () => {
    newGame();
    saveGame(); // Automatically save the new game state
    setShowNewGameConfirmation(false);
  };

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Merchant Game</h1>
        <div className="text-sm bg-gray-100 px-3 py-1 rounded-full shadow-inner">
          <span className="font-medium">{formatDate(currentDate)}</span>
        </div>
        <div className="flex space-x-2">
          <Tooltip content="Save your current game progress">
            <button
              onClick={handleSaveGame}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-3 rounded-md text-sm transition duration-150 ease-in-out"
            >
              Save Game
            </button>
          </Tooltip>
          <Tooltip content="Start a new game (this will reset all progress)">
            <button
              onClick={handleNewGame}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-3 rounded-md text-sm transition duration-150 ease-in-out"
            >
              New Game
            </button>
          </Tooltip>
          <Tooltip content="Toggle visibility of all game sections">
            <button
              onClick={onToggleAllSections}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1.5 px-3 rounded-md text-sm transition duration-150 ease-in-out"
            >
              {allSectionsExpanded ? 'Collapse All' : 'Expand All'}
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
      </div>
      {showSaveConfirmation && (
        <SaveConfirmationModal onClose={() => setShowSaveConfirmation(false)} />
      )}
      {showNewGameConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
            <h2 className="text-xl font-bold mb-4">Start a New Game?</h2>
            <p className="mb-4">Are you sure you want to start a new game? This will reset all current progress and overwrite your previous save.</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowNewGameConfirmation(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmNewGame}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
              >
                Start New Game
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;