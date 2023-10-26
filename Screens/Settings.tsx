import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import FullScreenLoader from "../layouts/FullScreenLoader";
import { Picker } from "@react-native-picker/picker";
import Treatments from "./Treatments/Treatments";
import mainStyles from "../constants/mainStyles";
import Button from "../Components/Button/Button";
import { COLOR_PALETTE } from "../constants/colors";
import { logOutUser } from "../firebase/utils/authentication/authentication";
import Toast from "react-native-root-toast";
import { ToastOptions } from "../constants/ToastOptions";
import { LANGUAGES } from "../constants/languages";
import { useLanguageContext } from "../Context/LanguageContext";

type Props = {};

const Settings = (props: Props) => {

  const { state, dispatch } = useLanguageContext();
  const [language, setLanguage] = useState<string>(state.language);

  const changeLanguage = () => {
    dispatch({type: 'CHANGE_LANGUAGE', payload: language});
  }

  useEffect(() => {
    changeLanguage();
  }, [language])

  return (
    <FullScreenLoader>
      <ScrollView style={{...mainStyles.main, marginTop: 12}}>
      <View style={{paddingVertical: 12}}>
      <Text style={{fontWeight: '700', color: COLOR_PALETTE.primary, paddingLeft: 8}}>Select Language</Text>
      <Picker
        itemStyle={{backgroundColor: 'red'}}
        selectedValue={language}
        onValueChange={(itemValue) => {setLanguage(itemValue)}}
      >
        {LANGUAGES.map((language, index) => (
          <Picker.Item key={index} label={language} value={language} />
        ))}
      </Picker>
      </View>
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
