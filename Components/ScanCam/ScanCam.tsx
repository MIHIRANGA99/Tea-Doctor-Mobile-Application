import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import CameraStyles from "./CameraStyles";
import Button from "../Button/Button";
import { COLOR_PALETTE } from "../../constants/colors";

type Props = {
  camRef?: any;
  onCapture?: () => void;
  captureLoading?: boolean;
  label: string;
};

const ScanCam = ({
  camRef,
  onCapture,
  captureLoading = false,
  label,
}: Props) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      if (status === "granted") {
        requestPermission();
      }
    })();
  });

  if (!permission) {
    return <Text>Loading...</Text>;
  }

  if (!permission.granted) {
    return <Text>Camera permission not granted</Text>;
  }

  return (
    <>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: -18,
          zIndex: 50,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLOR_PALETTE.primary,
            paddingVertical: 8,
            width: "60%",
            borderRadius: 100,
          }}
        >
          <Image
            style={{ height: 18, width: 18 }}
            source={require("../../assets/icons/eco.png")}
          />
          <Text
            style={{
              textAlign: "center",
              color: COLOR_PALETTE.secondary,
              paddingLeft: 12,
            }}
          >
            {label}
          </Text>
        </View>
      </View>
      <View style={CameraStyles.container}>
        <Camera ref={camRef && camRef} style={CameraStyles.camera} type={type}>
          <View style={CameraStyles.buttonContainer}>
            <View style={{ flex: 1, paddingHorizontal: 8 }}>
              <Button
                disabled={captureLoading}
                label="Flip"
                onClick={() =>
                  setType((current) =>
                    current === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  )
                }
              />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 8 }}>
              <Button
                disabled={captureLoading}
                label={captureLoading ? "Loading..." : "Capture"}
                onClick={onCapture && onCapture}
              />
            </View>
          </View>
        </Camera>
      </View>
    </>
  );
};

export default ScanCam;
