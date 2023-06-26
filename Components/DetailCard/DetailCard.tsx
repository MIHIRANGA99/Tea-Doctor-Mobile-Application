import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import cardStyles from "./cardStyles";

type Props = {
  header: string;
  description?: string;
  children?: ReactNode;
};

const DetailCard = ({ header, children, description }: Props) => {
  return (
    <View style = {cardStyles.card}>
      <Text style={cardStyles.title}>{header}</Text>
      {description && <Text style={cardStyles.description}>{description}</Text>}
      {children && <View>{children}</View>}
    </View>
  );
};

export default DetailCard;
