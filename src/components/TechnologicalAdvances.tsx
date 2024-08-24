import React from 'react';
import { useGameState } from '../contexts/GameStateContext';

const TechnologicalAdvances: React.FC = () => {
  const { state } = useGameState();

  return (
    <div>
      <h3>Technological Advances</h3>
      {state.unlockedTechnologies.map((tech, index) => (
        <li key={index}>{tech}</li>
      ))}
    </div>
  );
};

export default TechnologicalAdvances;