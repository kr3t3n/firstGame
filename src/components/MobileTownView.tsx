import React, { useState } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { Good, Town } from '../types';
import { FaDollarSign, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { productIcons } from '../utils/productIcons';

const MobileTownView: React.FC = () => {
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
      case 'significant-increase': return <span className="text-green-700 font-bold">▲</span>;
      case 'slight-increase': return <span className="text-green-500">▲</span>;
      case 'stable': return <span className="text-black">≈</span>;
      case 'slight-decrease': return <span className="text-red-500">▼</span>;
      case 'significant-decrease': return <span className="text-red-700 font-bold">▼</span>;
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

  const getPriceColor = (price: number, currentPrice: number) => {
    const diff = price - currentPrice;
    if (diff > currentPrice * 0.05) return 'text-green-600';
    if (diff < -currentPrice * 0.05) return 'text-red-600';
    return 'text-black';
  };

  const cityFlags: { [key: string]: string } = {
    'Amsterdam': '🇳🇱',
    'London': '🇬🇧',
    'Paris': '🇫🇷',
  };

  const batchSizes = [1, 10, 100, 1000];

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-md md:hidden">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{currentTown.name} Market</h2>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-500">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Batch Size:</label>
            <div className="flex space-x-2">
              {batchSizes.map(size => (
                <button
                  key={size}
                  onClick={() => setBatchSize(size)}
                  className={`px-2 py-1 text-sm rounded-lg flex-1 ${
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
          {currentTown.goods.map((good: Good) => {
            const priceTrend = getPriceTrend(good.price, good.previousPrice);
            const marketTrend = getMarketTrend(good);

            return (
              <div key={good.name} className="mb-4 p-2 border-b">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">
                    {productIcons[good.name] || '🔹'} {good.name}
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="font-bold"><FaDollarSign className="inline" />{good.price.toFixed(2)}</span>
                    {renderTrendIcon(priceTrend)}
                    <span className="mx-1">|</span>
                    {renderTrendIcon(marketTrend)}
                  </span>
                </div>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => buyGood(good, batchSize)}
                    disabled={state.player.money < good.price * batchSize || state.energy < batchSize}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed flex-1 flex flex-col items-center justify-center"
                  >
                    <span>Buy {batchSize} {productIcons[good.name] || '🔹'}</span>
                    <span>for ${(good.price * batchSize).toFixed(2)}</span>
                  </button>
                  <button
                    onClick={() => sellGood(good, batchSize)}
                    disabled={!state.player.inventory.some(item => item.name === good.name && item.quantity >= batchSize)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed flex-1 flex flex-col items-center justify-center"
                  >
                    <span>Sell {batchSize} {productIcons[good.name] || '🔹'}</span>
                    <span>for ${(good.price * batchSize).toFixed(2)}</span>
                  </button>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  {state.towns.filter(town => town.name !== currentTown.name).map((town, index) => {
                    const townGood = town.goods.find(g => g.name === good.name);
                    if (!townGood) return null;
                    const townPriceTrend = getPriceTrend(townGood.price, townGood.previousPrice);
                    const townMarketTrend = getMarketTrend(townGood);
                    return (
                      <div key={town.name} className={index === 0 ? "text-left" : "text-right"}>
                        <span>{cityFlags[town.name]} {town.name}</span>
                        <span className={`ml-2 font-bold ${getPriceColor(townGood.price, good.price)}`}>
                          <FaDollarSign className="inline" />{townGood.price.toFixed(2)}
                        </span>
                        <span className="ml-1">
                          {renderTrendIcon(townPriceTrend)}
                          <span className="mx-1">|</span>
                          {renderTrendIcon(townMarketTrend)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MobileTownView;