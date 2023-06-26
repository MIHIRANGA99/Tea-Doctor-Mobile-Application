import React from 'react'
import { TextInput, View, Text } from 'react-native';
import textFieldStyles from './textFieldStyles';

type Props = {
    placeholder?: string;
    value?: string;
    label?: string;
    onChange?: (text: string) => void;
}

const TextField = ({label, onChange, placeholder, value}: Props) => {
  return (
    <View>
        {label&& <Text style={textFieldStyles.label}>{label}</Text>}
        <TextInput placeholder={placeholder&& placeholder} onChange={(e) => onChange&& onChange(e.nativeEvent.text)} style = {textFieldStyles.textField} />
    </View>
  )
}

export default TextField