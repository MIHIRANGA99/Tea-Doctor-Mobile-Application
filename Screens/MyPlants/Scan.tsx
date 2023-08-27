import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Camera } from 'expo-camera';
import * as DocumentPicker from 'expo-document-picker';
import mainStyles from "../../constants/mainStyles";
import ScanCam from "../../Components/ScanCam/ScanCam";
import DetailCard from "../../Components/DetailCard/DetailCard";
import { COLOR_PALETTE } from "../../constants/colors";
import Button from "../../Components/Button/Button";

type Props = {};

const Scan = (props: Props) => {
  const cameraRef = useRef<Camera | null>(null);

  const [isTakingPicture, setIsTakingPicture] = useState<boolean>(false);
  const [capturedPic, setCapturedPic] = useState<object | null>(null);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setCapturedPic(result);
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      setIsTakingPicture(true);
      const photo = await cameraRef.current.takePictureAsync();
      setIsTakingPicture(false);
      
      setCapturedPic(photo);
    }
  };

  return (
    <ScrollView style={mainStyles.main}>
      <View style={{ paddingVertical: 12 }}>
        <DetailCard header="Suggestions" description="sample suggestion" />
      </View>
      <View style={{ height: 412 }}>
        <ScanCam captureLoading = {isTakingPicture} camRef={cameraRef} onCapture={takePicture} />
      </View>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "700",
          color: COLOR_PALETTE.primary,
          paddingVertical: 12,
        }}
      >
        OR
      </Text>
      <View style={{ display: "flex", alignItems: "center" }}>
        <Button onClick={pickDocument} label="Select an Image" extraStyles={{ width: "40%" }} />
      </View>
      <View style={{ paddingVertical: 12 }}>
        <DetailCard
          header="Normal"
          description="Sample Description"
          button={{ label: "Next", onClick: () => null }}
        />
      </View>
    </ScrollView>
  );
};

export default Scan;
