import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { calculateInventoryCapacity } from '../utils/skillEffects';

const InventoryPanel: React.FC = () => {
  const { state } = useGameState();
  const capacity = calculateInventoryCapacity(state.player.skills.logistics);
  const usedCapacity = state.player.inventory.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="mb-4">
      <p>Capacity: {usedCapacity} / {capacity}</p>
      <ul>
        {state.player.inventory.map((item) => (
          <li key={item.name} className="mb-1">
            {item.name}: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryPanel;