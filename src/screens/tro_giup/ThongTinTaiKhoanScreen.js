import React, { Component } from 'react';
import {
    View,
    // ScrollView,
    Text,
    Image,
    TouchableOpacity, Alert
} from 'react-native';

import Config, {Scale} from "../../config";
import ScrollView from "../../libs/CScrollView/CScrollView";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationAction from "../../navigation/redux/navigation_actions";
import * as homeActions from "../../redux/home/home_actions";
import CImage from "../../libs/CImage/CImage";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from "../../components/Header";
import moment from "moment";
moment.locale('vi');

class ThongTinTaiKhoanScreen extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const dataProfile = [
            {
                icon:'envelope',
                name: Config.profile.Email ? Config.profile.Email : '---',
            },
            {
                icon:'mobile-alt',
                name: Config.profile.TelNumber ? Config.profile.TelNumber : '---',
            },
            {
                icon:'birthday-cake',
                name: Config.profile.BirthDate ? moment(Config.profile.BirthDate).format('DD [tháng] MM[,] YYYY') : '---',
            },
            {
                icon:'home',
                name: Config.profile.UserAddress ? Config.profile.UserAddress : '---',
            },
            {
                icon:'calendar-alt',
                name: Config.profile.DateEntered ? Config.lang('PM_Bat_dau_lam') : '---',
                nameBold: Config.profile.DateEntered ? moment(Config.profile.DateEntered).format('DD [tháng] MM[,] YYYY') : null,
            },
        ];

        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        customClass={{
                            backgroundColor: '#FFFFFF',
                        }}
                        showBack={true}
                        headerName={Config.lang('PM_Thong_tin_tai_khoan')}
                        colorBtnRight={Config.gStyle.color_def1}
                />
                <View style={styles.infoUser}>
                    <CImage style={styles.imgAva}
                            width={35}
                            height={35}
                            resizeMode={'cover'}
                            sourceDef={Config.profile.UserPictureURL1 ? Config.profile.UserPictureURL1 : require("../../assets/images/home/avatar.png")}
                            colorDef={'transparent'}
                            source={Config.profile.UserPictureURL}
                    />
                    <View style={{width: Scale(280)}}>
                        <Text numberOfLines={1} style={styles.txtName}>
                            {Config.profile.UserNameU}
                        </Text>
                        <Text style={styles.txtInfo}>{Config.profile.UserDepartmentU}</Text>
                    </View>
                </View>

                <View style={{flex: 1, width: '100%'}}>
                    <View style={styles.lineStyle}/>
                    {dataProfile && dataProfile.map((item, idx) => {
                        return (
                            <View style={styles.viewItem} key={idx}>
                                    <View style={styles.viewIcon}>
                                    <Icon style={{width:Scale(22)}}
                                          name={item.icon}
                                          size={Scale(21)}
                                          color={"#707070"}
                                    />
                                    </View>
                                    <Text style={styles.txtMenu}>
                                        {item.name}
                                        {item.nameBold && <Text style={{
                                            fontWeight:'bold'
                                        }}>{item.nameBold}</Text>}
                                    </Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor:'white',
        minHeight:'100%',
        justifyContent:'center'
    },
    viewMenu:{
        width:'100%',
        flexDirection:'column',
        // paddingHorizontal:Scale(15),
        marginBottom:Scale(30),
        justifyContent:'space-between',
        alignItems:'center',
    },
    imgAva:{
        width:Scale(35),
        height:Scale(35),
        borderRadius: Scale(17),
        marginRight: Scale(10),
    },
    txtName:{
        fontFamily: Config.getFont('Muli-Bold'),
        fontSize: Scale(20),
        marginTop: Scale(-4),
        lineHeight: Math.floor(Scale(25)),
        color: '#1D285A'
    },
    iconMenu:{
        width: Scale(20),
        height: Scale(20),
        marginRight: Scale(15),
        marginLeft: Scale(8),
        resizeMode:'contain',
    },
    txtInfo:{
        fontFamily: Config.getFont('Muli'),
        fontSize: Scale(12),
        lineHeight: Math.floor(Scale(15)),
        color: '#1D285A'
    },
    infoUser:{
        // flex:1,
        flexDirection:'row',
        width:'100%',
        height: Scale(66),
        alignItems:'center',
        justifyContent:'flex-start',
        paddingHorizontal:Scale(15)
    },
    txtMenu:{
        fontFamily: Config.getFont('Muli-Regular'),
        fontSize: Scale(16),
        lineHeight: Math.floor(Scale(24)),
        color: '#000000'
    },
    itemMenu:{
        flexDirection:'row',
        width: '90%',
        height: Scale(53),
        alignItems:'center'
    },
    lineStyle:{
        height:1,
        width:'90%',
        backgroundColor:'#CECECE',
        position:'absolute',
        left: Scale(16),
        // marginHorizontal: Scale(16),
        right:Scale(16),
        top: 0
    },
    viewItem:{
        paddingHorizontal: Scale(15),
        flexDirection:'row',
        width: '90%',
        height: Scale(53),
        alignItems:'center'
    },
    viewIcon:{
        marginRight: Scale(15),
        marginLeft: Scale(8),
    },
};

export default connect(state=>({
    listMenu: state.home.listMenu
    }),(dispatch)=>({
        navigationActions: bindActionCreators(navigationAction, dispatch),
        homeActions: bindActionCreators(homeActions, dispatch),
    })
)(ThongTinTaiKhoanScreen);
