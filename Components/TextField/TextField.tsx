import React from 'react'
import { TextInput, View, Text } from 'react-native';
import textFieldStyles from './textFieldStyles';

type Props = {
  placeholder?: string;
  value?: string;
  label?: string;
  onChange?: (text: string) => void;
  dense?: boolean;
}

const TextField = ({ label, onChange, placeholder, value, dense = false }: Props) => {
  return (
    <View style={{ paddingVertical: dense ? 6 : 0 }}>
      {label && <Text style={textFieldStyles.label}>{label}</Text>}
      <TextInput value={value} placeholder={placeholder && placeholder} onChange={(e) => onChange && onChange(e.nativeEvent.text)} style={textFieldStyles.textField} />
    </View>
  )
}

export default TextField