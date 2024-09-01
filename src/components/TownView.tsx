import React, { useState } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { Good, Trend } from '../types';
import { FaDollarSign, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { productIcons } from '../utils/productIcons';

const TownView: React.FC = () => {
  const { state, buyGood, sellGood } = useGameState();
  const [isExpanded, setIsExpanded] = useState(true);
  const [batchSize, setBatchSize] = useState<number>(1);

  if (!state || !state.player) {
    return <div>Loading...</div>;
  }

  const currentTown = state.towns.find(town => town.name === state.player.currentTown);

  if (!currentTown) {
    return <div>Error: Current town not found</div>;
  }

  const renderTrendIcon = (trend: 'significant-increase' | 'slight-increase' | 'stable' | 'slight-decrease' | 'significant-decrease') => {
    switch (trend) {
      case 'significant-increase':
        return <span className="text-green-700 font-bold">▲</span>;
      case 'slight-increase':
        return <span className="text-green-500">▲</span>;
      case 'stable':
        return <span className="text-black">≈</span>;
      case 'slight-decrease':
        return <span className="text-red-500">▼</span>;
      case 'significant-decrease':
        return <span className="text-red-700 font-bold">▼</span>;
    }
  };

  const getPriceTrend = (currentPrice: number, previousPrice: number) => {
    if (previousPrice === 0) return 'stable';
    const percentChange = ((currentPrice - previousPrice) / previousPrice) * 100;
    if (percentChange > 10) return 'significant-increase';
    if (percentChange > 3) return 'slight-increase';
    if (percentChange < -10) return 'significant-decrease';
    if (percentChange < -3) return 'slight-decrease';
    return 'stable';
  };

  const getMarketTrend = (good: Good) => {
    const marketSentiment = good.marketSentiment || { trend: 'stable', strength: 0 };
    if (marketSentiment.trend === 'up') {
      return marketSentiment.strength > 0.5 ? 'significant-increase' : 'slight-increase';
    } else if (marketSentiment.trend === 'down') {
      return marketSentiment.strength > 0.5 ? 'significant-decrease' : 'slight-decrease';
    }
    return 'stable';
  };

  const batchSizes = [1, 10, 100, 1000];

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{currentTown.name} Market</h2>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-500">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div className="overflow-x-auto">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Batch Size:</label>
            <div className="flex space-x-2">
              {batchSizes.map(size => (
                <button
                  key={size}
                  onClick={() => setBatchSize(size)}
                  className={`px-4 py-3 text-base rounded-lg flex-1 ${
                    batchSize === size
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  x{size}
                </button>
              ))}
            </div>
          </div>
          <table className="w-full min-w-max">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Trends</th>
                <th className="p-2 text-left">Actions</th>
                {state.towns.filter(town => town.name !== currentTown.name).map(town => (
                  <th key={town.name} className="p-2 text-left">{town.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTown.goods.map((good: Good) => {
                const priceTrend = getPriceTrend(good.price, good.previousPrice);
                const marketTrend = getMarketTrend(good);

                return (
                  <tr key={good.name} className="border-b">
                    <td className="p-2">
                      <span className="mr-2">{productIcons[good.name] || '🔹'}</span>
                      {good.name}
                    </td>
                    <td className="p-2">
                      <span className="font-bold"><FaDollarSign className="inline" />{good.price.toFixed(2)}</span>
                    </td>
                    <td className="p-2">
                      {renderTrendIcon(priceTrend)}
                      <span className="mx-1">|</span>
                      {renderTrendIcon(marketTrend)}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => {
                          console.log('Buy button clicked for:', good);
                          if (good && typeof good.price === 'number') {
                            buyGood(good, batchSize);
                          } else {
                            console.error('Invalid good or price:', good);
                          }
                        }}
                        disabled={!good || typeof good.price !== 'number' || state.player.money < good.price * batchSize || state.energy < batchSize}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-base mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Buy {batchSize}
                      </button>
                      <button
                        onClick={() => {
                          console.log('Sell button clicked for:', good);
                          sellGood(good, batchSize);
                        }}
                        disabled={!state.player.inventory.some(item => item.name === good.name && item.quantity >= batchSize)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg text-base disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Sell {batchSize}
                      </button>
                    </td>
                    {state.towns.filter(town => town.name !== currentTown.name).map(town => {
                      const townGood = town.goods.find(g => g.name === good.name);
                      if (!townGood) return <td key={town.name} className="p-2">-</td>;
                      const townPriceTrend = getPriceTrend(townGood.price, townGood.previousPrice);
                      const townMarketTrend = getMarketTrend(townGood);
                      return (
                        <td key={town.name} className="p-2">
                          <span className="font-bold"><FaDollarSign className="inline" />{townGood.price.toFixed(2)}</span>
                          <span className="ml-2">
                            {renderTrendIcon(townPriceTrend)}
                            <span className="mx-1">|</span>
                            {renderTrendIcon(townMarketTrend)}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TownView;