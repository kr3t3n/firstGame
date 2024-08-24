import React from 'react';
import { useGameState } from '../contexts/GameStateContext';

const EnergyDisplay: React.FC = () => {
  const { state } = useGameState();

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Energy</h2>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${(state.energy / state.maxEnergy) * 100}%` }}
        ></div>
      </div>
      <p className="mt-1">{state.energy} / {state.maxEnergy}</p>
    </div>
  );
};

export default EnergyDisplay;