import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
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
  const [n, setN] = useState<number>();
  const [p, setP] = useState<number>();
  const [k, setK] = useState<number>();
  const [selectedType, setSelectedType] = useState<string>("");

  const TYPES = ['Nursery', 'Immature1', 'Immature2', 'Immature3', 'Mature']

  useEffect(() => {
    console.log(route.params);
    if (route.params.data) {
      setData(route.params.data);
    }
  }, [route.params]);

  return (
    <View style={{ ...mainStyles.main, paddingTop: 48 }}>
      <Text style={{fontWeight: '700', color: COLOR_PALETTE.primary, paddingLeft: 8}}>Plant Type</Text>
      <Picker
        itemStyle={{backgroundColor: 'red'}}
        selectedValue={selectedType}
        onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}
      >
        {TYPES.map((type, index) => (
          <Picker.Item key={index} label={type} value={type} />
        ))}
      </Picker>
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
        value={data && String(data.rainfall)}
        label="Rainfall"
        dense
      />
      <TextField
        disabled
        value={data && String(data.temperature)}
        label="Temperature"
        dense
      />
      <TextField
        disabled
        value={data && String(data.humidity)}
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
              Fertilizer Recommendation Details
            </Text>
            <View style={{ paddingVertical: 12 }}>
              <Text>Fertilizer Type: Dolomite</Text>
              <Text>Fertilizer Amount: 1000 kg</Text>
            </View>
            <Button
              onClick={() => setOpen(false)}
              label="ok"
              extraStyles={{ marginTop: 12 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FertilizerDetails;
