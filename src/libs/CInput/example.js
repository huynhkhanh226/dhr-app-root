
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import CInput from './CInput.js';

export default class ExampleCInput extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={{
                flex: 1,
                backgroundColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <CInput
                    style={{
                            width:300,
                            height:40,
                            margin:10,
                            borderRadius:5,
                            backgroundColor:'white',
                            fontSize: 20,
                            paddingHorizontal: 10
                            }}
                    placeholder="Email" />
                <CInput
                    style={{
                            width:300,
                            height:40,
                            margin:10,
                            borderRadius:5,
                            backgroundColor:'white',
                            paddingHorizontal: 10
                            }}
                    password={true}
                    placeholder="Mật khẩu" />

                <Text
                    style={{
                        position:'absolute',
                        top: 0,
                        right: 0,
                        fontSize:20
                    }}>
                    Example Input
                </Text>

                <Text
                    onPress={this.props.onBack}
                    style={{
                        backgroundColor:'red',
                        position:'absolute',
                        top: 30,
                        left: 30,
                        width: 60,
                        height: 20,
                        textAlign: 'center',
                        textAlignVertical: 'center'
                    }}>
                    Back
                </Text>
            </View>
        )
    }
}
