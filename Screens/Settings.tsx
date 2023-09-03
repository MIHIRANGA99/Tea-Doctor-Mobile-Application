import React from "react";
import { View, Text } from "react-native";
import FullScreenLoader from "../layouts/FullScreenLoader";
import Treatments from "./Treatments/Treatments";
import mainStyles from "../constants/mainStyles";

type Props = {};

const Settings = (props: Props) => {
  return (
    <FullScreenLoader isLoading>
      <Text style={mainStyles.main}>Settings</Text>
    </FullScreenLoader>
  );
};

export default Settings;
