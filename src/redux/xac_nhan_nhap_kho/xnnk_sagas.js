import {delay} from 'redux-saga';
import {put, takeLatest, take, cancel} from 'redux-saga/effects';
import {types} from "./xnnk_actions";
import Api from '../../services/api';

let paramsConfirm = null;

// Màn hình chờ xác nhận của xác nhận nhập kho
export function* getListWaitingWH(data) {
    try {
        yield put({type: types.LIST_WAITING_WH + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsConfirm;
            data.params.skip=0;
        }
        else{
            paramsConfirm = data.params;
        }
        const list = yield Api.put('/a54f2500/get-list-wait-confirm',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_WAITING_WH + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListWaitingWH() {
    while (true){
        const watcher = yield takeLatest(types.LIST_WAITING_WH,getListWaitingWH);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình đã xác nhận của màn hình xác nhận nhập kho
export function* getListConfirmWH(data) {
    try {
        yield put({type: types.LIST_CONFIRM_WH + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsConfirm;
            data.params.skip=0;
        }
        else{
            paramsConfirm = data.params;
        }
        const list = yield Api.put('/a54f2500/get-list-confirm',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_CONFIRM_WH + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListConfirmWH() {
    while (true){
        const watcher = yield takeLatest(types.LIST_CONFIRM_WH,getListConfirmWH);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình tất cả của màn hình xác nhận nhập kho
export function* getListAllWH(data) {
    try {
        yield put({type: types.LIST_ALL_WH + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsConfirm;
            data.params.skip=0;
        }
        else{
            paramsConfirm = data.params;
        }
        const list = yield Api.put('/a54f2500/get-list',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_ALL_WH + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListAllWH() {
    while (true){
        const watcher = yield takeLatest(types.LIST_ALL_WH,getListAllWH);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình chi tiết của xác nhận nhập kho
export function* getDetailConfirmWH(data) {
    try {
        yield put({type: types.GET_DETAIL_CONFIRM_WH + '_SUCCESS', payload: null});
        yield delay(300);
        const list = yield Api.put('/a54f2501/get-detail-confirm',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_DETAIL_CONFIRM_WH + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetDetailConfirmWH() {
    while (true){
        const watcher = yield takeLatest(types.GET_DETAIL_CONFIRM_WH,getDetailConfirmWH);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình duyệt xác nhận của xác nhận nhập kho
export function* getVoucherConfirm(data) {
    try {
        // yield put({type: types.GET_VOUCHER_CONFIRM + '_SUCCESS', payload:null});
        yield delay(300);
        const list = yield Api.put('/a54f2502/get-voucher',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_VOUCHER_CONFIRM + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetVoucherConfirm() {
    while (true){
        const watcher = yield takeLatest(types.GET_VOUCHER_CONFIRM,getVoucherConfirm);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình duyệt xác nhận của xác nhận nhập kho
export function* appVoucherConfirm(data) {
    try {
        // yield put({type: types.GET_VOUCHER_CONFIRM + '_SUCCESS', payload:null});
        yield delay(300);
        const appRove = yield Api.put('/a54f2502/add',data.params);
        if(appRove && appRove.code === 200 && appRove.data){
            yield put({type: types.APPROVAL_VOUCHER_CONFIRM + '_SUCCESS', payload: appRove.data}); //đi qua lieu vao reducer
            // data.cb && data.cb(null, list.data);
            data.cb && data.cb(null, appRove.data);
        }
        else{
            data.cb && data.cb(appRove, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchAppVoucherConfirm() {
    while (true){
        const watcher = yield takeLatest(types.APPROVAL_VOUCHER_CONFIRM,appVoucherConfirm);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình hủy duyệt xác nhận của xác nhận nhập kho
export function* RmVoucherConfirm(data) {
    try {
        yield delay(300);
        const remove = yield Api.put('/a54f2501/remove-confirm',data.params);
        if(remove && remove.code === 200 && remove.data){
            yield put({type: types.REMOVE_VOUCHER_CONFIRM + '_SUCCESS', payload: remove.data}); //đi qua lieu vao reducer
            // data.cb && data.cb(null, list.data);
            data.cb && data.cb(null, remove.data);
        }
        else{
            data.cb && data.cb(remove, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchRmVoucherConfirm() {
    while (true){
        const watcher = yield takeLatest(types.REMOVE_VOUCHER_CONFIRM,RmVoucherConfirm);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}



