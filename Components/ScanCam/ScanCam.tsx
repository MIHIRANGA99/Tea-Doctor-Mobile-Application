import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import CameraStyles from './CameraStyles';
import Button from '../Button/Button';

type Props = {
  camRef?: any;
}

const ScanCam = ({ camRef }: Props) => {

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
        <Button label='Scanning Leaves' extraStyles={{ width: '50%' }} icon={require('../../assets/icons/eco.png')} />
      </View>
      <View style={CameraStyles.container}>
        <Camera ref={camRef && camRef} style={CameraStyles.camera} type={type}>
          <View style={CameraStyles.buttonContainer}>
            <View style={{ flex: 1, paddingHorizontal: 8 }}>
              <Button label='Flip' onClick={() => setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))} />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 8 }}>
              <Button label='Capture' onClick={() => null} />
            </View>
          </View>
        </Camera>
      </View>
    </>
  )
}

export default ScanCam