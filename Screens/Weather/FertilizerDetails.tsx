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
    <View style={{ ...mainStyles.main, paddingTop: 24 }}>
      <TextField label="Nitrogen Level" dense />
      <TextField label="Phosphorous Level" dense />
      <TextField label="Potassium Level" dense />
      <TextField label="PH Value" dense />
      <TextField
        disabled
        value={data && data.weatherCondition}
        label="Weather Condition"
        dense
      />
      <TextField
        disabled
        value={data && data.rainfall}
        label="Rainfall"
        dense
      />
      <TextField
        disabled
        value={data && data.temperature}
        label="Temperature"
        dense
      />
      <TextField
        disabled
        value={data && data.humidity}
        label="Humidity"
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
            backgroundColor: 'rgba(244, 244, 224, 0.6)',
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
              Fertilizer Recommendation Details
            </Text>
            <View style={{paddingVertical: 12}}>
                <Text>Fertilizer Type: U709</Text>
                <Text>Fertilizer Amount: 125 kg</Text>
            </View>
            <Button onClick={() => setOpen(false)} label="ok" extraStyles={{marginTop: 12}} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FertilizerDetails;
