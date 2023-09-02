import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {};

const Settings = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Premium Member Card */}
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Premium Membership</Text>
        <Text style={styles.cardDescription}>
          Unlock exclusive features and content with Premium Membership.
        </Text>
        <Text style={styles.cardPrice}>මසකට රුපියල් 300</Text>
        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeButtonText}>Subscribe</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subscribeButton: {
    backgroundColor: "rgba(39, 89, 0, 0.58)",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  subscribeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Settings;
