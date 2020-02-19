import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
class NotificationScreen2 extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Notification Screen</Text>
            </View>
        )
    }
}

export default  NotificationScreen2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})