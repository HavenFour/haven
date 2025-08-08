import { COLORS } from "@/constants/colors";
import { useAuth } from "@/contexts/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, Platform } from "react-native";

const { width: screenWidth } = Dimensions.get('window');

export default function ProtectedLayout() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/(auth)/getStarted");
    }
  }, [isAuthenticated, router]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          paddingTop: 12,
          paddingBottom: Platform.OS === 'ios' ? 30 : 20,
          paddingHorizontal: 8,
          height: Platform.OS === 'ios' ? 90 : 80,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabWrapper}>
              <View style={styles.tabItem}>
                <Ionicons 
                  name={focused ? "home" : "home-outline"} 
                  size={24} 
                  color={focused ? COLORS.primary : color} 
                />
                {focused && (
                  <Text style={styles.activeTabLabel}>Home</Text>
                )}
              </View>
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="notes"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabWrapper}>
              <View style={styles.tabItem}>
                <Ionicons 
                  name={focused ? "create" : "create-outline"} 
                  size={24} 
                  color={focused ? COLORS.primary : color} 
                />
                {focused && (
                  <Text style={styles.activeTabLabel}>Notes</Text>
                )}
              </View>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="location"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabWrapper}>
              <View style={styles.tabItem}>
                <Ionicons 
                  name={focused ? "map" : "map-outline"} 
                  size={24} 
                  color={focused ? COLORS.primary : color} 
                />
                {focused && (
                  <Text style={styles.activeTabLabel}>Location</Text>
                )}
              </View>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabWrapper}>
              <View style={styles.tabItem}>
                <Ionicons 
                  name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} 
                  size={24} 
                  color={focused ? COLORS.primary : color} 
                />
                {focused && (
                  <Text style={styles.activeTabLabel}>Chat</Text>
                )}
              </View>
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabWrapper}>
              <View style={styles.tabItem}>
                <Ionicons 
                  name={focused ? "person" : "person-outline"} 
                  size={24} 
                  color={focused ? COLORS.primary : color} 
                />
                {focused && (
                  <Text style={styles.activeTabLabel}>Profile</Text>
                )}
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 48,
    width: screenWidth / 5,
  },
  tabItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
    minHeight: 40,
    minWidth: 50,
    maxWidth: screenWidth / 5 - 8,
  },
  activeTabLabel: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "600",
    fontFamily: "roboto-medium",
    marginTop: 4,
    letterSpacing: 0.2,
    textAlign: "center",
  },
});