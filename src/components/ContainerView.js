import React from 'react';
import {
    View,
    SafeAreaView
} from 'react-native';

class ContainerView extends React.Component {

    render() {
        return (
            <View style={{flex:1}}>
                <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
                    {this.props.children}
                </SafeAreaView>
            </View>
        );
    }
}

export default ContainerView;