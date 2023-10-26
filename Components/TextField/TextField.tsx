import React from "react";
import { TextInput, View, Text, KeyboardTypeOptions } from "react-native";
import textFieldStyles from "./textFieldStyles";

type Props = {
  placeholder?: string;
  value?: string;
  label?: string;
  onChange?: (text: string) => void;
  dense?: boolean;
  isPassword?: boolean;
  type?: KeyboardTypeOptions;
  maxLength?: number;
  disabled?: boolean;
};

const TextField = ({
  label,
  onChange,
  placeholder,
  value,
  dense = false,
  isPassword,
  type,
  maxLength = 100,
  disabled,
}: Props) => {
  return (
    <View style={{ paddingVertical: dense ? 6 : 0 }}>
      {label && <Text style={textFieldStyles.label}>{label}</Text>}
      <TextInput
        maxLength={maxLength}
        secureTextEntry={isPassword}
        keyboardType={type ? type : "default"}
        value={value}
        placeholder={placeholder && placeholder}
        onChange={(e) => onChange && onChange(e.nativeEvent.text)}
        style={textFieldStyles.textField}
        editable = {!disabled}
      />
    </View>
  );
};

export default TextField;
