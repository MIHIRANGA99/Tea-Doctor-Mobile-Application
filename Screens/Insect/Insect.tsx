import React from "react";
import { View, Image, ScrollView } from "react-native";
import DetailCard from "../../Components/DetailCard/DetailCard";
import mainStyles from "../../constants/mainStyles";
import { useLanguageContext } from "../../Context/LanguageContext";

const Insect = () => {
  const { language } = useLanguageContext().state;
  
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
        header={language === "English" ? "Suggestions" : "හැකියාවන්"}
        description={
          language === "English"
            ? "Check the tea leaves and scan if you see any odd spots"
            : "තේ දළු පරීක්ෂා කර ඔබට සැක ස්ථාන තිබේ නම් ස්කෑන් කරන්න"
        }
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
