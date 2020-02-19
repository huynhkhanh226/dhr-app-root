/**
 * @copyright 2019 @ DigiNet
 * @author tranghoang
 * @create 2019/08/23 21:26
 * @update 2019/08/23 21:26
 */

import Api from '../../services/api';
import {delay} from "redux-saga";
import {cancel, take, takeLatest} from "redux-saga/effects";
import {types} from "../../redux/admin/admin_actions";

export function* settingUpdate(data) {
    try {
        const settingUpdate = yield Api.put('/setting/edit',data.params);
        if (settingUpdate && settingUpdate.data) {
            data.cb && data.cb(null,settingUpdate.data)
        }
        else{
            data.cb && data.cb(settingUpdate,null)
        }
    }
    catch (e) {
        console.log('settingUpdate error');
    }

}

export function* watchSettingUpdate() {
    while (true){
        const watcher = yield takeLatest(types.SETTING_UPDATE,settingUpdate);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

export function* settingList(data) {
    try {
        yield delay(300);
        const settingLists = yield Api.put('/setting/list',data.params);
        if (settingLists && settingLists.data) {
            data.cb && data.cb(null,settingLists.data)
        }
        else{
            data.cb && data.cb(settingLists,null)
        }
    }
    catch (e) {
        console.log('settingList error');
    }
}

export function* watchSettingList() {
    while (true){
        const watcher = yield takeLatest(types.SETTING_LIST,settingList);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

export function* testConnect(data) {
    try {
        yield delay(300);
        const testConnect = yield Api.put('/connection/test',data.params);
        if (testConnect && testConnect.data) {
            data.cb && data.cb(null,testConnect.data)
        }
        else{
            data.cb && data.cb(testConnect,null)
        }
    }
    catch (e) {
        console.log('testConnect error');
    }
}

export function* watchTestConnect() {
    while (true){
        const watcher = yield takeLatest(types.TEST_CONNECT,testConnect);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}