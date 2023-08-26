import React from 'react';
import { TouchableOpacity, Text, ImageSourcePropType, Image } from 'react-native';
import { COLOR_PALETTE } from '../../constants/colors';
import buttonStyles from './buttonStyles';

type Props = {
    label: string;
    onClick?: () => void;
    icon?: ImageSourcePropType;
    color?: string;
    extraStyles?: object;
    disabled?: boolean;
}

const Button = ({icon, label, onClick, color = COLOR_PALETTE.primary, extraStyles = {}, disabled = false}: Props) => {
  return (
    <TouchableOpacity disabled = {disabled} style={{...buttonStyles.button, backgroundColor: color, ...extraStyles}} onPress={onClick}>
        {icon&& <Image style={{height: 18, width: 18}} source={icon} />}
        <Text style={{color: 'white', paddingLeft: icon&& 12}}>{label}</Text>
    </TouchableOpacity>
  )
}

export default Button