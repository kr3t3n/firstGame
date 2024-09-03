import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

export async function getUserPreference(userId: string, preference: string): Promise<boolean> {
  const userRef = doc(db, 'users', userId)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    return userSnap.data()[preference] || false
  }

  return false
}

export async function updateUserPreference(userId: string, preference: string, value: boolean): Promise<void> {
  const userRef = doc(db, 'users', userId)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    await updateDoc(userRef, { [preference]: value })
  } else {
    await setDoc(userRef, { [preference]: value })
  }
}