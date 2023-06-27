import React from 'react'
import { TouchableOpacity, Text } from 'react-native';
import treeCardStyles from './treeCardStyles';

type Props = {
    treeName: string;
    style: 'filled' | 'outlined';
    onClick?: () => void;
}

const TreeCard = ({ treeName, style, onClick }: Props) => {
  return (
    <TouchableOpacity onPress={onClick&& onClick} style = {style === 'filled'? treeCardStyles.cardFilled: treeCardStyles.cardOutlined}>
        <Text style = {style === 'filled'? treeCardStyles.text: treeCardStyles.textOutlined}>{treeName}</Text>
    </TouchableOpacity>
  )
}

export default TreeCard