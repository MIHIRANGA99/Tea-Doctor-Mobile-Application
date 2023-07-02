import React from 'react';
import { View, Image, ScrollView, Text } from 'react-native';
import mainStyles from '../../constants/mainStyles';
import TextField from '../../Components/TextField/TextField';
import Button from '../../Components/Button/Button';
import { Link } from '@react-navigation/native';
import { COLOR_PALETTE } from '../../constants/colors';

type Props = {}

const Login = (props: Props) => {
    return (
        <View style={mainStyles.main}>
            <ScrollView>
                <View
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Image style={{ width: '80%', resizeMode: 'contain' }} source={require("../../assets/tea-doctor-logo.png")} />
                </View>
                <View>
                    <TextField dense placeholder='Your Email Here' label='E - main Address' />
                    <TextField dense placeholder='Enter Password' label='Password' />
                    <View style={{ display: 'flex', width: '100%', alignItems: 'flex-end', paddingVertical: 8 }}>
                        <View style={{ width: '40%' }}>
                            <Button label='Login' />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 24, right: 12, backgroundColor: COLOR_PALETTE.secondary, width: '100%' }}>
                <Text>Don't Have an Account? <Link to='/Register'><Text style={{ color: COLOR_PALETTE.primary }}>Register</Text></Link></Text>
            </View>
        </View>
    )
}

export default Login