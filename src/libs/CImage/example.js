
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from 'react-native';

import CImage from './CImage.js';

export default class ExampleCImage extends React.Component{

    render(){
        let url = 'http://placehold.it/400x200/E8117F/ffffff';
        // let url = 'https://statics-nahi-sgtest-vn.r.worldssl.net/media/upload/web_stargarden_test2/2017/05/29/nahi_592bdd052f5ec_S2.JPG';
        return(
            <View style={{
                flex: 1,
                backgroundColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ScrollView>
                    <CImage source={url} style={{marginBottom:10}}/>
                    <CImage source={url} width={300} style={{marginBottom:10}}/>
                    <CImage source={url} height={100} style={{marginBottom:10}} />
                    <CImage source={url}
                            resizeMode={'cover'}
                            width={300}
                            height={300} />
                </ScrollView>

                <Text
                    style={{
                        position:'absolute',
                        top: 0,
                        right: 0,
                        fontSize:20
                    }}>
                    Example Image
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
