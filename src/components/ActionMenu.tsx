import React from 'react';
import { useGameState } from '../contexts/GameStateContext';

const ActionMenu: React.FC = () => {
  const { endTurn, state } = useGameState();

  const handleEndTurn = () => {
    console.log('Ending turn');
    endTurn();
  };

  if (!state) {
    return <div>Loading...</div>;
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Actions</h2>
      <p className="mb-2">Current Date: {formatDate(state.currentDate)}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleEndTurn}
      >
        End Turn
      </button>
    </div>
  );
};

export default ActionMenu;