import Category from "@/components/home/category";
import Locations from "@/components/home/locations";
import PlacesToExplore from "@/components/home/PlacesToExplore";
import Promotions from "@/components/home/promotions";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Header Component with Hamburger Menu, Notifications, Search, and Filter
const Header = ({
  searchQuery,
  onSearchChange,
  onMenuPress,
  onNotificationPress,
}) => (
  <View style={styles.header}>
    <View style={styles.headerTop}>
      <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
        <Ionicons name="menu" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={onNotificationPress}
      >
        <Ionicons name="notifications-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>

    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={20}
        color="#999"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search by City, Hotel, or Location"
        value={searchQuery}
        onChangeText={onSearchChange}
        placeholderTextColor="#999"
        returnKeyType="search"
        autoCapitalize="words"
      />
      <TouchableOpacity style={styles.filterButton}>
        <Ionicons name="options-outline" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

// Hero Section Component
const HeroSection = () => (
  <View style={styles.heroContainer}>
    <View style={styles.titleSection}>
      <Text style={styles.greeting}>Hello, Traveler!</Text>
      <Text style={styles.mainTitle}>Where do you</Text>
      <Text style={styles.mainTitleAccent}>want to explore?</Text>
      <Text style={styles.subtitle}>
        Discover amazing places around the world
      </Text>
    </View>
    <View style={styles.imageContainer}>
      <Image
        source={require("../../assets/images/Journey-amico.png")}
        style={styles.journeyImage}
        resizeMode="contain"
      />
      <View style={styles.floatingCard}>
        <Ionicons name="airplane" size={16} color={COLORS.primary} />
        <Text style={styles.floatingText}>Ready to go?</Text>
      </View>
    </View>
  </View>
);

// Section Title Component
const SectionTitle = ({ title, subtitle }) => (
  <View style={styles.sectionTitleContainer}>
    <View style={styles.titleWrapper}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {/* <Text style={styles.sectionSubtitle}>{subtitle}</Text> */}
    </View>
    <TouchableOpacity style={styles.seeAllButton}>
      <Text style={styles.seeAllText}>View all</Text>
      <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
    </TouchableOpacity>
  </View>
);

// Main Homepage Component
export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Handle menu press (for hamburger menu)
  const handleMenuPress = () => {
    // Add your menu logic here (e.g., open drawer navigation)
    console.log("Menu pressed");
  };

  // Handle notification press
  const handleNotificationPress = () => {
    // Add your notification logic here
    console.log("Notification pressed");
  };

  // Add locations data here or import if external
  const locations = [
    { name: "Yosemite", category: "Nature" },
    { name: "Bali", category: "Beach" },
    { name: "Swiss Alps", category: "Mountain" },
    { name: "New York", category: "City" },
    { name: "Sahara", category: "Desert" },
    { name: "Amazon", category: "Forest" },
  ];

  // Filter the locations based on category
  const filteredLocations =
    selectedCategory && selectedCategory !== "All"
      ? locations.filter((loc) => loc.category === selectedCategory)
      : locations;

  // Optional: Add "All" category
  const categories = [
    { name: "All", icon: "earth" },
    { name: "Nature", icon: "tree" },
    { name: "Beach", icon: "beach" },
    { name: "Mountain", icon: "mountain" },
    { name: "City", icon: "city" },
    { name: "Desert", icon: "desert" },
    { name: "Forest", icon: "pine-tree" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuPress={handleMenuPress}
        onNotificationPress={handleNotificationPress}
      />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <HeroSection />

          <View style={styles.section}>
            <SectionTitle title="Promotions" subtitle="Limited time offers" />
            <Promotions />
          </View>

          <View style={styles.section}>
            <SectionTitle
              title="Discover Places"
              subtitle="Amazing destinations waiting to be explored"
            />
            <PlacesToExplore />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for tab bar
  },
  content: {
    paddingHorizontal: 20,
  },

  // Header Styles
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  menuButton: {
    padding: 5,
  },
  notificationButton: {
    padding: 5,
  },

  // Search Styles (moved to header)
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 8,
    paddingHorizontal: 0,
    minHeight: 40,
  },
  filterButton: {
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  // Hero Section Styles
  // Hero Section Styles
  heroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 25,
    paddingRight: 10,
  },
  titleSection: {
    flex: 1.2,
    paddingRight: 15,
  },
  greeting: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: COLORS.primary,
    fontWeight: "500",
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  mainTitle: {
    fontSize: 32,
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    color: "#1a1a1a",
    lineHeight: 38,
    marginBottom: 2,
  },
  mainTitleAccent: {
    fontSize: 32,
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    color: COLORS.primary,
    lineHeight: 38,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Roboto-Regular",
    color: "#666",
    lineHeight: 22,
    fontWeight: "400",
    opacity: 0.8,
  },
  imageContainer: {
    flex: 0.8,
    position: "relative",
    alignItems: "center",
  },
  journeyImage: {
    width: 140,
    height: 140,
  },
  floatingCard: {
    position: "absolute",
    bottom: 10,
    right: -5,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  floatingText: {
    fontSize: 12,
    fontFamily: "Roboto-Medium",
    color: "#333",
    marginLeft: 5,
    fontWeight: "500",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    lineHeight: 38,
  },

  // Section Styles
    // Section wrapper
  section: {
    flexDirection: "column",
    marginBottom: 32,
  },
   sectionTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titleWrapper: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Roboto-Bold',
    fontWeight: "700",
    color: "#1a1a1a",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: "#666",
    fontWeight: "400",
    lineHeight: 20,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  seeAllText: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    fontWeight: "600",
    marginRight: 2,
  },
});
