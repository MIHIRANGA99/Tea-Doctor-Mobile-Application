import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import DetailCard from "../Components/DetailCard/DetailCard";
import IconCard from "../Components/IconCard/IconCard";
import { APP_COMPONENTS } from "../constants/appComponents";
import { COLOR_PALETTE } from "../constants/colors";
import useCurrentUser from "../firebase/hooks/useCurrentUser";
import { useNavigation } from "@react-navigation/native";
import Button from "../Components/Button/Button";

const Home = ({ changeTab }: { changeTab: (number: number) => void }) => {
  const user = useCurrentUser();

  const navigation = useNavigation();

  const navigateToDiseaseDetails = () => {
    navigation.navigate("DiseaseDisplay");
  };

  const navigateToDiseaseCategory = () => {
    navigation.navigate("Category");
  };

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
    <View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: "100%", resizeMode: "contain" }}
          source={require("../assets/tea-doctor-logo.png")}
        />
        <Text style={{ color: COLOR_PALETTE.primary, fontWeight: "700" }}>
          {user ? `Hi ${user.email}!` : "Loading..."}
        </Text>
      </View>
      <DetailCard
        header="About Your Tea State"
        description="Choose a tea tree that you can see some diseases and let us decide the treatments."
      />
      <DetailCard
        header="Suggestions"
        description="Check the tea leaves and scan if you see any odd spots"
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 12,
        }}
      >
        {APP_COMPONENTS.map((comp, index) => (
          <IconCard
            key={index}
            onClick={() => changeTab(comp.title === "Weather Checker" ? 3 : 0)}
            icon={comp.icon}
            title={comp.title}
          />
        ))}
      </View>
      <View>
        <Button
          label="රෝග ගැන ඉගෙන ගන්න"
          onClick={navigateToDiseaseDetails}
          color="rgba(39, 89, 0, 0.58)"
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button
          label="ඔබගේ අතීත රෝග හඳුනාගැනීම් බලන්න"
          onClick={navigateToDiseaseCategory}
          color="rgba(39, 89, 0, 0.58)"
        />
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "rgba(39, 89, 0, 0.58)",
    padding: 10,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default Home;
