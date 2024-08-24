import React from 'react';
import { useGameState } from '../contexts/GameStateContext';

const SkillUpgradePanel: React.FC = () => {
  const { state, upgradeSkill } = useGameState();

  const renderSkillButton = (skill: keyof typeof state.player.skills) => {
    const level = state.player.skills[skill];
    const cost = Math.pow(2, level);
    return (
      <button
        key={skill}
        onClick={() => upgradeSkill(skill)}
        disabled={state.player.skillPoints === 0 || state.player.money < cost}
        className={`btn btn-sm ${state.player.skillPoints === 0 || state.player.money < cost ? 'btn-disabled' : 'btn-primary'}`}
      >
        {skill.charAt(0).toUpperCase() + skill.slice(1)}: Level {level} (Cost: ${cost.toFixed(2)})
      </button>
    );
  };

  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Skills</h3>
      <div className="flex flex-col">
        {renderSkillButton('negotiation')}
        {renderSkillButton('marketKnowledge')}
        {renderSkillButton('logistics')}
      </div>
    </div>
  );
};

export default SkillUpgradePanel;