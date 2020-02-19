
import React, { Component } from 'react';

import {
    View,
    ActivityIndicator,
    Platform,
    Alert,
    Image,
    Dimensions, BackHandler
} from 'react-native';

import * as navigationAction from '../../navigation/redux/navigation_actions.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mainActions from '../../redux/main/main_actions';
import * as homeActions from '../../redux/home/home_actions';
import { NavigationActions, StackActions } from 'react-navigation';
import Config, { Scale } from '../../config';

import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";
import SetupNotification from "./SetupNotification";

import LoginIcon from '../../assets/images/ic_app.svg';
class MainScreen extends Component {

    onBackPress = () => {
        if (Config.currentScreen && Config.currentScreen.routeName === 'HomeScreen2') return true;
        else this.props.navigation.goBack(null);
        return true;
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    _netChange = ({ isConnected }) => {
        if (!isConnected && Config.isNetwork !== 'CLOSE') {
            Config.isNetwork = 'CLOSE';
            Alert.alert('', Config.lang("PM_Khong_co_mang"));
            this.props.mainActions.netWorkError();
        }
        else if (isConnected && Config.isNetwork === 'CLOSE') {
            Config.isNetwork = 'OPEN';
            NetInfo.removeEventListener('connectionChange', this._netChange);
            const resetAction = StackActions.reset({
                index: 0,
                key: null,
                actions: [
                    NavigationActions.navigate({ routeName: "Main" })
                ]
            });
            this.props.navigation.dispatch(resetAction);
        }
    };

    componentDidMount = async () => {
        NetInfo.addEventListener(this._netChange);
        this.isIphoneX();
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

        let accountSaved = await AsyncStorage.getItem('LOGINHR');
        accountSaved = accountSaved && Config.isJSON(accountSaved) ? JSON.parse(accountSaved) : null;

        let listCompany = await AsyncStorage.getItem('COMPANYHR');
        listCompany = listCompany && Config.isJSON(listCompany) ? JSON.parse(listCompany) : [];


        if (Config.profile && Config.profile.UserID === 'GUEST') {
            this.props.navigationActions.changeScreen('HomeScreen2');
        }
        else {
            this.props.mainActions.loading((err, data) => {
                if (Config.profile && Config.profile.UserID) {
                    // this.props.mainActions.getListMenuHome((error1, data1) => {
                    //     if (error1) {
                    //         Config.alertMess(error1);
                    //     }
                    //     else if (data1) {
                    //         this.props.mainActions.getBadge();
                    //         this.props.homeActions.getVoucherNum();
                    //     }
                    //     this.props.navigationActions.changeScreen('HomeScreen2');
                    //     // this.props.navigationActions.changeScreen('XacNhanDeXuatVatTuTabScreen');
                    // });
                    // this.props.mainActions.getListMenuMSS((error2, data2) => {
                    //     if (error2) {
                    //         Config.alertMess(error2);
                    //     }
                    // });
                    this.props.navigationActions.changeScreen('HomeScreen2');
                    Config.hostCDN = Config.getSetting('CDN_API_URL');
                    Config.secretCDN = Config.getSetting('CDN_API_SECRET');
                    this.props.mainActions.getTokenCDN();
                }
                else {
                    if (err && err.code) {
                        Config.alertMess(err);
                    }
                    this.props.navigationActions.changeScreen('LoginScreen', { listCompany: listCompany, accountSaved: accountSaved });
                }
            });
        }
    };

    isIphoneX = () => {
        const dimen = Dimensions.get('window');
        if (Platform.OS === 'ios' &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
        ) {
            Config.isIphoneX = true;
        }
    };

    render() {
        const { image } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    {image && <Image style={styles.splash} source={{ uri: image }} />}
                    {/* <Image style={styles.iconApp} source={Config.iconApp}/> */}
                    <LoginIcon width={Scale(80)} height={Scale(80)} />
                    {/*<ActivityIndicator animating size="large" />*/}
                </View>
                <SetupNotification />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        position: 'relative'
    },
    splash: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'cover',
    },
    iconApp: {
        width: Scale(80),
        height: Scale(80),
    }
};

export default connect(state => ({
    token: state.main.token,
    setting: state.main.setting,
    profile: state.main.profile,
}), (dispatch) => ({
    navigationActions: bindActionCreators(navigationAction, dispatch),
    mainActions: bindActionCreators(mainActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch),
})
)(MainScreen);
