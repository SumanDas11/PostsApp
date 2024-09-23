import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bgColorPeach
    },
    titleSty: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    linkText: {
        color: 'blue'
    }
})

export default styles;