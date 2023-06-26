import React, { ReactNode } from 'react';
import { View } from 'react-native';
import navigationStyles from '../navStyles';

type Props = {
    children: ReactNode
}

const NavContainer = ({ children }: Props) => {
  return (
    <View style={navigationStyles.container}>
        {children}
    </View>
  )
}

export default NavContainer