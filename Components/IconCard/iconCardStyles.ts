import { StyleSheet } from 'react-native';
import { COLOR_PALETTE } from '../../constants/colors';

const iconCardStyles = StyleSheet.create({
    card: {
        backgroundColor: COLOR_PALETTE.primary,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        borderRadius: 12,
        height: 82,
        marginHorizontal: 4,
        width: '100%'
    },
    title: {
        fontSize: 16,
        paddingTop: 4,
        color: 'white',
        width: '60%',
        fontWeight: '600'
    }
});

export default iconCardStyles;