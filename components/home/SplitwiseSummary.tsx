import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export const COLORS = {
  primary: "#FF3B30",
  secondary: "#5856D6",
  success: "#34C759",
  warning: "#FF9500",
  error: "#FF3B30",
  background: "#F2F2F2",
  surface: "#FFFFFF",
  text: "#000000",
  textSecondary: "#666666",
};

const membersExpenseData = [
  {
    id: "1",
    name: "Alice",
    spent: 120,
    balance: 30, // positive means lent money
  },
  {
    id: "2",
    name: "Bob",
    spent: 80,
    balance: -30, // negative means borrowed money
  },
  {
    id: "3",
    name: "Charlie",
    spent: 50,
    balance: 0,
  },
];

const ExpenseSummaryCard = ({ member }) => {
  const isLender = member.balance > 0;
  const isBorrower = member.balance < 0;

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{member.name}</Text>
      <Text style={styles.spent}>Spent: ${member.spent.toFixed(2)}</Text>
      {isLender && (
        <Text style={[styles.balance, { color: COLORS.success }]}>
          Lent ${member.balance.toFixed(2)}
        </Text>
      )}
      {isBorrower && (
        <Text style={[styles.balance, { color: COLORS.error }]}>
          Borrowed ${Math.abs(member.balance).toFixed(2)}
        </Text>
      )}
      {!isLender && !isBorrower && (
        <Text style={[styles.balance, { color: COLORS.textSecondary }]}>
          Settled up
        </Text>
      )}
    </View>
  );
};

const SplitwiseSummary = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Group Expenses Summary</Text>
      <FlatList
        data={membersExpenseData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseSummaryCard member={item} />}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
  },
  header: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 14,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  spent: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  balance: {
    marginTop: 6,
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default SplitwiseSummary;
