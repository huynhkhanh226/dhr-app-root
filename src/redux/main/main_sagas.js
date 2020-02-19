/**
 * @copyright 2019 @ DigiNet
 * @author tranghoang
 * @create 2019/08/23 21:26
 * @update 2019/08/23 21:26
 */

import Api from '../../services/api';
import Config from '../../config';
import {delay} from "redux-saga";
import {cancel, put, take, takeLatest} from "redux-saga/effects";
import {types} from "../../redux/main/main_actions";
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from "react-native";

export function* loading(data) {
    try {
        yield delay(300);

        const time = new Date().getTime();
        let tokenStore = yield AsyncStorage.getItem('TOKENHR');
        let settingStore = yield AsyncStorage.getItem('SETTINGHR');
        let profileStore = yield AsyncStorage.getItem('PROFILEHR');
        let companyStore = yield AsyncStorage.getItem('COMPANYLISTHR');
        let hostClient = yield AsyncStorage.getItem('HOSTClIENT');
        let tokenCDN = yield AsyncStorage.getItem('TOKENCDN');

        if(tokenStore && Config.isJSON(tokenStore)) tokenStore = JSON.parse(tokenStore);
        if(tokenCDN){
            Config.tokenCDN = tokenStore;
        }

        //check có token hay chua
        if (tokenStore && tokenStore.id && profileStore && settingStore && companyStore) {
            settingStore = JSON.parse(settingStore);
            profileStore = JSON.parse(profileStore);
            companyStore = JSON.parse(companyStore);

            hostClient=JSON.parse(hostClient);
            if(hostClient && hostClient.host && hostClient.secret){
                Config.host=hostClient.host;
                Config.secret=hostClient.secret;
            }

            if(profileStore.UserPicture){
                profileStore.UserPicture = null;
            }

            const expire = tokenStore.expire || 0;

            //check hạn sử dụng của token
            if (expire > time) {
                Config.token = tokenStore;
                Config.setting = settingStore;
                Config.profile = profileStore;
                Config.company = companyStore;
                Config.language = yield AsyncStorage.getItem('langCRMLPT') === 'en' ? "01" : "84";
                data.cb && data.cb(false, true);
                yield put({
                    type: types.GET_SETTING_COMPLETE,
                    token: Config.token,
                    setting: Config.setting,
                    profile: Config.profile,
                    language: Config.language,
                    company: Config.company,
                });
            } else {
                Config.getToken = true;
                let updateToken = yield Api.put('/auth/check', {token: tokenStore.id});
                if (updateToken && updateToken.data) {
                    const expire = time + 7 * 24 * 60 * 60 * 1000;
                    Config.getToken = false;
                    Config.token = {
                        id: updateToken.data.token,
                        expire: expire
                    };
                    yield AsyncStorage.setItem('TOKENHR', JSON.stringify(Config.token));
                    const settingLists = yield Api.put('/setting/list',{limit:10000});
                    if (settingLists && settingLists.data) {
                        // console.log("================================ settingLists:", settingLists);
                        Config.setting = settingLists.data;
                        yield AsyncStorage.setItem('SETTINGHR', JSON.stringify(Config.setting));

                        Config.profile = yield AsyncStorage.getItem('PROFILEHR');
                        Config.language = yield AsyncStorage.getItem('langCRMLPT')==='en' ? "01":"84" ;
                        data.cb && data.cb(false, true);
                        yield put({type: types.GET_SETTING_COMPLETE, token: Config.token, setting: Config.setting, profile: Config.profile,language:Config.language, company:Config.company});
                    }
                    else{
                        console.log('Get setting error');
                        data.cb && data.cb(true, false);
                        AsyncStorage.removeItem('TOKENHR');
                        AsyncStorage.removeItem('SETTINGHR');
                    }
                } else {
                    data.cb && data.cb(updateToken, false);
                    AsyncStorage.removeItem('TOKENHR');
                    AsyncStorage.removeItem('SETTINGHR');
                    AsyncStorage.removeItem('COMPANYLISTHR');
                }
            }
        }
        else { //Chua co token
            Config.getToken = true;
            Config.profile = null;
            const tokenResult = yield Api.get('/auth/token');
            // console.log("================================ tokenResult:", tokenResult);

            if (tokenResult && tokenResult.data) {
                const expire = time + 7 * 24 * 60 * 60 * 1000;

                Config.getToken = false;
                Config.token = {
                    id: tokenResult.token,
                    expire: expire
                };
                // console.log("================================ Config.token:", Config.token);

                AsyncStorage.setItem('TOKENHR', JSON.stringify(Config.token));
                let settingLists = yield Api.put( '/setting/list',{limit:10000});
                // console.log(settingLists);
                if (settingLists && settingLists.data) {
                    // console.log("================================ settingLists:", settingLists);
                    Config.setting = settingLists.data;
                    yield AsyncStorage.setItem('SETTINGHR', JSON.stringify(Config.setting));

                    Config.profile = yield AsyncStorage.getItem('PROFILEHR');
                    Config.language = yield AsyncStorage.getItem('langCRMLPT')==='en' ? "01":"84" ;
                    yield put({type: types.GET_SETTING_COMPLETE, token: Config.token, setting: Config.setting, profile: Config.profile,language:Config.language, company: Config.company});
                }
                else{
                    data.cb && data.cb(settingLists, false);
                    AsyncStorage.removeItem('TOKENHR');
                    AsyncStorage.removeItem('SETTINGHR');
                }
                if(Config.company) {
                    data.cb && data.cb(false, true);
                    return;
                }
                data.cb && data.cb(false, true);
            } else {
                data.cb && data.cb(tokenResult, false);
                AsyncStorage.removeItem('TOKENHR');
                AsyncStorage.removeItem('SETTINGHR');
                AsyncStorage.removeItem('COMPANYLISTHR');
            }
        }
    }
    catch (e) {
        data.cb && data.cb(true, false);
        console.log('loading is error');
    }

}

export function* watchLoading() {
    while (true){
        const watcher = yield takeLatest(types.GET_SETTING,loading);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

export function* uploadFile(data) {
    try {
        yield delay(300);
        const result = yield Api.upload('/file/upload',data.params);
        if (result && result.code!==200 && result.message) {
            if (data.cb) data.cb(result, null);
        } else {
            if (data.cb) data.cb(null, result.data);
        }
    }
    catch (e) {
        console.log('upload is error',e);
    }

}

export function* watchUploadFile() {
    while (true){
        const watcher = yield takeLatest(types.UPLOAD_FILE,uploadFile);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

export function* tabBar(data) {
    try {
        yield put({type: types.TAB_BAR_SUCCESS, payload: data.params});
    }
    catch (e) {
        console.log(e);
    }
}

export function* watchTabBar() {
    yield takeLatest(types.TAB_BAR,tabBar)
}

export function* login(data) {
    try {
        yield delay(300);
        const login = yield Api.put('/user/login',data.params);
        if (login && login.code && login.message) {
            yield put({type: types.LOGIN_SUCCESS, profile: login});
            if (data.cb) data.cb(login, null);
        } else {
            if (data.cb) data.cb(null, login.data);
        }
    }
    catch (e) {
        console.log('login is error');
    }

}

export function* watchLogin() {
    while (true){
        const watcher = yield takeLatest(types.LOGIN,login);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

export function* getListCompany(data) {
    try {
        yield delay(300);
        const companyLists = yield Api.get(Config.hostDigiNet+'/company/list');
        if (companyLists && companyLists.data) {
            // console.log("================================ companyLists:", companyLists);
            Config.company = companyLists.data;
            yield AsyncStorage.setItem('COMPANYLISTHR', JSON.stringify(Config.company));
            yield put({type: types.GET_SETTING_COMPLETE, token: Config.token, setting: Config.setting, profile: Config.profile,language:Config.language, company:Config.company});
            data.cb && data.cb(null, true);
        }
        else{
            console.log('Get company error');
            data.cb && data.cb(true, null);
            AsyncStorage.removeItem('COMPANYLISTHR');
        }
    }
    catch (e) {
        console.log('get company is error');
    }

}

export function* watchGetListCompany() {
    while (true){
        const watcher = yield takeLatest(types.GET_COMPANY,getListCompany);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

export function* getToken(data) {
    try {
        yield delay(300);
        const time = new Date().getTime();
        let url = '/auth/token';
        if(data.params !== 'normal'){
            url = Config.hostDigiNet + url;
        }
        const tokenResult = yield Api.get(url);
        if (tokenResult && tokenResult.data) {
            const expire = time + 7 * 24 * 60 * 60 * 1000;
            Config.token = {
                id: tokenResult.token,
                expire: expire
            };
            AsyncStorage.setItem('TOKENHR', JSON.stringify(Config.token));
            data.cb && data.cb(null,tokenResult);
        }
        else{
            Alert.alert('', tokenResult.message);
            data.cb && data.cb(tokenResult, null);
        }
    }
    catch (e) {
        console.log('get token is error');
    }

}

export function* watchGetToken() {
    while (true){
        const watcher = yield takeLatest(types.GET_TOKEN,getToken);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

export function* setting(data) {
    let settingLists = yield Api.put( '/setting/list',{limit:10000});
    if (settingLists && settingLists.data) {
        // console.log("================================ settingLists:", settingLists);
        Config.setting = settingLists.data;
        Config.hostCDN = Config.getSetting('CDN_API_URL');
        Config.secretCDN = Config.getSetting('CDN_API_SECRET');
        yield AsyncStorage.setItem('SETTINGHR', JSON.stringify(Config.setting));
        yield put({type: types.LIST_SETTING_COMPLETE, setting:Config.setting});
        data.cb && data.cb(null, settingLists);
    }
    else{
        data.cb && data.cb(settingLists, false);
        AsyncStorage.removeItem('TOKENHR');
        AsyncStorage.removeItem('SETTINGHR');
    }
}

export function* watchSetting() {
    while (true){
        const watcher = yield takeLatest(types.LIST_SETTING,setting);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

//##############################

// đính kèm de xuat vat tu
export function* attachPropose(data) {
    try {
        const attach = yield Api.put('/a54f2020/save-add-attachment',data.params);
        if(attach && attach.code === 200 && attach.data){
            // yield put({type: types.ATTACH_PROPOSE + '_SUCCESS', payload: attach.data}); //đi qua lieu vao reducer
            // data.cb && data.cb(null, list.data);
            data.cb && data.cb(null, attach.data);
        }
        else{
            data.cb && data.cb(attach, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchAttachPropose() {
    while (true){
        const watcher = yield takeLatest(types.ATTACH_PROPOSE,attachPropose);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}
// đính kèm de xuat vat tu
export function* editAttachPropose(data) {
    try {
        const attach = yield Api.put('/a54f2020/save-edit-attachment',data.params);
        if(attach && attach.code === 200 && attach.data){
            // yield put({type: types.EDIT_ATTACH_PROPOSE + '_SUCCESS', payload: attach.data}); //đi qua lieu vao reducer
            data.cb && data.cb(null, attach.data);
        }
        else{
            data.cb && data.cb(attach, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchEditAttachPropose() {
    while (true){
        const watcher = yield takeLatest(types.EDIT_ATTACH_PROPOSE,editAttachPropose);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// đính kèm de xuat vat tu
export function* getCDN(data) {
    try {
        const response = yield Api.getCDN('/auth/token');
        if (response && response.code === 200) {
            Config.tokenCDN=response.token;
            yield AsyncStorage.setItem('TOKENCDN',Config.tokenCDN);
            data.cb && data.cb(null, response);
        }
        else{
            data.cb && data.cb(response, null);
            Alert.alert('','Get tokenCDN error');
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchGetCDN() {
    while (true){
        const watcher = yield takeLatest(types.GET_TOKEN_CDN,getCDN);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// do nguon menu o trang home
export function* getListMenuHome(data) {
    try {
        // yield put({type: types.GET_MENU_HOME + '_SUCCESS', payload:null});
        yield delay(300);
        const list = yield Api.get('/a54f0000/get-menu');
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_MENU_HOME + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
            // data.cb && data.cb(null, list.data);
            data.cb && data.cb(null, list.data);
        }
        else{
            data.cb && data.cb(list, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchListMenuHome() {
    while (true){
        const watcher = yield takeLatest(types.GET_MENU_HOME,getListMenuHome);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// do nguon menu o trang mss
export function* getListMenuMSS(data) {
    try {
        // yield put({type: types.GET_MENU_HOME + '_SUCCESS', payload:null});
        yield delay(300);
        const list = yield Api.get('/a54f0000/get-menu-mss');
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_MENU_MSS + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
            // data.cb && data.cb(null, list.data);
            data.cb && data.cb(null, list.data);
        }
        else{
            data.cb && data.cb(list, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchListMenuMSS() {
    while (true){
        const watcher = yield takeLatest(types.GET_MENU_MSS,getListMenuMSS);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

//##############################

export function* addDevice(data) {
    try {
        yield delay(300);
        let device = yield Api.put('/device/add', data.params);
        if(device && device.data){
            console.log('add device success');
            // yield put({type: types.DEVICE_ADD + '_SUCCESS', payload: device.data});
            data.cb && data.cb(null, device.data);
        }
        else{
            data.cb && data.cb(device, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchAddDevice() {
    while (true){
        const watcher = yield takeLatest(types.DEVICE_ADD,addDevice);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}
//##############################

//##############################

export function* removeDevice(data) {
    try {
        yield delay(300);
        let device = yield Api.delete('/device/del-by-token', data.params);
        console.log("----------" + JSON.stringify(device) + '--------------------')
        if(device && device.data){
            console.log('remove device success');
            data.cb && data.cb(null, device.data);
        }
        else{
            Alert.alert('',device.message);
            data.cb && data.cb(device, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchRemoveDevice() {
    while (true){
        const watcher = yield takeLatest(types.DEVICE_DEL,removeDevice);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}
//##############################

//##############################

export function* updateBadge(data) {
    try {
        yield delay(300);
        yield put({type: types.UPDATE_BADGE_COMPLETE, badge:data.params});
        data.cb && data.cb();
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchUpdateBadge() {
    while (true){
        const watcher = yield takeLatest(types.UPDATE_BADGE,updateBadge);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}
//##############################

//##############################

export function* getBadge() {
    try {
        yield delay(300);
        let badge = yield Api.get('/Notification/badge');
        // if(badge && badge.data && badge.data.badge){
        yield put({type: types.UPDATE_BADGE_COMPLETE, badge:badge && badge.data && badge.data.badge ? badge.data.badge : 0});
        // }
    }
    catch (e) {
        console.log(e)
    }
}

export function* watchGetBadge() {
    while (true){
        const watcher = yield takeLatest(types.GET_BADGE,getBadge);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}
//##############################
