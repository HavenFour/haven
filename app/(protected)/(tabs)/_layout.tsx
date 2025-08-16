import { COLORS } from "@/constants/colors";
import { useAuth } from "@/contexts/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, Platform, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";

const { width: screenWidth } = Dimensions.get("window");

export default function ProtectedLayout() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/getStarted");
    }
  }, [isAuthenticated, user]);

  // Set navigation bar to white on Android
  // useEffect(() => {
  //   if (Platform.OS === "android") {
  //     NavigationBar.setBackgroundColorAsync("#ffffff");
  //     NavigationBar.setButtonStyleAsync("dark");
  //   }
  // }, []);

  // Common icon color based on tab bar background (white for primary bg)
  const inactiveIconColor = "rgba(255,255,255,0.6)"; // faded white
  const activeIconColor = "#FFF"; // full white

  // Icon size mapping for visual consistency
  const getIconSize = (iconName) => {
    const iconSizes = {
      "home": 24,
      "home-outline": 24,
      "create": 22,
      "create-outline": 22,
      "map": 26,
      "map-outline": 26,
      "chatbubble-ellipses": 22,
      "chatbubble-ellipses-outline": 22,
      "person": 26,
      "person-outline": 26,
    };
    return iconSizes[iconName] || 24;
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: inactiveIconColor,
        tabBarStyle: {
          position: "absolute",
          left: 20,
          right: 20,
          bottom: Platform.OS === "ios" ? 30 + insets.bottom : 44,
          backgroundColor: COLORS.primary,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          borderBottomRightRadius: 40,
          borderBottomLeftRadius: 40,
          borderTopWidth: 0,
          paddingTop: 12,
          paddingHorizontal: 8,
          marginHorizontal: 12,
          height: Platform.OS === "ios" ? 70 : 60,
          paddingBottom: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.12,
          shadowRadius: 12,
          elevation: 16,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={focused ? "home" : "home-outline"}
              label="Home"
              focused={focused}
              activeColor={activeIconColor}
              inactiveColor={inactiveIconColor}
              getIconSize={getIconSize}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={focused ? "document-text" : "document-text-outline"}
              label="Notes"
              focused={focused}
              activeColor={activeIconColor}
              inactiveColor={inactiveIconColor}
              getIconSize={getIconSize}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={focused ? "add-circle" : "add-circle-outline"}
              label="Location"
              focused={focused}
              activeColor={activeIconColor}
              inactiveColor={inactiveIconColor}
              getIconSize={getIconSize}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                focused ? "chatbox" : "chatbox-outline"
              }
              label="Chat"
              focused={focused}
              activeColor={activeIconColor}
              inactiveColor={inactiveIconColor}
              getIconSize={getIconSize}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="safety"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={focused ? "shield-checkmark" : "shield-checkmark-outline"}
              label="Safety"
              focused={focused}
              activeColor={activeIconColor}
              inactiveColor={inactiveIconColor}
              getIconSize={getIconSize}
            />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ icon, label, focused, activeColor, inactiveColor, getIconSize }) {
  return (
    <View style={styles.tabWrapper}>
      <View style={[styles.tabItem, focused && styles.activeTabItem]}>
        <Ionicons
          name={icon}
          size={getIconSize(icon)}
          color={focused ? activeColor : inactiveColor}
          style={focused && { opacity: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabWrapper: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 36,
    width: screenWidth / 5,
  },
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 36,
    minWidth: 40,
    maxWidth: screenWidth / 5 - 8,
    borderRadius: 16,
    flexDirection: "column",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  activeTabItem: {
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "600",
    fontFamily: "roboto-medium",
    marginTop: 4,
    letterSpacing: 0.25,
    textAlign: "center",
  },
  activeTabLabel: {
    fontWeight: "bold",
  },
  activeIndicator: {
    marginTop: 4,
    width: 12,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
});