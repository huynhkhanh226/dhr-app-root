import React, {Component} from 'react';
import {
    View,
} from 'react-native';

import CTab from "../../libs/CTab/CTab";
import Header from "../../components/Header";
import Config, {Scale} from '../../config';

import ChoXacNhanTraHangScreen from "./ChoXacNhanTraHangScreen";
import DaXacNhanTraHangScreen from "./DaXacNhanTraHangScreen";
import TatCaTraHangScreen from "./TatCaTraHangScreen";
import CLoading from "../../libs/CLoading/CLoading";

class XacNhanTraHangKhoTabScreen extends Component {

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
                key: 'ChoXacNhanTraHangScreen',
                title: Config.lang('PM_Cho_xac_nhan'),
                screen:()=> <ChoXacNhanTraHangScreen
                    // onLoading={this.toggleLoading}
                                                changeTab={this.changeTab}
                                                navigation={this.props.navigation}
                />,
                // icon:require('../../assets/images/tab-bar/home.png'),
                // iconActive:require('../../assets/images/tab-bar/home-active.png'),
                percent: 40
            },
            {
                key: 'DaXacNhanTraHangScreen',
                title: Config.lang('PM_Da_xac_nhan'),
                screen:()=><DaXacNhanTraHangScreen onLoading={this.toggleLoading}
                                                  navigation={this.props.navigation}/>,
                // icon:require('../../assets/images/tab-bar/notifycation.png'),
                // iconActive:require('../../assets/images/tab-bar/notifycation-active.png'),
                percent: 40
            },
            {
                key: 'TatCaTraHangScreen',
                title: Config.lang('PM_Tat_ca'),
                screen:()=><TatCaTraHangScreen onLoading={this.toggleLoading}
                                                  navigation={this.props.navigation}/>,
                // icon:require('../../assets/images/tab-bar/notifycation.png'),
                // iconActive:require('../../assets/images/tab-bar/notifycation-active.png'),
                percent: 20
            },
        ];

        const {isTab, isLoading} = this.state;
        return (
            <View style={styles.container}>

                <Header navigation={this.props.navigation}
                            showBack={true}
                            headerName={Config.lang("PM_Xac_nhan_yeu_cau_tra_hang")}
                            // btnRight={!isTab ? 'Lưu' : ' '}
                            // colorBtnRight={Config.gStyle.color_def1}
                            // onRight={()=>{
                            //     console.log(this.refs['XuatKhoVatTu123']);
                            //     console.log(this.props);
                            //     this.changeTab(1);
                            //     // console.log(this.refs['CTab'].dataRoutes);
                            //     // this.refs['CTab'].dataRoutes[0].screen.onSave()
                            // }}
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

export default XacNhanTraHangKhoTabScreen;

const styles = {
    container: {
        flex: 1,
        width:'100%',
    },
};
