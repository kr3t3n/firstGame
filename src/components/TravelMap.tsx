import React from 'react';
import { useGameState } from '../contexts/GameStateContext';

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
      <ul>
        {state.towns.map((town) => (
          <li key={town.name} className="mb-2">
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleTravel(town.name)}
              disabled={town.name === state.player.currentTown || state.player.money < 10 || state.energy < 20}
            >
              Travel to {town.name} (10 gold, 20 energy)
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravelMap;