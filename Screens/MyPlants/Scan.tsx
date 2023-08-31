import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import axios from "axios";
import { Camera, CameraCapturedPicture } from "expo-camera";
import * as DocumentPicker from "expo-document-picker";
import mainStyles from "../../constants/mainStyles";
import ScanCam from "../../Components/ScanCam/ScanCam";
import DetailCard from "../../Components/DetailCard/DetailCard";
import { COLOR_PALETTE } from "../../constants/colors";
import Button from "../../Components/Button/Button";
import useCurrentUser from "../../firebase/hooks/useCurrentUser";
import useCurrentLocation from "../../hooks/useCurrentLocation";

const Scan = ({ navigation, route }: any) => {
  const cameraRef = useRef<Camera | null>(null);
  const currentUser = useCurrentUser();
  const currentLocation = useCurrentLocation();

  const [isTakingPicture, setIsTakingPicture] = useState<boolean>(false);
  const [capturedPic, setCapturedPic] = useState<CameraCapturedPicture | null>(
    null
  );
  const [selectedPic, setSelectedPic] = useState<any | null>(null);

  useEffect(() => {
    setCapturedPic(null);
    setSelectedPic(null);

    if (capturedPic != null || selectedPic != null) {
      scanPicture();
    }
  }, [capturedPic, selectedPic]);

  const clearPics = () => {
    setCapturedPic(null);
    setSelectedPic(null);
  };

  const scanPicture = async () => {
    if (
      currentUser &&
      currentLocation &&
      (capturedPic != null || selectedPic != null)
    ) {
      const imageBlob = await fetch(capturedPic ? capturedPic.uri : "").then(
        (response) => response.blob()
      );

      const payload = new FormData();
      payload.append("req_type", route.params.scanType);
      capturedPic != null && payload.append("file", capturedPic.uri);
      // selectedPic != null && payload.append("file", selectedPic.uri, selectedPic.name);
      payload.append("user_Id", imageBlob, "image.jpg");
      payload.append("lang", currentLocation.coords.latitude.toFixed(2));
      payload.append("long", currentLocation.coords.longitude.toFixed(2));

      await axios
        .post("http://3.112.233.148:8091/detection/uproute", payload)
        .then((res) => {
          console.log("result", res);
        })
        .catch((e) => {
          console.error("error", e);
        });
    } else {
      console.log(
        "error with payload",
        currentUser,
        currentLocation,
        capturedPic,
        selectedPic
      );
    }
  };

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
        {currentLocation && (
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
        )}
      </View>
      <Text>{capturedPic ? capturedPic.uri : ""}</Text>
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
