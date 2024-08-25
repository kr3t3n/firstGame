import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import Tooltip from './Tooltip';

const CharacterSheet: React.FC = () => {
  const { state, upgradeSkill } = useGameState();

  const handleUpgradeSkill = (skill: keyof typeof state.player.skills) => {
    upgradeSkill(skill);
  };

  const renderSkillButton = (skill: keyof typeof state.player.skills) => {
    const level = state.player.skills[skill];
    const cost = Math.pow(2, level);
    const isDisabled = state.player.skillPoints === 0 || state.player.money < cost || state.energy < 10;

    let skillDescription = '';
    switch (skill) {
      case 'negotiation':
        skillDescription = 'Improves buying and selling prices';
        break;
      case 'logistics':
        skillDescription = 'Increases inventory capacity';
        break;
      case 'marketKnowledge':
        skillDescription = 'Provides better market information';
        break;
    }

    return (
      <div key={skill} className="flex items-center justify-between mb-2">
        <span className="text-sm">{skill.charAt(0).toUpperCase() + skill.slice(1)}: {level}</span>
        <div className="flex items-center">
          <button
            className={`bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-1 px-3 rounded-full text-sm transition duration-150 ease-in-out flex items-center ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleUpgradeSkill(skill)}
            disabled={isDisabled}
          >
            Improve
          </button>
          <Tooltip content={`${skillDescription}. Cost: ${cost} 🪙, 10 ⚡`}>
            <span className="text-xs text-gray-500 ml-2 cursor-help">ℹ️</span>
          </Tooltip>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold mb-1">
            Money
            <Tooltip content="Your current wealth. Use it to buy goods, upgrade skills, and pay for travel.">
              <span className="text-xs text-gray-500 ml-2 cursor-help">ℹ️</span>
            </Tooltip>
          </h2>
          <p className="text-xl">🪙 {state.player.money.toFixed(2)}</p>
        </div>
        <div className="w-1/2">
          <h2 className="text-lg font-semibold mb-1">
            Energy
            <Tooltip content="Energy is consumed when traveling or upgrading skills. It replenishes each turn.">
              <span className="text-xs text-gray-500 ml-2 cursor-help">ℹ️</span>
            </Tooltip>
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${(state.energy / state.maxEnergy) * 100}%` }}
            ></div>
          </div>
          <p className="mt-1">⚡ {state.energy} / {state.maxEnergy}</p>
        </div>
      </div>
      <div className="mb-2 flex items-center">
        <span>Skill Points: {state.player.skillPoints}</span>
        <Tooltip content="Skill points are earned when you level up. Use them to improve your skills.">
          <span className="text-xs text-gray-500 ml-2 cursor-help">ℹ️</span>
        </Tooltip>
      </div>
      {Object.keys(state.player.skills).map((skill) => renderSkillButton(skill as keyof typeof state.player.skills))}
    </div>
  );
};

export default CharacterSheet;