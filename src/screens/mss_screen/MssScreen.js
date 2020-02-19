import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Config, { Scale } from '../../config';

class MssScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>MSS Screen</Text>
            </View>
        )
    }
}

export default  MssScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})