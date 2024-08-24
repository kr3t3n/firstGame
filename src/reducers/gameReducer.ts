import { GameState, GameAction, NewsItem, TradeRoute, Good } from '../types';
import { generateEvents } from '../services/eventSystem';
import { calculateTurnLength, advanceTime } from '../utils/timeUtils';
import { applyNegotiationEffect, applyLogisticsEffect, calculateInventoryCapacity } from '../utils/skillEffects';
import { executeTradeRoute } from '../services/automationSystem';
import { unlockTechnology, getNewGoodsForTechnology } from '../services/technologySystem';
import { calculatePrice } from '../data/initialGameData';

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'PROGRESS_TIME': {
      const turnLength = calculateTurnLength(state.currentDate.getFullYear());
      const newDate = advanceTime(state.currentDate, turnLength);
      const unlockedTech = unlockTechnology(newDate, state.unlockedTechnologies);
      let newGoods = unlockedTech ? getNewGoodsForTechnology(unlockedTech) : [];

      // We'll handle event generation separately
      return {
        ...state,
        currentDate: newDate,
        energy: state.maxEnergy,
        player: {
          ...state.player,
          skillPoints: state.player.skillPoints + 1,
        },
        unlockedTechnologies: unlockedTech ? [...state.unlockedTechnologies, unlockedTech] : state.unlockedTechnologies,
        towns: state.towns.map(town => ({
          ...town,
          goods: [...town.goods, ...newGoods].map(good => ({
            ...good,
            price: calculatePrice(good.basePrice, town.name, good.name),
          })),
        })),
      };
    }

    case 'ADD_NEWS': {
      return {
        ...state,
        news: [action.payload, ...state.news].slice(0, 10), // Keep the last 10 news items
      };
    }

    case 'UPDATE_TOWN_PRICES':
      return {
        ...state,
        towns: state.towns.map(town => ({
          ...town,
          goods: town.goods.map(good => ({
            ...good,
            price: calculatePrice(good.basePrice, town.name, good.name),
          })),
        })),
      };

    case 'UPGRADE_SKILL':
      const skill = action.payload;
      const cost = Math.pow(2, state.player.skills[skill]);
      if (state.player.skillPoints > 0 && state.player.money >= cost && state.energy >= 10) {
        return {
          ...state,
          player: {
            ...state.player,
            money: state.player.money - cost,
            skillPoints: state.player.skillPoints - 1,
            skills: {
              ...state.player.skills,
              [skill]: state.player.skills[skill] + 1,
            },
          },
          energy: state.energy - 10,
        };
      }
      return state;

    case 'USE_ENERGY':
      return {
        ...state,
        energy: Math.max(0, state.energy - action.payload),
      };

    case 'BUY_GOOD':
      const boughtGood: Good & { quantity: number } = {
        ...action.payload.good,
        quantity: action.payload.quantity,
        basePrice: action.payload.good.basePrice // Make sure this is included
      };
      const buyTotalCost = boughtGood.price * boughtGood.quantity;
      if (state.player.money >= buyTotalCost && state.energy >= 5) {
        return {
          ...state,
          player: {
            ...state.player,
            money: state.player.money - buyTotalCost,
            inventory: [
              ...state.player.inventory,
              boughtGood,
            ],
          },
          energy: state.energy - 5,
        };
      }
      return state;

    case 'SELL_GOOD':
      const sellGood = action.payload.good;
      const sellQuantity = action.payload.quantity;
      const sellTotalEarnings = sellGood.price * sellQuantity;
      const inventoryItem = state.player.inventory.find(item => item.name === sellGood.name);
      if (inventoryItem && inventoryItem.quantity >= sellQuantity && state.energy >= 5) {
        return {
          ...state,
          player: {
            ...state.player,
            money: state.player.money + sellTotalEarnings,
            inventory: state.player.inventory.map(item =>
              item.name === sellGood.name
                ? { ...item, quantity: item.quantity - sellQuantity }
                : item
            ).filter(item => item.quantity > 0),
          },
          energy: state.energy - 5,
        };
      }
      return state;

    case 'TRAVEL': {
      if (action.payload) {
        const travelCost = 10;
        const energyCost = 20;
        if (state.player.money >= travelCost && state.energy >= energyCost) {
          return {
            ...state,
            player: {
              ...state.player,
              money: state.player.money - travelCost,
              currentTown: action.payload,
            },
            energy: state.energy - energyCost,
          };
        }
      }
      return state;
    }

    case 'AUTO_EXECUTE_TURN':
      let updatedState = state;
      state.tradeRoutes.forEach(route => {
        updatedState = executeTradeRoute(route, updatedState);
      });
      return updatedState;

    case 'UPDATE_TRADE_ROUTE': {
      const updatedRoute = action.payload;
      return {
        ...state,
        tradeRoutes: state.tradeRoutes.map(route =>
          route.id === updatedRoute.id ? updatedRoute : route
        )
      };
    }

    default:
      return state;
  }
};

// New function to handle asynchronous event generation
export const generateNewsEvents = async (state: GameState): Promise<NewsItem[]> => {
  const newEvents = await generateEvents(state.currentDate, state);
  return newEvents;
};