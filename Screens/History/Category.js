import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { categories } from "../../lib/data";

const Category = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/Diseases/blister-blight.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.category}
            onPress={() =>
              navigation.navigate("HistoryDetails", {
                category: category.name,
                url: category.value,
              })
            }
          >
            <View style={styles.categoryContent}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
};

const buttonWidth = 250;
const buttonHeight = 60;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  category: {
    width: buttonWidth,
    height: buttonHeight,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  categoryContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Category;
