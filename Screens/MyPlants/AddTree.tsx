import React, { useState } from "react";
import { View, Text } from "react-native";
import mainStyles from "../../constants/mainStyles";
import TextField from "../../Components/TextField/TextField";
import Button from "../../Components/Button/Button";
import { createData } from "../../firebase/utils/firestore/firestore";
import useCurrentUser from "../../firebase/hooks/useCurrentUser";
import ITree from "../../interfaces/ITree";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import Toast from "react-native-root-toast";
import { ToastOptions } from "../../constants/ToastOptions";

const AddTree = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentUser = useCurrentUser();
  const currentLocation = useCurrentLocation();

  const handleAddTree = () => {
    if (currentUser && currentLocation && name && age) {
      const payload: ITree = {
        treeName: name,
        treeAge: age,
        conditions: {
          leaves: {},
          bugs: {},
          stemAndBranches: {},
        },
        location: {
          lat: currentLocation.coords.latitude,
          long: currentLocation.coords.latitude,
        },
      };

      setIsLoading(true);
      createData(
        currentUser.uid,
        payload,
        (res) => {
          setIsLoading(false);
          Toast.show('සාර්ථකයි!', ToastOptions.succsess);
          navigation.pop();
        },
        (error: any) => {
          setIsLoading(false);
          console.error(error);
          if (error.message) {
            Toast.show(error.message, ToastOptions.error);
          }
        }
      );
    } else {
      Toast.show('Please Fill Required Fields', ToastOptions.error);
    }
  };
  return (
    <View style={{ ...mainStyles.main, marginTop: 20 }}>
      <TextField
        onChange={(text) => setName(text)}
        placeholder="ගසට නමක් ලබා දෙන්න"
        label="ගසේ නම"
        maxLength={20}
        dense
      />
      <TextField
        onChange={(text) => setAge(Number(text))}
        placeholder="ගසේ වයස ඇතුලත් කරන්න"
        label="වයස"
        type="number-pad"
        maxLength={3}
        dense
      />
      <View style={{ display: "flex", alignItems: "flex-end" }}>
        <Button
          onClick={() => handleAddTree()}
          isLoading={isLoading}
          label="ඇතුල් කරන්න"
          extraStyles={{ marginVertical: 12, width: "40%" }}
        />
      </View>
    </View>
  );
};

export default AddTree;
