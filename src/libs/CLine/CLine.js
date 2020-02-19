import React from "react";
import Config, {Scale} from "../../config";
import {ActivityIndicator, Image, Linking, Text, TouchableOpacity, View} from "react-native";
import CImage from "../CImage/CImage";
import Icon from 'react-native-vector-icons/FontAwesome5';
import CButton from "../CButton/CButton";

class CLine extends React.Component{
    render(){
        const {width} = this.props;
        return(
            <View style={[styles.container,{width:width ? Scale(width) : '100%'}]}/>
        )
    }
}

export default CLine;

const styles = {
    container:{
        flexDirection: 'row',
        flex: 1,
        height:1,
        backgroundColor: Config.gStyle.color_CCC
    },
};
