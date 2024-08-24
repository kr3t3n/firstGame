import React, { useState } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { generateMarketSentiment } from '../services/marketSystem';
import { Good } from '../types';

const MarketOverview: React.FC = () => {
  const { state } = useGameState();
  const [expandedTown, setExpandedTown] = useState<string | null>(null);

  const renderSentimentIcon = (sentiment: ReturnType<typeof generateMarketSentiment> | undefined) => {
    if (!sentiment) return null;
    const { trend, strength } = sentiment;
    let icon = '→';
    if (trend === 'up') icon = strength > 0.7 ? '▲' : '↑';
    if (trend === 'down') icon = strength > 0.7 ? '▼' : '↓';

    return <span>{icon}</span>;
  };

  const goodIcons: { [key: string]: string } = {
    'Tea': 'T', 'Cloth': 'C', 'Spices': 'S', 'Wine': 'W', 'Cheese': 'Ch',
    'Silk': 'Si', 'Tulips': 'Tu', 'Pottery': 'P', 'Fish': 'F',
    'Steam Engine': 'SE', 'Coal': 'Co', 'Light Bulb': 'LB', 'Copper Wire': 'CW',
    'Car': 'Ca', 'Gasoline': 'G', 'Personal Computer': 'PC', 'Microchip': 'MC',
    'Web Server': 'WS', 'Fiber Optic Cable': 'FOC'
  };

  const allGoods = Array.from(new Set(state.towns.flatMap(town => town.goods.map(good => good.name))));

  return (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 py-1 bg-gray-200">Town</th>
            {allGoods.map(goodName => (
              <th key={goodName} className="px-2 py-1 bg-gray-200" title={goodName}>
                {goodIcons[goodName] || '•'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.towns.map(town => (
            <React.Fragment key={town.name}>
              <tr 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setExpandedTown(expandedTown === town.name ? null : town.name)}
              >
                <td className="px-2 py-1 font-medium">
                  {town.name} {expandedTown === town.name ? '▼' : '▶'}
                </td>
                {allGoods.map(goodName => {
                  const good = town.goods.find(g => g.name === goodName);
                  if (!good) return <td key={goodName} className="px-2 py-1">-</td>;
                  const sentiment = good ? generateMarketSentiment(good, state.player.skills.marketKnowledge) : undefined;
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
                    <div className="grid grid-cols-2 gap-2">
                      {town.goods.map(good => (
                        <div key={good.name} className="flex justify-between">
                          <span>{goodIcons[good.name] || '•'} {good.name}</span>
                          <span>${good.price.toFixed(2)}</span>
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
  );
};

export default MarketOverview;