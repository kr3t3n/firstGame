import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import CharacterSheet from './CharacterSheet';
import Inventory from './Inventory';
import TravelMap from './TravelMap';
import TownView from './TownView';
import NewsPanel from './NewsPanel';
import MobileTownView from './MobileTownView';

const GameBoard: React.FC = () => {
  const { state } = useGameState();

  if (!state) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* First column (1/3 width on desktop, full width on mobile) */}
        <div className="md:col-span-1">
          {/* Family Business Data */}
          <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Family Business Data</h2>
            <CharacterSheet />
            <Inventory />
          </div>
          
          {/* TravelMap */}
          <TravelMap />
          
          {/* NewsPanel (only on desktop) */}
          <div className="hidden md:block">
            <NewsPanel />
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
            <NewsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;