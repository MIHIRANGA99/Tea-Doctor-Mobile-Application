import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import TextField from '../Components/TextField/TextField';
import Button from '../Components/Button/Button';
import DetailCard from '../Components/DetailCard/DetailCard';
import IconCard from '../Components/IconCard/IconCard';
import TreeCard from '../Components/TreeCard/TreeCard';

const Components = ({ navigation }: {navigation: any}) => {
  return (
    <ScrollView>
        <Text>Components</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Text>Main App</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text>Auth Pages</Text>
        </TouchableOpacity>
        <Text>===================================================</Text>
        <Text style={{fontWeight: 'bold'}}>===================Components===================</Text>
        <TextField label='Name' placeholder='Sample Name' />
        <Text>===================================================</Text>
        <Button label='Sample Button' icon={require('../assets/icons/home.png')} />
        <Text>===================================================</Text>
        <DetailCard header='Sample Title' description='sample' />
        <Text>===================================================</Text>
        <IconCard icon={require('../assets/icons/eco.png')} title='Plants' />
        <Text>===================================================</Text>
        <TreeCard treeName='sample' style='filled' />
        <Text>===================================================</Text>
        <TreeCard treeName='sample' style='outlined' />
    </ScrollView>
  )
}

export default Components