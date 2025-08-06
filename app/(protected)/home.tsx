import Category from "@/components/home/category";
import Locations from "@/components/home/locations";
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

// Header Component
const Header = () => (
  <View style={styles.header}>
    <View style={styles.locationContainer}>
      <Ionicons name="location" size={16} color={COLORS.primary} />
      <Text style={styles.locationText}>Indonesia, Malang</Text>
    </View>
    <TouchableOpacity style={styles.notificationButton}>
      <Ionicons name="notifications-outline" size={24} color="#333" />
    </TouchableOpacity>
  </View>
);

// Hero Section Component
const HeroSection = () => (
  <View style={styles.heroContainer}>
    <View style={styles.titleSection}>
      <Text style={styles.title}>Where you</Text>
      <Text style={styles.title}>Wanna go?</Text>
    </View>
    <Image
      source={require("../../assets/images/Journey-amico.png")}
      style={styles.journeyImage}
      resizeMode="contain"
    />
  </View>
);

// Search Component
const SearchBar = ({ searchQuery, onSearchChange }) => (
  <View style={styles.searchContainer}>
    <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
    <TextInput
      style={styles.searchInput}
      placeholder="Search destination"
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
);

// Section Title Component
const SectionTitle = ({ title }) => (
  <View style={styles.sectionTitleContaniner}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.seeAllLink}>see all</Text>
  </View>
);

// Main Homepage Component
export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Add locations data here or import if external
  const locations = [
    { name: 'Yosemite', category: 'Nature' },
    { name: 'Bali', category: 'Beach' },
    { name: 'Swiss Alps', category: 'Mountain' },
    { name: 'New York', category: 'City' },
    { name: 'Sahara', category: 'Desert' },
    { name: 'Amazon', category: 'Forest' },
  ];

  // Filter the locations based on category
  const filteredLocations =
    selectedCategory && selectedCategory !== 'All'
      ? locations.filter(loc => loc.category === selectedCategory)
      : locations;

  // Optional: Add "All" category
  const categories = [
    { name: 'All', icon: 'earth' },
    { name: 'Nature', icon: 'tree' },
    { name: 'Beach', icon: 'beach' },
    { name: 'Mountain', icon: 'mountain' },
    { name: 'City', icon: 'city' },
    { name: 'Desert', icon: 'desert' },
    { name: 'Forest', icon: 'pine-tree' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Header />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <HeroSection />

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <View style={styles.section}>
            <SectionTitle title="Promotions" />
            <Promotions />
          </View>

           <View style={styles.section}>
            <SectionTitle title="Category" />
            <Category
        categories={categories}
        selectedCategory={selectedCategory || 'All'}
        onSelectCategory={setSelectedCategory}
      />
      <Locations locations={filteredLocations} />
          </View>

          {/* Add more sections here */}
          {/* 
          <View style={styles.section}>
            <SectionTitle title="Popular Destinations" />
            <PopularDestinations />
          </View>
          
          <View style={styles.section}>
            <SectionTitle title="Categories" />
            <Categories />
          </View>
          */}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  notificationButton: {
    padding: 5,
  },

  // Hero Section Styles
  heroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingRight: 10,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    lineHeight: 38,
  },
  journeyImage: {
    width: 120,
    height: 120,
  },

  // Search Styles
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 30,
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

  // Section Styles
  section: {
    flexDirection: "column",
    gap: 5,
    marginBottom: 25,
  },
  sectionTitleContaniner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderColor: "#ddd",
    // borderWidth: 1,
    // marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    
  },
  seeAllLink:{
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "500",
    // textDecorationLine: "underline",
  }
});
