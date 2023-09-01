import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLOR_PALETTE } from "../../constants/colors";

type Disease = {
  name: string
  images: string[];
  description: string;
};

interface DiseaseCardProps {
  disease: Disease;
}

const DiseaseCard: React.FC<DiseaseCardProps> = ({ disease }) => {
  const firstImage = disease.images[0];
  const maxDescriptionLength = 45;

  const truncatedDescription =
    disease.description.length > maxDescriptionLength
      ? disease.description.substring(0, maxDescriptionLength) + "..."
      : disease.description;

  const navigation = useNavigation();

  const goToDetails = () => {
    navigation.navigate("DiseaseDetails", { disease });
  };

  return (
    <TouchableWithoutFeedback onPress={goToDetails}>
      <View style={styles.card}>
      <Image
        source={firstImage}
        style={styles.firstImage}
        resizeMode="cover"
      />
        <Text style={styles.title}>{disease.name}</Text>
        <Text style={styles.description}>{truncatedDescription}</Text>
        <Text style={styles.more}>වැඩි විස්තර...</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 3,
    alignSelf: "center",
    width: "90%",
    marginLeft: 10,
  },
  title: {
    fontSize: 15,
    color: COLOR_PALETTE.primary,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: COLOR_PALETTE.darker,
    marginBottom: 8,
  },
  more: {
    fontSize: 10,
    marginBottom: 8,
    color: COLOR_PALETTE.darker,
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
    marginTop: 5,
  },
  firstImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default DiseaseCard;
