import React, {Component} from 'react';
import {
    View,
} from 'react-native';

import CTab from "../../libs/CTab/CTab";
import Header from "../../components/Header";
import Config, {Scale} from '../../config';

import ChoXacNhanDeXuatScreen from "./ChoXacNhanDeXuatScreen";
import DaXacNhanDeXuatScreen from "./DaXacNhanDeXuatScreen";
import TatCaDeXuatScreen from "./TatCaDeXuatScreen";
import CLoading from "../../libs/CLoading/CLoading";

class XacNhanDeXuatVatTuTabScreen extends Component {

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
                key: 'ChoXacNhanDeXuatScreen',
                title: Config.lang('PM_Cho_xac_nhan'),
                screen:()=> <ChoXacNhanDeXuatScreen
                    // onLoading={this.toggleLoading}
                                                changeTab={this.changeTab}
                                                navigation={this.props.navigation}
                />,
                // icon:require('../../assets/images/tab-bar/home.png'),
                // iconActive:require('../../assets/images/tab-bar/home-active.png'),
                percent: 33
            },
            {
                key: 'DaXacNhanDeXuatScreen',
                title: Config.lang('PM_Da_xac_nhan'),
                screen:()=><DaXacNhanDeXuatScreen onLoading={this.toggleLoading}
                                                  navigation={this.props.navigation}/>,
                // icon:require('../../assets/images/tab-bar/notifycation.png'),
                // iconActive:require('../../assets/images/tab-bar/notifycation-active.png'),
                percent: 33
            },
            {
                key: 'TatCaDeXuatScreen',
                title: Config.lang('PM_Tat_ca'),
                screen:()=><TatCaDeXuatScreen onLoading={this.toggleLoading}
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
                            headerName={Config.lang("PM_Xac_nhan_de_xuat_vat_tu")}
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

export default XacNhanDeXuatVatTuTabScreen;

const styles = {
    container: {
        flex: 1,
        width:'100%',
    },
};
