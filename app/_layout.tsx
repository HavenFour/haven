import { AuthProvider } from "@/contexts/auth-context";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "ubuntu-regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "ubuntu-bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "ubuntu-medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "ubuntu-light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <AuthProvider>
          <SafeAreaView
            style={{ flex: 1, backgroundColor: "black" }}
            edges={["top", "right", "left"]}
          >
            <Stack screenOptions={{ headerShown: false }}></Stack>
            <StatusBar />
          </SafeAreaView>
        </AuthProvider>
      </ClerkProvider>
    </SafeAreaProvider>
  );
}
