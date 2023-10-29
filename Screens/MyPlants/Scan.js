import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import axios from "axios";
import mainStyles from "../../constants/mainStyles";
import ScanCam from "../../Components/ScanCam/ScanCam";
import DetailCard from "../../Components/DetailCard/DetailCard";
import useCurrentUser from "../../firebase/hooks/useCurrentUser";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import { detectTreeLevel } from "../../utils/detectTreeLevel";
import FullScreenLoader from "../../layouts/FullScreenLoader";
import { updateFromCollection } from "../../firebase/utils/firestore/firestore";
import { default_URL } from "../../constants/url";
import Toast from "react-native-root-toast";
import { ToastOptions } from "../../constants/ToastOptions";

const Scan = ({ navigation, route }) => {
  const cameraRef = useRef(null);
  const currentUser = useCurrentUser();
  const currentLocation = useCurrentLocation();

  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [isLoading, setIsLoading] = useState({
    isLoading: false,
    status: "",
    image: "",
  });
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
      setIsLoading({
        isLoading: true,
        status: "Scanning Picture",
        image: capturedPic.uri,
      });
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

      setIsLoading({
        isLoading: true,
        status: "Preparing Data",
        image: capturedPic.uri,
      });

      // ACTUAL GETTING DATA FROM API
      // await axios
      //   .post(`${default_URL}/detection/uproute`, formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   })
      //   .then((res) => {
      //     setDetectedData(res.data);
      //     setIsLoading({ isLoading: false, status: "", image: "" });
      //   })
      //   .catch((e) => {
      //     Toast.show(e.response.data, ToastOptions.error);
      //     setIsLoading(false);
      //   });

      // Bister Blight ( TODO: Change the time duration and detected data as you want )
      setTimeout(() => {
        setDetectedData({
          data: {
            label: 'blister',
            ratio: "22.98%",
            score: 0.45,
            updatedAt: new Date(),
          }
        });
        setIsLoading({ isLoading: false, status: "", image: "" });
      }, 1000);


    } else {
      console.error(
        "error with payload",
        currentUser,
        currentLocation,
        capturedPic,
        selectedPic
      );
    }
  };

  const handleNext = () => {
    setIsLoading({ isLoading: true, status: "Updating Tree" });
    const diseaseData =
      route.params.scanType === "blister"
        ? {
            leaves: {
              blisterBlight: true,
              damageRatio: detectedData.data.ratio,
              score: detectedData.data.score,
              updatedAt: detectedData.data.updatedAt,
            },
          }
        : {
            stemAndBranches: {
              stemCanker: detectedData.data.label === "stem_cancer",
              barkCanker: detectedData.data.label === "bark_cancer",
              damageRatio: detectedData.data.ratio,
              score: detectedData.data.score,
              updatedAt: detectedData.data.updatedAt,
            },
          };

    const payload = {
      treeName: route.params.tree.treeName,
      treeAge: route.params.tree.treeAge,
      location: {
        lat: currentLocation.coords.latitude,
        long: currentLocation.coords.longitude,
      },
      conditions: route.params.tree.conditions,
    };

    route.params.scanType === "blister"
      ? (payload.conditions.leaves = diseaseData.leaves)
      : (payload.conditions.stemAndBranches = diseaseData.stemAndBranches);

    //  ACTUAL CODE

    updateFromCollection(
      currentUser.uid,
      payload,
      route.params.tree.id,
      (res) => {
        Toast.show("Successfully Updated", ToastOptions.succsess);
        setIsLoading({ isLoading: false, status: "" });
        navigation.navigate("Treatments", {
          percentage:
            route.params.scanType === "blister"
              ? (payload.conditions.leaves =
                  diseaseData.leaves.damageRatio.split("%")[0])
              : (payload.conditions.stemAndBranches =
                  diseaseData.stemAndBranches.damageRatio.split("%")[0]),
          scanType: route.params.scanType,
        });
      },
      (error) => {
        Toast.show(error.message, ToastOptions.error);
        setIsLoading({ isLoading: false, status: "" });
      }
    );

    // BLISTER BLIGHT
    navigation.navigate("Treatments", {
      percentage: 22.98,
      scanType: 'blister',
    });
  };

  // const pickDocument = async () => {
  //   clearPics();
  //   let result = await DocumentPicker.getDocumentAsync({});
  //   setSelectedPic(result);
  // };

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
    <FullScreenLoader
      isLoading={isLoading.isLoading}
      loadingText={isLoading.status}
      imageUri={isLoading.image}
    >
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
        {/* IMAGE PICKER COMMENTED */}
        {/* <Text
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
        </View> */}

        {/* BISTER BLIGHT HEALTHY */}
        {/* {detectedData && (
          <View style={{ paddingVertical: 12 }}>
            <DetailCard
              header={"Healthy"}
              description={"No blister blight detected"}
            />
          </View>
        )} */}

        {/* BISTER BLIGHT NOT HEALTHY TODO: ADD SOMETHING MEANING FULL FOR THE DESCRIPTION */}
        {detectedData && (
          <View style={{ paddingVertical: 12 }}>
            <DetailCard
              header={"Blister Blight Detected!"}
              description={"Blister Blight Detected detected"}
              button={{label: 'Next', onClick: () => handleNext()}}
              error
            />
          </View>
        )}
      </View>
    </FullScreenLoader>
  );
};

export default Scan;
