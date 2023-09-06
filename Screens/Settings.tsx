import React from "react";
import { View, Text, ScrollView } from "react-native";
import FullScreenLoader from "../layouts/FullScreenLoader";
import Treatments from "./Treatments/Treatments";
import mainStyles from "../constants/mainStyles";
import Button from "../Components/Button/Button";
import { COLOR_PALETTE } from "../constants/colors";
import { logOutUser } from "../firebase/utils/authentication/authentication";
import Toast from "react-native-root-toast";
import { ToastOptions } from "../constants/ToastOptions";

type Props = {};

const Settings = (props: Props) => {
  return (
    <FullScreenLoader>
      <ScrollView style={{...mainStyles.main, marginTop: 12}}>
      <Button
        label="Log out"
        color={COLOR_PALETTE.error.primary}
        onClick={() =>
          logOutUser()
            .then((res) => Toast.show("Logged Out!", ToastOptions.succsess))
            .catch((err) => {
              Toast.show("Error When Logging Out!", ToastOptions.error);
            })
        }
      />
      </ScrollView>
    </FullScreenLoader>
  );
};

export default Settings;
