import React, { Component } from 'react';
import Config, {Scale} from '../../config/index';
import CButton from '../CButton/CButton';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    TextInput,
    Keyboard, Alert
} from 'react-native';

export default class CInput extends React.PureComponent{

    static defaultProps = {
        placeholder: "",
        placeholderTextColor: "#6b6f72",
        password: false,
        edit: true
    };

    constructor(props) {
        super(props);
        this.state={
            passWordHint: true
        };
        this.vlRef = null;
    }

    hintPass=()=> {
        this.setState({
            passWordHint: !this.state.passWordHint
        })
    };

    onFocus = () => {
        this.vlRef.focus();
    };

    onBlur = () => {
        this.vlRef.blur();
    };

    render(){
        const {
            edit,
            multiline,
            password,
            value,
            style,
            styleText,
            placeholder,
            width,
            height,
            placeholderTextColor,
            onChangeText,
            onFocus,
            image,
            fontText,
            shadow,
            maxLength,
            stylePassWord,
            styleImage,
            returnKeyType,
            onSubmitEditing
        } = this.props;

        const {passWordHint} = this.state;

        return(
            <View style={[styles.container,{width:Scale(width), height: Scale(height)}, shadow ? styles.shadow : {},style]}>

                {image &&
                <Image pointerEvents={'none'}
                       source={image}
                       style={[styles.imageBg,{width:Scale(width), height: Scale(height)}, styleImage ? styleImage : {}]}
                />
                }
                <TextInput
                    editable={edit}
                    multiline={multiline}
                    ref={ref=>this.vlRef=ref}
                    secureTextEntry={this.state.passWordHint && password}
                    autoCorrect={false}
                    blurOnSubmit={!onSubmitEditing}
                    onSubmitEditing={onSubmitEditing ? ()=>onSubmitEditing() : Keyboard.dismiss}
                    autoFocus={false}
                    value={value}
                    returnKeyType={returnKeyType}
                    maxLength={maxLength ? maxLength : 10000000}
                    placeholder={placeholder}
                    style={[styles.input,{width:Scale(width), height: Scale(height), fontSize: fontText, marginTop: 0},styleText]}
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={onChangeText}
                    onFocus={onFocus}
                    underlineColorAndroid='rgba(0,0,0,0)' />
                {password && !passWordHint &&
                <CButton width={23}
                         height={15}
                         image={require('./icon-eye.png')}
                         onPress={this.hintPass}
                         style={[styles.iconEye,{top: (Scale(height)/2)-Scale(12),opacity:0.8}, stylePassWord]}
                />
                }
                {password && passWordHint &&
                <CButton width={23}
                         height={15}
                         image={require('./icon-eye.png')}
                         onPress={this.hintPass}
                         style={[styles.iconEye,{top: (Scale(height)/2)-Scale(12),opacity:0.2}, stylePassWord]}
                />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        // backgroundColor:'rgba(0,0,0,0.1)',
    },

    shadow:{
        //ios
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        //android
        elevation: 2
    },
    input:{
        paddingVertical: 0,
        paddingHorizontal: Scale(25),
        fontSize:Scale(20),
        borderWidth: 1,
        borderColor: Config.gStyle.color_CCC,
    },
    imageBg:{
        position:'absolute',
        resizeMode:'stretch',
    },
    iconEye:{
        width:Scale(20),
        height:Scale(50),
        position:'absolute',
        top: Scale(18),
        right:Scale(20)
    }
});
