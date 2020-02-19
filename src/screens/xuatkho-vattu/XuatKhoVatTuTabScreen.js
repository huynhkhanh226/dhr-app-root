import React, {Component} from 'react';
import {
    View,
    Alert, KeyboardAvoidingView, Platform,
} from 'react-native';

import CTab from "../../libs/CTab/CTab";
import Header from "../../components/Header";
import Config, {Scale} from '../../config';

import XuatKhoVatTu from "./XuatKhoVatTuScreen";
import DanhSachXuatKho from "./DanhSachXuatKhoScreen";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class XuatKhoVatTuTabScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            isTab:0
        }
    }

    changeTab  = (number) => {
        if(this.refs['CTab'])this.refs['CTab']._handleIndexChange(number);
    };

    render() {

        const dataTab = [
            {
                key: 'XuatKhoVatTu',
                title: Config.lang('PM_Xuat_kho'),
                screen:()=> <XuatKhoVatTu changeTab={this.changeTab}
                                          navigation={this.props.navigation}
                />,
                percent: 35
            },
            {
                key: 'DanhSachXuatKho',
                title: Config.lang('PM_Danh_sach_xuat_kho'),
                screen:()=><DanhSachXuatKho navigation={this.props.navigation}/>,
                percent: 65
            },
        ];

        const {isTab} = this.state;
        return (
            <View style={styles.container}>

                <Header navigation={this.props.navigation}
                            showBack={true}
                            headerName={Config.lang('PM_Xuat_kho_vat_tu')}
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
            </View>
        );
    }

}



export default XuatKhoVatTuTabScreen;

const styles = {
    container: {
        flex: 1,
        width:'100%',
        // justifyContent: 'center'
    },
};
