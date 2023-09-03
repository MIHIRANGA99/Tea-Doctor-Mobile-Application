import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import mainStyles from "../../constants/mainStyles";
import { COLOR_PALETTE } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const Other = ({ changeTab }: { changeTab: (number: number) => void }) => {
  const navigation: any = useNavigation();

  const navigateToBlisterMap = () => {
    navigation.navigate("BlisterMap");
  };

  const navigateToStemMap = () => {
    navigation.navigate("StemMap");
  };

  const navigateToBorerMap = () => {
    navigation.navigate("BorerMap");
  };

  return (
    <ScrollView style={mainStyles.main}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToBlisterMap}>
          <Text style={styles.buttonText}>බුබුළු අංගමාරය ඇති ස්ථාන බලන්න</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToStemMap}>
          <Text style={styles.buttonText}>කඳ අතු පිළිකාව ඇති ස්ථාන බලන්න</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToBorerMap}>
          <Text style={styles.buttonText}>කද ගුල්ලා සිටින ස්ථාන බලන්න</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: COLOR_PALETTE.primary,
    height: 82,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginVertical: 6,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default Other;
