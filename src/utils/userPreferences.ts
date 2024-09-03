import { db } from '../firebase'; // Adjust this import based on your Firebase setup
import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function getUserPreference(userId: string, preference: string): Promise<boolean> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data()[preference] || false;
  }

  return false;
}

export async function updateUserPreference(userId: string, preference: string, value: boolean): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, { [preference]: value }, { merge: true });
}