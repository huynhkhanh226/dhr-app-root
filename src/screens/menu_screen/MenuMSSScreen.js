
import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView, Image, TouchableOpacity

} from 'react-native';

import * as navigationAction from '../../navigation/redux/navigation_actions.js';
import * as mainActions from '../../redux/main/main_actions';
import * as homeActions from '../../redux/home/home_actions';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Config, {Scale} from '../../config';
import CImage from "../../libs/CImage/CImage";
import Icon from 'react-native-vector-icons/FontAwesome5';
import CLoading from "../../libs/CLoading/CLoading";

class MenuMSSScreen extends Component {

    constructor(props){
        super(props);
    }

    onLink = (item) => {
        const screen = Config.getForm(item.FormID);
        if(screen) this.props.navigationActions.changeScreen(screen);
        else Config.alertMess({code:'', message:Config.lang('PM_Chuc_nang_chua_phat_trien')})
    };

    getNumberVoucher = (formID) => {
        let {listVoucherNum} = this.props;
        listVoucherNum = listVoucherNum ? listVoucherNum : [];
        const item = listVoucherNum.find(i=>i.FormID === formID);
        return item && item.StatusNumber ? item.StatusNumber : 0
    };

    render() {
        const {getListMenuMSS} = this.props;
        // let dataTest =[
        //     {
        //         id:'1',
        //         icon: require("../../assets/images/home/mss/A54F2500.png"),
        //         name:'Xuất kho vật tư',
        //         link:'XuatKhoVatTuTabScreen'
        //     }
        //     ,{
        //         id:'2',
        //         icon:require("../../assets/images/home/mss/A54F2500.png"),
        //         name:'Đề xuất vật tư',
        //         link: 'DeXuatVatTuTabScreen'
        //     }
        //     ,{
        //         id:'3',
        //         icon:require("../../assets/images/home/mss/A54F2500.png"),
        //         name:'Mượn vật tư'
        //     }
        //     ,{
        //         id:'4',
        //         icon:require("../../assets/images/home/A54F2010.png"),
        //         name:'Trả vật tư',
        //         link:'TraHangVeKhoTongTabScreen'
        //     }
        //     ,{
        //         id:'5',
        //         icon:require("../../assets/images/home/mss/A54F2500.png"),
        //         name:'Báo hàng'
        //     }
        //     ,{
        //         id:'6',
        //         icon:require("../../assets/images/home/mss/A54F2500.png"),
        //         name:'Kiểm tra chất lượng'
        //     }
        //     ,{
        //         id:'7',
        //         icon:require("../../assets/images/home/mss/A54F2500.png"),
        //         name:'Luân chuyển vật tư'
        //     }
        //     ,{
        //         id:'8',
        //         icon:require("../../assets/images/home/mss/A54F2500.png"),
        //         name:'Thông tin tồn kho'
        //     }
        // ];
        let dataTest = getListMenuMSS && getListMenuMSS.length>0 ? getListMenuMSS : [];
        dataTest = dataTest.filter(i=>i.FormID && Config.getForm(i.FormID));
        dataTest.sort((a,b)=> a.DisplayOrder - b.DisplayOrder);
        if(dataTest.length % 2 === 1){
            dataTest.push({
                isHidden: true
            })
        };
        return (
            <View style={styles.container}>
                <ScrollView style={{width:'100%', height:'100%'}}>
                    <View style={styles.viewMenu}>
                        {dataTest && dataTest.map((item, idx)=>{
                            switch (item.FormID){
                                case  'A54F2500' :  item.icon = require('../../assets/images/home/mss/A54F2500.png'); break;
                                case  'A54F2520' :  item.icon = require('../../assets/images/home/mss/A54F2520.png'); break;
                                case  'A54F2540' :  item.icon = require('../../assets/images/home/mss/A54F2540.png'); break;
                                case  'A54F2560' :  item.icon = require('../../assets/images/home/mss/A54F2560.png'); break;
                                case  'A54F2580' :  item.icon = require('../../assets/images/home/mss/A54F2580.png'); break;
                                case  'A54F2600' :  item.icon = require('../../assets/images/home/mss/A54F2600.png'); break;
                                case  'A54F2620' :  item.icon = require('../../assets/images/home/mss/A54F2620.png'); break;
                            }
                            let voucherNum = this.getNumberVoucher(item.FormID);
                            return(
                                    <MenuItem key={idx}
                                              data={item}
                                              voucherNum={voucherNum}
                                              onLink={()=>this.onLink(item)}
                                    />
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

class MenuItem extends React.PureComponent{

    onLink = () => {
        if(this.props.onLink) this.props.onLink();
    };

    render(){
        const {data, voucherNum} = this.props;
        if(data.isHidden) return <View style={[styles.itemView, {opacity:0}]}/>;
        else return(
            <TouchableOpacity style={styles.itemView} onPress={this.onLink}>
                <View style={{
                    height:Scale(50),
                    width: Scale(50),
                    borderRadius:Scale(25),
                    borderWidth:1,
                    borderColor:Config.gStyle.color_borderRadius,
                    // flexDirection:'row',
                    justifyContent:'center',
                    marginTop:Scale(6),
                    alignItems:'center'
                }}>
                    <Image style={{width: Scale(25), height: Scale(25)}}
                           source={data.icon ? data.icon : Config.imgDef}
                    />
                    <View style={{
                        width:Scale(18),
                        height: Scale(18),
                        borderColor: voucherNum ? Config.gStyle.color_def : Config.gStyle.color_6AC259,
                        borderRadius:Scale(9),
                        borderWidth:1,
                        backgroundColor: voucherNum ? Config.gStyle.color_def : Config.gStyle.color_6AC259 ,
                        position:'absolute',
                        right:0,
                        bottom:0,
                    }}>
                        {voucherNum > 0 && <Text style={{
                            height:'100%',
                            color:'white',
                            fontFamily:Config.getFont('Muli-Bold'),
                            fontSize:Scale(10),
                            lineHeight:Math.floor(Scale(13)),
                            textAlign:'center',
                            marginTop:Scale(2),
                        }}>{voucherNum}</Text>}
                        {voucherNum === 0 &&
                            <Icon style={{
                                        marginTop: Scale(2),
                                        textAlign: 'center',
                                        height: '100%',
                                    }}
                                  name={'check'}
                                  size={Scale(13)}
                                  color={"white"}/>
                        }
                    </View>
                </View>
                <Text style={styles.itemViewText}>
                    {data.FormDesc ? data.FormDesc : data.name}
                </Text>
            </TouchableOpacity>
        )
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
    viewMenu:{
        flex:1,
        width:'100%',
        marginBottom:Scale(20),
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        justifyContent:'center',
        // paddingHorizontal: Scale(16),
        paddingVertical: Scale(16)
    },
    txtName:{
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
        alignItems:'center',
    },
    imgBackground:{
        position:'absolute',
        width:Scale(148),
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        top:0,
        left:0,
        shadowOpacity: 0.1,

        // width:'100%',
    },
    imgFooter:{
        width:'100%',
        top:0,
        left:0,
        position:'absolute',
    },
    imgAva:{
        width:Scale(70),
        height:Scale(70),
        marginRight: Scale(12),
        marginLeft: Scale(26),
        borderRadius: Scale(35),
    },
    menuViewItem:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center'
    },
    menuViewBorder:{
        width:'90%',
        justifyContent:'center',
        height: 2,
        backgroundColor:'#E4E4E4'
    },
    itemView:{
        width:Scale(152),
        height: Scale(100),
        marginHorizontal: Scale(6),
        marginVertical: Scale(4),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: Scale(10),

        //ios
        shadowOpacity: 0.12,
        shadowRadius: 15,
        shadowOffset: {
            height: Scale(5),
            width: 0
        },

        //android
        elevation: 10

    },
    itemViewText:{
        fontFamily: Config.getFont('Muli'),
        fontSize:Scale(14),
        textAlign:'center',
        color:'#0F0F0F',
        marginTop: Scale(4),
        lineHeight:Math.floor(Scale(18)),
        // backgroundColor:'red',
        width:'80%',
        // justifyContent:'center'
    },
    txtInfo:{
        fontFamily: Config.getFont('Muli'),
        fontSize: Scale(20),
        lineHeight: Math.floor(Scale(25)),
        color: '#0F0F0F'
    }
};

export default connect(state=>({
    getListMenuMSS: state.main.getListMenuMSS,
    getListMenuHome: state.main.getListMenuHome,
    listVoucherNum: state.home.listVoucherNum,
    }),(dispatch)=>({
        navigationActions: bindActionCreators(navigationAction, dispatch),
        mainActions: bindActionCreators(mainActions, dispatch),
        homeActions: bindActionCreators(homeActions, dispatch),
    })
)(MenuMSSScreen);
