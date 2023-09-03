import {StyleSheet} from 'react-native';
import { COLOR_PALETTE } from '../../constants/colors';

const treeCardStyles = StyleSheet.create({
    cardFilled: {
        backgroundColor: COLOR_PALETTE.primary,
        paddingVertical: 24,
        paddingHorizontal: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        fontWeight: '600',
        fontSize: 18,
        paddingLeft: 24
    },
    healthText: {
        color: COLOR_PALETTE.secondary,
        fontSize: 14,
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 8,
        borderRadius: 8
    },
    textOutlined: {
        color: COLOR_PALETTE.primary,
        fontSize: 18
    }
});

export default treeCardStyles;