import React from 'react'
import { TextInput, View, Text, KeyboardTypeOptions } from 'react-native';
import textFieldStyles from './textFieldStyles';

type Props = {
  placeholder?: string;
  value?: string;
  label?: string;
  onChange?: (text: string) => void;
  dense?: boolean;
  isPassword?: boolean;
  type?: KeyboardTypeOptions;
}

const TextField = ({ label, onChange, placeholder, value, dense = false, isPassword, type }: Props) => {
  return (
    <View style={{ paddingVertical: dense ? 6 : 0 }}>
      {label && <Text style={textFieldStyles.label}>{label}</Text>}
      <TextInput secureTextEntry = {isPassword} keyboardType={type? type: 'default' } value={value} placeholder={placeholder && placeholder} onChange={(e) => onChange && onChange(e.nativeEvent.text)} style={textFieldStyles.textField} />
    </View>
  )
}

export default TextField