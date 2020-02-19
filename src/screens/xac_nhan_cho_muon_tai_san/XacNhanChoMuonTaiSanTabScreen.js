import React, {Component} from 'react';
import {
    View,
} from 'react-native';

import CTab from "../../libs/CTab/CTab";
import Header from "../../components/Header";
import Config, {Scale} from '../../config';

import ChoXacNhanChoMuonTaiSanScreen from "./ChoXacNhanChoMuonTaiSanScreen";
import DaXacNhanChoMuonTaiSanScreen from "./DaXacNhanChoMuonTaiSanScreen";
import TatCaXNChoMuonTaiSanScreen from "./TatCaXNChoMuonTaiSanScreen";
import CLoading from "../../libs/CLoading/CLoading";

class XacNhanChoMuonTaiSanTabScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            isTab:0,
            isLoading: false
        }
    }

    toggleLoading = () => {
        this.setState({
            isLoading: !this.state.isLoading
        })
    };

    changeTab  = (number) => {
        if(this.refs['CTab']) this.refs['CTab']._handleIndexChange(number);
    };

    render() {

        const dataTab = [
            {
                key: 'ChoXacNhanChoMuonTaiSanScreen',
                title: Config.lang('PM_Cho_xac_nhan'),
                screen:()=> <ChoXacNhanChoMuonTaiSanScreen
                    // onLoading={this.toggleLoading}
                                                changeTab={this.changeTab}
                                                navigation={this.props.navigation}
                />,
                // icon:require('../../assets/images/tab-bar/home.png'),
                // iconActive:require('../../assets/images/tab-bar/home-active.png'),
                percent: 33
            },
            {
                key: 'DaXacNhanChoMuonTaiSanScreen',
                title: Config.lang('PM_Da_xac_nhan'),
                screen:()=><DaXacNhanChoMuonTaiSanScreen onLoading={this.toggleLoading}
                                                  navigation={this.props.navigation}/>,
                // icon:require('../../assets/images/tab-bar/notifycation.png'),
                // iconActive:require('../../assets/images/tab-bar/notifycation-active.png'),
                percent: 33
            },
            {
                key: 'TatCaXNChoMuonTaiSanScreen',
                title: Config.lang('PM_Tat_ca'),
                screen:()=><TatCaXNChoMuonTaiSanScreen onLoading={this.toggleLoading}
                                                  navigation={this.props.navigation}/>,
                // icon:require('../../assets/images/tab-bar/notifycation.png'),
                // iconActive:require('../../assets/images/tab-bar/notifycation-active.png'),
                percent: 34
            },
        ];

        const {isTab, isLoading} = this.state;
        return (
            <View style={styles.container}>

                <Header navigation={this.props.navigation}
                            showBack={true}
                            headerName={Config.lang("PM_Xac_nhan_cho_muon_tai_san")}
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

export default XacNhanChoMuonTaiSanTabScreen;

const styles = {
    container: {
        flex: 1,
        width:'100%',
    },
};
