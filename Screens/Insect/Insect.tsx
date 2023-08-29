import React from "react";
import { View, Image, ScrollView } from "react-native";
import DetailCard from "../../Components/DetailCard/DetailCard";
import mainStyles from "../../constants/mainStyles";

const Insect = () => {
  return (
    <ScrollView style={mainStyles.main}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: "100%", resizeMode: "contain" }}
          source={require("../../assets/tea-doctor-logo.png")}
        />
      </View>
      <DetailCard
        header="Suggestions"
        description="Check the tea leaves and scan if you see any odd spots"
      />
      <View style={{ paddingVertical: 12 }}>
        <DetailCard
          header="Condition of Trunk"
          
        />
      </View>
    </ScrollView>
  );
};

export default Insect;
