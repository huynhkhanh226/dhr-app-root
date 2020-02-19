
import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView, Image, TouchableOpacity

} from 'react-native';

import * as navigationAction from '../../navigation/redux/navigation_actions.js';
import * as mainActions from '../../redux/main/main_actions';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Config, {Scale} from '../../config';
import CImage from "../../libs/CImage/CImage";

class MenuScreen extends Component {

    constructor(props){
        super(props);
    }

    onLink = (item) => {
        const screen = Config.getForm(item.FormID);
        if(screen) this.props.navigationActions.changeScreen(screen);
        else Config.alertMess({code:'', message:Config.lang('PM_Chuc_nang_chua_phat_trien')})
    };

    render() {
        const {getListMenuHome} = this.props;
        // let dataTest =[
            // {
            //     id:'1',
            //     icon: require("../../assets/images/home/A54F2010.png"),
            //     name:'Xuất kho vật tư',
            //     link:'XuatKhoVatTuTabScreen'
            // }
            // ,{
            //     id:'2',
            //     icon:require("../../assets/images/home/A54F2020.png"),
            //     name:'Đề xuất vật tư',
            //     link: 'DeXuatVatTuTabScreen'
            // }
            // ,{
            //     id:'3',
            //     icon:require("../../assets/images/home/A54F2010.png"),
            //     name:'Mượn vật tư'
            // }
            // ,{
            //     id:'4',
            //     icon:require("../../assets/images/home/A54F2010.png"),
            //     name:'Trả vật tư',
            //     link:'TraHangVeKhoTongTabScreen'
            // }
            // ,{
            //     id:'5',
            //     icon:require("../../assets/images/home/A54F2010.png"),
            //     name:'Báo hàng'
            // }
            // ,{
            //     id:'6',
            //     icon:require("../../assets/images/home/A54F2010.png"),
            //     name:'Kiểm tra chất lượng'
            // }
            // ,{
            //     id:'7',
            //     icon:require("../../assets/images/home/A54F2010.png"),
            //     name:'Luân chuyển vật tư'
            // }
            // ,{
            //     id:'8',
            //     icon:require("../../assets/images/home/A54F2010.png"),
            //     name:'Thông tin tồn kho'
            // }
        // ];
        let dataTest = getListMenuHome && getListMenuHome.length>0 ? getListMenuHome : [];
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
                    {/*<View style={{flex:1, flexDirection:'row', width:'100%', height: Scale(117), alignItems:'center', justifyContent:'flex-start'}}>*/}
                    {/*    <Image style={styles.imgFooter} source={require("../../assets/images/home/color-footer.png")}/>*/}
                    {/*    <CImage style={styles.imgAva}*/}
                    {/*            width={70}*/}
                    {/*            height={70}*/}
                    {/*            resizeMode={'cover'}*/}
                    {/*            sourceDef={require("../../assets/images/home/avatar.png")}*/}
                    {/*            colorDef={'transparent'}*/}
                    {/*            source={Config.profile && Config.profile.UserPictureURL ? Config.profile.UserPictureURL : null}*/}
                    {/*    />*/}
                    {/*    <View>*/}
                    {/*        <Text style={styles.txtInfo}>Hi, {Config.profile && Config.profile.UserNameU ? Config.profile.UserNameU : ''}</Text>*/}
                    {/*        <Text style={styles.txtInfo}>{Config.profile && Config.profile.UserDepartmentU ? Config.profile.UserDepartmentU : ''}</Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    <View style={styles.viewMenu}>
                        {dataTest && dataTest.map((item, idx)=>{
                            let icon = null;
                            switch (item.FormID){
                                case  'A54F2010' :  item.icon = require('../../assets/images/home/A54F2010.png'); break;
                                case  'A54F2020' :  item.icon = require('../../assets/images/home/A54F2020.png'); break;
                                case  'A54F2040' :  item.icon = require('../../assets/images/home/A54F2040.png'); break;
                                case  'A54F2060' :  item.icon = require('../../assets/images/home/A54F2060.png'); break;
                                case  'A54F2080' :  item.icon = require('../../assets/images/home/A54F2080.png'); break;
                                case  'A54F2100' :  item.icon = require('../../assets/images/home/A54F2100.png'); break;
                                case  'A54F2120' :  item.icon = require('../../assets/images/home/A54F2120.png'); break;
                                case  'A54F2140' :  item.icon = require('../../assets/images/home/A54F2140.png'); break;
                                case  'A54F2160' :  item.icon = require('../../assets/images/home/A54F2160.png'); break;
                            }
                            return(
                                    <MenuItem key={idx}
                                              data={item}
                                          onLink={()=>this.onLink(item)}/>
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
        const {data} = this.props;
        if(data.isHidden) return <View style={[styles.itemView, {opacity:0}]}/>
        else return(
            <TouchableOpacity style={styles.itemView} onPress={this.onLink}>
                <Image style={{width: Scale(25), height: Scale(25)}}
                       source={data.icon ? data.icon : Config.imgDef}
                />
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
        paddingTop: Scale(15),
        marginBottom:Scale(20),
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        justifyContent:'center',
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
        height:Scale(140)
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
        backgroundColor:  'white',
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
        marginTop: Scale(8),
        lineHeight:Math.floor(Scale(18))
    },
    txtInfo:{
        fontFamily: Config.getFont('Muli'),
        fontSize: Scale(20),
        lineHeight: Math.floor(Scale(25)),
        color: '#0F0F0F'
    }
};

export default connect(state=>({
    getListMenuHome: state.main.getListMenuHome,
    }),(dispatch)=>({
        navigationActions: bindActionCreators(navigationAction, dispatch),
        mainActions: bindActionCreators(mainActions, dispatch),
    })
)(MenuScreen);
