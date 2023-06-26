import { StyleSheet } from 'react-native';
import { COLOR_PALETTE } from '../../constants/colors';

const cardStyles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(39, 89, 0, 0.27)',
        paddingVertical: 8,
        marginVertical: 4,
        borderRadius: 12
    },
    title: {
        textAlign: 'center',
        width: '100%',
        fontWeight: '700',
        fontSize: 16,
        color: COLOR_PALETTE.primary,
        paddingBottom: 12
    },
    description: {
        paddingHorizontal: 12,
        color: 'rgba(0, 0, 0, 0.58)',
        fontStyle: 'italic'
    }
});

export default cardStyles;