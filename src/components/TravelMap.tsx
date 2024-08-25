import React from 'react';
import { useGameState } from '../contexts/GameStateContext';

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
      <h2 className="text-xl font-bold mb-2">Travel Map</h2>
      <div className="flex flex-wrap justify-between">
        {state.towns.map(town => (
          <button
            key={town.name}
            onClick={() => handleTravel(town.name)}
            disabled={town.name === state.player.currentTown || state.energy < 10}
            className={`flex-1 p-2 m-1 rounded-lg text-white font-bold text-sm ${
              town.name === state.player.currentTown
                ? 'bg-gray-400 cursor-not-allowed'
                : state.energy < 10
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {cityFlags[town.name] || ''} {town.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TravelMap;