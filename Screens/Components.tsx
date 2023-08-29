import React, { useState } from 'react';
import { Text, TouchableOpacity, ScrollView, View } from 'react-native';
import TextField from '../Components/TextField/TextField';
import Button from '../Components/Button/Button';
import DetailCard from '../Components/DetailCard/DetailCard';
import IconCard from '../Components/IconCard/IconCard';
import TreeCard from '../Components/TreeCard/TreeCard';
import ScanCam from '../Components/ScanCam/ScanCam';

const Components = ({ navigation }: { navigation: any }) => {
  return (
    <ScrollView>
      <Text>Components</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Text>Main App</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>Auth Pages</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Weather')}>
        <Text>Weather</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Insect')}>
        <Text>Insect</Text>
      </TouchableOpacity>
      <Text>===================================================</Text>
      <Text style={{ fontWeight: 'bold' }}>===================Components===================</Text>
      <TextField label='Name' placeholder='Sample Name' />
      <Text>===================================================</Text>
      <Button label='Sample Button' icon={require('../assets/icons/home.png')} />
      <Text>===================================================</Text>
      <DetailCard header='Sample Title' description='sample' />
      <DetailCard header='Sample Title' description='sample' button={{ label: 'Sample', onClick: () => console.log('text'), icon: require('../assets/icons/home.png') }} />
      <Text>===================================================</Text>
      <IconCard icon={require('../assets/icons/eco.png')} title='Plants' />
      <Text>===================================================</Text>
      <TreeCard treeName='sample' style='filled' />
      <Text>===================================================</Text>
      <TreeCard treeName='sample' style='outlined' />
      <Text>===================================================</Text>
      <View style={{ height: 400 }}>
        <ScanCam />
      </View>
    </ScrollView>
  )
}

export default Components