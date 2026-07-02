import {View, Text, StyleSheet} from 'react-native';

export default function SettingsScreen() {
    return (
        <View style = { styles.container }>
            <Text style = {styles.title}>Settings</Text>
            <View style = {styles.settingsContainer}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffffff'
    },
    settingsContainer: {
        flex: 1,
        backgroundColor: '#5a677dff',
        width: '80%',
        borderRadius: 5,
        padding: 20,
        marginTop: 20


    }



});