import {delay} from 'redux-saga';
import {put, takeLatest, take, cancel} from 'redux-saga/effects';
import {types} from "./xncmts_actions";
import Api from '../../services/api';

let paramsBorrow = null;

// Màn hình chờ xác nhận của xác nhận cho mượn tài sản
export function* getListWaitingBorrow(data) {
    try {
        yield put({type: types.LIST_WAITING_BORROW + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsBorrow;
            data.params.skip=0;
        }
        else{
            paramsBorrow = data.params;
        }
        const list = yield Api.put('/a54f2560/get-list-unconfirmed',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_WAITING_BORROW + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListWaitingBorrow() {
    while (true){
        const watcher = yield takeLatest(types.LIST_WAITING_BORROW,getListWaitingBorrow);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình đã xác nhận của xác nhận cho mượn tài sản
export function* getListConfirmBorrow(data) {
    try {
        yield put({type: types.LIST_CONFIRM_BORROW + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsBorrow;
            data.params.skip=0;
        }
        else{
            paramsBorrow = data.params;
        }
        const list = yield Api.put('/a54f2560/get-list-confirmed',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_CONFIRM_BORROW + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListConfirmBorrow() {
    while (true){
        const watcher = yield takeLatest(types.LIST_CONFIRM_BORROW,getListConfirmBorrow);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình tất cả xác nhận của xác nhận cho mượn tài sản
export function* getListAllBorrow(data) {
    try {
        yield put({type: types.LIST_ALL_BORROW + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsBorrow;
            data.params.skip=0;
        }
        else{
            paramsBorrow = data.params;
        }
        const list = yield Api.put('/a54f2560/get-list-confirm',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_ALL_BORROW + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListAllBorrow() {
    while (true){
        const watcher = yield takeLatest(types.LIST_ALL_BORROW,getListAllBorrow);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình chi tiết của xác nhận cho mượn tài sản
export function* getDetailConfirmBorrow(data) {
    try {
        yield put({type: types.GET_DETAIL_CONFIRM_BORROW + '_SUCCESS', payload: null});
        yield delay(300);
        const list = yield Api.put('/a54f2560/get-detail-confirm',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_DETAIL_CONFIRM_BORROW + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetDetailConfirmBorrow() {
    while (true){
        const watcher = yield takeLatest(types.GET_DETAIL_CONFIRM_BORROW,getDetailConfirmBorrow);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình lây caption của xác nhận cho mượn tài sản
export function* getCaptionBorrow(data) {
    try {
        yield put({type: types.GET_CAPTION_CONFIRM_BORROW + '_SUCCESS', payload: null});
        yield delay(300);
        const list = yield Api.put('/a54f2562/get-caption',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_CAPTION_CONFIRM_BORROW + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetCaptionBorrow() {
    while (true){
        const watcher = yield takeLatest(types.GET_CAPTION_CONFIRM_BORROW,getCaptionBorrow);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình hủy duyệt xác nhận của xác nhận cho mượn tài sản
export function* RmVoucherBorrow(data) {
    try {
        yield delay(300);
        const remove = yield Api.put('/a54f2560/remove-confirm',data.params);
        if(remove && remove.code === 200 && remove.data){
            yield put({type: types.REMOVE_VOUCHER_BORROW + '_SUCCESS', payload: remove.data}); //đi qua lieu vao reducer
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

export function* watchRmVoucherBorrow() {
    while (true){
        const watcher = yield takeLatest(types.REMOVE_VOUCHER_BORROW,RmVoucherBorrow);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình lấy id và table name của xác nhận cho mượn tài sản
export function* getNewIDConfirmBorrow(data) {
    try {
        yield delay(300);
        const getNewID = yield Api.put('/a54f2562/get-new-id',data.params);
        if(getNewID && getNewID.code === 200 && getNewID.data){
            yield put({type: types.GET_NEW_ID_CONFIRM_BORROW + '_SUCCESS', payload: getNewID.data}); //đi qua lieu vao reducer
            // data.cb && data.cb(null, list.data);
            data.cb && data.cb(null, getNewID.data);
        }
        else{
            data.cb && data.cb(getNewID, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchGetNewIDConfirmBorrow() {
    while (true){
        const watcher = yield takeLatest(types.GET_NEW_ID_CONFIRM_BORROW,getNewIDConfirmBorrow);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình xác nhận duyệt của xác nhận cho mượn tài sản
export function* AppRVoucherBorrow(data) {
    try {
        yield delay(300);
        const approval = yield Api.put('/a54f2562/save',data.params);
        if(approval && approval.code === 200 && approval.data){
            yield put({type: types.APPROVAL_VOUCHER_BORROW + '_SUCCESS', payload: approval.data}); //đi qua lieu vao reducer
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

export function* watchAppRVoucherBorrow() {
    while (true){
        const watcher = yield takeLatest(types.APPROVAL_VOUCHER_BORROW,AppRVoucherBorrow);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}






