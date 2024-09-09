import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { FaDollarSign, FaBolt, FaHandshake, FaTruck, FaChartLine, FaInfoCircle } from 'react-icons/fa';
import Tooltip from './Tooltip';

const CharacterSheet: React.FC = () => {
  const { state, upgradeSkill } = useGameState();

  if (!state || !state.player) {
    return <div>Loading...</div>;
  }

  const skillNames: { [key: string]: { name: string; icon: JSX.Element } } = {
    negotiation: { name: 'Bargaining', icon: <FaHandshake className="mr-1" /> },
    logistics: { name: 'Supply Chain', icon: <FaTruck className="mr-1" /> },
    marketKnowledge: { name: 'Market Insight', icon: <FaChartLine className="mr-1" /> },
  };

  const handleUpgradeSkill = (skill: keyof typeof state.player.skills) => {
    const currentLevel = state.player.skills[skill];
    const upgradeCost = Math.pow(2, currentLevel);
    const energyCost = 10;

    if (state.player.money >= upgradeCost && state.energy >= energyCost && state.player.skillPoints > 0) {
      upgradeSkill(skill);
    }
  };

  const renderSkillButton = (skill: keyof typeof state.player.skills) => {
    const level = state.player.skills[skill];
    const cost = Math.pow(2, level);
    const isDisabled = state.player.skillPoints === 0 || state.player.money < cost || state.energy < 10;

    return (
      <div key={skill} className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 bg-gray-100 p-2 rounded-lg">
        <div className="flex items-center mb-1 sm:mb-0">
          {skillNames[skill].icon}
          <span className="text-sm font-medium">{skillNames[skill].name}: {level}</span>
        </div>
        <button
          onClick={() => handleUpgradeSkill(skill)}
          disabled={isDisabled}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          Improve <FaDollarSign className="ml-1 w-3 h-3" />{cost} <FaBolt className="ml-1 w-3 h-3" />10
        </button>
      </div>
    );
  };

  const displayMoney = React.useMemo(() => {
    const money = state.player.money;
    return typeof money === 'number' && !isNaN(money) ? money.toFixed(2) : '0.00';
  }, [state.player.money]);

  return (
    <div className="mb-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-green-100 p-3 rounded-lg">
          <h3 className="text-sm font-semibold mb-1 text-green-800 flex items-center">
            Treasury
            <Tooltip content="Your available funds for trading and investments. Increase it by selling goods at a profit!">
              <FaInfoCircle className="ml-1 text-green-600 cursor-help" />
            </Tooltip>
          </h3>
          <p className="text-lg flex items-center text-green-700">
            <FaDollarSign className="w-4 h-4 mr-1" />
            {displayMoney}
          </p>
        </div>
        <div className="bg-blue-100 p-3 rounded-lg">
          <h3 className="text-sm font-semibold mb-1 text-blue-800 flex items-center">
            Energy
            <Tooltip content="Energy is consumed by actions like trading and traveling. It replenishes each turn.">
              <FaInfoCircle className="ml-1 text-blue-600 cursor-help" />
            </Tooltip>
          </h3>
          <div className="w-full bg-blue-200 rounded-full h-4 mb-1">
            <div 
              className="bg-blue-600 h-4 rounded-full" 
              style={{ width: `${(state.energy / state.maxEnergy) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-blue-700"><FaBolt className="inline mr-1" />{state.energy} / {state.maxEnergy}</p>
        </div>
      </div>
      <div className="mb-4 bg-yellow-100 p-3 rounded-lg">
        <h3 className="text-sm font-semibold mb-1 text-yellow-800 flex items-center">
          Skill Points: {state.player.skillPoints}
          <Tooltip content="Use skill points to improve your abilities. Earn more by completing turns and special events.">
            <FaInfoCircle className="ml-1 text-yellow-600 cursor-help" />
          </Tooltip>
        </h3>
      </div>
      {Object.keys(state.player.skills).map((skill) => renderSkillButton(skill as keyof typeof state.player.skills))}
    </div>
  );
};

export default CharacterSheet;