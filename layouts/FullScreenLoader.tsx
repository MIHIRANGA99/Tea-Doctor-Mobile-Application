import React from "react";
import { Text, View, ScrollView, Image } from "react-native";
import LottieView from "lottie-react-native";
import { COLOR_PALETTE } from "../constants/colors";

type Props = {
  isLoading?: boolean;
  children: React.ReactNode;
  loadingText?: string;
  imageUri?: string;
};

const FullScreenLoader = ({
  children,
  isLoading = false,
  loadingText = "Loading...",
  imageUri,
}: Props) => {
  return (
    <ScrollView>
      <View
        style={{
          height: "110%",
          width: "100%",
          backgroundColor: "rgba(244, 244, 224, 0.9)",
          justifyContent: "center",
          alignItems: "center",
          display: isLoading ? "flex" : "none",
          position: "absolute",
          zIndex: 40,
        }}
      >
        {imageUri && (
          <View>
            <Image
              style={{ borderRadius: 12, position: "relative" }}
              source={{
                uri: imageUri,
                height: 200,
                width: 200,
              }}
            />
            <LottieView
              source={require("../assets/lotties/loader.json")}
              style={{ position: "absolute" }}
              autoPlay
              loop
            />
          </View>
        )}
        <View
          style={{
            display: imageUri ? "none" : "flex",
            width: "100%",
            height: "100%",
            marginBottom: 30,
            position: "absolute",
            bottom: 0,
            top: 0,
            right: 0,
            left: 0,
          }}
        >
          <LottieView
            source={require("../assets/lotties/loader.json")}
            autoPlay
            loop
          />
        </View>
        <Text
          style={{
            color: COLOR_PALETTE.secondary,
            backgroundColor: COLOR_PALETTE.primary,
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
            marginTop: 8,
            position: "absolute",
            bottom: 20,
          }}
        >
          {loadingText}
        </Text>
      </View>
      {children}
    </ScrollView>
  );
};

export default FullScreenLoader;
