import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
class EssScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ESS Screen</Text>
            </View>
        )
    }
}
export default EssScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})