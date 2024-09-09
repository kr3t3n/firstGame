import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { calculateInventoryCapacity } from '../utils/skillEffects';

interface InventoryProps {
  tooltip: React.ReactNode;
}

const Inventory: React.FC<InventoryProps> = ({ tooltip }) => {
  const { state } = useGameState();

  if (!state || !state.player || !state.player.inventory) {
    return <div>Loading...</div>;
  }

  const capacity = calculateInventoryCapacity(state.player.skills.logistics);
  const usedCapacity = state.player.inventory.reduce((total, item) => total + item.quantity, 0);

  const productIcons: { [key: string]: string } = {
    'Tea': '🍵', 'Cloth': '🧵', 'Spices': '🌶️', 'Wine': '🍷', 'Cheese': '🧀',
    'Silk': '🎀', 'Tulips': '🌷', 'Pottery': '🏺', 'Fish': '🐟',
    'Steam Engine': '🚂', 'Coal': '⚫', 'Light Bulb': '💡', 'Copper Wire': '🔌',
    'Car': '🚗', 'Gasoline': '⛽', 'Personal Computer': '💻', 'Microchip': '🖥️',
    'Web Server': '🌐', 'Fiber Optic Cable': '🔬'
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        Inventory
        {tooltip}
      </h3>
      <p className="mb-2">Capacity: {usedCapacity} / {capacity}</p>
      {state.player.inventory.length === 0 ? (
        <p>Your inventory is empty.</p>
      ) : (
        <ul>
          {state.player.inventory.map((item, index) => (
            <li key={index} className="mb-2 flex items-center">
              <span className="mr-2">{productIcons[item.name] || '🔹'}</span>
              {item.name}: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inventory;