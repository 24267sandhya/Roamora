import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile, UserPreferences, TravelStats } from '@/types/auth';

// ─── User Profile Operations ───────────────────────────────────────────────────

export async function createUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  const userRef = doc(db, 'users', uid);
  const defaultProfile: UserProfile = {
    uid,
    email: data.email || '',
    displayName: data.displayName || '',
    photoURL: data.photoURL || '',
    role: 'user',
    authProvider: data.authProvider || 'email',
    emailVerified: data.emailVerified || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    preferences: {
      travelStyle: [],
      preferredDestinations: [],
      budgetRange: { min: 0, max: 5000, currency: 'USD' },
      transportModes: [],
      accommodationTypes: [],
      foodPreferences: [],
      travelPace: 'moderate',
    },
    stats: {
      tripsPlanned: 0,
      tripsCompleted: 0,
      countriesVisited: 0,
      totalSpent: 0,
      badges: [],
    },
    savedTrips: [],
    bookingHistory: [],
    favoriteDestinations: [],
    savedVehicles: [],
    savedHotels: [],
    onboardingCompleted: false,
  };

  await setDoc(userRef, { ...defaultProfile, ...data, updatedAt: new Date().toISOString() }, { merge: true });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    return snap.data() as UserProfile;
  }
  return null;
}

export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, { ...data, updatedAt: new Date().toISOString() });
}

export async function saveUserPreferences(
  uid: string,
  preferences: Partial<UserPreferences>
): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    preferences: preferences,
    onboardingCompleted: true,
    updatedAt: new Date().toISOString(),
  });
}

export async function addFavoriteDestination(uid: string, destination: string): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    favoriteDestinations: arrayUnion(destination),
    updatedAt: new Date().toISOString(),
  });
}

export async function removeFavoriteDestination(uid: string, destination: string): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    favoriteDestinations: arrayRemove(destination),
    updatedAt: new Date().toISOString(),
  });
}

export async function addSavedTrip(uid: string, tripId: string): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    savedTrips: arrayUnion(tripId),
    updatedAt: new Date().toISOString(),
  });
}

export async function addBookingToHistory(uid: string, bookingId: string): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    bookingHistory: arrayUnion(bookingId),
    updatedAt: new Date().toISOString(),
  });
}

// ─── AI Personalization Memory ─────────────────────────────────────────────────

export async function updateAIMemory(
  uid: string,
  memoryData: Record<string, unknown>
): Promise<void> {
  const memoryRef = doc(db, 'ai_memory', uid);
  await setDoc(
    memoryRef,
    { ...memoryData, updatedAt: new Date().toISOString() },
    { merge: true }
  );
}

export async function getAIMemory(uid: string): Promise<Record<string, unknown> | null> {
  const memoryRef = doc(db, 'ai_memory', uid);
  const snap = await getDoc(memoryRef);
  return snap.exists() ? snap.data() : null;
}
