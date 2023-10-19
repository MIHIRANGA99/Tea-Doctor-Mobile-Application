import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";

const Settings = () => {
  const [isPremium, setIsPremium] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Card style={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>General Settings</Text>
        </View>
        {isPremium && (
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Premium Settings</Text>
          </View>
        )}
      </Card>
      <Button
        mode="contained"
        onPress={() => setIsPremium(!isPremium)}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        {isPremium ? "Switch to Non-Premium" : "Upgrade to Premium"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
  },
  settingsContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    width: "80%",
    elevation: 5,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingText: {
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    width: "80%",
    borderRadius: 30,
  },
  buttonLabel: {
    fontSize: 18,
  },
});

export default Settings;
