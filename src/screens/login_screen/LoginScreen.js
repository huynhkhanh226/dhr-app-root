
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Platform,
    Keyboard, Alert
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as navigationAction from '../../navigation/redux/navigation_actions.js';
import * as mainActions from '../../redux/main/main_actions';

import { NavigationActions, StackActions } from "react-navigation";

import Config, { Scale } from '../../config/index';
import CForm from "../../libs/CForm/CForm";
import CButton from "../../libs/CButton/CButton";
import CImage from "../../libs/CImage/CImage";
import ScrollView from "../../libs/CScrollView/CScrollView";
import moment from "moment";
import LoginIcon from '../../assets/images/ic_app.svg';
class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
            saveAccount: !!props.navigation.state.params.accountSaved,
        });
    }

    componentDidMount = () => {
        this.getCompany();
    };

    getCompany = () => {
        this.props.mainActions.getSetting();
        this.props.mainActions.getListCompany((err) => {
            if (err) {
                Config.alertMess({ code: '', message: err.message });
            }
        });
    };

    onLogin1 = () => {
        Config.profile = {
            UserID: 'GUEST',
            UserNameU: 'Lisa',
            UserDepartmentU: 'Nhân viên Kinh doanh',
            UserPictureURL1: require('../../assets/images/home/ava-guest.png'),
            Email: 'Lisa@diginet.com.vn',
            TelNumber: '09166314xx',
            BirthDate: moment('20/05/1996', 'DD/MM/YYYY').format(),
            UserAddress: '341 Điện Biên Phủ, phường 15, quận Bình Thạnh, TP.HCM ',
            DateEntered: moment('07/05/2018', 'DD/MM/YYYY').format()

        };
        const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({ routeName: 'Main' })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };

    onLogin = (isClient) => {
        if (this.state.isSubmit) return;
        Keyboard.dismiss();
        let cForm = null;

        //isReview dùng để review apple store
        let isReview = Config.getSetting('IS_REVIEW');
        isReview = isReview ? JSON.parse(isReview) : null;
        isReview = isReview ? isReview.APM : null;

        if (isReview === 'ON' && isClient === true) {
            cForm = {
                companyId: { value: 'erp.com-d1' },
                email: { value: 'ANHNGUYET' },
                password: { value: '123' }
            }
        }
        else if (isClient === true) {
            this.onLogin1();
            return;
        }
        else {
            cForm = this.refs['CForm'].validate();
        }

        if (!cForm) return;
        this.setState({
            isSubmit: true
        });

        const company = Config.company.find(i => i.code.toLowerCase() === cForm.companyId.value.toLowerCase());
        if (!company) {
            Alert.alert('', Config.lang('PM_Company_id_khong_dung'));
            this.setState({ isSubmit: false });
            return;
        }
        else {
            Config.host = company.api;
            Config.secret = company.secret;
        }

        if (this.state.saveAccount) {
            AsyncStorage.setItem('LOGINHR', JSON.stringify({ companyId: cForm.companyId.value, user: cForm.email.value, pass: cForm.password.value }));
        }
        else {
            AsyncStorage.removeItem('LOGINHR');
        }

        Config.getToken = true;
        this.props.mainActions.getToken('normal', (errToken, dataToken) => { //params  is  ['normal', 'diginet']
            Config.getToken = false;
            if (errToken) {
                Config.alertMess(errToken);
                Config.host = Config.hostDigiNet;
                Config.secret = Config.secretDigiNet;
                AsyncStorage.removeItem('HOSTClIENT');
                this.setState({ isSubmit: false });
            }
            else if (dataToken) {
                let params = {
                    username: cForm.email.value,
                    password: cForm.password.value,
                    company: company.code
                };
                this.props.mainActions.login(params, (error, data) => {
                    if (error) {
                        let errorCode = error.code || null;
                        let message = "";
                        switch (errorCode) {
                            case "US004":
                                message = Config.lang("PM_Tai_khoan_dang_nhap_hoac_mat_khau_khong_dung");
                                break;
                            case "US029":
                                message = Config.lang("PM_Tai_khoan_khong_co_quyen");
                                break;
                            case "US033":
                                message = Config.lang("PM_Tai_khoan_bi_khoa_10_phut");
                                break;
                            default:
                                message = error.message || Config.lang("PM_Loi_chua_xac_dinh");
                                break;
                        }
                        Config.alertMess({ code: '', message: message });
                        this.setState({ isSubmit: false });
                        Config.host = Config.hostDigiNet;
                        Config.secret = Config.secretDigiNet;
                        AsyncStorage.removeItem('HOSTClIENT');
                        return false;
                    }
                    if (data) {
                        AsyncStorage.setItem('HOSTClIENT', JSON.stringify({ host: Config.host, secret: Config.secret }));
                        let params1 = {
                            md: 'unknown',
                            token: Config.deviceToken,
                            os: Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
                            language: Config.language,
                            AppID: 'APM'
                        };
                        this.props.mainActions.addDevice(params1);
                        const { listCompany } = this.props.navigation.state.params;
                        if (!listCompany.includes(company.code)) {
                            listCompany.push(company.code);
                            AsyncStorage.setItem('COMPANYHR', JSON.stringify(listCompany));
                        }

                        let user = data.user || {};
                        const expire = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

                        Config.token = {
                            id: data.token,
                            expire: expire
                        };

                        user.type = 2;
                        user.localHost = cForm.companyId.value;
                        AsyncStorage.setItem('PROFILEHR', JSON.stringify(user));
                        AsyncStorage.setItem('TOKENHR', JSON.stringify(Config.token));
                        this.setState({ isSubmit: false });

                        this.props.mainActions.getSetting((err, data) => {
                            if (data) {
                                this.props.mainActions.getTokenCDN((err, data) => {
                                    if (data) {
                                        const resetAction = StackActions.reset({
                                            index: 0,
                                            key: null,
                                            actions: [
                                                NavigationActions.navigate({ routeName: 'Main' })
                                            ]
                                        });
                                        this.props.navigation.dispatch(resetAction);
                                    }
                                    else {
                                        Config.alertMess(err);
                                    }
                                });
                            } else {
                                Config.alertMess(err);
                            }
                        });

                    }
                });
            }
            else {
                Config.host = Config.hostDigiNet;
                Config.secret = Config.secretDigiNet;
                AsyncStorage.removeItem('HOSTClIENT');
                this.setState({ isSubmit: false });
            }
        }, true);

    };

    render() {
        const { saveAccount } = this.state;
        const { accountSaved, listCompany } = this.props.navigation.state.params;
        const logoImg = Config.getSetting('LOGO_PM_URL') ? Config.getSetting('LOGO_PM_URL') : null;
        const slogan = Config.getSetting('SLOGAN_SUPPORT') ? Config.getSetting('SLOGAN_SUPPORT') : Config.lang('PM_Chao_mung_login');
        // const email = Config.getSetting('MAIL_SUPPORT') ? Config.getSetting('MAIL_SUPPORT') : Config.lang("PM_Email_ho_tro");
        // const phone = Config.getSetting('PHONE_SUPPORT') ? Config.getSetting('PHONE_SUPPORT') : Config.lang("PM_SDT_ho_tro");
        // const slogan = Config.lang('PM_Chao_mung_login');
        this.saveAccount = !!accountSaved;

        return (
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps={'handled'}
                    style={{ width: '100%' }}
                    flex={1}
                >
                    <KeyboardAvoidingView style={styles.container}
                        behavior={Platform.OS === "ios" ? "padding" : null}
                    >
                        <View style={{ alignItems: 'center' }}>
                            {/* <CImage style={styles.logo1}
                            width={100}
                            height={100}
                            resizeMode="contain"
                            sourceDef={require('../../assets/images/ic_app.png')}
                        /> */}
                            <LoginIcon
                                width={Scale(100)}
                                height={Scale(100)} />
                            {/*<Text style={styles.txt2}>*/}
                            {/*    {slogan}*/}
                            {/*</Text>*/}
                            {/*<Image source={require('../../assets/images/logo-app.png')}*/}
                            {/*       style={styles.logo1}*/}
                            {/*/>*/}
                            <Text style={styles.txt2}>
                                {slogan}
                            </Text>
                        </View>
                        <CForm
                            ref="CForm"
                            data={[
                                {
                                    key: 'TEXTSELECT',
                                    name: "companyId",
                                    value: accountSaved && accountSaved.companyId ? accountSaved.companyId : 'erp.com-d1',
                                    width: 280,
                                    height: 40,
                                    placeholder: "Company Id",
                                    placeholderTextColor: 'rgba(89, 97, 123,0.4)',
                                    dataSelect: listCompany,
                                    style: {
                                        marginBottom: 0,
                                        marginTop: Scale(40)
                                    },
                                    returnKeyType: "next",
                                    styleText: {
                                        fontSize: Scale(15),
                                        color: Config.gStyle.color_text,
                                        fontFamily: Config.getFont('Muli'),
                                        paddingLeft: Scale(40),
                                        borderRadius: Scale(20)
                                    },
                                    feedback: "BORDER",
                                    validators: 'isRequired',
                                    image: require('../../assets/images/login/icon-company.png'),
                                    styleImage: {
                                        width: Scale(15),
                                        height: Scale(15),
                                        position: 'absolute',
                                        top: Scale(11),
                                        left: Scale(11),
                                    },
                                    // tooltipError:Config.lang('PM_Ten_dang_nhap_la_bat_buoc')
                                },
                                {
                                    key: 'TEXT',
                                    name: "email",
                                    value: accountSaved && accountSaved.user ? accountSaved.user : 'lemonadmin',
                                    width: 280,
                                    height: 40,
                                    placeholder: "Tên đăng nhập",
                                    placeholderTextColor: 'rgba(89, 97, 123,0.4)',
                                    style: {
                                        marginBottom: 0,
                                        marginTop: Scale(10)
                                    },
                                    returnKeyType: "next",
                                    styleText: {
                                        fontSize: Scale(15),
                                        color: Config.gStyle.color_text,
                                        fontFamily: Config.getFont('Muli'),
                                        paddingLeft: Scale(40),
                                        borderRadius: Scale(20)
                                    },
                                    feedback: "BORDER",
                                    validators: 'isRequired',
                                    image: require('../../assets/images/login/icon-user.png'),
                                    styleImage: {
                                        width: Scale(15),
                                        height: Scale(15),
                                        position: 'absolute',
                                        top: Scale(11),
                                        left: Scale(11),
                                    },
                                    // tooltipError:Config.lang('PM_Ten_dang_nhap_la_bat_buoc')
                                },
                                {
                                    key: 'TEXT',
                                    name: "password",
                                    width: 280,
                                    height: 40,
                                    value: accountSaved && accountSaved.pass ? accountSaved.pass : '123',
                                    placeholder: "Mật khẩu",
                                    feedback: "BORDER",
                                    placeholderTextColor: 'rgba(89, 97, 123,0.4)',
                                    style: {
                                        marginBottom: 0,
                                        marginTop: Scale(10),
                                        borderRadius: Scale(20)
                                    },
                                    returnKeyType: "next",
                                    image: require('../../assets/images/login/icon-pass.png'),
                                    styleImage: {
                                        width: Scale(15),
                                        height: Scale(15),
                                        position: 'absolute',
                                        top: Scale(12),
                                        left: Scale(11),
                                    },
                                    onSubmitEditing: this.onLogin,
                                    password: true,
                                    styleText: {
                                        fontSize: Scale(15),
                                        color: Config.gStyle.color_text,
                                        fontFamily: Config.getFont('Muli'),
                                        paddingLeft: Scale(40),
                                        borderRadius: Scale(20)
                                    },
                                    stylePassWord: {
                                        top: Scale(12),
                                        right: Scale(12)
                                    },
                                    // tooltipError:Config.lang('PM_Mat_khau_la_bat_buoc')
                                }
                            ]}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: Scale(280) }}>
                            <CButton
                                active={saveAccount}
                                style={{ width: Scale(150), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                styleCustomText={{ marginLeft: Scale(10), color: 'rgba(89, 97, 123,0.4)', fontSize: Scale(15), fontFamily: Config.getFont('Muli') }}
                                styleCustomIcon={{ width: Scale(18), height: Scale(18) }}
                                icon={require('../../assets/images/libs/icon_uncheck.png')}
                                iconActive={require('../../assets/images/libs/icon_check.png')}
                                onPress={(props, active) => { this.setState({ saveAccount: active }) }}
                                text={Config.lang("PM_Nho_mat_khau")} />
                        </View>
                        <CButton
                            width={280}
                            height={40}
                            style={styles.btnLogin}
                            styleCustomText={styles.txtBtnLogin}
                            loading={this.state.isSubmit}
                            // colorLoading={'white'}
                            onPress={this.onLogin}
                            text={Config.lang("PM_Dang_nhap").toUpperCase()}
                        />
                        <CButton
                            width={280}
                            height={20}
                            style={styles.btnLogin1}
                            styleCustomText={styles.txtBtnLogin1}
                            // colorLoading={'white'}
                            onPress={() => this.onLogin(true)}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            text={Config.lang("PM_Dang_nhap_la_khach")}
                        />
                        <Text style={styles.txtNote}>
                            {Config.lang('PM_Dang_nhap_la_khach_chu_thich')}
                        </Text>
                        {/*{(phone || email) &&*/}
                        {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Scale(20)}}>*/}
                        {/*    <Image source={require('../../assets/images/login/icon-support.png')}*/}
                        {/*           style={styles.iconSupport}/>*/}
                        {/*    <View>*/}
                        {/*        {phone &&*/}
                        {/*        <Text style={styles.txtSupport1}>*/}
                        {/*            {Config.lang("PM_Ho_tro")}*/}
                        {/*            <Text style={styles.txtSupport}>*/}
                        {/*                {phone}*/}
                        {/*            </Text>*/}
                        {/*        </Text>*/}
                        {/*        }*/}
                        {/*        {email &&*/}
                        {/*        <Text style={styles.txtSupport1}>*/}
                        {/*            {Config.lang("PM_Email")}*/}
                        {/*            <Text style={styles.txtSupport}>*/}
                        {/*                {email}*/}
                        {/*            </Text>*/}
                        {/*        </Text>*/}
                        {/*        }*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                        {/*}*/}
                    </KeyboardAvoidingView>


                </ScrollView>
            </View>
        );
    }

}
export default connect(state => ({

    company: state.main.company

}),
    (dispatch) => ({
        mainActions: bindActionCreators(mainActions, dispatch),
        navigationAction: bindActionCreators(navigationAction, dispatch)
    })
)(LoginScreen);

const styles = {
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    logo1: {
        height: Scale(100),
        resizeMode: 'contain',
        backgroundColor: Config.gStyle.color_white
    },
    viewText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Scale(60),
        justifyContent: 'center'
    },
    txt1: {
        color: Config.gStyle.color_text,
        fontSize: Scale(12)

    },
    txt2: {
        fontSize: Scale(18),
        color: Config.gStyle.color_text,
        textAlign: 'center',
        width: Scale(375),
        marginTop: Scale(20),
        fontFamily: Config.getFont('Muli'),
        fontWeight: "100",
        lineHeight: Math.floor(Scale(22)),
    },
    txtSupport: {
        fontFamily: Config.getFont('Muli-Bold'),
        color: Config.gStyle.color_black
    },
    txtSupport1: {
        color: Config.gStyle.color_text,
        fontSize: Scale(15)
    },
    txtLogin: {
        color: '#00CDAC',
        textDecorationLine: 'underline',
        marginLeft: Scale(5),
        fontSize: Scale(12)
    },
    txtForgotPass: {
        width: Scale(260),
        textAlign: 'right',
        fontSize: Scale(10)
    },

    styleIconFeedback: {
        position: 'absolute',
        right: 0,
        top: Scale(10),
        width: Scale(20),
        height: Scale(20)
    },

    iconSupport: {
        width: Scale(40),
        height: Scale(40),
        marginRight: Scale(10)
    },

    btnLogin: {
        marginTop: Scale(20),
        marginBottom: Scale(20),
        borderRadius: Scale(25),
        backgroundColor: Config.gStyle.color_def
    },

    txtBtnLogin: {
        color: Config.gStyle.color_white,
        fontSize: Scale(18),
        lineHeight: Math.floor(Scale(24)),
        fontFamily: Config.getFont('Muli')
    },

    btnLogin1: {
        marginTop: Scale(65),
        marginBottom: Scale(4),
    },

    txtBtnLogin1: {
        color: Config.gStyle.color_def,
        fontSize: Scale(16),
        lineHeight: Math.floor(Scale(20)),
        fontFamily: Config.getFont('Muli'),
    },

    txtNote: {
        color: Config.gStyle.color_text,
        fontSize: Scale(12),
        fontFamily: Config.getFont('Muli'),
        lineHeight: Math.floor(Scale(15)),
    }
};
