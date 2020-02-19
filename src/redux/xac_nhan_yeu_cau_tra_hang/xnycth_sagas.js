import {delay} from 'redux-saga';
import {put, takeLatest, take, cancel} from 'redux-saga/effects';
import {types} from "./xnycth_actions";
import Api from '../../services/api';

let paramsConfirm = null;

// Màn hình chờ xác nhận của xác nhận nhập kho
export function* getListWaitingRT(data) {
    try {
        yield put({type: types.LIST_WAITING_RT + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsConfirm;
            data.params.skip=0;
        }
        else{
            paramsConfirm = data.params;
        }
        if(data.params) data.params.IsConfirm=0;
        const list = yield Api.put('/a54f2540/get-list-confirm',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_WAITING_RT + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListWaitingRT() {
    while (true){
        const watcher = yield takeLatest(types.LIST_WAITING_RT,getListWaitingRT);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình đã xác nhận của màn hình xác nhận nhập kho
export function* getListConfirmRT(data) {
    try {
        yield put({type: types.LIST_CONFIRM_RT + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsConfirm;
            data.params.skip=0;
        }
        else{
            paramsConfirm = data.params;
        }
        if(data.params) data.params.IsConfirm=1;
        const list = yield Api.put('/a54f2540/get-list-confirm',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_CONFIRM_RT + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListConfirmRT() {
    while (true){
        const watcher = yield takeLatest(types.LIST_CONFIRM_RT,getListConfirmRT);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình tất cả của màn hình xác nhận nhập kho
export function* getListAllRT(data) {
    try {
        yield put({type: types.LIST_ALL_RT + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsConfirm;
            data.params.skip=0;
        }
        else{
            paramsConfirm = data.params;
        }
        const list = yield Api.put('/a54f2540/get-list-confirm',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_ALL_RT + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListAllRT() {
    while (true){
        const watcher = yield takeLatest(types.LIST_ALL_RT,getListAllRT);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình chi tiết của xác nhận nhập kho
export function* getDetailConfirmRT(data) {
    try {
        yield put({type: types.GET_DETAIL_CONFIRM_RT + '_SUCCESS', payload: null});
        yield delay(300);
        const list = yield Api.put('/a54f2540/get-detail-confirm',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_DETAIL_CONFIRM_RT + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetDetailConfirmRT() {
    while (true){
        const watcher = yield takeLatest(types.GET_DETAIL_CONFIRM_RT,getDetailConfirmRT);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình duyệt xác nhận của xác nhận nhập kho
export function* getVoucherConfirmRT(data) {
    try {
        // yield put({type: types.GET_VOUCHER_CONFIRM + '_SUCCESS', payload:null});
        yield delay(300);
        const list = yield Api.put('/a54f2502/get-voucher',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_VOUCHER_CONFIRM_RT + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetVoucherConfirmRT() {
    while (true){
        const watcher = yield takeLatest(types.GET_VOUCHER_CONFIRM_RT,getVoucherConfirmRT);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình duyệt xác nhận của xác nhận nhập kho
export function* appVoucherConfirmRT(data) {
    try {
        // yield put({type: types.GET_VOUCHER_CONFIRM + '_SUCCESS', payload:null});
        yield delay(300);
        const appRove = yield Api.put('/a54f2542/confirm',data.params);
        if(appRove && appRove.code === 200 && appRove.data){
            yield put({type: types.APPROVAL_VOUCHER_CONFIRM_RT + '_SUCCESS', payload: appRove.data}); //đi qua lieu vao reducer
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

export function* watchAppVoucherConfirmRT() {
    while (true){
        const watcher = yield takeLatest(types.APPROVAL_VOUCHER_CONFIRM_RT,appVoucherConfirmRT);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình hủy duyệt xác nhận của xác nhận nhập kho
export function* RmVoucherConfirmRT(data) {
    try {
        yield delay(300);
        const remove = yield Api.put('/a54f2540/cancel-confirm',data.params);
        if(remove && remove.code === 200 && remove.data){
            yield put({type: types.REMOVE_VOUCHER_CONFIRM_RT + '_SUCCESS', payload: remove.data}); //đi qua lieu vao reducer
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

export function* watchRmVoucherConfirmRT() {
    while (true){
        const watcher = yield takeLatest(types.REMOVE_VOUCHER_CONFIRM_RT,RmVoucherConfirmRT);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}



