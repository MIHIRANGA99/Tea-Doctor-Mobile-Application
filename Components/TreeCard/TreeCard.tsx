import React, { useState } from "react";
import { TouchableOpacity, Text, View, LayoutAnimation, Platform, UIManager } from "react-native";
import treeCardStyles from "./treeCardStyles";
import { COLOR_PALETTE } from "../../constants/colors";

if(Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  treeName: string;
  condition?: number;
  style: "filled" | "outlined";
  expandedView?: React.ReactNode;
  onClick?: () => void;
};

const TreeCard = ({ treeName, condition, style, onClick, expandedView }: Props) => {

  const [expanded, setExpanded] = useState(false);

  const expandViewMore = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'));
    setExpanded(!expanded);
  }

  return (
    <>
      <TouchableOpacity
        onPress={onClick && onClick}
        style={
          style === "filled"
            ? treeCardStyles.cardFilled
            : treeCardStyles.cardOutlined
        }
      >
        <View style={{flex: 1, justifyContent: style === 'filled' && !expanded? 'space-between': 'center', flexDirection: 'row', width: '100%'}}>
        <Text
          style={
            style === "filled"
              ? treeCardStyles.text
              : treeCardStyles.textOutlined
          }
        >
          {treeName}
        </Text>
        {condition && !expanded && (
          <Text style={treeCardStyles.healthText}>Health: {condition}%</Text>
        )}
        </View>
        {expanded&& <View>
          {expandedView}
        </View>}
      </TouchableOpacity>
      {style === "filled" && (
        <View style={{alignItems: 'center', marginTop: -20}}>
          <TouchableOpacity onPress={() => expandViewMore()}>
          <Text
            style={{
              backgroundColor: COLOR_PALETTE.primary,
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderWidth: 2,
              borderColor: COLOR_PALETTE.lighter,
              borderRadius: 8,
              color: COLOR_PALETTE.secondary,
              textAlign: 'center',
              width: '30%'
            }}
          >
            View {expanded? 'Less': 'More'}
          </Text>
        </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default TreeCard;
