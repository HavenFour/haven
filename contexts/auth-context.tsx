"use client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth as useClerkAuth, useUser } from "@clerk/clerk-expo";
interface User {
  id: string;
  email: string;
  name?: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean | undefined;
  signIn: (
    accessToken: string,
    refreshToken: string,
    userData?: User
  ) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const clerkAuth = useClerkAuth();
  const clerkUserObj = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  const jwtAuthenticated = !!user;
  const googleAuthenticated = clerkAuth.isSignedIn;

   useEffect(() => {
    if (googleAuthenticated && clerkUserObj.isLoaded) {
      // Map Clerk user info to your User interface
      const clerkUser = clerkUserObj.user;
      if (clerkUser) {
        const mappedUser: User = {
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          name: clerkUser.firstName || clerkUser.fullName || clerkUser.username || "",
        };
        // Update local user state only if different to prevent rerenders
        setUser((prevUser) => {
          if (!prevUser || prevUser.id !== mappedUser.id) {
            return mappedUser;
          }
          return prevUser;
        });
      }
    }
  }, [googleAuthenticated, clerkUserObj.isLoaded, clerkUserObj.user]);
  
  // console.log(clerkAuth)
  // if(googleAuthenticated){
  //   setUser(clerkAuth.user);
  // }

  const isAuthenticated = jwtAuthenticated || googleAuthenticated; 

  // Check if user is in auth group (login/signup pages)
  const inAuthGroup = segments[0] === "(auth)";

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && inAuthGroup) {
        // User is authenticated but on auth pages, redirect to home
        router.replace("/(protected)/home");
      } else if (!isAuthenticated && !inAuthGroup) {
        // User is not authenticated and not on auth pages, redirect to login
        router.replace("/(auth)/login");
      }
    }
  }, [isAuthenticated, inAuthGroup, isLoading]);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const accessToken = await AsyncStorage.getItem("accessToken");

      if (accessToken) {
        // Verify token with your backend
        const response = await fetch(
          "https://reasonable-amazement-production.up.railway.app/api/v1/auth/verify",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(
            userData.result || {
              id: "1",
              email: "user@example.com",
              name: "User",
            }
          ); // Fallback user data
        } else {
          // Token is invalid, remove it
          await AsyncStorage.removeItem("accessToken");
          setUser(null);
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (
    accessToken: string,
    refreshToken: string,
    userData?: User
  ) => {
    try {
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      console.log(userData);
      if (userData) {
        setUser(userData);
      } else {
        // If no user data provided, fetch it from the server
        await checkAuthStatus();
      }
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
    setUser(null);

    // Sign out from Clerk if needed
    if (googleAuthenticated) {
      await clerkAuth.signOut(); // Wait for Clerk sign-out to finish
    }

    // When all sign-outs are done, navigate once
    router.replace("/(auth)/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    signIn,
    signOut,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
