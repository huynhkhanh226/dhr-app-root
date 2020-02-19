import React from 'react';
import {
    View,
    Text
} from 'react-native';

import CButton from './CButton.js';

export default class ExampleCButton extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            active: true
        }
    }

    componentDidMount() {
        this._timer = setTimeout(()=>{
            this.setState({active: false});
        },3000)
    }

    componentWillUnmount(){
        clearTimeout(this._timer);
    }

    render(){
        return(
            <View style={{
                flex: 1,
                backgroundColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <CButton
                    style={{
                        backgroundColor:'pink',
                        paddingHorizontal:30,
                        paddingVertical:10
                    }}
                    text="Click Me"/>
                <CButton
                    style={{
                        backgroundColor:'blue',
                        paddingHorizontal:30,
                        paddingVertical:10,
                        marginTop:30,
                        justifyContent:'center'
                    }}
                    styleCustomText={{color:'white'}}
                    text="Click Me"/>
                <View style={{flexDirection:'row'}}>
                    <CButton
                        style={{backgroundColor:'blue',paddingVertical:10,marginTop:30}}
                        styleCustomText={{color:'white'}}
                        text="Click Me"/>
                </View>
                <CButton
                    style={{
                        backgroundColor:'blue',
                        justifyContent:'center',
                        width:50,
                        height:50,
                        marginTop:30
                    }}
                    styleCustomIcon={{width:30,height:30}}
                    icon={require('./icon_check.png')}/>
                <CButton
                    style={{
                        backgroundColor:'blue',
                        justifyContent:'center',
                        width:50,
                        height:50,
                        marginTop:30
                    }}
                    icon={require('./icon_check.png')}/>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <CButton
                        style={{marginTop:30,backgroundColor:'red'}}
                        styleCustomText={{color:'#000',marginLeft:10}}
                        styleCustomIcon={{width:30,height:30}}
                        icon={require('./icon_check.png')}
                        text="CheckBox"/>

                    <CButton
                        style={{marginTop:30,marginLeft:10}}
                        styleCustomText={{color:'#000',marginLeft:10}}
                        styleCustomIcon={{width:30,height:30}}
                        icon={require('./icon_uncheck.png')}
                        iconActive={require('./icon_check.png')}
                        text="CheckBox"/>
                    <CButton
                        active={this.state.active}
                        style={{marginTop:30,marginLeft:10}}
                        styleCustomText={{color:'#000',marginLeft:10}}
                        styleCustomIcon={{width:30,height:30}}
                        icon={require('./icon_uncheck.png')}
                        iconActive={require('./icon_check.png')}
                        text="CheckBox"/>
                </View>

                <View style={{flexDirection:'row'}}>
                    <CButton
                        hitSlop={{top: 30,bottom:30,left:30,right:30}}
                        style={{backgroundColor:'blue',paddingVertical:10,marginTop:30}}
                        styleCustomText={{color:'white'}}
                        text="Hit Slop"/>
                </View>

                <Text
                    style={{
                        position:'absolute',
                        top: 0,
                        right: 0,
                        fontSize:20
                    }}>
                    Example Button
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