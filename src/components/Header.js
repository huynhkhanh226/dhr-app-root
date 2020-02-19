import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity, InteractionManager
} from 'react-native';

import {connect} from "react-redux";
import * as navigationActions from "../navigation/redux/navigation_actions";
import {bindActionCreators} from "redux";

import Config, {Scale} from '../config';
import CButton from "../libs/CButton/CButton";
const gStyle = Config.gStyle;

class Header extends React.PureComponent {

    static defaultProps={
        showMenu: true,
        showBack: false,
        headerName: "HOME"
    };

    constructor(props){
        super(props);
        // console.log(this.props);
    }

    _onBack=()=>{
        if(this.props.reload) this.props.reload();
        if(this.props.goBack) this.props.goBack();
        else{
            if(Config.currentScreen && Config.currentScreen.routeName === 'HomeScreen') return true;
            this.props.navigation.goBack(null);
        }
    };

    _onRight=()=>{
        if(this.props.reload) this.props.reload();
        if(this.props.onRight) this.props.onRight();
    };

    actionHome=()=>{
        if(this.props.actionHome) this.props.actionHome();
    };

    render() {
        let {showMenu, showBack,customClass,headerName,styleText,btnRight, colorBtnRight} = this.props;
        const salesURL = Config.profile && Config.profile.URL ? Config.profile.URL : Config.avaDefURL;
        return(
            <View style={[styles.header,customClass]}>
                {btnRight &&
                    <CButton
                        text={btnRight}
                        width={40}
                        height={20}
                        onPress={this._onRight}
                        styleCustomText={[styles.btnTxtRight,{color:colorBtnRight ? colorBtnRight :'black'}]}
                        style={styles.btnRight}
                    />
                }
                {showBack && (
                    <CButton
                        onPress={this._onBack}
                        width={20}
                        height={20}
                        hitSlop={{top: Scale(10),left:Scale(10),right: Scale(10),bottom: Scale(10)}}
                        style={styles.btn_back}
                        icon={require('../assets/images/header/btn_back.png')} />
                )}
                {!!headerName &&
                    <Text style={[styles.txt_header,styleText]} numberOfLines={1}>
                        {headerName}
                    </Text>
                }
            </View>
        )
    }
}

export default connect(state => ({
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
    })
)(Header);

const styles = {
    header:{
        width: '100%',
        height:Scale(44),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'red'
        // position:'absolute',
        // top:0,
        // left:0,
        // zIndex: 1
    },

    bgHeader:{
        width:'100%',
        height:Scale(70),
        position:'absolute',
        top:0,
        left:0,
    },

    btn_menu:{
        width: Scale(40),
        height: Scale(40),
        position: 'absolute',
        left: Scale(17),
    },

    btn_back:{
        position: 'absolute',
        left: Scale(15),
        width:Scale(20),
        height:Scale(20),
    },

    btn_user:{
        width: Scale(60),
        height: Scale(68),
        position: 'absolute',
        right: Scale(25)
    },

    txt_header:{
        fontSize: Scale(16),
        maxWidth:Scale(250),
        color: gStyle.color_black,
        //fontFamily: "OpenSans-Extrabold",
        fontWeight:'bold',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'yellow'
    },
    iconArrow:{
        width: Scale(30),
        height: Scale(14),
        resizeMode:'cover',
        // backgroundColor:'red',
        transform : [{ rotate: '-90deg' }]
    },
    btnRight:{
        position:'absolute',
        right: Scale(15),
    },
    btnTxtRight:{
        fontSize: Scale(18),
        fontFamily: Config.getFont('Muli')
    }
};
