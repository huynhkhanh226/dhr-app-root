import React from 'react';
import {
    View,
    Text
} from 'react-native';

import CTab from './CTab';

export default class ExampleCButton extends React.Component{

    constructor(props) {
        super(props);

    }

    render(){
        const data = [
            {
                title:' Xuất kho',
                icon:null
            },
            {
                title:' Danh sách xuất kho',
                icon:null
            }
        ]
        return(
            <View style={{
                flex: 1,
                width:'100%',
                backgroundColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <CTab data={data}/>
            </View>
        )
    }
}
