import React from 'react';
import { useGameState } from '../contexts/GameStateContext';

const ResourcePanel: React.FC = () => {
  const { state } = useGameState();

  if (!state || !state.player) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-4">
      <p>Money: ${state.player.money.toFixed(2)}</p>
      <p>Goods:</p>
      <ul>
        {state.player.inventory.map((good) => (
          <li key={good.name}>{good.name} x {good.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResourcePanel;