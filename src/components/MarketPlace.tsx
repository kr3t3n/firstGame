import React, { useState } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { Good } from '../types'; // Make sure to import the Good type

const MarketPlace: React.FC = () => {
  const { state, buyGood, sellGood } = useGameState();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [batchSize, setBatchSize] = useState<number>(1);

  const handleBuy = () => {
    if (selectedItem) {
      const good = state.towns.flatMap(town => town.goods).find(g => g.name === selectedItem);
      if (good) {
        buyGood(good, batchSize);
      }
    }
  };

  const handleSell = () => {
    if (selectedItem) {
      const good = state.towns.flatMap(town => town.goods).find(g => g.name === selectedItem);
      if (good) {
        sellGood(good, batchSize);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Marketplace</h2>
      <div className="mb-4">
        <label className="block mb-2">Select Item:</label>
        <select
          value={selectedItem || ''}
          onChange={(e) => setSelectedItem(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select an item</option>
          {state.towns.flatMap(town => town.goods).map((good: Good) => (
            <option key={good.name} value={good.name}>
              {good.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Batch Size:</label>
        <select
          value={batchSize}
          onChange={(e) => setBatchSize(Number(e.target.value))}
          className="w-full p-2 border rounded"
        >
          <option value={1}>x1</option>
          <option value={10}>x10</option>
          <option value={100}>x100</option>
          <option value={1000}>x1000</option>
        </select>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleBuy}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Buy {batchSize}
        </button>
        <button
          onClick={handleSell}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Sell {batchSize}
        </button>
      </div>
    </div>
  );
};

export default MarketPlace;