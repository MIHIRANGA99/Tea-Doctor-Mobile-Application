import { StyleSheet } from 'react-native';
import { COLOR_PALETTE } from '../../constants/colors';

const textFieldStyles = StyleSheet.create({
    textField: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: COLOR_PALETTE.primary,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 2
    },
    label: {
        color: COLOR_PALETTE.primary,
        fontWeight: '600',
        paddingHorizontal: 6,
        fontSize: 14
    }
});

export default textFieldStyles;