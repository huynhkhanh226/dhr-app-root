
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity, Image, Alert
} from 'react-native';

import Config, {Scale} from '../../config';
import * as navigationAction from '../../navigation/redux/navigation_actions.js';
import CImage from "../../libs/CImage/CImage";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class SettingScreen extends Component {

    constructor(props){
        super(props);
        console.log('SettingScreen');
    }

    onLink = (data) => {
        if(data.link){
            this.props.navigationActions.changeScreen(data.link);
        }
        else{
            Config.alertMess({code:'', message:Config.lang('PM_Chuc_nang_chua_phat_trien')})
        }
    };

    render() {
        const dataTemp =[
            {
                icon:'user',
                title:'Tài khoản của tôi',
                link:'ThongTinTaiKhoanScreen',
            },
            {
                icon:'info',
                title:"Giới thiệu"
            },
            {
                icon:'language',
                title:'Ngôn ngữ'
            },
            {
                icon:'bell',
                title:"Thiết lập thông báo"
            },
            {
                icon:'shield-alt',
                title:"Chính sách bảo mật"
            },
            {
                icon:'question-circle',
                title:"Các câu hỏi thuờng gặp"
            },
            {
                icon:'list',
                title:"Thông tin hợp pháp"
            },
            {
                icon:'headset',
                title:Config.lang('PM_Gop_y_voi_nha_phat_trien'),
                link:'GopYVoiNhaPhatTrienScreen'
            }
        ];
        return (
            <View style={styles.container}>
                <ScrollView style={{width:'100%', height:'100%'}}>
                    <View style={{flex:1, flexDirection:'column', width:'100%', alignItems:'center', justifyContent:'flex-start'}}>
                        <CImage style={styles.imgAva}
                                width={70}
                                height={70}
                                resizeMode={'cover'}
                                sourceDef={Config.profile.UserPictureURL ? Config.profile.UserPictureURL : require("../../assets/images/home/avatar.png")}
                                colorDef={'transparent'}
                                source={Config.profile && Config.profile.UserPictureURL ? Config.profile.UserPictureURL : null}
                        />
                        <Text style={styles.txtInfo}>{Config.profile && Config.profile.UserNameU ? Config.profile.UserNameU : ''}</Text>
                        <View style={{flex:1, flexDirection:'column', alignItems:'flex-start', width:'100%', padding: Scale(15)}}>
                        {dataTemp.map((item, key)=>{
                            return(
                                <TouchableOpacity key={key}
                                                  style={{height: Scale(50),
                                                        flexDirection:'row', width:'100%',
                                                        borderBottomWidth: 1,
                                                        borderBottomColor: Config.gStyle.color_DDDCDB,
                                                        alignItems:'center',
                                                        // marginBottom: Scale(10)
                                                    }}
                                                  onPress={()=>this.onLink(item)}
                                >
                                    <Icon name={item.icon ? item.icon : 'user'}
                                          color={Config.gStyle.color_grey}
                                          size={Scale(20)}
                                          style={{
                                              width: Scale(25),
                                              marginRight:Scale(10)
                                          }}
                                    />
                                    <Text style={{
                                        fontFamily: Config.getFont('Muli'),
                                        fontSize: Scale(16),
                                        color: Config.gStyle.color_797979
                                    }}>{item.title}</Text>
                                    <Icon name={'angle-right'}
                                          color={Config.gStyle.color_grey}
                                          size={Scale(15)}
                                          style={{
                                                position:'absolute',
                                                right: Scale(0),
                                                width: Scale(22),
                                                height: Scale(22),
                                                backgroundColor:Config.gStyle.color_DDDCDB,
                                                borderRadius: Scale(11),
                                                paddingHorizontal: Scale(8),
                                                paddingVertical: Scale(4)
                                          }}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                        </View>
                        <View style={styles.viewMenu}>
                            <TouchableOpacity onPress={this.props.logOut}
                                              style={{
                                                  // backgroundColor: '#ccc',
                                                  // borderRadius:Scale(10),
                                                  width: '100%',
                                                  height: Scale(40),
                                                  flexDirection:'row',
                                                  alignItems:'center',
                                                  justifyContent:'center'
                                              }}
                            >
                                <Text style={styles.txtLogout}>{Config.lang('PM_Dang_xuat')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
        justifyContent:'center',
        height:'100%'
    },
    imgFooter:{
        width:'100%',
        top:0,
        left:0,
        position:'absolute',
        height:Scale(140)
    },
    imgAva:{
        width:Scale(70),
        height:Scale(70),
        // marginRight: Scale(12),
        // marginLeft: Scale(26),
        borderRadius: Scale(35),
        marginVertical: Scale(10),
    },
    txtInfo:{
        fontFamily: Config.getFont('Muli'),
        fontSize: Scale(20),
        lineHeight: Math.floor(Scale(25)),
        color: '#0F0F0F'
    },
    viewMenu:{
        width:'100%',
        flexDirection:'row',
        paddingHorizontal:Scale(22),
        marginBottom:Scale(30),
        justifyContent:'space-between',
        alignItems:'center',
        // flexDirection:'row',
        flexWrap:'wrap',
        fontSize: Scale(30)
    },
    txtName:{
        //fontFamily:'OpenSans-Bold',
        color: Config.gStyle.color_def,
        fontSize:Scale(11),
        lineHeight:Math.floor(Scale(14)),
        position:'absolute',
        top: Scale(92),
        left:Scale(20)
    },
    txtDes:{
        fontFamily:'OpenSans',
        color: Config.gStyle.color_DDDCDB,
        fontSize:Scale(9),
        lineHeight:Math.floor(Scale(11)),
        position:'absolute',
        top: Scale(108),
        left:Scale(20)
    },
    viewItem:{
        width:Scale(150),
        height:Scale(148),
        flexDirection: 'row',
        // justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'green'
    },
    imgBackground:{
        position:'absolute',
        width:Scale(148),
        // backgroundColor:'red',
        // height:145*Config.s,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        top:0,
        left:0,
        shadowOpacity: 0.1,

        // width:'100%',
    },
    txtLogout:{
        fontSize: Scale(20),
        color: Config.gStyle.color_def,
        fontFamily: Config.getFont('Muli')
    }
};

export default connect(state=>({

    }),(dispatch)=>({
        navigationActions: bindActionCreators(navigationAction, dispatch)
    })
)(SettingScreen);
