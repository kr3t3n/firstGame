import React, { useCallback } from 'react';
import ResourcePanel from './ResourcePanel';
import TownView from './TownView';
import TravelMap from './TravelMap';
import InventoryPanel from './InventoryPanel';
import CharacterSheet from './CharacterSheet';
import EnergyDisplay from './EnergyDisplay';
import NewsPanel from './NewsPanel';
import MarketOverview from './MarketOverview';
import Header from './Header';
import { useGameState } from '../contexts/GameStateContext';

interface SectionHeaderProps {
  title: string;
  section: keyof typeof initialExpandedSections;
  icon: string;
}

const initialExpandedSections = {
  resources: true,
  energy: true,
  character: true,
  news: true,
  town: true,
  travel: true,
  market: true,
  inventory: true,
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, section, icon }) => {
  const { expandedSections, toggleSection } = useGameState();
  return (
    <div
      className="bg-gray-200 p-2 cursor-pointer flex justify-between items-center"
      onClick={() => toggleSection(section)}
    >
      <h2 className="text-lg font-bold">
        <span className="mr-2">{icon}</span>
        {title}
      </h2>
      <span>{expandedSections[section] ? '▼' : '▶'}</span>
    </div>
  );
};

const GameBoard: React.FC = () => {
  const { state, expandedSections, toggleSection, advanceTime, updateTownPrices } = useGameState();

  const toggleAllSections = useCallback(() => {
    const allExpanded = Object.values(expandedSections).every(v => v);
    Object.keys(expandedSections).forEach(section => {
      toggleSection(section as keyof typeof initialExpandedSections, !allExpanded);
    });
  }, [expandedSections, toggleSection]);

  const handleEndTurn = useCallback(() => {
    advanceTime();
    updateTownPrices();
  }, [advanceTime, updateTownPrices]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Header
        onToggleAllSections={toggleAllSections}
        allSectionsExpanded={Object.values(expandedSections).every(v => v)}
        onEndTurn={handleEndTurn}
      />
      <main className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/4 px-2 space-y-4">
          <div>
            <SectionHeader title="Resources" section="resources" icon="💰" />
            {expandedSections.resources && <ResourcePanel />}
          </div>
          <div>
            <SectionHeader title="Energy" section="energy" icon="⚡" />
            {expandedSections.energy && <EnergyDisplay />}
          </div>
          <div>
            <SectionHeader title="Character" section="character" icon="👤" />
            {expandedSections.character && <CharacterSheet />}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-2 space-y-4">
          <div>
            <SectionHeader title="News" section="news" icon="📰" />
            {expandedSections.news && <NewsPanel />}
          </div>
          <div>
            <SectionHeader title="Current Town" section="town" icon="🏙️" />
            {expandedSections.town && <TownView />}
          </div>
          <div>
            <SectionHeader title="Travel" section="travel" icon="🗺️" />
            {expandedSections.travel && <TravelMap />}
          </div>
        </div>
        <div className="w-full md:w-1/4 px-2 space-y-4">
          <div>
            <SectionHeader title="Market Overview" section="market" icon="📊" />
            {expandedSections.market && <MarketOverview />}
          </div>
          <div>
            <SectionHeader title="Inventory" section="inventory" icon="🎒" />
            {expandedSections.inventory && <InventoryPanel />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GameBoard;