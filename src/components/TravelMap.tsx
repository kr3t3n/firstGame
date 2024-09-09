import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { FaInfoCircle } from 'react-icons/fa';
import Tooltip from './Tooltip';

const TravelMap: React.FC = () => {
  const { state, travel } = useGameState();

  if (!state || !state.player) {
    return <div>Loading...</div>;
  }

  const handleTravel = (townName: string) => {
    travel(townName);
  };

  const cityFlags: { [key: string]: string } = {
    'Amsterdam': '🇳🇱',
    'London': '🇬🇧',
    'Paris': '🇫🇷',
    // Add more cities and their corresponding flag emojis here
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2 flex items-center">
        Travel Map
        <Tooltip content="Travel to different cities to find new trading opportunities. Each journey consumes energy and advances time.">
          <FaInfoCircle className="ml-2 text-gray-600 cursor-help" />
        </Tooltip>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {state.towns.map(town => (
          <Tooltip
            key={town.name}
            content={town.name === state.player.currentTown
              ? "You are currently in this city"
              : `Travel to ${town.name}. Cost: 10 energy`}
          >
            <div className="w-full">
              <button
                onClick={() => handleTravel(town.name)}
                disabled={town.name === state.player.currentTown || state.energy < 10}
                className={`w-full p-2 rounded-lg text-white font-bold text-sm ${
                  town.name === state.player.currentTown
                    ? 'bg-gray-400 cursor-not-allowed'
                    : state.energy < 10
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {cityFlags[town.name] || ''} {town.name}
              </button>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default TravelMap;