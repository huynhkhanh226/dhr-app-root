import React, { Component } from 'react'
import {
    View,
    ScrollView,
    Text
} from 'react-native';

import Config, { Scale } from '../../config';
import CTab from "../../libs/CTab/CTab";
import EssScreen from '../ess_screen/EssScreen';
import MssScreen from '../mss_screen/MssScreen';
import NotificationScreen2 from '../notification_screen/NotificationScreen2';
import SettingScreen from "../setting_screen/SettingScreen";
import AsyncStorage from "@react-native-community/async-storage";

import IconNotification from '../../assets/images/tab-bar/ic_notification.svg';
import IconNotificationActive from '../../assets/images/tab-bar/ic_notification_active.svg';
import IconSetting from '../../assets/images/tab-bar/ic_setting.svg';
import IconSettingActive from '../../assets/images/tab-bar/ic_setting_active.svg';

import { NavigationActions, StackActions } from "react-navigation";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import * as mainActions from "../../redux/main/main_actions";
import * as homeActions from "../../redux/home/home_actions";
class HomeScreen2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationRefresh: 0
        }
    }

    logOut = () => {
        Config.alertMess({ message: Config.lang('PM_Ban_co_muon_dang_xuat_tai_khoan') }, 'YES_NO', () => {
            this.props.mainActions.delDevice({ tokenDevice: Config.deviceToken });
            AsyncStorage.removeItem('TOKENHR');
            AsyncStorage.removeItem('PROFILEHR');
            AsyncStorage.removeItem('ADMINHR');
            AsyncStorage.removeItem('SETTINGHR');
            this.props.mainActions.updateBadge(0);
            this.props.homeActions.clearListMenu();
            Config.host = Config.hostDigiNet;
            Config.secret = Config.secretDigiNet;
            const resetAction = StackActions.reset({
                index: 0,
                key: null,
                actions: [
                    NavigationActions.navigate({ routeName: 'Main' })
                ]
            });
            this.props.navigation.dispatch(resetAction);
        });
    };

    render() {
        const { badge, listVoucherNum } = this.props;
        const { notificationRefresh } = this.state;
        let dataTab = [
            {
                key: 'MssScreen',
                screen: MssScreen,
                // icon: require('../../assets/images/tab-bar/home.png'),
                // iconActive: require('../../assets/images/tab-bar/home-active.png'),
                title: 'MSS',
                percent: 25
            },
            {
                key: 'EssScreen',
                screen: () => <EssScreen />,
                // icon: require('../../assets/images/tab-bar/mss.png'),
                // iconActive: require('../../assets/images/tab-bar/mss-active.png'),
                title: 'ESS',
                percent: 25
            },
            {
                key: 'NotificationScreen',
                screen: () => <NotificationScreen2 />,
                // title: 'Notification Screen',
                // screen: () => <NotificationScreen mainActions={this.props.mainActions}
                //     listNoty={this.props.listNoty}
                //     homeActions={this.props.homeActions}
                //     navigation={this.props.navigationActions}
                //     notificationRefresh={this.state.notificationRefresh}
                // />,
                svgIcon: IconNotification,
                svgIconActive: IconNotificationActive,
                percent: 25,
                badge: true
            },
            {
                key: 'SettingScreen',
                // title: 'Setting Screen',
                screen: () => <SettingScreen logOut={this.logOut} />,
                svgIcon: IconSetting,
                svgIconActive: IconSettingActive,
                percent: 25
            },
        ];
        let opacityTabBar = 1;
        if (Config.profile && Config.profile.UserID === 'GUEST') {
            dataTab = [{
                key: 'SettingScreen',
                // title: 'Setting Screen',
                screen: () => <SettingScreen logOut={this.logOut} />,
                icon: require('../../assets/images/tab-bar/setting.png'),
                iconActive: require('../../assets/images/tab-bar/setting-active.png'),
                percent: 100
            }];
            opacityTabBar = 0;
        }
        return (
            <View style={styles.container}>
                <CTab swipeEnabled={true}
                    height={45}
                    indexDef={0}
                    data={dataTab}
                    tabBarPosition={'bottom'}
                    colorInActive={Config.gStyle.color_def1}
                    colorActive={Config.gStyle.color_def}
                    styleTabItem={{
                        borderRadius: 0,
                        // backgroundColor:'white',
                    }}
                    styleTabItemActive={{
                        backgroundColor: '#3CB37C',
                        height: 2
                    }}
                    tabBar={{
                        borderRadius: 0,
                        borderTopWidth: 1,
                        backgroundColor: 'white',
                        borderTopColor: '#707070'
                    }}
                    onChangeIndex={(index) => {
                        this.setState({
                            notificationRefresh: this.state.notificationRefresh + 1
                        })
                    }}
                    badge={this.props.badge}
                    styleTabBar={{ flex: 1, width: '100%', opacity: opacityTabBar }}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
    viewMenu: {
        width: '100%',
        paddingHorizontal: Scale(22),
        marginTop: Scale(58),
        marginBottom: Scale(30),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    txtName: {
        //fontFamily:'OpenSans-Bold',
        color: Config.gStyle.color_def,
        fontSize: Scale(11),
        lineHeight: Math.floor(Scale(14)),
        position: 'absolute',
        top: Scale(92),
        left: Scale(20)
    },
    txtDes: {
        fontFamily: 'OpenSans',
        color: Config.gStyle.color_DDDCDB,
        fontSize: Scale(9),
        lineHeight: Math.floor(Scale(11)),
        position: 'absolute',
        top: Scale(108),
        left: Scale(20)
    },
    viewItem: {
        width: Scale(158),
        height: Scale(148),
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgBackground: {
        position: 'absolute',
        width: Scale(148),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        shadowOpacity: 0.1,
    }
};

export default connect(state => ({
    badge: state.main.badge,
    listVoucherNum: state.home.listVoucherNum,
    listNoty: state.home.listNoty,
}), (dispatch) => ({
    navigationActions: bindActionCreators(navigationActions, dispatch),
    mainActions: bindActionCreators(mainActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch),
})
)(HomeScreen2);
