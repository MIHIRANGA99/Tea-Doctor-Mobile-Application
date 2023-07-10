import React from "react";
import { View, Image, ScrollView, Text } from "react-native";
import DetailCard from "../../Components/DetailCard/DetailCard";
import Button from "../../Components/Button/Button";
import mainStyles from "../../constants/mainStyles";
import { COLOR_PALETTE } from "../../constants/colors";

const TreeDetails = ({ route, navigation }: { route: any, navigation: any }) => {
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
      <View style={{ paddingVertical: 12 }}>
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '600', color: COLOR_PALETTE.primary }}>{route.params.name}</Text>
      </View>
      <DetailCard
        header="Suggestions"
        description="Check the tea leaves and scan if you see any odd spots"
      />
      <View style={{ paddingVertical: 12 }}>
        <DetailCard
          header="Condition of Leaves"
          description="Check the tea leaves"
          button={{
            label: 'Rescan Leaves',
            onClick: () => navigation.navigate('Scan'),
            icon: require('../../assets/icons/eco.png')
          }}
        />
        <DetailCard
          header="Condition of Branches"
          button={{
            label: 'Scan Branches',
            onClick: () => null,
            icon: require('../../assets/icons/eco.png')
          }} />
        <DetailCard
          header="Existence of Bugs"
          button={{
            label: 'Scan Bugs',
            onClick: () => null,
            icon: require('../../assets/icons/bug_report.png')
          }}
        />
      </View>
      <View style={{ paddingVertical: 12 }}>
        <Button onClick={() => null} extraStyles={{ backgroundColor: '#AD0000' }} label="Delete Tree" />
      </View>
    </ScrollView>
  );
};

export default TreeDetails;
