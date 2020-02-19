import React, {Component} from 'react';
import {
    View,
    Alert, KeyboardAvoidingView, Platform,
} from 'react-native';

import CTab from "../../libs/CTab/CTab";
import Header from "../../components/Header";
import Config, {Scale} from '../../config';

import PhieuBaoHongScreen from "./PhieuBaoHongScreen";
import DanhSachPhieuBaoHongScreen from "./DanhSachPhieuBaoHongScreen";
import CLoading from "../../libs/CLoading/CLoading";

// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class PhieuBaoHongTabScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            isTab:0,
            isLoading: false
        }
    }

    changeTab  = (number) => {
        if(this.refs['CTab'])this.refs['CTab']._handleIndexChange(number);
    };

    toggleLoading = () => {
        this.setState({
            isLoading: !this.state.isLoading
        })
    };

    render() {

        const dataTab = [
            {
                key: 'PhieuBaoHongScreen',
                title: Config.lang('PM_Them_phieu'),
                screen:()=> <PhieuBaoHongScreen changeTab={this.changeTab}
                                         onLoading={this.toggleLoading}
                                          navigation={this.props.navigation}
                />,
                // icon:require('../../assets/images/tab-bar/home.png'),
                // iconActive:require('../../assets/images/tab-bar/home-active.png'),
                percent: 50
            },
            {
                key: 'DanhSachPhieuBaoHongScreen',
                title: Config.lang('PM_Danh_sach'),
                screen:()=><DanhSachPhieuBaoHongScreen onLoading={this.toggleLogin}
                                           navigation={this.props.navigation}/>,
                // icon:require('../../assets/images/tab-bar/notifycation.png'),
                // iconActive:require('../../assets/images/tab-bar/notifycation-active.png'),
                percent: 50
            },
        ];

        const {isTab, isLoading} = this.state;
        return (
            <View style={styles.container}>

                <Header navigation={this.props.navigation}
                            showBack={true}
                            headerName={Config.lang("PM_Phieu_bao_hong")}
                />
                {(!isTab || isTab) && <CTab swipeEnabled={false}
                     height={30}
                     ref={'CTab'}
                     data={dataTab}
                     colorInActive={Config.gStyle.color_def1}
                     colorActive={Config.gStyle.color_def}
                     paddingHorizontal={Scale(15)}
                     onChange={(number) => {
                         this.setState({
                             isTab: number
                         })
                     }}
                     styleTabBar={{flex: 1, width: '100%', marginTop: Scale(5)}}
                />}
                {isLoading && <CLoading/>}
            </View>
        );
    }

}



export default PhieuBaoHongTabScreen;

const styles = {
    container: {
        flex: 1,
        width:'100%',
        // justifyContent: 'center'
    },
};
