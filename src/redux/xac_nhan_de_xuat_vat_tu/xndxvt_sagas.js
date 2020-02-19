import {delay} from 'redux-saga';
import {put, takeLatest, take, cancel} from 'redux-saga/effects';
import {types} from "./xndxvt_actions";
import Api from '../../services/api';

let paramsProposal = null;

// Màn hình chờ xác nhận của xác nhận đề xuất vật tư
export function* getListWaitingProposal(data) {
    try {
        yield put({type: types.LIST_WAITING_PROPOSAL + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsProposal;
            data.params.skip=0;
        }
        else{
            paramsProposal = data.params;
        }
        const list = yield Api.put('/a54f2520/get-list-waiting-confirm',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_WAITING_PROPOSAL + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListWaitingProposal() {
    while (true){
        const watcher = yield takeLatest(types.LIST_WAITING_PROPOSAL,getListWaitingProposal);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình đã xác nhận của màn hình xác nhận đề xuất vật tư
export function* getListConfirmProposal(data) {
    try {
        yield put({type: types.LIST_CONFIRM_PROPOSAL + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsProposal;
            data.params.skip=0;
        }
        else{
            paramsProposal = data.params;
        }
        const list = yield Api.put('/a54f2520/get-list-confirmed',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_CONFIRM_PROPOSAL + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListConfirmProposal() {
    while (true){
        const watcher = yield takeLatest(types.LIST_CONFIRM_PROPOSAL,getListConfirmProposal);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình tất cả của màn hình xác nhận đề xuất vật tư
export function* getListAllProposal(data) {
    try {
        yield put({type: types.LIST_ALL_PROPOSAL + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsProposal;
            data.params.skip=0;
        }
        else{
            paramsProposal = data.params;
        }
        const list = yield Api.put('/a54f2520/get-list',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_ALL_PROPOSAL + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListAllProposal() {
    while (true){
        const watcher = yield takeLatest(types.LIST_ALL_PROPOSAL,getListAllProposal);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình chi tiết của xác nhận nhận đề xuất
export function* getDetailConfirmProposal(data) {
    try {
        yield put({type: types.GET_DETAIL_CONFIRM_PROPOSAL + '_SUCCESS', payload: null});
        yield delay(300);
        const list = yield Api.put('/a54f2520/get-detail-confirm',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_DETAIL_CONFIRM_PROPOSAL + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetDetailConfirmProposal() {
    while (true){
        const watcher = yield takeLatest(types.GET_DETAIL_CONFIRM_PROPOSAL,getDetailConfirmProposal);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// man hinh vat tu xac nhận đề xuất vật tư
export function* getVoucherInventoryProposal(data) {
    try {
        yield delay(300);
        const list = yield Api.put('/a54f2520/get-list-inventory',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_LIST_INVENTORY_PROPOSE + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetVoucherInventoryProposal() {
    while (true){
        const watcher = yield takeLatest(types.GET_LIST_INVENTORY_PROPOSE,getVoucherInventoryProposal);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}


// Màn hình duyệt xác nhận của xác nhận nhận đề xuất
export function* appVoucherProposal(data) {
    try {
        // yield put({type: types.GET_VOUCHER_CONFIRM + '_SUCCESS', payload:null});
        yield delay(300);
        const appRove = yield Api.put('/a54f2520/confirm-propose',data.params);
        if(appRove && appRove.code === 200 && appRove.data){
            yield put({type: types.APPROVAL_VOUCHER_PROPOSAL + '_SUCCESS', payload: appRove.data}); //đi qua lieu vao reducer
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

export function* watchAppVoucherProposal() {
    while (true){
        const watcher = yield takeLatest(types.APPROVAL_VOUCHER_PROPOSAL,appVoucherProposal);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình hủy duyệt xác nhận của xác nhận đề xuất
export function* RmVoucherProposal(data) {
    try {
        yield delay(300);
        const remove = yield Api.put('/a54f2520/remove-confirm',data.params);
        if(remove && remove.code === 200 && remove.data){
            yield put({type: types.REMOVE_VOUCHER_PROPOSAL + '_SUCCESS', payload: remove.data}); //đi qua lieu vao reducer
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

export function* watchRmVoucherProposal() {
    while (true){
        const watcher = yield takeLatest(types.REMOVE_VOUCHER_PROPOSAL,RmVoucherProposal);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}



