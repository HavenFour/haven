// app/(protected)/_layout.tsx
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/auth-context';

/**
 * Protected stack layout
 * - (tabs) → your bottom tabs group
 * - profile → standalone page, not in the tab bar
 *
 * Navigate to profile with: router.push('/(protected)/profile')
 * Navigate to tabs/home with: router.replace('/(protected)/(tabs)/home') or '/(protected)/(tabs)'
 */
export default function ProtectedLayout() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  

  // Optional: gate the protected stack
  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace('/(auth)/getStarted');
    }
  }, [isAuthenticated]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Tabs group (bottom tabs) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Standalone non-tab screens */}
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
}
