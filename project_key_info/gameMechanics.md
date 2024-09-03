# Family Business Tycoon: Detailed Game Mechanics

## Price Change and Market Trends Arrows

### Price Change Arrow
The price change arrow represents the short-term price movement of a good compared to its price in the previous turn. This visual indicator helps players quickly assess recent market fluctuations.

States:
1. Significant increase (>10%): Dark green arrow (▲)
2. Slight increase (2-10%): Light green arrow (▲)
3. Stable (-2% to 2%): "≈" SVG icon in black
4. Slight decrease (-10% to -2%): Light red arrow (▼)
5. Significant decrease (<-10%): Dark red arrow (▼)

Calculation: 
The percentage change is calculated using the formula:
(currentPrice - previousPrice) / previousPrice * 100

Implementation:
- The `previousPrice` is stored in the `Good` object and updated each turn.
- The calculation and arrow display are handled in the UI components (e.g., `MarketOverview.tsx` and `MobileMarketView.tsx`).

Initial State:
When the game starts, all goods are set to a stable state to provide a neutral starting point.

### Market Trends Arrow
The market trends arrow indicates the mid-term (next 5-10 turns) direction of the market for a specific good. This helps players make informed decisions about long-term investments and trade strategies.

States:
1. Very bullish: Dark green arrow (▲)
2. Slightly bullish: Light green arrow (▲)
3. Stable: "≈" SVG icon in black
4. Slightly bearish: Light red arrow (▼)
5. Very bearish: Dark red arrow (▼)

Implementation:
- Generated using the `generateMarketSentiment` function in `marketSystem.ts`.
- Factors considered:
  - Current date (to align with historical events)
  - Historical and technological events (from `technologySystem.ts`)
  - Random factors (to simulate market unpredictability)
- The strength of the trend is visually represented by the intensity of the color and the number of arrows displayed.

### Display Format
The two arrows are displayed side by side, separated by a pipe symbol (|). This compact format allows players to quickly assess both short-term and mid-term market conditions.

Examples:
- ▲|▼ (Price increased recently, but the market sentiment is bearish)
- ≈|▲ (Price stable recently, but the market sentiment is bullish)

Implementation:
- This display is handled in the UI components, particularly in `MarketOverview.tsx` and `MobileMarketView.tsx`.

### Price Comparisons Between Cities
To help players identify profitable trade opportunities, prices are color-coded when displayed across different cities:

- Green: The price is higher than in the current city (potential selling opportunity)
- Red: The price is lower than in the current city (potential buying opportunity)
- Black: The price is the same as in the current city

The color intensity can vary based on the magnitude of the price difference, providing a quick visual cue for the most significant opportunities.

Implementation:
- This feature is primarily implemented in the `MarketOverview.tsx` component.
- The comparison is made against the player's current location, stored in `state.player.currentTown`.

## Core Game Mechanics

1. **Turn-based Gameplay**
   - Each turn represents a period of time in the game world.
   - The time scale accelerates as the game progresses through different eras.
   - Implementation: The `advanceTime` function in `timeUtils.ts` handles the progression of time.

2. **Dynamic Market**
   - Prices fluctuate based on supply, demand, and random events.
   - The `calculatePrice` function in `marketSystem.ts` determines the new price for each good in each town every turn.
   - Factors affecting price:
     - Base price of the good
     - Local availability (goods native to a town are generally cheaper)
     - Random market fluctuations
     - Special events (implemented through the news system)

3. **Player Actions**
   - Buy and sell goods:
     - Implemented in `gameReducer.ts` with the 'BUY_GOOD' and 'SELL_GOOD' actions.
     - Affected by the player's Negotiation skill.
   - Travel between towns:
     - Costs money and energy.
     - Implemented in `gameReducer.ts` with the 'TRAVEL' action.
     - Travel costs can be reduced with the Logistics skill.
   - Upgrade skills:
     - Implemented in `gameReducer.ts` with the 'UPGRADE_SKILL' action.
     - Skills: Negotiation, Market Knowledge, Logistics.

4. **Skills System**
   - Negotiation: Affects buying and selling prices.
     - Implementation: `applyNegotiationEffect` in `skillEffects.ts`.
   - Market Knowledge: Improves market trend predictions.
     - Implementation: Affects the accuracy of the market sentiment arrow.
   - Logistics: Increases inventory capacity and reduces travel costs.
     - Implementation: `applyLogisticsEffect` and `calculateInventoryCapacity` in `skillEffects.ts`.

5. **Energy System**
   - Players have limited energy per turn.
   - Energy is consumed by actions like trading and traveling.
   - Implementation: Managed in `gameReducer.ts` with the 'USE_ENERGY' action.

6. **News and Events System**
   - Random events occur each turn, affecting market conditions.
   - Implementation: `generateNews` function in `newsSystem.ts`.
   - Events can be city-specific, global, or related to technological advancements.

7. **Technological Advancements**
   - New goods become available as the game progresses through different eras.
   - Implementation: `technologySystem.ts` defines the timeline for new goods.
   - The `getNewGoodsForTechnology` function checks for newly available goods each turn.

8. **Trade Routes**
   - Players can set up automated trade routes between cities for passive income.
   - Implementation: `executeTradeRoute` function in `automationSystem.ts`.
   - Trade routes are executed automatically during the 'AUTO_EXECUTE_TURN' action in `gameReducer.ts`.

9. **Historical Context**
   - The game progresses through different historical periods (1800-2000+).
   - Each era affects available goods, technologies, and market conditions.
   - Implementation: Historical events are generated in `newsSystem.ts`.

10. **Market Sentiments**
    - Each good has a market sentiment influencing its price trends over time.
    - Implementation: `generateMarketSentiment` function in `marketSystem.ts`.

11. **Local Goods**
    - Some goods are local to specific cities, affecting their prices and availability.
    - Implementation: Defined in the `localGoods` object in `marketSystem.ts`.

12. **Inventory Management**
    - Players must manage their limited inventory space.
    - Inventory capacity can be expanded with the Logistics skill.
    - Implementation: Managed in the player object within the game state.

13. **Economic Cycles**
    - The game simulates economic booms and busts.
    - Implementation: Influenced by the news and events system, affecting market sentiments and prices.

14. **End Game**
    - The goal is to become the wealthiest merchant.
    - End conditions could be reaching a specific year or achieving a wealth target.
    - Implementation: To be defined in the main game loop, not yet implemented.

## Time Progression Structure

The game uses a dynamic time progression system that accelerates as the game advances through different eras. This system allows for a more detailed early game experience while speeding up progression in later eras.

1. 1800-1850: 1 turn = 1 year (50 turns)
2. 1851-1900: 1 turn = 6 months (100 turns)
3. 1901-1950: 1 turn = 3 months (200 turns)
4. 1951-2000: 1 turn = 1 month (600 turns)
5. 2001 onwards: 1 turn = 1 week (52 turns/year)

Implementation:
- The `calculateTurnLength` function in `timeUtils.ts` determines the number of days per turn based on the current year.
- The `advanceTime` function progresses the game date by the calculated number of days.
- `getTurnNumber` and `getDateAfterTurns` functions are provided to convert between turns and dates.

This structure allows for:
- More detailed gameplay and decision-making in the early stages of the game.
- Faster progression through later eras to maintain engagement.
- A sense of accelerating technological and economic progress as the game advances.

Developers should consider this time structure when implementing features such as:
- Historical events and technological advancements
- Long-term economic trends and cycles
- Player progression and skill development rates

## Balancing and Tuning

To create an engaging and challenging gameplay experience:
- Regularly playtest and adjust values for prices, skill effects, and event probabilities.
- Ensure that different strategies (e.g., specializing in certain goods, focusing on trade routes, or rapid expansion) are viable.
- Balance the difficulty curve across different eras to maintain challenge as the player's wealth and skills increase.
- Consider implementing dynamic difficulty adjustments based on player performance.

Future developers should pay special attention to these balance points and be prepared to fine-tune them based on player feedback and gameplay data.

## Welcome Screen and User Onboarding

1. **Welcome Screen**
   - Displayed to new users and those who haven't chosen to hide it.
   - Provides an introduction to the game and its core mechanics.
   - Implemented in `WelcomeScreen.tsx`.

2. **Tutorial Screens**
   - A series of screens guiding players through key game concepts:
     - Introduction to the game world
     - Key instructions and tips
     - Core mechanics overview
     - Getting started guide
     - Teaser for future progression

3. **User Preference Storage**
   - For logged-in users: Preferences stored in Firestore.
   - For non-logged users: Preferences stored in local storage.
   - Implemented through `getUserPreference` and `updateUserPreference` functions.

4. **Responsive Design**
   - Welcome screen adapts to both desktop and mobile layouts.
   - Ensures a smooth onboarding experience across devices.

5. **Don't Show Again Option**
   - Players can choose to skip the welcome screen in future sessions.
   - Preference is stored based on user authentication status.

This onboarding system helps new players understand the game mechanics and provides a smooth entry point into the complex world of Family Business Tycoon.