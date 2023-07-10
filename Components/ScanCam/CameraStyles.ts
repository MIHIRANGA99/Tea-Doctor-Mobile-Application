import { StyleSheet } from "react-native";

const CameraStyles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 12,
        paddingHorizontal: 12
    }
});

export default CameraStyles;