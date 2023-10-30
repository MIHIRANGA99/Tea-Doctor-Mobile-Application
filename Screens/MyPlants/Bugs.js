import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import LottieView from "lottie-react-native";
import * as DocumentPicker from "expo-document-picker";
import mainStyles from "../../constants/mainStyles";
import DetailCard from "../../Components/DetailCard/DetailCard";
import { COLOR_PALETTE } from "../../constants/colors";
import Button from "../../Components/Button/Button";
import useCurrentUser from "../../firebase/hooks/useCurrentUser";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import axios from "axios";
import { default_URL } from "../../constants/url";
import FullScreenLoader from "../../layouts/FullScreenLoader";
import Toast from "react-native-root-toast";
import { ToastOptions } from "../../constants/ToastOptions";

const Bugs = ({ navigation, route }) => {
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState();
  const [pickedAudioFile, setPickedAudioFile] = useState();
  const [isLoading, setIsLoading] = useState({
    isLoading: false,
    status: "",
    image: "",
  });

  const [detectedData, setDetectedData] = useState(null);

  const [isRunning, setIsRunning] = useState(false);
  const timerDate = new Date();
  timerDate.setMinutes(0);
  timerDate.setSeconds(0);
  timerDate.setMilliseconds(0);
  const [timer, setTimer] = useState(timerDate);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTimer((prevTime) => {
          const date = new Date(prevTime);
          date.setSeconds(prevTime.getSeconds() + 1);
          return date;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  useEffect(() => {
    setAudioFile(undefined);
    if (audioFile) {
      setIsLoading({
        isLoading: true,
        status: "Scanning Recorded Audio",
      });
      analyzeAudio();
    }

    setPickedAudioFile(undefined);
    if (pickedAudioFile) {
      setIsLoading({
        isLoading: true,
        status: "Scanning Picked Audio",
      });
      analyzeAudio();
    }
  }, [audioFile, pickedAudioFile]);

  const currentUser = useCurrentUser();
  const currentLocation = useCurrentLocation();

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setPickedAudioFile(result);
  };

  const toggleTimer = () => {
    setIsRunning((prevState) => !prevState);
  };

  const resetTimer = () => {
    const timerDate = new Date();
    timerDate.setMinutes(0);
    timerDate.setSeconds(0);
    timerDate.setMilliseconds(0);

    setTimer(timerDate);
    setIsRunning(false);
  };

  const startRecording = async () => {
    resetTimer();
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recordingOptions = {
        android: {
          extension: ".wav",
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT, // Change the encoder if needed
          sampleRate: 22050, // Lower sample rate to reduce file size
          numberOfChannels: 1, // Use mono recording if stereo is not necessary
          bitRate: 64000, // Lower bit rate to reduce file size
          linearPCMBitDepth: 16, // Keep the same
          linearPCMIsBigEndian: false, // Keep the same
          linearPCMIsFloat: false, // Keep the same
        },
        ios: {
          extension: ".wav",
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
          sampleRate: 44100, // Keep the same
          numberOfChannels: 2, // Keep the same
          bitRate: 128000, // Keep the same
          linearPCMBitDepth: 16, // Keep the same
          linearPCMIsBigEndian: false, // Keep the same
          linearPCMIsFloat: false, // Keep the same
        },
      };

      toggleTimer();
      setIsRecording(true);
      const recordingObject = new Audio.Recording();
      await recordingObject.prepareToRecordAsync(recordingOptions);
      await recordingObject.startAsync();
      setRecording(recordingObject);
      console.log("obj", recordingObject);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording..");
    setRecording(undefined);
    if (recording) {
      await recording.stopAndUnloadAsync();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      // setAudioFile(recording);
      console.log("Recording Stopped!");
      toggleTimer();
      setIsRecording(false);
    }
  };

  const analyzeAudio = async () => {
    setIsLoading({
      isLoading: true,
      status: "Analyzing Audio",
    });
    if (currentUser && currentLocation && (audioFile || pickedAudioFile)) {
      const formData = new FormData();
      formData.append("req_type", route.params.scanType);
      audioFile &&
        formData.append("file", {
          uri: audioFile._uri,
          name: audioFile._uri.split("/").pop(),
          type: "audio/wav",
        });
      pickedAudioFile &&
        formData.append("file", {
          uri: pickedAudioFile.uri,
          name: pickedAudioFile.uri.split("/").pop(),
          type: "audio/wav",
        });
      formData.append("user_Id", currentUser.uid);
      formData.append("lang", currentLocation.coords.latitude.toFixed(2));
      formData.append("long", currentLocation.coords.longitude.toFixed(2));

      await axios
        .post(`http://18.183.148.238:8091/detection/uproute`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setDetectedData(res.data);
          setIsLoading({
            isLoading: false,
            status: "",
          });
        })
        .catch((e) => {
          setDetectedData(e)
          setIsLoading({
            isLoading: false,
            status: "",
          });
          if (e.response) {
            console.log(e.response);
          }
        });
    } else {
      setIsLoading({
        isLoading: false,
        status: "",
      });
      console.log("error with payload");
      console.log("user", currentUser);
      console.log("loc", currentLocation);
      console.log("audio", audioFile);
    }
  };

  const handleNext = () => {
    Toast.show("Successfully Updated!", ToastOptions.succsess);
    navigation.navigate("Treatments", {
      percentage: 5,
      scanType: 'insect',
    });
  };

  return (
    <FullScreenLoader
      isLoading={isLoading.isLoading}
      loadingText={isLoading.status}
    >
      <View
        style={{ ...mainStyles.main, display: "flex", flexDirection: "column" }}
      >
        <View style={{ paddingVertical: 12 }}>
          <DetailCard header="Suggestions" description="sample suggestion" />
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60%",
          }}
        >
          <TouchableOpacity
            onPress={recording ? stopRecording : startRecording}
          >
            <LottieView
              style={{ width: 200, height: 200 }}
              source={require("../../assets/lotties/record.json")}
              autoPlay
              loop
            />
          </TouchableOpacity>

          <Text style={{ color: COLOR_PALETTE.primary, fontWeight: "800" }}>
            {timer.getMinutes()} : {timer.getSeconds()}
          </Text>
        </View>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "700",
            color: COLOR_PALETTE.primary,
            paddingBottom: 12,
          }}
        >
          OR
        </Text>
        <View
          style={{ display: "flex", alignItems: "center", paddingBottom: 24 }}
        >
          {/* TODO: Restrict to choose only audio files */}
          <Button
            onClick={pickDocument}
            label="ශබ්ද පටයක් තෝරාගන්න"
            extraStyles={{ width: "60%" }}
          />
        </View>
        <View style={{ paddingVertical: 12 }}>
          {detectedData&& <DetailCard
            header={ "කඳ ගුල්ලා!" }
            description={`කඳ ගුල්ලන් හඳුනාගත්තා`}
            error
            button={{ label: "Next", onClick: () => handleNext() }}
          />}
        </View>
      </View>
    </FullScreenLoader>
  );
};

export default Bugs;
