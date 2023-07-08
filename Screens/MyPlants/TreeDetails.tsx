import React from "react";
import { View, Image, ScrollView } from "react-native";
import DetailCard from "../../Components/DetailCard/DetailCard";
import Button from "../../Components/Button/Button";

const TreeDetails = () => {
  return (
    <ScrollView>
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
            source={require("../../assets/tea-doctor-logo.png")}
          />
        </View>

        <ScrollView>
          <View>
            <DetailCard
              header="Suggestions"
              description="Check the tea leaves and scan if you see any odd spots"
            />
            <DetailCard
              header="Condition of Leaves"
              description="Check the tea leaves and scan if you see any odd spotsCheck the tea leaves and scan if you see any odd spotsCheck the tea leaves and scan if you see any odd spotsCheck the tea leaves and scan if                                     "
            />

            <Button
              icon={require("../../assets/icons/eco.png")}
              label="Rescan Leaves"
            />
            <DetailCard header="Condition of Branches">
              <Button
                icon={require("../../assets/icons/eco.png")}
                label="Scan Branches"
              />
            </DetailCard>
            <DetailCard header="Existence of Bugs" />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default TreeDetails;
