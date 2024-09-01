'use client'

import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const HistoricalData: React.FC = () => {
  const { state, toggleSection } = useGameState();
  console.log('HistoricalData - state:', state);

  const isExpanded = state.expandedSections?.historicalData ?? false;
  console.log('HistoricalData - isExpanded:', isExpanded);

  const historicalTreasury = state.historicalTreasury || [];
  const currentTurn = historicalTreasury.length;
  console.log('HistoricalData - currentTurn:', currentTurn);

  const calculateGrowthMultiplier = (startIndex: number, endIndex: number): string => {
    if (startIndex >= endIndex || endIndex >= historicalTreasury.length) return 'N/A';
    const startValue = historicalTreasury[startIndex];
    const endValue = historicalTreasury[endIndex];
    if (startValue === 0) return 'N/A';
    return ((endValue / startValue) || 1).toFixed(2);
  };

  // Add type annotations to these parameters
  const chartData = historicalTreasury.map((value: number, index: number) => ({ 
    turn: index + 1, 
    treasury: Number(value.toFixed(2))  // Limit to 2 decimal places
  }));

  // Change this line to ensure we're working with numbers
  const formatYAxis = (value: number): string => {
    return `$${((value / 100).toFixed(0) as unknown as number * 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const formatTooltip = (value: number) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="p-4 bg-gray-100 cursor-pointer flex justify-between items-center"
        onClick={() => toggleSection('historicalData')}
      >
        <h2 className="text-xl font-bold">Historical Treasury Data</h2>
        <span>{isExpanded ? '▼' : '▶'}</span>
      </div>
      {isExpanded && (
        <div className="p-4">
          {currentTurn === 0 ? (
            <p>No historical data available yet. Play more turns to see your progress!</p>
          ) : (
            <>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis 
                      dataKey="turn" 
                      scale="linear"
                      type="number"
                      domain={['dataMin', 'dataMax']}
                      tickFormatter={(value: number) => Math.floor(value).toString()}
                    />
                    <YAxis 
                      scale="linear"
                      type="number"
                      domain={['dataMin', 'dataMax']}
                      tickFormatter={formatYAxis}
                    />
                    <Tooltip formatter={formatTooltip} labelFormatter={(label) => `Turn ${label}`} />
                    <Line type="monotone" dataKey="treasury" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                  <p className="font-semibold">Total Growth:</p>
                  <p>{calculateGrowthMultiplier(0, currentTurn - 1)}x in {currentTurn} turns</p>
                </div>
                {currentTurn > 10 && (
                  <div>
                    <p className="font-semibold">Last 10 Turns:</p>
                    <p>{calculateGrowthMultiplier(currentTurn - 11, currentTurn - 1)}x</p>
                  </div>
                )}
                {currentTurn > 25 && (
                  <div>
                    <p className="font-semibold">Last 25 Turns:</p>
                    <p>{calculateGrowthMultiplier(currentTurn - 26, currentTurn - 1)}x</p>
                  </div>
                )}
                {currentTurn > 50 && (
                  <div>
                    <p className="font-semibold">Last 50 Turns:</p>
                    <p>{calculateGrowthMultiplier(currentTurn - 51, currentTurn - 1)}x</p>
                  </div>
                )}
                {currentTurn > 100 && (
                  <div>
                    <p className="font-semibold">Last 100 Turns:</p>
                    <p>{calculateGrowthMultiplier(currentTurn - 101, currentTurn - 1)}x</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};