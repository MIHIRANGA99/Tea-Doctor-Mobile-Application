import React, { useEffect, useState } from "react";
import { View, Image, ScrollView, Text, ToastAndroid } from "react-native";
import mainStyles from "../../constants/mainStyles";
import TextField from "../../Components/TextField/TextField";
import Button from "../../Components/Button/Button";
import { Link } from "@react-navigation/native";
import { COLOR_PALETTE } from "../../constants/colors";
import { loginUser } from "../../firebase/utils/authentication/authentication";
import { auth } from "../../firebase/config";
import Toast from "react-native-root-toast";
import { ToastOptions } from "../../constants/ToastOptions";

const Login = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Main");
      } else {
        // TODO: Move to login page
        console.log("logged out");
      }
    });
  }, [navigation]);

  const onSubmit = async () => {
    setIsLoading(true);

    if (email === '' || password === '') {
      Toast.show('Please Fill Required Fields!', ToastOptions.error);
      setIsLoading(false);
    } else if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      Toast.show('Please Enter a valid email!', ToastOptions.error);
      setIsLoading(false);
    } 
    else {
      const res = await loginUser(email, password);
      if (res.isSuccess) {
        setIsLoading(false);
        navigation.navigate("Main");
      } else {
        setIsLoading(false);
        ToastAndroid.show(res.response.message, ToastAndroid.SHORT);
      }
    }
  };

  return (
    <View style={mainStyles.main}>
      <ScrollView>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: "80%", resizeMode: "contain" }}
            source={require("../../assets/tea-doctor-logo.png")}
          />
        </View>
        <View style={{ paddingVertical: 20 }}>
          <TextField
            type="email-address"
            onChange={(text) => setEmail(text)}
            dense
            placeholder="ඔබගේ විද්‍යුත් තැපෑල මෙහි ඇතුලත් කරන්න"
            label="විද්‍යුත් තැපෑල / දුරකථන අංකය"
          />
          <TextField
            onChange={(text) => setPassword(text)}
            dense
            placeholder="ඔබගේ මුරපදය මෙහි ඇතුලත් කරන්න"
            label="මුරපදය"
            isPassword
          />
          <View
            style={{
              display: "flex",
              width: "100%",
              alignItems: "flex-end",
              paddingVertical: 8,
            }}
          >
            <View style={{ width: "40%" }}>
              <Button
                isLoading={isLoading}
                onClick={() => onSubmit()}
                label="ඇතුල් වන්න"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 24,
          right: 12,
          backgroundColor: COLOR_PALETTE.secondary,
          width: "100%",
        }}
      >
        <Text>
          ඔබට ගිණුමක් නොමැතිද?{" "}
          <Link to="/Register">
            <Text style={{ color: COLOR_PALETTE.primary }}>
              ලියාපදිංචි වෙන්න
            </Text>
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default Login;
