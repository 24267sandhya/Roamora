"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../lib/firebase";

interface UserProfile {
  uid: string;
  email: string;
  name?: string;
  photoUrl?: string;
  role: string;
  preferences?: any;
  savedTrips?: string[];
  bookingHistory?: string[];
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {},
  refreshProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (currentUser: User) => {
    try {
      const token = await currentUser.getIdToken();
      // Ensure backend is running and reachable
      const res = await fetch("http://localhost:8080/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      } else if (res.status === 404) {
        // Create default profile on first sign-in
        const createRes = await fetch("http://localhost:8080/api/users/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName,
            photoUrl: currentUser.photoURL
          })
        });
        if (createRes.ok) {
          const data = await createRes.json();
          setProfile(data);
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    // Check for mock mode first
    const isMock = process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock-api-key" || !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    const hasMockToken = typeof window !== 'undefined' && localStorage.getItem('mock_user_token');

    if (isMock && hasMockToken) {
      const mockUser = {
        uid: "mock-user-123",
        email: "traveler@roamora.com",
        displayName: "Demo Traveler",
        photoURL: "",
        getIdToken: async () => "mock-token-123"
      } as unknown as User;
      
      setUser(mockUser);
      fetchProfile(mockUser).finally(() => setLoading(false));
      return () => {}; // No unsubscribe needed for mock
    }

    // Real Firebase Flow
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    if (typeof window !== 'undefined') localStorage.removeItem('mock_user_token');
    await firebaseSignOut(auth).catch(() => {});
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
