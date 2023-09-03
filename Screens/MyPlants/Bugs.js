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

const Bugs = ({ navigation, route }) => {
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState();

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
      analyzeAudio();
    }
  }, [audioFile]);

  const currentUser = useCurrentUser();
  const currentLocation = useCurrentLocation();

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
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
      setAudioFile(recording);
      console.log("Recording Stopped!");
      toggleTimer();
      setIsRecording(false);
    }
  };

  const analyzeAudio = async () => {
    if (currentUser && currentLocation && audioFile) {
      const formData = new FormData();
      formData.append("req_type", route.params.scanType);
      audioFile &&
        formData.append("file", {
          uri: audioFile._uri,
          name: audioFile._uri.split("/").pop(),
          type: "audio/wav",
        });
      formData.append("user_Id", currentUser.uid);
      formData.append("lang", currentLocation.coords.latitude.toFixed(2));
      formData.append("long", currentLocation.coords.longitude.toFixed(2));

      console.log(audioFile._uri);

      await axios
        .post(`${default_URL}/detection/uproute`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("result", res);
        })
        .catch((e) => {
          console.error("error", e);
          console.error(formData, {
            uri: audioFile._uri,
            name: audioFile._uri.split("/").pop(),
            type: "audio/wav",
          });

          if (e.response) {
            console.log(e.response);
          }
        });
    } else {
      console.log("error with payload");
      console.log("user", currentUser);
      console.log("loc", currentLocation);
      console.log("audio", audioFile);
    }
  };

  return (
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
          height: "70%",
        }}
      >
        <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
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
          paddingVertical: 12,
        }}
      >
        OR
      </Text>
      <View style={{ display: "flex", alignItems: "center" }}>
        {/* TODO: Restrict to choose only audio files */}
        <Button
          onClick={pickDocument}
          label="Select an Audio File"
          extraStyles={{ width: "60%" }}
        />
        {/* TODO: Remove below button after the integration */}
        <Button
          label="test recorded file"
          extraStyles={{ width: "40%", marginVertical: 12 }}
          onClick={() => console.log(audioFile)}
        />
      </View>
    </View>
  );
};

export default Bugs;