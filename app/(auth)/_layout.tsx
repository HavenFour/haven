import { useAuth } from "@/contexts/auth-context";
import { Redirect, Stack } from "expo-router"

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null; // Or splash/loading indicator
  
  if (isAuthenticated) {
    return <Redirect href="/(protected)/home" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="getStarted" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  )
}
