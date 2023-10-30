import React, { ReactNode } from "react";
import { View, Text, ImageSourcePropType } from "react-native";
import cardStyles from "./cardStyles";
import Button from "../Button/Button";
import { COLOR_PALETTE } from "../../constants/colors";

type Props = {
  header: string;
  description?: string;
  children?: ReactNode;
  button?: {
    label: string;
    icon?: ImageSourcePropType;
    onClick: () => void;
  };
  error?: boolean;
};

const DetailCard = ({
  header,
  children,
  description,
  button,
  error = false,
}: Props) => {
  return (
    <>
      <View
        style={error ? { ...cardStyles.cardError } : { ...cardStyles.card }}
      >
        <Text style={error ? cardStyles.titleError : cardStyles.title}>
          {header}
        </Text>
        {description && (
          <Text style={cardStyles.description}>{description}</Text>
        )}
        {children && <View>{children}</View>}
      </View>
      {button && (
        <View style={cardStyles.buttonContainer}>
          <Button
            extraStyles={{ width: "45%", marginRight: 12, marginTop: -25 }}
            color={error ? COLOR_PALETTE.error.primary : COLOR_PALETTE.primary}
            onClick={button.onClick}
            label={button.label}
            icon={button.icon && button.icon}
          />
        </View>
      )}
    </>
  );
};

export default DetailCard;
