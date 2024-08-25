import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { calculateInventoryCapacity } from '../utils/skillEffects';
import Tooltip from './Tooltip';

const InventoryPanel: React.FC = () => {
  const { state } = useGameState();
  const capacity = calculateInventoryCapacity(state.player.skills.logistics);
  const usedCapacity = state.player.inventory.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2">
        Inventory
        <Tooltip content="Your current goods. The capacity increases with your Logistics skill.">
          <span className="text-xs text-gray-500 ml-2 cursor-help">ℹ️</span>
        </Tooltip>
      </h3>
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