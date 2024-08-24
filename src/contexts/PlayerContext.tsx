import React, { createContext, useContext, useState, useCallback } from 'react';
import { Player, Good } from '../types';
import { initialPlayerData } from '../data/initialGameData';

interface PlayerContextType {
  player: Player;
  updateMoney: (amount: number) => void;
  updateInventory: (good: Good, quantity: number) => void;
  improveSkill: (skill: keyof Player['skills']) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<Player>(initialPlayerData);

  const updateMoney = useCallback((amount: number) => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      money: prevPlayer.money + amount,
    }));
  }, []);

  const updateInventory = useCallback((good: Good, quantity: number) => {
    setPlayer((prevPlayer) => {
      const existingGoodIndex = prevPlayer.inventory.findIndex((item) => item.name === good.name);
      if (existingGoodIndex !== -1) {
        const updatedInventory = [...prevPlayer.inventory];
        updatedInventory[existingGoodIndex].quantity += quantity;
        if (updatedInventory[existingGoodIndex].quantity <= 0) {
          updatedInventory.splice(existingGoodIndex, 1);
        }
        return { ...prevPlayer, inventory: updatedInventory };
      } else if (quantity > 0) {
        return {
          ...prevPlayer,
          inventory: [...prevPlayer.inventory, { ...good, quantity }],
        };
      }
      return prevPlayer;
    });
  }, []);

  const improveSkill = useCallback((skill: keyof Player['skills']) => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      skills: {
        ...prevPlayer.skills,
        [skill]: Math.min(prevPlayer.skills[skill] + 1, 10),
      },
    }));
  }, []);

  return (
    <PlayerContext.Provider value={{ player, updateMoney, updateInventory, improveSkill }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};