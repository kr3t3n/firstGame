// import React from 'react';
// import { useGameState } from '../contexts/GameStateContext';
// import { FaDollarSign } from 'react-icons/fa';
// import { Tooltip } from 'react-tooltip';
// import 'react-tooltip/dist/react-tooltip.css';
// import { productIcons } from '../utils/productIcons';

// const MobileMarketView: React.FC = () => {
//   const { state, buyGood, sellGood } = useGameState();
//   const currentTown = state.towns.find(town => town.name === state.player.currentTown);

//   if (!currentTown) return null;

//   const renderTrendIndicator = (trend: 'up' | 'down' | 'stable', strength: number) => {
//     const color = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';
//     const triangles = '▲'.repeat(Math.ceil(strength * 5));
//     return <span className={`${color} font-bold`}>{triangles}</span>;
//   };

//   const getPriceTrendDescription = (currentPrice: number, basePrice: number) => {
//     const percentChange = ((currentPrice - basePrice) / basePrice) * 100;
//     if (percentChange > 10) return 'Significant increase';
//     if (percentChange > 2) return 'Slight increase';
//     if (percentChange < -10) return 'Significant decrease';
//     if (percentChange < -2) return 'Slight decrease';
//     return 'Stable';
//   };

//   const getMarketSentimentDescription = (trend: string, strength: number) => {
//     if (trend === 'up') {
//       return strength > 0.5 ? 'Very bullish' : 'A little bullish';
//     } else if (trend === 'down') {
//       return strength > 0.5 ? 'Very bearish' : 'A little bearish';
//     }
//     return 'Stable';
//   };

//   return (
//     <div className="mb-4 p-4 bg-white rounded-lg shadow-md md:hidden">
//       <h2 className="text-xl font-bold mb-2">{currentTown.name} Market</h2>
//       {currentTown.goods.map(good => {
//         const marketSentiment = good.marketSentiment || { trend: 'stable', strength: 0 };
//         const priceTrend = good.price > good.basePrice ? 'up' : good.price < good.basePrice ? 'down' : 'stable';
//         const priceStrength = Math.abs(good.price - good.basePrice) / good.basePrice;

//         return (
//           <div key={good.name} className="mb-4 p-2 border-b">
//             <div className="flex justify-between items-center">
//               <span className="font-semibold">
//                 {productIcons[good.name] || '🔹'} {good.name}
//               </span>
//               <span className="font-bold"><FaDollarSign className="inline" />{good.price.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between items-center mt-2">
//               <div>
//                 <span 
//                   className="mr-2 cursor-help"
//                   data-tooltip-id={`price-${good.name}`}
//                   data-tooltip-content={`Price trend: ${getPriceTrendDescription(good.price, good.basePrice)}`}
//                 >
//                   {renderTrendIndicator(priceTrend, priceStrength)}
//                 </span>
//                 <span 
//                   className="cursor-help"
//                   data-tooltip-id={`market-${good.name}`}
//                   data-tooltip-content={`Market sentiment: ${getMarketSentimentDescription(marketSentiment.trend, marketSentiment.strength)}`}
//                 >
//                   {renderTrendIndicator(marketSentiment.trend, marketSentiment.strength)}
//                 </span>
//                 <Tooltip id={`price-${good.name}`} />
//                 <Tooltip id={`market-${good.name}`} />
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => buyGood(good, 1)}
//                   disabled={state.player.money < good.price || state.energy < 1}
//                   className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Buy
//                 </button>
//                 <button
//                   onClick={() => sellGood(good, 1)}
//                   disabled={!state.player.inventory.some(item => item.name === good.name && item.quantity > 0)}
//                   className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Sell
//                 </button>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default MobileMarketView;

export {};