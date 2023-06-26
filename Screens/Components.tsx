import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import TextField from '../Components/TextField/TextField';
import Button from '../Components/Button/Button';
import DetailCard from '../Components/DetailCard/DetailCard';
import IconCard from '../Components/IconCard/IconCard';

const Components = ({ navigation }: {navigation: any}) => {
  return (
    <View>
        <Text>Components</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Text>Main App</Text>
        </TouchableOpacity>
        <Text>===================================================</Text>
        <Text style={{fontWeight: 'bold'}}>===================Components===================</Text>
        <TextField label='Name' placeholder='Sample Name' />
        <Text>===================================================</Text>
        <Button label='Sample Button' icon={require('../assets/icons/home.png')} />
        <Text>===================================================</Text>
        <DetailCard header='Sample Title' description='balla' />
        <Text>===================================================</Text>
        <IconCard icon={require('../assets/icons/eco.png')} title='Plants' />
    </View>
  )
}

export default Components