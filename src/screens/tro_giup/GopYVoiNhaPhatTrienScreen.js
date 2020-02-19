
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Linking,
    Platform, UIManager, ScrollView,
} from 'react-native';

import Config, {Scale} from "../../config";
import MapView, {Marker} from 'react-native-maps';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationAction from "../../navigation/redux/navigation_actions";
import * as homeActions from "../../redux/home/home_actions";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Header from "../../components/Header";
import CScrollView from "../../libs/CScrollView/CScrollView";

class GopYVoiNhaPhatTrienScreen extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        customClass={{
                            backgroundColor: '#FFFFFF',
                        }}
                        showBack={true}
                        headerName={Config.lang('PM_Gop_y_voi_nha_phat_trien')}
                        colorBtnRight={Config.gStyle.color_def1}
                />

                <CScrollView style={{flex: 1, width: '100%'}}
                            contentContainerStyle={styles.viewMenu}
                >
                    <MapView
                        style={{width:'100%', height: Config.w}}
                        // showsUserLocation={true}
                        // showsMyLocationButton={true}
                        zoomEnabled = {true}
                        initialRegion={{
                            latitude: 10.801797,
                            longitude: 106.710372,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: 10.801797,
                                longitude: 106.710372,
                            }}
                            title={'Công ty CP Định Gia Net'}
                            description={'341-343 Điện Biên Phủ, phường 15, quận Bình Thạnh, TP.HCM'}
                            icon={require('../../assets/images/logo.png')}
                            // style={{ width: Scale(40), height: Scale(20) }}
                        />
                    </MapView>
                    <View style={styles.viewTextTitle}>
                        <Text style={styles.textTitle}>{Config.lang('PM_Thong_tin_gop_y')}</Text>
                    </View>
                    <View style={styles.viewTouchItem}>
                        <TouchableOpacity
                            onPress={()=>{Linking.openURL('mailto:hr@diginet.com.vn')}}
                            style={styles.touchItem}>
                            <Icon size={Scale(30)}
                                  style={styles.iconMail}
                                  name={'email'}
                                  color={'black'}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{Linking.openURL('tel:02835123878')}}
                            style={styles.touchItemCt}>
                            <Icon5 size={Scale(25)}
                                   style={styles.iconPhone}
                                  name={'phone'}
                                  color={'black'}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{Linking.openURL('https://www.facebook.com/DigiNetCorporation/')}}
                            style={styles.touchItem}>
                            <Icon5 size={Scale(25)}
                                   style={styles.iconFb}
                                  name={'facebook-f'}
                                  color={'black'}/>
                        </TouchableOpacity>
                    </View>
                </CScrollView>

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
    viewTouchItem:{
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: Scale(60),
        paddingVertical: Scale(6),
    },
    touchItem:{
        height: Scale(68),
        width: Scale(68),
        borderRadius: Scale(34),
        borderWidth: 1,
        borderColor: Config.gStyle.color_borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconFb:{
        width:Scale(25),
        height: Scale(25),
        justifyContent:'center',
        textAlign:'center',
    },
    touchItemCt:{
        height: Scale(68),
        width: Scale(68),
        borderRadius: Scale(34),
        borderWidth: 1,
        borderColor: Config.gStyle.color_borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Scale(15)
    },
    viewTextTitle:{
        width:'100%',
        justifyContent:'center',
        paddingVertical:Scale(12),
    },
    textTitle:{
        fontSize: Scale(16),
        fontFamily: Config.getFont('Muli-Regular'),
        lineHeight: Math.floor(Scale(20)),
        color:Config.gStyle.color_242424,
        textAlign: 'center'
    },
    iconMail:{
        width:Scale(30),
        height: Scale(30),
    },
    iconPhone:{
        width:Scale(25),
        height: Scale(25),
    },
};

export default connect(state=>({
    listMenu: state.home.listMenu
    }),(dispatch)=>({
        navigationActions: bindActionCreators(navigationAction, dispatch),
        homeActions: bindActionCreators(homeActions, dispatch),
    })
)(GopYVoiNhaPhatTrienScreen);
