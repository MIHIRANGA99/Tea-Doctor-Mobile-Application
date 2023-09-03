import React from "react";
import { View, Text } from "react-native";
import FullScreenLoader from "../layouts/FullScreenLoader";
import Treatments from "./Treatments/Treatments";

type Props = {};

const Settings = (props: Props) => {
  return (
    <FullScreenLoader>
      <Treatments />
    </FullScreenLoader>
  );
};

export default Settings;
