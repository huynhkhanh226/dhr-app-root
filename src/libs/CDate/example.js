import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import CDate from './CDate.js';

export default class ExampleCDate extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            year: '',
            time: '',
        }
    }

    render(){
        return(
            <View style={{
                flex: 1,
                backgroundColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <CDate date={this.state.value}
                       onDateChange={(date)=>this.setState({value: date})}
                       style={{margin:10}} />
                <CDate date={this.state.year}
                       format="YYYY"
                       placeholder="Năm"
                       onDateChange={(date)=>this.setState({year: date})}
                       style={{margin:10}} />
                <CDate date={this.state.time}
                       placeholder="Thời gian"
                       mode="time"
                       format="HH:mm"
                       onDateChange={(date)=>this.setState({time: date})}
                       style={{margin:10}} />
                <CDate date={this.state.value}
                       onDateChange={(date)=>this.setState({value: date})}
                       style={{margin:10,width:300}} />
                <Text
                    style={{
                        position:'absolute',
                        top: 0,
                        right: 0,
                        fontSize:20
                    }}>
                    Example Date
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