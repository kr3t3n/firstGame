import { GameState, GameAction, NewsItem, TradeRoute, Good, Town, Player } from '../types';
import { generateEvents } from '../services/eventSystem';
import { calculateTurnLength, advanceTime, formatDate } from '../utils/timeUtils';
import { applyNegotiationEffect, applyLogisticsEffect, calculateInventoryCapacity } from '../utils/skillEffects';
import { executeTradeRoute } from '../services/automationSystem';
import { unlockTechnology, getNewGoodsForTechnology } from '../services/technologySystem';
import { calculatePrice, generateMarketSentiment, updateMarketPrices } from '../services/marketSystem';
import { initialGameState } from '../data/initialGameData';
import { generateNews } from '../services/newsSystem';

const updatePrices = (towns: Town[], date: Date): Town[] => {
  return towns.map(town => ({
    ...town,
    goods: town.goods.map(good => {
      const newPrice = calculatePrice(good.basePrice, town.name, good.name);
      const newMarketSentiment = generateMarketSentiment(good, date);
      return {
        ...good,
        previousPrice: good.price,
        price: newPrice,
        marketSentiment: newMarketSentiment,
      };
    }),
  }));
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'PROGRESS_TIME': {
      const { newDate, newEvents } = action.payload;
      const updatedTowns = updatePrices(state.towns, newDate);
      const newGoods = getNewGoodsForTechnology(newDate.getFullYear(), state.currentDate.getFullYear());
      
      // Add skill point every turn
      const newSkillPoints = state.player.skillPoints + 1;
      console.log('Adding skill point. New total:', newSkillPoints);

      return {
        ...state,
        currentDate: newDate,
        towns: updatedTowns,
        news: [...state.news, ...newEvents],
        unlockedTechnologies: [
          ...state.unlockedTechnologies,
          ...newGoods.map(good => good.name),
        ],
        player: {
          ...state.player,
          skillPoints: newSkillPoints,
        },
      };
    }

    case 'UPGRADE_SKILL': {
      const skill = action.payload;
      const currentLevel = state.player.skills[skill];
      const upgradeCost = Math.pow(2, currentLevel);
      const energyCost = 10;

      console.log('Attempting to upgrade skill:', skill);
      console.log('Current skill level:', currentLevel);
      console.log('Upgrade cost:', upgradeCost);
      console.log('Current money:', state.player.money);
      console.log('Current energy:', state.energy);
      console.log('Current skill points:', state.player.skillPoints);

      if (state.player.money >= upgradeCost && state.energy >= energyCost && state.player.skillPoints > 0) {
        console.log('Upgrade conditions met. Upgrading skill.');
        return {
          ...state,
          player: {
            ...state.player,
            money: state.player.money - upgradeCost,
            skills: {
              ...state.player.skills,
              [skill]: currentLevel + 1,
            },
            skillPoints: state.player.skillPoints - 1,
          },
          energy: state.energy - energyCost,
        };
      } else {
        console.log('Upgrade conditions not met. Skill not upgraded.');
        return state;
      }
    }

    case 'ADD_NEWS': {
      return {
        ...state,
        news: [action.payload, ...state.news].slice(0, 10),
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

    case 'USE_ENERGY':
      return {
        ...state,
        energy: Math.max(0, state.energy - action.payload),
      };

    case 'BUY_GOOD':
      const { good, quantity, cost } = action.payload;
      if (state.player.money >= cost && state.energy >= quantity) {
        return {
          ...state,
          player: {
            ...state.player,
            money: Number((state.player.money - cost).toFixed(2)),
            inventory: [
              ...state.player.inventory.filter(item => item.name !== good.name),
              {
                ...good,
                quantity: (state.player.inventory.find(item => item.name === good.name)?.quantity || 0) + quantity
              }
            ]
          },
          energy: state.energy - quantity
        };
      }
      return state;

    case 'SELL_GOOD':
      const { good: sellGood, quantity: sellQuantity } = action.payload;
      const inventoryItem = state.player.inventory.find(item => item.name === sellGood.name);
      if (inventoryItem && inventoryItem.quantity >= sellQuantity) {
        const totalEarnings = sellGood.price * sellQuantity;
        return {
          ...state,
          player: {
            ...state.player,
            money: Number((state.player.money + totalEarnings).toFixed(2)),
            inventory: state.player.inventory.map(item =>
              item.name === sellGood.name
                ? { ...item, quantity: item.quantity - sellQuantity }
                : item
            ).filter(item => item.quantity > 0)
          }
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
      if (!action.payload) {
        console.error('TOGGLE_SECTION action payload is undefined');
        return state;
      }
      const { section, value } = action.payload;
      return {
        ...state,
        expandedSections: {
          ...state.expandedSections,
          [section]: value !== undefined ? value : !state.expandedSections[section]
        }
      };
    }

    case 'LOAD_GAME':
      return {
        ...action.payload,
        currentDate: new Date(action.payload.currentDate),
        news: action.payload.news.map((item: NewsItem) => ({
          ...item,
          date: new Date(item.date)
        }))
      };

    case 'NEW_GAME':
      return initialGameState;

    case 'END_TURN':
      const newDate = advanceTime(state.currentDate);
      const newSkillPoints = state.player.skillPoints + 1;
      console.log('End turn: Adding skill point. New total:', newSkillPoints);

      // Update prices and market sentiment for all towns
      const updatedTowns = state.towns.map(town => ({
        ...town,
        goods: town.goods.map(good => {
          const newPrice = calculatePrice(good.basePrice, town.name, good.name);
          const newMarketSentiment = generateMarketSentiment(good, newDate);
          return {
            ...good,
            previousPrice: good.price,
            price: newPrice,
            marketSentiment: newMarketSentiment,
          };
        }),
      }));

      // Generate new news items
      const newNewsItems = generateNews(state, newDate);

      // Add current treasury value to historical treasury
      const historicalTreasury = [...(state.historicalTreasury || []), state.player.money];

      return {
        ...state,
        currentDate: newDate,
        energy: state.maxEnergy, // Refill energy
        player: {
          ...state.player,
          skillPoints: newSkillPoints,
        },
        towns: updatedTowns,
        news: [...newNewsItems, ...state.news].slice(0, 30), // Keep the latest 30 news items
        historicalTreasury,
      };

    default:
      return state;
  }
};

// New function to handle asynchronous event generation
export const generateNewsEvents = async (state: GameState): Promise<NewsItem[]> => {
  try {
    const news = await generateNews(state, state.currentDate);
    return Array.isArray(news) ? news : [];
  } catch (error) {
    console.error('Error generating news events:', error);
    return [];
  }
};