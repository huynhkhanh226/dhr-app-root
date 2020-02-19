import React from 'react';
import Config, {Scale} from '../../config';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import CImage from "../CImage/CImage";

export default class CButton extends React.PureComponent{

    state = {
        active: false
    };

    _onPress=()=>{
        let active = this.props.active || this.state.active;
        active = !active;

        if(this.props.iconActive){
            this.setState({active: active});
        }

        if(this.props.onPress){
            this.props.onPress(this.props,active);
        }
    };

    render(){
        let {
            disabled,
            style,
            styleCustomIcon,
            styleCustomText,
            icon,
            iconActive,
            text,
            hitSlop,
            image,
            shadow,
            width,
            height,
            styleImage,
            top,
            loading,
            iconType,
            iconAweSome,
            iconAweSomeColor,
            iconAweSomeSize,
            iconAweSomeStyle,
            colorLoading,
            children
        } = this.props;

        let active = this.props.active || this.state.active;
        return(
            <TouchableOpacity
                disabled={disabled}
                hitSlop={hitSlop}
                onPress={this._onPress}
                underlayColor="red"
                style={[styles.container,{width:width?Scale(width): Scale(280), height:height?Scale(height):Scale(56)}, shadow ? styles.shadow : {},style]}>

                {image && width && height &&
                    <Image source={ image === true ? require("../../assets/images/bg-btn-1.png") : image}
                        style={[styleImage,styles.imageBg,{width:Scale(width), height: Scale(height), top:top  ? Scale(top) : 0}]}
                />
                }
                {icon && iconType !== 'link' && (
                    <Image source={active?iconActive:icon}
                           style={[
                                    style,
                                    styles.clear,
                                    (styleCustomIcon)?styleCustomIcon:styles.icon
                                 ]}/>
                )}
                {icon && iconType === 'link' && (
                    <CImage source={active?iconActive:icon}
                            width={width}
                            height={height}
                            onPress={this._onPress}
                            style={[
                                    style,
                                    styles.clear,
                                    (styleCustomIcon)?styleCustomIcon:styles.icon
                                 ]}/>
                )}
                {iconAweSome &&
                    <Icon style={iconAweSomeStyle}
                          name={iconAweSome}
                          size={iconAweSomeSize ? iconAweSomeSize : Scale(30)}
                          color={iconAweSomeColor ? iconAweSomeColor : "#900"}
                    />}
                {text && (
                    <Text style={[
                                    !icon?styles.text:null,
                                    {lineHeight: height ? Math.floor(Scale(height)) : Scale(20)},
                                    styleCustomText
                                ]}>
                        {text}
                    </Text>
                )}

                {loading &&
                <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator animating color={colorLoading ? colorLoading : null} size="small" />
                </View>
                }
                {!loading && children && children}
            </TouchableOpacity >
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text:{
        flex:1,
        textAlign: 'center',
    },

    icon:{
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },


    shadow:{
        //ios
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
            height: Scale(4),
            width: 0
        },
        //android
        elevation: 2
    },

    clear:{
        paddingLeft:0,
        paddingRight:0,
        paddingTop:0,
        paddingBottom:0,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
    },
    imageBg:{
        position:'absolute',
        resizeMode:'cover',
        // backgroundColor:'red',
        top:0
    }

});
