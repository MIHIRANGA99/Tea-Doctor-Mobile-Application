import {StyleSheet} from 'react-native';
import { COLOR_PALETTE } from '../../constants/colors';

const treeCardStyles = StyleSheet.create({
    cardFilled: {
        backgroundColor: COLOR_PALETTE.primary,
        paddingVertical: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginVertical: 4
    },
    cardOutlined: {
        paddingVertical: 24,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: COLOR_PALETTE.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginVertical: 4
    },
    text: {
        color: 'white',
        fontSize: 18
    },
    textOutlined: {
        color: COLOR_PALETTE.primary,
        fontSize: 18
    }
});

export default treeCardStyles;