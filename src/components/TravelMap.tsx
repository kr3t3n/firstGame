import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import Tooltip from './Tooltip';

const TravelMap: React.FC = () => {
  const { state, travel } = useGameState();

  if (!state) {
    return <div>Loading...</div>;
  }

  const handleTravel = (townName: string) => {
    if (townName) {
      travel(townName);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <h3 className="font-medium mr-2">Travel</h3>
        <Tooltip content="Travel to different towns to buy and sell goods. Each journey costs 10 coins and 20 energy.">
          <span className="text-xs text-gray-500 cursor-help">ℹ️</span>
        </Tooltip>
      </div>
      <div className="flex flex-wrap gap-2">
        {state.towns.map((town) => (
          <button
            key={town.name}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-1 px-3 rounded-full text-sm transition duration-150 ease-in-out"
            onClick={() => handleTravel(town.name)}
            disabled={town.name === state.player.currentTown || state.player.money < 10 || state.energy < 20}
          >
            {town.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TravelMap;