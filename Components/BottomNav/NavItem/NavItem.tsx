import React from 'react';
import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import navigationStyles from '../navStyles';

type Props = {
    icon: ImageSourcePropType;
    isSelected?: boolean;
    onPressed?: () => void;
}

const NavItem = ({ icon, isSelected = false, onPressed }: Props) => {
  return (
    <TouchableOpacity onPress={onPressed&& onPressed} style={isSelected? navigationStyles.itemSelected: navigationStyles.item}>
        <Image style={{height: 36, width: 36, resizeMode: 'center'}} source={icon} />
    </TouchableOpacity>
  )
}

export default NavItem