import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/config';
import { GameState } from '../types';

export const saveGameToFirestore = async (userId: string, gameState: GameState) => {
  const gameStateToSave = {
    ...gameState,
    currentDate: gameState.currentDate.toISOString(),
    towns: gameState.towns.map(town => ({
      ...town,
      goods: town.goods.map(good => ({
        ...good,
        marketSentiment: good.marketSentiment ? {
          trend: good.marketSentiment.trend,
          strength: good.marketSentiment.strength
        } : null
      }))
    })),
    news: gameState.news.map(item => ({
      ...item,
      date: item.date.toISOString()
    }))
  };

  try {
    await setDoc(doc(firestore, 'saves', userId), gameStateToSave);
  } catch (error) {
    // Handle error silently or show a user-friendly message
  }
};

export const loadGameFromFirestore = async (userId: string): Promise<GameState | null> => {
  try {
    const docRef = doc(firestore, 'saves', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const savedState = docSnap.data() as GameState;
      
      savedState.currentDate = new Date(savedState.currentDate);
      savedState.news = savedState.news.map(item => ({
        ...item,
        date: new Date(item.date)
      }));

      return savedState;
    } else {
      return null;
    }
  } catch (error) {
    // Handle error silently or show a user-friendly message
    return null;
  }
};

export const autoSaveGame = async (userId: string, gameState: GameState) => {
  if (!userId) {
    return;
  }
  try {
    await saveGameToFirestore(userId, gameState);
  } catch (error) {
    // Handle error silently or show a user-friendly message
  }
};