import { COLORS } from "@/constants/colors";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


const TravelGroupCard = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Your Travel Groups</Text> */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          {/* Group Icon Placeholder */}
          <View style={styles.avatarPlaceholder} />
          <View style={{ flex: 1 }}>
            <Text style={styles.groupTitle}>NYC Explorers</Text>
            <Text style={styles.groupInfo}>6 members · Active now</Text>
          </View>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.chatButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>Group Notes</Text>
          <View style={styles.notesBox}>
            <Text style={styles.notesText}>
              Meeting at Central Park @ 3PM on July 25, 2025
            </Text>
            <TouchableOpacity>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: COLORS.background,
    // padding: 16,
    flex: 1,
   
  },
  header: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: "bold",
    marginBottom: 8,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
     borderWidth: 1,
    borderColor: "#eee",
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    marginRight: 10,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
  },
  groupInfo: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  chatButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  chatButtonText: {
    color: COLORS.surface,
    fontWeight: "bold",
    fontSize: 14,
  },
  notesSection: {
    marginTop: 8,
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 5,
  },
  notesBox: {
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notesText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    flex: 1,
  },
  editText: {
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 13,
  },
});

export default TravelGroupCard;
