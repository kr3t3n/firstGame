import React, { useState } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { Good } from '../types';

const TownView: React.FC = () => {
  const { state, buyGood, sellGood } = useGameState();
  const [unselectedCategories, setUnselectedCategories] = useState<string[]>([]);

  if (!state || !state.player || !state.player.inventory) {
    return <div>Loading...</div>;
  }

  const currentTown = state.towns.find(town => town.name === state.player.currentTown);

  if (!currentTown) {
    return <div>Error: Current town not found</div>;
  }

  const categories = Array.from(new Set(currentTown.goods.map(good => good.category || 'Uncategorized')));

  const toggleCategory = (category: string) => {
    setUnselectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredGoods = currentTown.goods.filter(good => !unselectedCategories.includes(good.category || 'Uncategorized'));

  const handleBuy = (good: Good) => {
    buyGood(good, 1);
  };

  const handleSell = (good: Good) => {
    const inventoryItem = state.player.inventory.find(item => item.name === good.name);
    if (inventoryItem && inventoryItem.quantity > 0) {
      sellGood(good, 1);
    }
  };

  return (
    <div className="mb-4">
      <p className="mb-2">Money: ${state.player.money.toFixed(2)}</p>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Categories:</h3>
        {categories.map(category => (
          <label key={category} className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              checked={!unselectedCategories.includes(category)}
              onChange={() => toggleCategory(category)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">{category}</span>
          </label>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-2">Goods:</h3>
      <ul>
        {filteredGoods.map(good => {
          const inventoryItem = state.player.inventory.find(item => item.name === good.name);
          const quantity = inventoryItem ? inventoryItem.quantity : 0;
          return (
            <li key={good.name} className="mb-2 flex justify-between items-center">
              <span>{good.name} - ${good.price.toFixed(2)}</span>
              <div>
                <button
                  onClick={() => handleBuy(good)}
                  disabled={state.player.money < good.price}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Buy
                </button>
                <button
                  onClick={() => handleSell(good)}
                  disabled={quantity === 0}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Sell
                </button>
                <span className="ml-2">Owned: {quantity}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TownView;