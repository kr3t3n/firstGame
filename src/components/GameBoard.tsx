import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import CharacterSheet from './CharacterSheet';
import Inventory from './Inventory';
import TravelMap from './TravelMap';
import TownView from './TownView';
import NewsPanel from './NewsPanel';
import MobileTownView from './MobileTownView';
import { HistoricalData } from './HistoricalData';
import { FaInfoCircle } from 'react-icons/fa';
import Tooltip from './Tooltip';

const GameBoard: React.FC = () => {
  const { state } = useGameState();
  console.log('GameBoard - state:', state);

  if (!state) {
    console.log('GameBoard - No state available');
    return <div>Loading...</div>;
  }

  const NewsTooltip = (
    <Tooltip content="Stay informed about market changes, technological advancements, and other events that may impact your business.">
      <FaInfoCircle className="ml-2 text-gray-600 cursor-help" />
    </Tooltip>
  );

  const InventoryTooltip = (
    <Tooltip content="Your current goods. The capacity increases with your Supply Chain skill.">
      <FaInfoCircle className="ml-2 text-gray-600 cursor-help" />
    </Tooltip>
  );

  console.log('GameBoard - Rendering component');
  return (
    <div className="container mx-auto p-4 pb-20 md:pb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* First column (1/3 width on desktop, full width on mobile) */}
        <div className="md:col-span-1">
          {/* Family Business Data */}
          <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Business Data</h2>
            <CharacterSheet />
            <Inventory tooltip={InventoryTooltip} />
          </div>
          
          {/* TravelMap */}
          <TravelMap />
          
          {/* NewsPanel (only on desktop) */}
          <div className="hidden md:block">
            <NewsPanel tooltip={NewsTooltip} />
          </div>
        </div>

        {/* Second column (2/3 width on desktop, full width on mobile) */}
        <div className="md:col-span-2">
          {/* TownView (hidden on mobile) */}
          <div className="hidden md:block">
            <TownView />
          </div>
          
          {/* MobileTownView (only on mobile) */}
          <div className="md:hidden">
            <MobileTownView />
          </div>
          
          {/* NewsPanel (only on mobile) */}
          <div className="md:hidden">
            <NewsPanel tooltip={NewsTooltip} />
          </div>

          {/* Historical Data */}
          <div className="mt-4">
            <HistoricalData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;