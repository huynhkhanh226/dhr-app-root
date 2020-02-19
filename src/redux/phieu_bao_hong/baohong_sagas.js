import {delay} from 'redux-saga';
import {put, takeLatest, take, cancel} from 'redux-saga/effects';
import {types} from "./baohong_actions";
import Api from '../../services/api';

let paramsBroken = null;

// Man hinh chọn hiện tượng của phiếu báo hỏng
export function* getListChoosePhenomenaBroken(data) {
    try {
        yield delay(300);
        const list = yield Api.put('/a54f2060/get-choose-phenomena',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_LIST_CHOOSE_PHENOMENA_BROKEN + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListChoosePhenomenaBroken() {
    while (true){
        const watcher = yield takeLatest(types.GET_LIST_CHOOSE_PHENOMENA_BROKEN,getListChoosePhenomenaBroken);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hinh chọn vật tư của phiếu báo hỏng
export function* getListInventoryBroken(data) {
    try {
        yield delay(300);
        const list = yield Api.put('/a54f2060/get-equipment',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_INVENTORY_BROKEN + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListInventoryBroken() {
    while (true){
        const watcher = yield takeLatest(types.LIST_INVENTORY_BROKEN,getListInventoryBroken);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hinh danh sách của phiếu báo hỏng
export function* getListBroken(data) {
    try {
        yield put({type: types.LIST_BROKEN + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsBroken;
            data.params.skip=0;
        }
        else{
            paramsBroken = data.params;
        }
        const list = yield Api.put('/a54f2060/get-list',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_BROKEN + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListBroken() {
    while (true){
        const watcher = yield takeLatest(types.LIST_BROKEN,getListBroken);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hình chi tiết của phiếu báo hỏng
export function* getDetailBroken(data) {
    try {
        yield put({type: types.DETAIL_BROKEN + '_SUCCESS', payload:null});
        yield delay(300);
        const list = yield Api.put('/a54f2060/get-detail',data.params);
        // console.log("list list", list);
        if(list && list.code === 200 && list.data){
            yield put({type: types.DETAIL_BROKEN + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetDetailBroken() {
    while (true){
        const watcher = yield takeLatest(types.DETAIL_BROKEN,getDetailBroken);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hình chi tiết hiện tượng của phiếu báo hỏng
export function* getPhenomenaBroken(data) {
    try {
        yield put({type: types.GET_PHENOMENA_BROKEN + '_SUCCESS', payload:null});
        yield delay(300);
        const list = yield Api.put('/a54f2060/get-phenomena',data.params);
        // console.log("list list", list);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_PHENOMENA_BROKEN + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetPhenomenaBroken() {
    while (true){
        const watcher = yield takeLatest(types.GET_PHENOMENA_BROKEN,getPhenomenaBroken);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hình chi tiết hiện tượng của phiếu báo hỏng
export function* getComboDefaultBroken(data) {
    try {
        // yield put({type: types.GET_PHENOMENA_BROKEN + '_SUCCESS', payload:null});
        yield delay(300);
        const list = yield Api.put('/a54f2080/get-default-combo',data.params);
        // console.log("list list", list);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_COMBO_DEFAULT_BROKEN + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetComboDefaultBroken() {
    while (true){
        const watcher = yield takeLatest(types.GET_COMBO_DEFAULT_BROKEN,getComboDefaultBroken);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình thêm mới của phiếu báo hỏng
export function* addVoucherBroken(data) {
    try {
        yield delay(300);
        const add = yield Api.put('/a54f2060/add',data.params);
        if(add && add.code === 200 && add.data){
            yield put({type: types.ADD_VOUCHER_BROKEN + '_SUCCESS', payload: add.data}); //đi qua lieu vao reducer
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

export function* watchAddVoucherBroken() {
    while (true){
        const watcher = yield takeLatest(types.ADD_VOUCHER_BROKEN,addVoucherBroken);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình xóa phiếu của phiếu báo hỏng
export function* delVoucherBroken(data) {
    try {
        yield delay(300);
        const del = yield Api.put('/a54f2060/del',data.params);
        if(del && del.code === 200 && del.data){
            yield put({type: types.DELETE_VOUCHER_BROKEN + '_SUCCESS', payload: del.data}); //đi qua lieu vao reducer
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

export function* watchDelVoucherBroken() {
    while (true){
        const watcher = yield takeLatest(types.DELETE_VOUCHER_BROKEN,delVoucherBroken);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình sửa phiếu của phiếu báo hỏng
export function* editVoucherBroken(data) {
    try {
        yield delay(300);
        const edit = yield Api.put('/a54f2060/edit',data.params);
        if(edit && edit.code === 200 && edit.data){
            yield put({type: types.EDIT_VOUCHER_BROKEN + '_SUCCESS', payload: edit.data}); //đi qua lieu vao reducer
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

export function* watchEditVoucherBroken() {
    while (true){
        const watcher = yield takeLatest(types.EDIT_VOUCHER_BROKEN,editVoucherBroken);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}