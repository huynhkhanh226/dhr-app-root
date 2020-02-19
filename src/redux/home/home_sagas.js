import {delay} from 'redux-saga';
import {put, takeLatest, take, cancel} from 'redux-saga/effects';
import {types} from "./home_actions";
import Api from '../../services/api';

//##############################
export function* getListMenu(data) {
    // console.log(data);
    try {
        yield put({type: types.LIST_MENU + '_SUCCESS', payload: []}); //đi qua lieu vao reducer
        yield delay(300);
        let list = yield Api.put('/a00f0000/get-menu', {});
        if(list && list.data){
            yield put({type: types.LIST_MENU + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
            data.cb && data.cb(null, list);
        }
        else{
            data.cb && data.cb(list, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchListMenu() {
    while (true){
        const watcher = yield takeLatest(types.LIST_MENU,getListMenu);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}
//##############################

//##############################
export function* getListNoty(data) {
    // console.log(data);
    try {
        yield delay(300);
        // let list = null;
        // if(data.params.type){
        //     list = yield Api.put('/notification/get-noti-by-type', data.params);
        // }
        // else{
            const list = yield Api.put('/Notification/search', data.params);
        // }
        if(list && list.data){
            yield put({type: types.LIST_NOTY + '_SUCCESS', payload: list}); //đi qua lieu vao reducer
            data.cb && data.cb(null, list);
        }
        else{
            data.cb && data.cb(list, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchListNoty() {
    while (true){
        const watcher = yield takeLatest(types.LIST_NOTY,getListNoty);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}
//##############################
export function* clearListNoty() {
    try {
        yield delay(300);
        yield put({type: types.LIST_NOTY + '_SUCCESS', payload: []}); //đi qua lieu vao reducer
    }
    catch (e) {
        console.log(e);
    }
}

export function* watchClearListNoty() {
    while (true){
        const watcher = yield takeLatest(types.CLEAR_LIST_NOTY,clearListNoty);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}
//##############################
//##############################
export function* clearListMenu() {
    try {
        yield delay(300);
        yield put({type: types.LIST_MENU + '_SUCCESS', payload: null}); //đi qua lieu vao reducer
    }
    catch (e) {
        console.log(e);
    }
}

export function* watchClearListMenu() {
    while (true){
        const watcher = yield takeLatest(types.CLEAR_LIST_MENU,clearListMenu);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}
//##############################

// ##############################
export function* updateStatusNoty(data) {
    // console.log(data);
    try {
        yield delay(300);
        let update = yield Api.put('/Notification/update-status', data.params);
        if(update && update.data){
            data.cb && data.cb(null, update);
        }
        else{
            data.cb && data.cb(update, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchUpdateStatusNoty() {
    while (true){
        const watcher = yield takeLatest(types.UPDATE_STATUS_NOTY,updateStatusNoty);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}
//##############################

// ##############################
export function* getVoucherNum(data) {
    // console.log(data);
    try {
        yield delay(300);
        let update = yield Api.get('/a54f0000/get-voucher-num');
        if(update && update.data){
            yield put({type: types.GET_VOUCHER_NUM + '_SUCCESS', payload: update.data}); //đi qua lieu vao reducer
            data.cb && data.cb(null, update);
        }
        else{
            data.cb && data.cb(update, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchGetVoucherNum() {
    while (true){
        const watcher = yield takeLatest(types.GET_VOUCHER_NUM,getVoucherNum);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}
//##############################
