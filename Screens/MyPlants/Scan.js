import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import mainStyles from "../../constants/mainStyles";
import ScanCam from "../../Components/ScanCam/ScanCam";
import DetailCard from "../../Components/DetailCard/DetailCard";
import { COLOR_PALETTE } from "../../constants/colors";
import Button from "../../Components/Button/Button";
import useCurrentUser from "../../firebase/hooks/useCurrentUser";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import { detectTreeLevel } from "../../utils/detectTreeLevel";
import FullScreenLoader from "../../layouts/FullScreenLoader";

const Scan = ({ navigation, route }) => {
  const cameraRef = useRef(null);
  const currentUser = useCurrentUser();
  const currentLocation = useCurrentLocation();

  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [capturedPic, setCapturedPic] = useState(null);
  const [selectedPic, setSelectedPic] = useState(null);

  const [detectedData, setDetectedData] = useState(null);

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
      setIsLoading(true);
      const formData = new FormData();
      formData.append("lang", currentLocation.coords.latitude.toFixed(2));
      formData.append("long", currentLocation.coords.longitude.toFixed(2));
      formData.append("user_Id", currentUser.uid);
      capturedPic &&
        formData.append("file", {
          uri: capturedPic.uri,
          name: capturedPic.uri.split("/").pop(),
          type: "image/jpeg",
        });
      selectedPic &&
        formData.append("file", {
          uri: selectedPic.uri,
          name: selectedPic.name,
          type: "image/jpeg",
        });
      formData.append("req_type", route.params.scanType);

      await axios
        .post("http://3.112.233.148:8091/detection/uproute", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setDetectedData(res.data);
          setIsLoading(false);
        })
        .catch((e) => {
          // TODO: Display Alert Message
          console.error("error", e.response.data);
          setIsLoading(false);
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
    <FullScreenLoader isLoading = {isLoading} loadingText='Processing...' imageUri={capturedPic&& capturedPic.uri}>
      <View style={mainStyles.main}>
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
        {detectedData && (
          <View style={{ paddingVertical: 12 }}>
            <DetailCard
              header={detectTreeLevel(detectedData.data.label).heading}
              description={detectTreeLevel(detectedData.data.label).description}
              button={
                detectedData.data.label === "healthy"
                  ? null
                  : { label: "Next", onClick: () => null }
              }
            />
          </View>
        )}
      </View>
    </FullScreenLoader>
  );
};

export default Scan;
