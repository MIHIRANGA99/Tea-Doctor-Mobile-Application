import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Camera, CameraCapturedPicture } from "expo-camera";
import * as DocumentPicker from "expo-document-picker";
import mainStyles from "../../constants/mainStyles";
import ScanCam from "../../Components/ScanCam/ScanCam";
import DetailCard from "../../Components/DetailCard/DetailCard";
import { COLOR_PALETTE } from "../../constants/colors";
import Button from "../../Components/Button/Button";
import useCurrentUser from "../../firebase/hooks/useCurrentUser";

const Scan = ({ navigation, route }: any) => {
  const cameraRef = useRef<Camera | null>(null);
  const currentUser = useCurrentUser();

  const [isTakingPicture, setIsTakingPicture] = useState<boolean>(false);
  const [capturedPic, setCapturedPic] = useState<CameraCapturedPicture | null>(null);
  const [selectedPic, setSelectedPic] = useState<any | null>(null);

  useEffect(() => {
    if (capturedPic != null || selectedPic != null) {
      scanPicture();
    }
  }, [capturedPic, selectedPic]);

  const clearPics = () => {
    setCapturedPic(null);
    setSelectedPic(null);
  }

  const scanPicture = () => {
    const payload = new FormData();

    if (currentUser && (capturedPic != null || selectedPic != null)) {
      payload.append('req_type', route.params.scanType);
      capturedPic&& payload.append('file', capturedPic.uri);
      selectedPic&& payload.append('file', selectedPic.uri);
      payload.append('user_Id', currentUser.uid);

      console.log(payload);
    }
  }

  const pickDocument = async () => {
    clearPics();
    let result = await DocumentPicker.getDocumentAsync({});
    setSelectedPic(result);
  };

  const takePicture = async () => {
    clearPics();
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
        <ScanCam
          label={
            route.params.scanType === "blister"
              ? "Scanning Leaves"
              : "Scanning Stem"
          }
          captureLoading={isTakingPicture}
          camRef={cameraRef}
          onCapture={takePicture}
        />
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
        <Button
          onClick={pickDocument}
          label="Select an Image"
          extraStyles={{ width: "40%" }}
        />
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
