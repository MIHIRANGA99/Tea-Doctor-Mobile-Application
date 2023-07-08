import React, { ReactNode } from "react";
import { View, Text, ImageSourcePropType } from "react-native";
import cardStyles from "./cardStyles";
import Button from "../Button/Button";

type Props = {
  header: string;
  description?: string;
  children?: ReactNode;
  button?: {
    label: string,
    icon?: ImageSourcePropType,
    onClick: () => void
  }
};

const DetailCard = ({ header, children, description, button }: Props) => {
  return (
    <>
    <View style={{...cardStyles.card}}>
      <Text style={cardStyles.title}>{header}</Text>
      {description && <Text style={cardStyles.description}>{description}</Text>}
      {children && <View>{children}</View>}
    </View>
    {button &&
      <View style={cardStyles.buttonContainer}>
        <Button extraStyles={{ width: '45%', marginRight: 12, marginTop: -36 }} label={button.label} icon={button.icon&& button.icon} />
      </View>
    }
    </>
  );
};

export default DetailCard;
