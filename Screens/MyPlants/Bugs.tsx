import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import mainStyles from "../../constants/mainStyles";
import DetailCard from "../../Components/DetailCard/DetailCard";
import { COLOR_PALETTE } from "../../constants/colors";
import Button from "../../Components/Button/Button";
import useCurrentUser from "../../firebase/hooks/useCurrentUser";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import axios from "axios";

const Bugs = ({ navigation, route }: { navigation: any; route: any }) => {
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState<Audio.Recording | undefined>();

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

  const startRecording = async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      setIsRecording(true);
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
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
      setIsRecording(false);
    }
  };

  const analyzeAudio = async () => {
    if (currentUser && currentLocation && audioFile) {
      const payload = new FormData();
      payload.append("req_type", route.params.scanType);
      payload.append("file", String(audioFile._uri));
      payload.append("user_Id", currentUser.uid);
      payload.append("lang", currentLocation.coords.latitude.toFixed(2));
      payload.append("long", currentLocation.coords.longitude.toFixed(2));

      console.log(payload);

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
        audioFile
      );
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
          {/* TODO: Add lottie or record image here */}
          <Text>{isRecording ? "Stop Recording" : "Record Sound"}</Text>
        </TouchableOpacity>
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
