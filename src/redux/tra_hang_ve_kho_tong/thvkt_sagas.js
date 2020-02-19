import {delay} from 'redux-saga';
import {put, takeLatest, take, cancel} from 'redux-saga/effects';
import {types} from "./thvkt_actions";
import Api from '../../services/api';

let paramsMDIVoucher = null;

// Man hinh Loai de xuat
export function* getListReason(data) {
    try {
        yield delay(300);
        const list = yield Api.put('/a54f2080/get-reason',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_REASON + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchListReason() {
    while (true){
        const watcher = yield takeLatest(types.LIST_REASON,getListReason);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Lay trang thai
export function* getListStatus(data) {
    try {
        yield delay(300);
        const list = yield Api.get('/a54f2080/get-status',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_STATUS + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchListStatus() {
    while (true){
        const watcher = yield takeLatest(types.LIST_STATUS,getListStatus);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hinh danh sach cua tra hang ve kho tong
export function* getListMDIVoucher(data) {
    try {
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsMDIVoucher;
            data.params.skip=0;
        }
        else{
            paramsMDIVoucher = data.params;
        }
        const list = yield Api.put('/a54f2080/get-list',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_MDI_VOUCHER + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListMDIVoucher() {
    while (true){
        const watcher = yield takeLatest(types.LIST_MDI_VOUCHER,getListMDIVoucher);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hinh chi tiet cua tra hang ve kho tong
export function* getDetailMDIVoucher(data) {
    try {
        yield put({type: types.GET_DETAIL_MDI_VOUCHER + '_SUCCESS', payload:null});
        yield delay(300);
        const list = yield Api.put('/a54f2080/get-detail-list-edit',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_DETAIL_MDI_VOUCHER + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchDetailMDIVoucher() {
    while (true){
        const watcher = yield takeLatest(types.GET_DETAIL_MDI_VOUCHER,getDetailMDIVoucher);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// them moi phieu tra hang ve kho tổng
export function* addMDIVoucher(data) {
    try {
        yield delay(300);
        const add = yield Api.put('/a54f2080/add',data.params);
        if(add && add.code === 200 && add.data){
            yield put({type: types.ADD_MDI_VOUCHER + '_SUCCESS', payload: add.data}); //đi qua lieu vao reducer
            // data.cb && data.cb(null, list.data);
            data.cb && data.cb(null, add.data);
        }
        else{
            data.cb && data.cb(add, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchAddMDIVoucher() {
    while (true){
        const watcher = yield takeLatest(types.ADD_MDI_VOUCHER,addMDIVoucher);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// chinh sua phieu tra hang ve kho tổng
export function* editMDIVoucher(data) {
    try {
        yield delay(300);
        const edit = yield Api.put('/a54f2080/update',data.params);
        if(edit && edit.code === 200 && edit.data){
            yield put({type: types.EDIT_MDI_VOUCHER + '_SUCCESS', payload: edit.data}); //đi qua lieu vao reducer
            // data.cb && data.cb(null, list.data);
            data.cb && data.cb(null, edit.data);
        }
        else{
            data.cb && data.cb(edit, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchEditMDIVoucher() {
    while (true){
        const watcher = yield takeLatest(types.EDIT_MDI_VOUCHER,editMDIVoucher);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// xoa phieu tra hang ve kho tổng
export function* deleteMDIVoucher(data) {
    try {
        yield delay(300);
        const del = yield Api.put('/a54f2080/del',data.params);
        if(del && del.code === 200 && del.data){
            yield put({type: types.DELETE_MDI_VOUCHER + '_SUCCESS', payload: del.data}); //đi qua lieu vao reducer
            // data.cb && data.cb(null, list.data);
            data.cb && data.cb(null, del.data);
        }
        else{
            data.cb && data.cb(del, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchDeleteMDIVoucher() {
    while (true){
        const watcher = yield takeLatest(types.DELETE_MDI_VOUCHER,deleteMDIVoucher);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}



// Man hinh mac dinh gia tri cua combo
export function* getCbDefaultMDIVoucher(data) {
    try {
        yield delay(300);
        const list = yield Api.put('/a54f2080/get-default-combo',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_COMBO_DEFAULT_MDI_VOUCHER + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetCbDefaultMDIVoucher() {
    while (true){
        const watcher = yield takeLatest(types.GET_COMBO_DEFAULT_MDI_VOUCHER,getCbDefaultMDIVoucher);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}



