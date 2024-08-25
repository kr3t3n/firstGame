import React, { useState, useCallback } from 'react';
// import ResourcePanel from './ResourcePanel';
import TownView from './TownView';
import TravelMap from './TravelMap';
import InventoryPanel from './InventoryPanel';
import CharacterSheet from './CharacterSheet';
// import EnergyDisplay from './EnergyDisplay';
import NewsPanel from './NewsPanel';
import MarketOverview from './MarketOverview';
import Header from './Header';
import BottomNavBar from './BottomNavBar';
import { useGameState } from '../contexts/GameStateContext';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  icon: string;
  isExpanded: boolean;
  onToggle: () => void;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, icon, isExpanded, onToggle, className }) => {
  return (
    <div className={`bg-white rounded-md shadow-sm overflow-hidden border border-gray-200 ${isExpanded ? '' : 'h-10'} ${className}`}>
      <div 
        className="bg-gray-50 text-gray-800 p-2 flex items-center justify-between border-b border-gray-200 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <span className="text-base mr-2">{icon}</span>
          <h2 className="text-sm font-medium">{title}</h2>
        </div>
        <span className="text-xs">{isExpanded ? '▼' : '▶'}</span>
      </div>
      {isExpanded && <div className="p-2 text-sm">{children}</div>}
    </div>
  );
};

const GameBoard: React.FC = () => {
  const { state, endTurn, toggleSection } = useGameState();
  const [allSectionsExpanded, setAllSectionsExpanded] = useState(true);

  const toggleAllSections = useCallback(() => {
    const newExpandedState = !allSectionsExpanded;
    setAllSectionsExpanded(newExpandedState);
    Object.keys(state.expandedSections).forEach(section => {
      toggleSection(section, newExpandedState);
    });
  }, [allSectionsExpanded, toggleSection, state.expandedSections]);

  if (!state) {
    return <div>Loading... State is undefined.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-16 md:pb-0">
      <Header 
        onEndTurn={endTurn} 
        onToggleAllSections={toggleAllSections}
        allSectionsExpanded={allSectionsExpanded}
        currentDate={state.currentDate}
      />
      <div className="container mx-auto px-2 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <Section title="Player & Travel" icon="👤" isExpanded={state.expandedSections.playerInfo} onToggle={() => toggleSection('playerInfo')}>
            <CharacterSheet />
            <div className="mt-4">
              <h3 className="font-medium mb-2">Inventory</h3>
              <InventoryPanel />
            </div>
            <div className="mt-4">
              <h3 className="font-medium mb-2">Travel</h3>
              <TravelMap />
            </div>
          </Section>
          <Section title="Current Town" icon="🏙️" isExpanded={state.expandedSections.town} onToggle={() => toggleSection('town')}>
            <TownView />
          </Section>
          <Section title="News" icon="📰" isExpanded={state.expandedSections.news} onToggle={() => toggleSection('news')}>
            <NewsPanel />
          </Section>
        </div>
        <div className="mt-3">
          <Section 
            title="Market Overview" 
            icon="🌍" 
            isExpanded={state.expandedSections.marketAndTravel} 
            onToggle={() => toggleSection('marketAndTravel')}
            className="w-full"
          >
            <MarketOverview />
          </Section>
        </div>
      </div>
      <BottomNavBar
        onEndTurn={endTurn}
        onToggleAllSections={toggleAllSections}
        allSectionsExpanded={allSectionsExpanded}
      />
    </div>
  );
};

export default GameBoard;