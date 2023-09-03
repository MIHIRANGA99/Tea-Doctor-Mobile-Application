import React from 'react'
import { TouchableOpacity, Text } from 'react-native';
import treeCardStyles from './treeCardStyles';

type Props = {
    treeName: string;
    condition?: number;
    style: 'filled' | 'outlined';
    onClick?: () => void;
}

const TreeCard = ({ treeName, condition, style, onClick }: Props) => {
  return (
    <TouchableOpacity onPress={onClick&& onClick} style = {style === 'filled'? treeCardStyles.cardFilled: treeCardStyles.cardOutlined}>
        <Text style = {style === 'filled'? treeCardStyles.text: treeCardStyles.textOutlined}>{treeName}</Text>
        {condition && <Text style = {treeCardStyles.healthText}>Health: {condition}%</Text>}
    </TouchableOpacity>
  )
}

export default TreeCard