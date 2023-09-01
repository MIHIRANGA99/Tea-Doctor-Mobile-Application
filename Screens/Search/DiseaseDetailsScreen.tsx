import React, { ReactNode } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { COLOR_PALETTE } from "../../constants/colors";

const DiseaseDetailsScreen = ({ navigation, route }: {navigation: any, route: any}) => {
  const { disease } = route.params;
  const symptomsArray = disease.symptoms.split(", ");

  return (
    <View style={styles.container}>
      <Image
        source={disease.images[0]}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.diseaseName}>{disease.name}</Text>
      <ScrollView>
        <Text style={styles.sectionTitle}>රෝග ලක්ෂණ:</Text>
        <View style={styles.bulletList}>
          {symptomsArray.map((symptom: string, index: number) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={styles.bulletText}>• {symptom}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>වැඩි විස්තර:</Text>
        <Text style={styles.description}>{disease.description}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: COLOR_PALETTE.secondary
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 30,
  },
  diseaseName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: -30,
    textAlign: "center",
    color: COLOR_PALETTE.secondary,
    backgroundColor: COLOR_PALETTE.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: COLOR_PALETTE.secondary
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    alignSelf: "flex-start",
    color: COLOR_PALETTE.primary
  },
  bulletList: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 20,
    marginBottom: 15,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bulletText: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    marginBottom: 20,
    alignSelf: "flex-start",
    textAlign: "justify",
  },
});

export default DiseaseDetailsScreen;
