import React from 'react';
import { useGameState } from '../contexts/GameStateContext';

const CharacterSheet: React.FC = () => {
  const { state, upgradeSkill } = useGameState();

  const handleUpgradeSkill = (skill: keyof typeof state.player.skills) => {
    upgradeSkill(skill);
  };

  return (
    <div className="mb-4">
      <p className="mb-2">Money: ${state.player.money.toFixed(2)}</p>
      <p className="mb-2">Skill Points: {state.player.skillPoints}</p>
      <ul>
        {Object.entries(state.player.skills).map(([skill, level]) => (
          <li key={skill} className="mb-2 flex justify-between items-center">
            <span>{skill}: {level}</span>
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => handleUpgradeSkill(skill as keyof typeof state.player.skills)}
              disabled={state.player.skillPoints === 0 || state.player.money < Math.pow(2, level) || state.energy < 10}
            >
              Improve (Cost: ${Math.pow(2, level)} gold, 10 energy)
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterSheet;