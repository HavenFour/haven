"use client"
import { COLORS } from "@/constants/colors"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function GetStarted() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  

  // If user is authenticated, show welcome screen with sign out
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/(protected)/home"); // or wherever you want unauthenticated users to go
    }
  }, [isAuthenticated, router]);

  // If user is not authenticated, show sign in/register buttons
  return (
    <View style={styles.container}>
     
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            paddingVertical: 15,
            borderRadius: 10,
          }}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={{ fontSize: 20, color: "white", fontFamily: "ubuntu-medium" }}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.primary,
            paddingVertical: 15,
            borderRadius: 10,
          }}
          onPress={() => router.push("/(auth)/signup")}
        >
          <Text style={{ fontSize: 20, color: "white", fontFamily: "ubuntu-medium" }}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 24,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
    fontFamily: "ubuntu-medium",
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  image: {
    width: 300,
    height: 300,
  },
  welcomeSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    fontFamily: "ubuntu-bold",
  },
  userName: {
    fontSize: 20,
    color: COLORS.primary,
    marginBottom: 5,
    fontFamily: "ubuntu-medium",
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    fontFamily: "ubuntu-regular",
  },
  buttonWrapper: {
    marginBottom: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  homeButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
  },
  homeButtonText: {
    fontSize: 20,
    color: "white",
    fontFamily: "ubuntu-medium",
  },
  signOutButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6B6B",
    paddingVertical: 15,
    borderRadius: 10,
  },
  signOutButtonText: {
    fontSize: 20,
    color: "white",
    fontFamily: "ubuntu-medium",
  },
})
