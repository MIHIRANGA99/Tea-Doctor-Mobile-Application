import React from "react";
import { View, Text } from "react-native";
import FullScreenLoader from "../layouts/FullScreenLoader";

type Props = {};

const Settings = (props: Props) => {
  return (
    <FullScreenLoader isLoading>
      <View style={{height: 300}}>
        <Text>Settings</Text>
      </View>
    </FullScreenLoader>
  );
};

export default Settings;
