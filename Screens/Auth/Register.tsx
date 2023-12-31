import React, { useState } from "react";
import { View, Image, ScrollView, Text, ToastAndroid } from "react-native";
import mainStyles from "../../constants/mainStyles";
import TextField from "../../Components/TextField/TextField";
import Button from "../../Components/Button/Button";
import { Link } from "@react-navigation/native";
import { COLOR_PALETTE } from "../../constants/colors";
import { registerUser } from "../../firebase/utils/authentication/authentication";
import Toast from "react-native-root-toast";
import { ToastOptions } from "../../constants/ToastOptions";

const Register = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setIsLoading(true);
    if (email === "" || password === "") {
      Toast.show("Please Fill Required Fields!", ToastOptions.error);
      setIsLoading(false);
    } else if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      Toast.show("Please Enter a valid email!", ToastOptions.error);
      setIsLoading(false);
    } else if (password != confPassword) {
      Toast.show("Passwords are Not Matching!", ToastOptions.error);
      setIsLoading(false);
    } else {
      const res = await registerUser(username, email, password);

      if (res.isSuccess) {
        setIsLoading(false);
        navigation.navigate("Main");
      } else {
        setIsLoading(false);
        // TODO: Add Alert Message
        Toast.show(res.response.message, ToastOptions.error);
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
        <View>
          <TextField
            onChange={(text) => setUsername(text)}
            dense
            placeholder="Your Name Here"
            label="Username"
          />
          <TextField
            onChange={(text) => setEmail(text)}
            dense
            placeholder="Your Email Here"
            label="E - main Address"
          />
          <TextField
            isPassword
            onChange={(text) => setPassword(text)}
            dense
            placeholder="Enter Password"
            label="Password"
          />
          <TextField
            isPassword
            onChange={(text) => setConfPassword(text)}
            dense
            placeholder="Confirm Password"
            label="Confirm Password"
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
                label="Register"
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
          Already Have an Account?{" "}
          <Link to="/Login">
            <Text style={{ color: COLOR_PALETTE.primary }}>Sign In</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default Register;
