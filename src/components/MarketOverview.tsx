import React, { useState, useMemo } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { generateMarketSentiment } from '../services/marketSystem';
import { Good } from '../types';
import Tooltip from './Tooltip';
import TrendIcon from './TrendIcon';

const MarketOverview: React.FC = () => {
  const { state } = useGameState();
  const [expandedTown, setExpandedTown] = useState<string | null>(null);

  const marketSentiments = useMemo(() => {
    return state.towns.map(town => ({
      name: town.name,
      sentiments: town.goods.map(good => ({
        name: good.name,
        sentiment: generateMarketSentiment(good, state.player.skills.marketKnowledge)
      }))
    }));
  }, [state.currentDate]);

  const renderSentimentIcon = (sentiment: ReturnType<typeof generateMarketSentiment> | undefined) => {
    if (!sentiment) return null;
    const { trend, strength } = sentiment;
    
    let description = 'Stable price';
    if (trend === 'up') {
      description = strength > 0.5 ? 'Significant price increase expected' : 'Slight price increase expected';
    } else if (trend === 'down') {
      description = strength > 0.5 ? 'Significant price decrease expected' : 'Slight price decrease expected';
    }

    return (
      <Tooltip content={description}>
        <TrendIcon trend={trend} strength={strength} />
      </Tooltip>
    );
  };

  const goodIcons: { [key: string]: string } = {
    'Tea': '🍵', 'Cloth': '🧵', 'Spices': '🌶️', 'Wine': '🍷', 'Cheese': '🧀',
    'Silk': '🎀', 'Tulips': '🌷', 'Pottery': '🏺', 'Fish': '🐟',
    'Steam Engine': '🚂', 'Coal': '⚫', 'Light Bulb': '💡', 'Copper Wire': '🔌',
    'Car': '🚗', 'Gasoline': '⛽', 'Personal Computer': '💻', 'Microchip': '🖥️',
    'Web Server': '🌐', 'Fiber Optic Cable': '🔬'
  };

  const allGoods = Array.from(new Set(state.towns.flatMap(town => town.goods.map(good => good.name))));

  return (
    <div className="mb-4 overflow-x-auto">
      <h3 className="font-medium mb-2">
        Market Overview
        <Tooltip content="This table shows the market sentiment for each good in different towns. Use this information to make informed trading decisions.">
          <span className="text-xs text-gray-500 ml-2 cursor-help">ℹ️</span>
        </Tooltip>
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 bg-gray-200 sticky left-0 z-10">Town</th>
              {allGoods.map(goodName => (
                <th key={goodName} className="px-2 py-1 bg-gray-200" title={goodName}>
                  <Tooltip content={`Market sentiment for ${goodName}`}>
                    {goodIcons[goodName] || '❓'}
                  </Tooltip>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {marketSentiments.map(town => (
              <React.Fragment key={town.name}>
                <tr 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setExpandedTown(expandedTown === town.name ? null : town.name)}
                >
                  <td className="px-2 py-1 font-medium sticky left-0 bg-white z-10">
                    {town.name} {expandedTown === town.name ? '🔽' : '▶️'}
                  </td>
                  {allGoods.map(goodName => {
                    const sentiment = town.sentiments.find(s => s.name === goodName)?.sentiment;
                    return (
                      <td key={goodName} className="px-2 py-1 text-center">
                        {renderSentimentIcon(sentiment)}
                      </td>
                    );
                  })}
                </tr>
                {expandedTown === town.name && (
                  <tr>
                    <td colSpan={allGoods.length + 1} className="px-2 py-1 bg-gray-50">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                        {town.sentiments.map(good => (
                          <div key={good.name} className="flex justify-between">
                            <span>{goodIcons[good.name] || '❓'} {good.name}</span>
                            <span>${good.sentiment?.good.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketOverview;