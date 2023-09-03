import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import iconCardStyles from './iconCardStyles';

type Props = {
    icon: ImageSourcePropType;
    title?: string;
    onClick?: () => void;
}

const IconCard = ({icon, title, onClick}: Props) => {
  return (
    <TouchableOpacity onPress={onClick&& onClick} style={iconCardStyles.card}>
        <Image style={{height: 45, width: '40%', resizeMode: 'contain'}} source={icon} />
        {title&& <Text style = {iconCardStyles.title}>{title}</Text>}
    </TouchableOpacity>
  )
}

export default IconCard