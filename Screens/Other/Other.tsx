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
import BlisterMap from "../Map/BlisterMap";

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
    <View style={{height: '100%', width: '100%', marginTop: -10, marginLeft: -12}}>
      <BlisterMap />
    </View>
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
