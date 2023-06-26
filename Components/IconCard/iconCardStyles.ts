import { StyleSheet } from 'react-native';
import { COLOR_PALETTE } from '../../constants/colors';

const iconCardStyles = StyleSheet.create({
    card: {
        backgroundColor: COLOR_PALETTE.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        height: 82,
        width: 82
    },
    title: {
        fontSize: 10,
        paddingTop: 4,
        color: 'white',
        fontStyle: 'italic',
        fontWeight: '400'
    }
});

export default iconCardStyles;