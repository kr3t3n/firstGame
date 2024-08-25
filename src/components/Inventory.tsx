import React from 'react';
import { useGameState } from '../contexts/GameStateContext';

const Inventory: React.FC = () => {
  const { state } = useGameState();

  if (!state || !state.player || !state.player.inventory) {
    return <div>Loading...</div>;
  }

  const productIcons: { [key: string]: string } = {
    'Tea': '🍵', 'Cloth': '🧵', 'Spices': '🌶️', 'Wine': '🍷', 'Cheese': '🧀',
    'Silk': '🎀', 'Tulips': '🌷', 'Pottery': '🏺', 'Fish': '🐟',
    'Steam Engine': '🚂', 'Coal': '⚫', 'Light Bulb': '💡', 'Copper Wire': '🔌',
    'Car': '🚗', 'Gasoline': '⛽', 'Personal Computer': '💻', 'Microchip': '🖥️',
    'Web Server': '🌐', 'Fiber Optic Cable': '🔬'
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-semibold mb-2">Inventory</h3>
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