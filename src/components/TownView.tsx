import React, { useState } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { Good } from '../types';
import Tooltip from './Tooltip';

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
    if (state.player.money >= good.price && state.energy >= 1) {
      buyGood(good, 1);
    } else {
      console.log('Not enough money or energy to buy');
    }
  };

  const handleSell = (good: Good) => {
    const inventoryItem = state.player.inventory.find(item => item.name === good.name);
    if (inventoryItem && inventoryItem.quantity > 0 && state.energy >= 1) {
      sellGood(good, 1);
    } else {
      console.log('Not enough inventory or energy to sell');
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">
        {currentTown.name}
        <Tooltip content="Each town has unique goods and prices. Buy low and sell high to make a profit!">
          <span className="text-xs text-gray-500 ml-2 cursor-help">ℹ️</span>
        </Tooltip>
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">
            Buy
            <Tooltip content="Purchase goods from the town. Prices may fluctuate each turn.">
              <span className="text-xs text-gray-500 ml-2 cursor-help">ℹ️</span>
            </Tooltip>
          </h3>
          {filteredGoods.map(good => (
            <div key={good.name} className="flex justify-between items-center mb-2">
              <span>{good.name}: ${good.price.toFixed(2)}</span>
              <button
                onClick={() => handleBuy(good)}
                disabled={state.player.money < good.price || state.energy < 1}
                className="bg-blue-500 text-white px-2 py-1 rounded disabled:opacity-50"
              >
                Buy
              </button>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-semibold mb-2">
            Sell
            <Tooltip content="Sell goods from your inventory. Prices may be different from what you paid.">
              <span className="text-xs text-gray-500 ml-2 cursor-help">ℹ️</span>
            </Tooltip>
          </h3>
          {filteredGoods.map(good => {
            const inventoryItem = state.player.inventory.find(item => item.name === good.name);
            return (
              <div key={good.name} className="flex justify-between items-center mb-2">
                <span>{good.name} (x{inventoryItem?.quantity || 0}): ${good.price.toFixed(2)}</span>
                <button
                  onClick={() => handleSell(good)}
                  disabled={!inventoryItem || inventoryItem.quantity === 0 || state.energy < 1}
                  className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50"
                >
                  Sell
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TownView;