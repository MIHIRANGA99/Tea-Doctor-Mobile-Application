import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import CameraStyles from './CameraStyles';
import Button from '../Button/Button';

type Props = {
  camRef?: any;
  onCapture?: () => void;
  captureLoading?: boolean;
  label: string;
}

const ScanCam = ({ camRef, onCapture, captureLoading = false, label }: Props) => {

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      if (status === 'granted') {
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
      <View style={{ display: 'flex', alignItems: 'center', marginBottom: -18, zIndex: 50 }}>
        <Button label={label} extraStyles={{ width: '50%' }} icon={require('../../assets/icons/eco.png')}  disabled />
      </View>
      <View style={CameraStyles.container}>
        <Camera ref={camRef && camRef} style={CameraStyles.camera} type={type}>
          <View style={CameraStyles.buttonContainer}>
            <View style={{ flex: 1, paddingHorizontal: 8 }}>
              <Button disabled = {captureLoading} label='Flip' onClick={() => setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))} />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 8 }}>
              <Button disabled = {captureLoading} label={captureLoading? 'Loading...': 'Capture'} onClick={onCapture&& onCapture} />
            </View>
          </View>
        </Camera>
      </View>
    </>
  )
}

export default ScanCam