import React, { Component } from 'react';
window.navigator.userAgent = "react-native";

import {
    Dimensions,
    Platform,
    Alert,
    PixelRatio
} from 'react-native';

import { localize } from '../assets/localize';
const width = 360;

let Config = {

    // development
    host: "https://apricot.diginet.com.vn/lpt-api-dev",
    secret: "d9hc5d0k5LnJx9Cvk9NwOe3uGy0cW9ja2kv3dg",

    hostDigiNet: "https://apricot.diginet.com.vn/lpt-api-dev",
    secretDigiNet: "d9hc5d0k5LnJx9Cvk9NwOe3uGy0cW9ja2kv3dg",

    // hostCDN: 'http://apricot.diginet.com.vn:6040/v1',
    // secretCDN: 'd3hc5d0k5LnJx9Cvq3NwOe3uGy0cW9ja2kv3dg',

    hostCDN: '',
    secretCDN: '',

    // production
    // hostCDN: 'https://apricot.diginet.com.vn/cdn-dev',
    // secretCDN: 'd3hc5d0k5LnJx9Cvq3NwOe3uGy0cW9ja2kv3dg',
    // host: "https://apricot.diginet.com.vn/pan-api-prod/",
    // host: "http://teemie.spiritlabs.co/api", //old
    // secret:"p0hv6dk6LnJQx7Cvq3NwOe2uDy2fW1ja9kc0pe".

    // client LemonHR
    // host: "http://192.168.100.85/erp",
    // secret:"pi8u0y3t2r7e0w2q4l1k0j2ha43z3x3v2n0pan",
    //
    // hostDigiNet: "http://192.168.100.85/erp",
    // secretDigiNet:"pi8u0y3t2r7e0w2q4l1k0j2ha43z3x3v2n0pan",

    token: null,
    profile: null,
    setting: null,
    getToken: false,
    popup: null,
    viewType: 0,
    localization: null,

    tokenLocal: "",
    app_name: "",
    google_key: "",
    facebook_id: "",
    androidClientId: "",
    version: '1.0',
    deviceToken: null,
    badgeNumber: 0,
    registerNotification: false,
    isIphoneX: false,

    w: Dimensions.get('window').width,
    h: Dimensions.get('window').height,
    width: width,
    s: Dimensions.get('window').width / width,
    currentScreen: "",
    isNetwork: '',
    dataPush: null,
};

export function Scale(number, fontSize) {
    const newSize = number * Config.w / width;
    return (Platform.OS === 'ios' || !fontSize) ? newSize : (newSize - 2);
}

const gMess = {
    SYS001: 'System error!',
    SYS002: 'Authentication token is required',
    SYS003: 'Authentication token are not matching',
    SYS004: 'Authentication token is expired',
    SYS005: 'Authentication error request timeout',
    SYS006: 'Update token fail',
    SYS007: 'Socket error',
    SYS008: 'The data is not in JSON format',
    SYS009: 'The data is not in list',
    SYS010: 'The data is not number',
    SYS011: 'The data is unique',
    SYS012: 'The database error',
    SYS500: 'Server error',
    SYS404: 'Page is not found.',
    SYS015: 'User is not authentication. Please login again',
    SYS016: 'Your account logged in other device. Please login again',

    AU007: '',
    AU008: '',
    AU009: '',

    US002: '',
    US003: '',
    US004: 'Login fail. Your username or password is incorrect',
    US005: '',
    US006: 'Email is required',
    US007: 'Password is required',
    US009: '',
    US010: '',
    US0011: '',
    US0014: 'Please verify your email before using the app',
    US0015: '',
    US0016: '',
    US0017: 'Your account does not exit in our system',
    US0023: '',

    ST001: '',
    ST003: '',
    ST004: '',
    ST006: '',
    ST007: '',
    ST008: '',

    WW001: 'Invite member successful',
    WW002: 'Remove member successful',

    DIFF001: 'This user not verify.',
    DIFF002: 'Do you want to make this user to admin?',
    MINSTAFF: '* Select at least one staff.',
    NOSTAFF: '* Please invite member before create new event.',
    NOSTAFFINVITE: '* Please invite member before create new event. Do you want to invite members?',
    INFOMISS: 'Some information is missing or incorrect. Please correct the fields and try again.',
    NOSHIFT: 'Please make at least one shift before create the roster.',
    REMOVESURE: 'Do you want to delete?',
    NOTEAM: 'Your account has not been invited to any team yet, please contact your company admin for an invitation',
    NOTEAMOWNER: 'You need to create a team to start using Teemie app. Contact info@teemieapp.com for further support',
    CREATEROSTERADMIN: "You can't create roster for the admin",
};

const gStyle = {
    color_black: '#4A4A4A',
    color_white: 'white',
    // color_def: '#F94F37',
    // color_def1: '#F59688',
    color_def: '#23B06F',
    color_def1: '#7FE5B6',
    color_grey: '#9B9B9B',
    color_grey_light: '#F9F9F9',
    color_DDDCDB: '#DDDCDB',
    color_DDDCDC: '#DDDCDC',
    color_C4C4C4: '#C4C4C4',
    color_4A90E2: '#4A90E2',
    color_797979: '#797979',
    color_border: '#C4C5C7',
    color_979797: '#979797',
    color_F1F1F1: '#F1F1F1',
    color_CCC: '#CCC',
    color_D0021B: '#D0021B',
    color_pink: '#FC3955',
    color_666: '#666',
    color_orange: '#FF4600',
    color_878787: '#8787878',
    color_ECECEC: '#ECECEC',
    color_text: '#59617B',
    color_323232: '#323232',
    color_borderRadius: '#707070',
    color_6AC259: '#6AC259',

    multi: {
        fontFamily: 'Muli'
    },

    row: {
        flexDirection: 'row'
    },

    column: {
        flexDirection: 'column'
    },

    justify_center: {
        justifyContent: 'center'
    },

    align_center: {
        alignItems: 'center'
    },

    space_between: {
        justifyContent: 'space-between'
    },

    justify_start: {
        justifyContent: 'flex-start'
    },

    justify_end: {
        justifyContent: 'flex-end'
    },

    align_start: {
        alignItems: 'flex-start'
    },

    align_end: {
        alignItems: 'flex-end'
    },

    wrap: {
        flexWrap: 'wrap'
    },

    txtBold: {
        fontWeight: 'bold'
    }
};

const arrFont = {
    "Muli": {
        ios: "Muli",
        android: "muli"
    },
    "Muli-Bold": {
        ios: "Muli-Bold",
        android: "muli-bold"
    },
    "Muli-Regular": {
        ios: "Muli-Regular",
        android: "muli"
    },
    "Muli-Light": {
        ios: "Muli-Light",
        android: "Muli-Light"
    },
    "Open Sans": {
        ios: "Open Sans",
        android: "open-sans.regular"
    },
    "Open Sans-Bold": {
        ios: "Open Sans-Bold",
        android: "open-sans.bold"
    },
    "OpenSans-Light": {
        ios: "OpenSans-Light",
        android: "open-sans.light"
    },
    "Roboto": {
        ios: "Roboto",
        android: "Roboto-Regular"
    },
    "Roboto-Light": {
        ios: "Roboto-Light",
        android: "Roboto-Light"
    },
    "Roboto-Bold": {
        ios: "Roboto-Bold",
        android: "Roboto-Bold"
    }
};

Config.getFont = function (text) {
    return Platform.OS === 'ios' ? arrFont[text].ios : arrFont[text].android
};


Config.getForm = function (str) {
    let nameForm = '';
    Object.keys(arrFormID).forEach((key) => {
        if (key === str) nameForm = arrFormID[key]
    });
    return nameForm;
};

const arrFormID = {
    //Menu home:
    "A54F2010": "XuatKhoVatTuTabScreen",
    "A54F2020": "DeXuatVatTuTabScreen",
    "A54F2040": "",

    //Báo hỏng
    "A54F2060": "PhieuBaoHongTabScreen",

    //Trả hàng về kho tổng
    "A54F2080": "TraHangVeKhoTongTabScreen",
    "A54F2081": "DuAnScreen",
    "A54F2082": "ChonNguyenNhanScreen",
    "A54F2083": "KhoScreen",
    // "A54F2084":"NhanVienDeXuatScreen",
    // "A54F2085":"NhanVienDeXuatScreen",
    "A54F2086": "DanhSachTraHangScreen",
    "A54F2087": "ChiTietTraHangScreen",
    "A54F2088": "DinhKemScreen",
    "A54F2089": "TraHangVeKhoScreen",
    "A54F2090": "DanhSachDinhKemTHVKScreen",
    "A54F2080_A54F2087": "ChiTietTraHangVeKhoTabScreen",

    //Kiểm kê kho
    "A54F2100": "KiemKeKhoTabScreen",
    "A54F2101": "ChonDuAnKiemKeScreen",
    // "A54F2102":"NhanVienDeXuatScreen",
    "A54F2103": "DanhSachVatTuKKKScreen",
    "A54F2104": "DinhKemScreen",
    "A54F2105": "DanhSachKiemKeKhoScreen",
    "A54F2106": "ChiTietPhieuKiemKeScreen",
    "A54F2107": "DanhSachDinhKemKKKScreen",
    "A54F2110": "KiemKeKhoScreen",


    "A54F2120": "",
    "A54F2140": "",
    "A54F2160": "",
    //##############################

    //Menu MSS:
    //Xác nhận nhập kho công trình
    "A54F2500": "XacNhanNhapKhoTabScreen",
    "A54F2501": "ChiTietNhapKhoTabScreen",
    "A54F2501_A": "ChiTietPhieuNhapKhoScreen",
    "A54F2501_B": "ChiTietVatTuNhapKhoScreen",
    "A54F2501_C": "DanhSachDinhKemNKScreen",
    "A54F2502": "DuyetXacNhanNhapKhoScreen",

    //Xác nhận đề xuất vật tư
    "A54F2520": "XacNhanDeXuatVatTuTabScreen",
    "A54F2520_A": "ChoXacNhanDeXuatScreen",
    "A54F2520_B": "DaXacNhanDeXuatScreen",
    "A54F2520_C": "TatCaDeXuatScreen",
    "A54F2521": "ChiTietDeXuatTabScreen",
    "A54F2521_A": "ChiTietPhieuDeXuatScreen",
    "A54F2521_B": "ChiTietVatTuDeXuatScreen",
    "A54F2521_C": "DanhSachDinhKemDXScreen",
    "A54F2522": "DuyetXacNhanDeXuatScreen",

    //xác nhận yêu cầu trả hàng
    "A54F2540": "XacNhanTraHangKhoTabScreen",
    "A54F2541": "ChiTietXacNhanTraHangTabScreen",
    "A54F2541_A": "ChiTietPhieuTraHangScreen",
    "A54F2541_B": "ChiTietVatTuTraHangScreen",
    "A54F2541_C": "DanhSachDinhKemTHScreen",

    //Xác nhận cho mượn tài sản
    "A54F2560": "XacNhanChoMuonTaiSanTabScreen",
    "A54F2561": "ChiTietXNChoMuonTSTabScreen",
    "A54F2562": "DuyetXacNhanChoMuonTSScreen",

    //Xác nhận đã nhận tài sản
    "A54F2580": "XacNhanTaiSanDaNhanTabScreen",
    "A54F2600": "",
    "A54F2620": "",
    //##############################
};


Config.imgDef = require('../assets/images/img-def.jpeg');
Config.avaDef = require('../assets/images/photo-upload/img-ava-def.png');
Config.iconApp = require('../assets/images/logo-app.png');
Config.avaDefURL = 'https://i.ibb.co/MCvzWz8/img-ava-def.png';
Config.imgDefURL = 'https://i.ibb.co/wzC6ncs/img-def.jpg';
Config.gStyle = gStyle;
Config.gMess = gMess;
Config.getSetting = function (name) {
    if (!Config.setting) {
        return null;
    }

    for (let i = 0; i < Config.setting.length; i++) {
        const s = Config.setting[i];

        if (s && s.name === name) {
            return s.value;
        }
    }

    return null;
};

Config.isJSON = function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

Config.lang = function (text) {
    if (Config.language === '01') {
        return localize["en"][text] ? localize["en"][text] : text;
    }
    return localize["vi"][text] ? localize["vi"][text] : text;
};

Config.alertMess = function (data, type, cb, cbCancel) {
    if (data.code === 'SYS001') return;
    let mess = data.message;
    for (let key in Config.gMess) {
        if (key === data.code && Config.gMess[key]) {
            mess = Config.gMess[key];
            break;
        }
    }
    if (type === 'YES_NO') {
        Alert.alert(
            '',
            mess,
            [
                { text: 'Cancel', onPress: () => cbCancel ? cbCancel() : {}, style: 'cancel' },
                { text: 'OK', onPress: () => cb() },
            ],
            { cancelable: false }
        )
    }
    else if (mess !== 'Not found') {
        Alert.alert('', mess);
    }
};

Config.getMess = function (data, type, cb) {
    let mess = data.message;
    for (let key in Config.gMess) {
        if (key === data.code && Config.gMess[key]) {
            mess = Config.gMess[key];
            break;
        }
    }
    return mess;
};

export default Config;
