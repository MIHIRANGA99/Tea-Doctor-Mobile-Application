import React, { useEffect, useState } from "react";
import { View, Text, Modal } from "react-native";
import mainStyles from "../../constants/mainStyles";
import TextField from "../../Components/TextField/TextField";
import Button from "../../Components/Button/Button";
import { IFertilizerDetails } from "../../interfaces/IFertilizerDetails";
import { COLOR_PALETTE } from "../../constants/colors";

const FertilizerDetails = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [data, setData] = useState<IFertilizerDetails>();
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    // if (route.params.data) {
    //   setData(route.params.data);
    // }
  }, []);
  return (
    <View style={{ ...mainStyles.main, paddingTop: 100 }}>
      <TextField label="නයිට්රජන් මට්ටම" dense />
      <TextField label="පොස්පරස් මට්ටම" dense />
      <TextField label="පොටෑසියම් මට්ටම" dense />
      <TextField label="PH අගය" dense />
      <TextField
        disabled
        value={data && data.weatherCondition}
        label="කාලගුණ තත්ත්වය"
        dense
      />
      <TextField
        disabled
        value={data && data.rainfall}
        label="වර්ෂාපතනය"
        dense
      />
      <TextField
        disabled
        value={data && data.temperature}
        label="උෂ්ණත්වය"
        dense
      />
      <TextField
        disabled
        value={data && data.humidity}
        label="ආර්ද්රතාවය"
        dense
      />
      <View style={{ display: "flex", alignItems: "flex-end" }}>
        <Button
          onClick={() => setOpen(true)}
          label="Submit"
          extraStyles={{ width: "40%", marginTop: 12 }}
        />
      </View>
      <Modal
        animationType="fade"
        visible={open}
        onTouchCancel={() => setOpen(false)}
        transparent
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(244, 244, 224, 0.6)",
            height: "100%",
          }}
        >
          <View
            style={{ backgroundColor: "white", padding: 12, borderRadius: 12 }}
          >
            <Text
              style={{
                color: COLOR_PALETTE.primary,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              පොහොර නිර්දේශ විස්තර
            </Text>
            <View style={{ paddingVertical: 12 }}>
              <Text>පොහොර වර්ගය: U709</Text>
              <Text>පොහොර ප්‍රමාණය: 125 kg</Text>
            </View>
            <Button
              onClick={() => setOpen(false)}
              label="හරි"
              extraStyles={{ marginTop: 12 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FertilizerDetails;
