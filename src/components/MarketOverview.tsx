import React, { useState, useMemo } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { generateMarketSentiment } from '../services/marketSystem';
import { Good } from '../types';
import Tooltip from './Tooltip';
import { motion } from 'framer-motion';

const MarketOverview: React.FC = () => {
  const { state } = useGameState();
  const [expandedTown, setExpandedTown] = useState<string | null>(null);

  if (!state || !state.towns || !state.player) {
    return <div>Loading...</div>;
  }

  const marketSentiments = useMemo(() => {
    return state.towns.map(town => ({
      name: town.name,
      sentiments: town.goods.map(good => ({
        name: good.name,
        sentiment: generateMarketSentiment(good, new Date())
      }))
    }));
  }, [state.currentDate, state.towns, state.player.skills.marketKnowledge]);

  const goodIcons: { [key: string]: string } = {
    'Tea': '🍵', 'Cloth': '🧵', 'Spices': '🌶️', 'Wine': '🍷', 'Cheese': '🧀',
    'Silk': '🎀', 'Tulips': '🌷', 'Pottery': '🏺', 'Fish': '🐟',
    'Steam Engine': '🚂', 'Coal': '⚫', 'Light Bulb': '💡', 'Copper Wire': '🔌',
    'Car': '🚗', 'Gasoline': '⛽', 'Personal Computer': '💻', 'Microchip': '🖥️',
    'Web Server': '🌐', 'Fiber Optic Cable': '🔬'
  };

  const allGoods = Array.from(new Set(state.towns.flatMap(town => town.goods.map(good => good.name))));

  const renderTrendIcon = (trend: 'up' | 'down' | 'stable', strength: number) => {
    const color = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';
    const icon = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '•';
    return <span className={`${color} ${strength > 0.5 ? 'font-bold' : ''}`}>{icon}</span>;
  };

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Market Overview</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left text-gray-600">Good</th>
              {state.towns.map(town => (
                <th key={town.name} className="p-2 text-left text-gray-600">{town.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allGoods.map(goodName => (
              <motion.tr
                key={goodName}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-2 flex items-center">
                  <span className="mr-2">{goodIcons[goodName] || '🔹'}</span>
                  <span className="text-gray-800">{goodName}</span>
                </td>
                {state.towns.map(town => {
                  const good = town.goods.find(g => g.name === goodName);
                  const sentiment = marketSentiments.find(s => s.name === town.name)?.sentiments.find(s => s.name === goodName)?.sentiment;
                  return (
                    <td key={`${town.name}-${goodName}`} className="p-2">
                      {good ? (
                        <Tooltip content={`${sentiment?.trend === 'up' ? 'Increasing' : sentiment?.trend === 'down' ? 'Decreasing' : 'Stable'} price trend`}>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-800">${good.price.toFixed(2)}</span>
                            {sentiment && renderTrendIcon(sentiment.trend, sentiment.strength)}
                          </div>
                        </Tooltip>
                      ) : '-'}
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketOverview;