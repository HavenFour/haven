import { useAuth } from "@/contexts/auth-context";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Profile() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const goHome = () => {
    if ((router as any).canGoBack?.()) router.back();
    else router.replace("/(protected)/(tabs)/home");
  };

  const getInitials = (name, email) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const menuItems = [
    {
      id: "1",
      title: "Personal Information",
      subtitle: "Update your details",
      icon: "person-outline",
      onPress: () => console.log("Personal Info"),
    },
    {
      id: "2",
      title: "Booking History",
      subtitle: "View your past trips",
      icon: "time-outline",
      onPress: () => console.log("Booking History"),
    },
    {
      id: "3",
      title: "Payment Methods",
      subtitle: "Manage your cards",
      icon: "card-outline",
      onPress: () => console.log("Payment Methods"),
    },
    {
      id: "4",
      title: "Notifications",
      subtitle: "Manage preferences",
      icon: "notifications-outline",
      onPress: () => console.log("Notifications"),
    },
    {
      id: "5",
      title: "Help & Support",
      subtitle: "Get assistance",
      icon: "help-circle-outline",
      onPress: () => console.log("Help & Support"),
    },
    {
      id: "6",
      title: "Privacy Policy",
      subtitle: "Terms and conditions",
      icon: "shield-outline",
      onPress: () => console.log("Privacy Policy"),
    },
  ];

  const MenuItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
      <View style={styles.menuIconContainer}>
        <Ionicons name={item.icon} size={24} color={COLORS.primary} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={goHome}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={22} color="#1a1a1a" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile</Text>

          <View style={{ width: 40, height: 40 }} />
        </View>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {getInitials(user?.name, user?.email)}
              </Text>
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user?.name || "User Name"}</Text>
            <Text style={styles.userEmail}>
              {user?.email || "user@example.com"}
            </Text>
            <View style={styles.membershipBadge}>
              <Ionicons name="star" size={12} color="#FFB800" />
              <Text style={styles.membershipText}>Premium Member</Text>
            </View>
          </View>
        </View>
        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </View>
        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={20} color="#FF4757" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    color: "#1a1a1a",
    letterSpacing: -0.5,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileCard: {
    marginHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  profileInfo: {
    alignItems: "center",
  },
  userName: {
    fontSize: 24,
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#666",
    marginBottom: 12,
  },
  membershipBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 184, 0, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  membershipText: {
    color: "#FFB800",
    fontSize: 12,
    fontFamily: "Roboto-Medium",
    fontWeight: "600",
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: "#666",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#eee",
    marginHorizontal: 20,
  },
  menuContainer: {
    marginHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(79, 172, 254, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: "#666",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFE5E5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  signOutText: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    fontWeight: "600",
    color: "#FF4757",
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 20,
  },
});
