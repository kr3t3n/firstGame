import { GameState, GameAction, NewsItem, TradeRoute, Good } from '../types';
import { generateEvents } from '../services/eventSystem';
import { calculateTurnLength, advanceTime } from '../utils/timeUtils';
import { applyNegotiationEffect, applyLogisticsEffect, calculateInventoryCapacity } from '../utils/skillEffects';
import { executeTradeRoute } from '../services/automationSystem';
import { unlockTechnology, getNewGoodsForTechnology } from '../services/technologySystem';
import { calculatePrice, generateMarketSentiment } from '../services/marketSystem';
import { initialGameState } from '../data/initialGameData';

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'PROGRESS_TIME': {
      const { newDate, newEvents } = action.payload;
      
      // Update towns with new market sentiments
      const updatedTowns = state.towns.map(town => ({
        ...town,
        goods: town.goods.map(good => ({
          ...good,
          price: calculatePrice(good.basePrice, town.name, good.name),
          marketSentiment: generateMarketSentiment(good, state.player.skills.marketKnowledge)
        }))
      }));

      return {
        ...state,
        currentDate: newDate,
        energy: state.maxEnergy, // Replenish energy
        player: {
          ...state.player,
          skillPoints: state.player.skillPoints + 1, // Grant a skill point each turn
        },
        news: [...newEvents, ...state.news].slice(0, 5), // Keep the 5 most recent news items
        towns: updatedTowns,
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

    case 'UPGRADE_SKILL': {
      const skill = action.payload as string;
      const currentLevel = state.player.skills[skill];
      const upgradeCost = Math.pow(2, currentLevel);
      
      if (state.player.skillPoints > 0 && state.player.money >= upgradeCost && state.energy >= 10) {
        return {
          ...state,
          player: {
            ...state.player,
            money: state.player.money - upgradeCost,
            skillPoints: state.player.skillPoints - 1,
            skills: {
              ...state.player.skills,
              [skill]: currentLevel + 1
            }
          },
          energy: state.energy - 10
        };
      }
      return state;
    }

    case 'USE_ENERGY':
      return {
        ...state,
        energy: Math.max(0, state.energy - action.payload),
      };

    case 'BUY_GOOD': {
      const { good, quantity } = action.payload;
      const totalCost = good.price * quantity;
      
      console.log('BUY_GOOD action received:', { good, quantity, totalCost });
      console.log('Current inventory:', state.player.inventory);

      if (state.player.money >= totalCost && state.energy >= quantity) {
        const updatedInventory = state.player.inventory.map(item => {
          if (item.name === good.name) {
            console.log('Updating existing item:', item);
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });

        if (!updatedInventory.some(item => item.name === good.name)) {
          console.log('Adding new item:', { ...good, quantity });
          updatedInventory.push({ ...good, quantity });
        }

        const newState = {
          ...state,
          player: {
            ...state.player,
            money: state.player.money - totalCost,
            inventory: updatedInventory
          },
          energy: state.energy - quantity
        };

        console.log('New state after buy:', newState);
        return newState;
      }
      return state;
    }

    case 'SELL_GOOD':
      const { good, quantity } = action.payload;
      const inventoryItem = state.player.inventory.find(item => item.name === good.name);
      if (inventoryItem && inventoryItem.quantity >= quantity && state.energy >= 1) {
        const updatedInventory = state.player.inventory.map(item =>
          item.name === good.name
            ? { ...item, quantity: item.quantity - quantity }
            : item
        ).filter(item => item.quantity > 0);

        return {
          ...state,
          player: {
            ...state.player,
            money: state.player.money + good.price * quantity,
            inventory: updatedInventory,
          },
          energy: state.energy - 1,
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

    case 'TOGGLE_SECTION': {
      const { section, value } = action.payload;
      return {
        ...state,
        expandedSections: {
          ...state.expandedSections,
          [section]: value
        }
      };
    }

    case 'LOAD_GAME':
      return action.payload;

    case 'NEW_GAME':
      return initialGameState;

    default:
      return state;
  }
};

// New function to handle asynchronous event generation
export const generateNewsEvents = async (state: GameState): Promise<NewsItem[]> => {
  const newEvents = await generateEvents(state.currentDate, state);
  return newEvents;
};