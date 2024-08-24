import { GameState, Good, Town, TradeRoute } from '../types';
import { applyNegotiationEffect, applyLogisticsEffect } from '../utils/skillEffects';

export const executeTradeRoute = (route: TradeRoute, gameState: GameState): GameState => {
  const fromTown = gameState.towns.find(town => town.name === route.fromTown);
  const toTown = gameState.towns.find(town => town.name === route.toTown);

  if (!fromTown || !toTown) return gameState;

  let updatedState = gameState;

  route.goods.forEach(goodName => {
    const goodToBuy = fromTown.goods.find(g => g.name === goodName) as Good & { quantity: number };
    if (goodToBuy) {
      updatedState = buyGood(updatedState, fromTown, goodToBuy, route.quantity);
      const boughtGood = updatedState.player.inventory.find(g => g.name === goodName) as Good & { quantity: number };
      if (boughtGood) {
        updatedState = sellGood(updatedState, toTown, boughtGood, boughtGood.quantity);
      }
    }
  });

  return updatedState;
};

const buyGood = (state: GameState, town: Town, good: Good, quantity: number): GameState => {
  const maxAffordableQuantity = Math.floor(state.player.money / good.price);
  const quantityToBuy = Math.min(maxAffordableQuantity, quantity);

  const totalCost = applyNegotiationEffect(good.price * quantityToBuy, state.player.skills.negotiation);

  if (state.player.money >= totalCost) {
    return {
      ...state,
      player: {
        ...state.player,
        money: state.player.money - totalCost,
        inventory: [
          ...state.player.inventory.filter(item => item.name !== good.name),
          { 
            name: good.name, 
            price: good.price, 
            basePrice: good.basePrice,
            quantity: (state.player.inventory.find(item => item.name === good.name)?.quantity || 0) + quantityToBuy,
            category: good.category
          },
        ],
      },
    };
  }

  return state;
};

const sellGood = (state: GameState, town: Town, good: Good & { quantity: number }, quantity: number): GameState => {
  const townGood = town.goods.find(g => g.name === good.name);
  if (!townGood) return state;

  const inventoryItem = state.player.inventory.find(item => item.name === good.name);
  if (!inventoryItem || inventoryItem.quantity === 0) return state;

  const quantityToSell = Math.min(quantity, inventoryItem.quantity);
  const totalEarnings = applyNegotiationEffect(townGood.price * quantityToSell, state.player.skills.negotiation);

  return {
    ...state,
    player: {
      ...state.player,
      money: state.player.money + totalEarnings,
      inventory: state.player.inventory.map(item =>
        item.name === good.name
          ? { ...item, quantity: item.quantity - quantityToSell }
          : item
      ).filter(item => item.quantity > 0),
    },
  };
};