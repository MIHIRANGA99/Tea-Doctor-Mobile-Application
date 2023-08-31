import React, { useState } from "react";
import { View, Text } from "react-native";
import mainStyles from "../../constants/mainStyles";
import TextField from "../../Components/TextField/TextField";
import Button from "../../Components/Button/Button";
import { createData } from "../../firebase/utils/firestore/firestore";
import useCurrentUser from "../../firebase/hooks/useCurrentUser";
import ITree from "../../interfaces/ITree";
import useCurrentLocation from "../../hooks/useCurrentLocation";

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
        condition: [],
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
          navigation.pop();
        },
        (error) => {
          setIsLoading(false);
          console.error(error);
        }
      );
    } else {
      // TODO: add an alert message here
      console.log("Please fill required fields");
    }
  };
  return (
    <View style={{ ...mainStyles.main, marginTop: 20 }}>
      <TextField
        onChange={(text) => setName(text)}
        placeholder="Give a name to your tree"
        label="Tree Name"
        dense
      />
      <TextField
        onChange={(text) => setAge(Number(text))}
        placeholder="Age of your tree"
        label="Age"
        type="number-pad"
        dense
      />
      <View style={{ display: "flex", alignItems: "flex-end" }}>
        <Button
          onClick={() => handleAddTree()}
          isLoading={isLoading}
          label="Submit"
          extraStyles={{ marginVertical: 12, width: "40%" }}
        />
      </View>
    </View>
  );
};

export default AddTree;
