import { StyleSheet } from 'react-native';
import { COLOR_PALETTE } from '../../constants/colors';

const buttonStyles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    paddingVertical: 8
  },
  disabled: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR_PALETTE.lighter,
    borderRadius: 24,
    paddingVertical: 8
  }
});

export default buttonStyles;
