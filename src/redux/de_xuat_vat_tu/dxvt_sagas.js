import {delay} from 'redux-saga';
import {put, takeLatest, take, cancel} from 'redux-saga/effects';
import {types} from "./dxvt_actions";
import Api from '../../services/api';

let paramsPropose = null;

// Man hinh Loai de xuat
export function* getListProposeType(data) {
    try {
        yield delay(300);
        const list = yield Api.get('/a54f2020/get-propose-type',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_PROPOSE_TYPE + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchListProposeType() {
    while (true){
        const watcher = yield takeLatest(types.LIST_PROPOSE_TYPE,getListProposeType);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hinh Chon so ban giao
export function* getListDeliveryVoucher(data) {
    try {
        yield delay(300);
        const list = yield Api.put('/a54f2020/get-delivery-voucher',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_DELIVERY_VOUCHER + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchListDeliveryVoucher() {
    while (true){
        const watcher = yield takeLatest(types.LIST_DELIVERY_VOUCHER,getListDeliveryVoucher);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hinh nhan vien
export function* getListEmployee(data) {
    try {
        yield delay(300);
        const list = yield Api.put('/a54f2020/get-list-employee',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_EMPLOYEE + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchListEmployee() {
    while (true){
        const watcher = yield takeLatest(types.LIST_EMPLOYEE,getListEmployee);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// lay trang thai
export function* getStatusName(data) {
    try {
        yield delay(300);
        const list = yield Api.get('/a54f2020/get-status-name',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_STATUS + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetStatusName() {
    while (true){
        const watcher = yield takeLatest(types.GET_STATUS,getStatusName);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// man hinh vat tu
export function* getListInventoryPropose(data) {
    try {
        yield delay(300);
        const list = yield Api.put('/a54f2020/get-list-inventory',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_INVENTORY_PROPOSE + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListInventoryPropose() {
    while (true){
        const watcher = yield takeLatest(types.LIST_INVENTORY_PROPOSE,getListInventoryPropose);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hinh chi tiet cua de xuat vat tu
export function* getDetailPropose(data) {
    try {
        yield put({type: types.GET_DETAIL_PROPOSE + '_SUCCESS', payload:null});
        yield delay(300);
        const list = yield Api.put('/a54f2020/get-detail-propose',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_DETAIL_PROPOSE + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchDetailPropose() {
    while (true){
        const watcher = yield takeLatest(types.GET_DETAIL_PROPOSE,getDetailPropose);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hinh danh sach cua de xuat vat tu
export function* getListPropose(data) {
    try {
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsPropose;
            data.params.skip=0;
        }
        else{
            paramsPropose = data.params;
        }
        const list = yield Api.put('/a54f2020/grid-propose',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_PROPOSE + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListPropose() {
    while (true){
        const watcher = yield takeLatest(types.LIST_PROPOSE,getListPropose);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// them moi phieu de xuat vat tu
export function* addVoucherPropose(data) {
    try {
        yield delay(300);
        const add = yield Api.put('/a54f2020/add',data.params);
        if(add && add.code === 200 && add.data){
            // yield put({type: types.ADD_VOUCHER_PROPOSE + '_SUCCESS', payload: add.data}); //đi qua lieu vao reducer
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

export function* watchAddVoucherPropose() {
    while (true){
        const watcher = yield takeLatest(types.ADD_VOUCHER_PROPOSE,addVoucherPropose);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// chinh sua phieu de xuat vat tu
export function* editVoucherPropose(data) {
    try {
        yield delay(300);
        const edit = yield Api.put('/a54f2020/edit',data.params);
        if(edit && edit.code === 200 && edit.data){
            yield put({type: types.EDIT_VOUCHER_PROPOSE + '_SUCCESS', payload: edit.data}); //đi qua lieu vao reducer
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

export function* watchEditVoucherPropose() {
    while (true){
        const watcher = yield takeLatest(types.EDIT_VOUCHER_PROPOSE,editVoucherPropose);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// xoa phieu de xuat vat tu
export function* deleteVoucherPropose(data) {
    try {
        yield delay(300);
        const del = yield Api.put('/a54f2020/del-propose-voucher',data.params);
        if(del && del.code === 200 && del.data){
            yield put({type: types.DELETE_VOUCHER_PROPOSE + '_SUCCESS', payload: del.data}); //đi qua lieu vao reducer
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

export function* watchDeleteVoucherPropose() {
    while (true){
        const watcher = yield takeLatest(types.DELETE_VOUCHER_PROPOSE,deleteVoucherPropose);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}


// Man hinh mac dinh gia tri cua combo
export function* getCbDefaultPropose(data) {
    try {
        yield delay(300);
        const list = yield Api.put('/a54f2020/get-default-cbo',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_COMBO_DEFAULT_PROPOSE + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetCbDefaultPropose() {
    while (true){
        const watcher = yield takeLatest(types.GET_COMBO_DEFAULT_PROPOSE,getCbDefaultPropose);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}



