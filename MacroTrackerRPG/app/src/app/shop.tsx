import {View, Text, StyleSheet} from 'react-native';

export default function ShopScreen() {
    return (
        <View style = {styles.container}>
            <Text>Shopt</Text>
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
        color: '#ffffff'
    }
});

