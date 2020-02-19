import {delay} from 'redux-saga';
import {put, takeLatest, take, cancel} from 'redux-saga/effects';
import {types} from "./xntsdn_actions";
import Api from '../../services/api';

let paramsReceived = null;

// Màn hình chờ xác nhận của xác nhận tài sản đã nhận
export function* getListWaitingReceived(data) {
    try {
        yield put({type: types.LIST_WAITING_RECEIVED + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsReceived;
            data.params.skip=0;
        }
        else{
            paramsReceived = data.params;
        }
        const list = yield Api.put('/a54f2580/get-list-waiting-confirm',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_WAITING_RECEIVED + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListWaitingReceived() {
    while (true){
        const watcher = yield takeLatest(types.LIST_WAITING_RECEIVED,getListWaitingReceived);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình đã xác nhận của xác nhận cho mượn tài sản
export function* getListConfirmReceived(data) {
    try {
        yield put({type: types.LIST_CONFIRM_RECEIVED + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsReceived;
            data.params.skip=0;
        }
        else{
            paramsReceived = data.params;
        }
        const list = yield Api.put('/a54f2580/get-list-confirmed',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_CONFIRM_RECEIVED + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListConfirmReceived() {
    while (true){
        const watcher = yield takeLatest(types.LIST_CONFIRM_RECEIVED,getListConfirmReceived);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình tất cả xác nhận của xác nhận cho mượn tài sản
export function* getListAllReceived(data) {
    try {
        yield put({type: types.LIST_ALL_RECEIVED + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsReceived;
            data.params.skip=0;
        }
        else{
            paramsReceived = data.params;
        }
        const list = yield Api.put('/a54f2580/get-list-confirm',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_ALL_RECEIVED + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListAllReceived() {
    while (true){
        const watcher = yield takeLatest(types.LIST_ALL_RECEIVED,getListAllReceived);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình chi tiết của xác nhận cho mượn tài sản
export function* getDetailConfirmReceived(data) {
    try {
        yield put({type: types.GET_DETAIL_CONFIRM_RECEIVED + '_SUCCESS', payload: null});
        yield delay(300);
        const list = yield Api.put('/a54f2580/get-detail-confirm-received',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_DETAIL_CONFIRM_RECEIVED + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetDetailConfirmReceived() {
    while (true){
        const watcher = yield takeLatest(types.GET_DETAIL_CONFIRM_RECEIVED,getDetailConfirmReceived);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình hủy duyệt xác nhận của xác nhận cho mượn tài sản
export function* RmVoucherReceived(data) {
    try {
        yield delay(300);
        const remove = yield Api.put('/a54f2580/remove-confirm',data.params);
        if(remove && remove.code === 200 && remove.data){
            yield put({type: types.REMOVE_VOUCHER_RECEIVED + '_SUCCESS', payload: remove.data}); //đi qua lieu vao reducer
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

export function* watchRmVoucherReceived() {
    while (true){
        const watcher = yield takeLatest(types.REMOVE_VOUCHER_RECEIVED,RmVoucherReceived);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình xác nhận duyệt của xác nhận cho mượn tài sản
export function* AppRVoucherReceived(data) {
    try {
        yield delay(300);
        const approval = yield Api.put('/a54f2582/save',data.params);
        if(approval && approval.code === 200 && approval.data){
            yield put({type: types.APPROVAL_VOUCHER_RECEIVED + '_SUCCESS', payload: approval.data}); //đi qua lieu vao reducer
            // data.cb && data.cb(null, list.data);
            data.cb && data.cb(null, approval.data);
        }
        else{
            data.cb && data.cb(approval, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchAppRVoucherReceived() {
    while (true){
        const watcher = yield takeLatest(types.APPROVAL_VOUCHER_RECEIVED,AppRVoucherReceived);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}






