import { StyleSheet } from 'react-native';
import { COLOR_PALETTE } from '../../constants/colors';

const navigationStyles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_PALETTE.lighter,
        position: 'absolute',
        borderTopEndRadius: 14,
        borderTopStartRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        bottom: 0,
    },
    item: {
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 54,
        width: 54,
        borderRadius: 10
    },
    itemSelected: {
        backgroundColor: COLOR_PALETTE.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 54,
        width: 54,
        borderRadius: 10,
        bottom: 16,
        shadowColor: 'black',
        shadowOffset: {
        width: 20,
        height: 20,
        },
        shadowOpacity:  1,
        shadowRadius: 11.27,
        elevation: 14
    }
});

export default navigationStyles;