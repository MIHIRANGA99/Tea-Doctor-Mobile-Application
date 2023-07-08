import { StyleSheet } from 'react-native';
import { COLOR_PALETTE } from './colors';

const mainStyles = StyleSheet.create({
    main: {
        backgroundColor: COLOR_PALETTE.secondary,
        paddingTop: 12,
        paddingHorizontal: 12,
        paddingBottom: 90,
        height: '100%',
    }
});

export default mainStyles;