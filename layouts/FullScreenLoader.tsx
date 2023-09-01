import React from "react";
import { Text, View, ScrollView, Image } from "react-native";

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
          justifyContent: "center",
          alignItems: "center",
          display: isLoading ? "flex" : "none",
          position: "absolute",
          zIndex: 40,
        }}
      >
        {imageUri&& <Image
          style={{ borderRadius: 12 }}
          source={{
            uri: "https://images.pexels.com/photos/12448681/pexels-photo-12448681.jpeg",
            height: 200,
            width: 200,
          }}
        />}
        <Text style={{ color: "red", paddingTop: 12 }}>{loadingText}</Text>
      </View>
      {children}
    </ScrollView>
  );
};

export default FullScreenLoader;
