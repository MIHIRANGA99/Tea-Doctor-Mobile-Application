import React, { useState } from 'react';
import { View, Image, ScrollView, Text, ToastAndroid } from 'react-native';
import mainStyles from '../../constants/mainStyles';
import TextField from '../../Components/TextField/TextField';
import Button from '../../Components/Button/Button';
import { Link } from '@react-navigation/native';
import { COLOR_PALETTE } from '../../constants/colors';
import { registerUser } from '../../firebase/utils/authentication/authentication';

const Register = ({navigation}: {navigation: any}) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        setIsLoading(true);
        const res = await registerUser(username, email, password);

        if (res.isSuccess) {
            setIsLoading(false);
            navigation.navigate('Main');
        } else {
            setIsLoading(false);
            // TODO: Add Alert Message
            ToastAndroid.show(res.response.message, ToastAndroid.SHORT);
        }
    }
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
                    <TextField onChange={(text) => setUsername(text)} dense placeholder='ඔබගේ නම මෙහි ඇතුලත් කරන්න' label='නම' />
                    <TextField onChange={(text) => setEmail(text)} dense placeholder='ඔබගේ විද්‍යුත් තැපෑල මෙහි ඇතුලත් කරන්න' label='විද්‍යුත් තැපෑල' />
                    <TextField onChange={(text) => setPassword(text)} dense placeholder='මුරපදය ඇතුළත් කරන්න' label='මුරපදය නැවතත්' />
                    <TextField onChange={(text) => setConfPassword(text)} dense placeholder='මුරපදය තහවුරු කරන්න' label='මුරපදය තහවුරු කරන්න' />
                    <View style={{ display: 'flex', width: '100%', alignItems: 'flex-end', paddingVertical: 8 }}>
                        <View style={{ width: '40%' }}>
                            <Button isLoading = {isLoading} onClick={() => onSubmit()} label='ලියාපදිංචි වෙන්න' />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 24, right: 12, backgroundColor: COLOR_PALETTE.secondary, width: '100%' }}>
                <Text>දැනටමත් ගිණුමක් තිබේද? <Link to='/Login'><Text style={{ color: COLOR_PALETTE.primary }}>පුරන්න</Text></Link></Text>
            </View>
        </View>
    )
}

export default Register