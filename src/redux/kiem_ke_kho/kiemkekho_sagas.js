import {delay} from 'redux-saga';
import {put, takeLatest, take, cancel} from 'redux-saga/effects';
import {types} from "./kiemkekho_actions";
import Api from '../../services/api';
import {add} from "react-native-reanimated";

let paramsInventoryKKK = null;

// Man hinh chọn dự án của kiểm kê kho
export function* getListProjects(data) {
    try {
        yield delay(300);
        const list = yield Api.put('/a54f2100/get-list-project',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_PROJECT + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListProjects() {
    while (true){
        const watcher = yield takeLatest(types.GET_PROJECT,getListProjects);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hinh danh sách của kiểm kê kho
export function* getListInventoryKKK(data) {
    try {
        yield put({type: types.GET_LIST_INVENTORY_KKK + '_SUCCESS', payload:null});
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsInventoryKKK;
            data.params.skip=0;
        }
        else{
            paramsInventoryKKK = data.params;
        }
        const list = yield Api.put('/a54f2100/get-list',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_LIST_INVENTORY_KKK + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetListInventoryKKK() {
    while (true){
        const watcher = yield takeLatest(types.GET_LIST_INVENTORY_KKK,getListInventoryKKK);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hinh chi tiet cua kiểm kê kho
export function* getDetailInventoryKKK(data) {
    try {
        yield put({type: types.GET_DETAIL_INVENTORY_KKK + '_SUCCESS', payload:null});
        yield delay(300);
        const list = yield Api.put('/a54f2100/get-detail',data.params);
        // console.log("list list", list);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_DETAIL_INVENTORY_KKK + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchDetailInventoryKKK() {
    while (true){
        const watcher = yield takeLatest(types.GET_DETAIL_INVENTORY_KKK,getDetailInventoryKKK);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình lập yêu cầu trả hàng
export function* createRequestInventory(data) {
    try {
        // yield put({type: types.GET_VOUCHER_CONFIRM + '_SUCCESS', payload:null});
        yield delay(300);
        const create = yield Api.put('/a54f2100/create-request',data.params);
        if(create && create.code === 200 && create.data){
            yield put({type: types.CREATE_REQUEST_INVENTORY_KKK + '_SUCCESS', payload: create.data}); //đi qua lieu vao reducer
            // data.cb && data.cb(null, list.data);
            data.cb && data.cb(null, create.data);
        }
        else{
            data.cb && data.cb(create, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchCreateRequestInventory() {
    while (true){
        const watcher = yield takeLatest(types.CREATE_REQUEST_INVENTORY_KKK,createRequestInventory);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình xóa kiểm kê
export function* deleteInventoryKKK(data) {
    try {
        // yield put({type: types.GET_VOUCHER_CONFIRM + '_SUCCESS', payload:null});
        yield delay(300);
        const delInventory = yield Api.put('/a54f2100/delete-voucher',data.params);
        if(delInventory && delInventory.code === 200 && delInventory.data){
            yield put({type: types.DELETE_INVENTORY_KKK + '_SUCCESS', payload: delInventory.data}); //đi qua lieu vao reducer
            // data.cb && data.cb(null, list.data);
            data.cb && data.cb(null, delInventory.data);
        }
        else{
            data.cb && data.cb(delInventory, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchDeleteInventoryKKK() {
    while (true){
        const watcher = yield takeLatest(types.DELETE_INVENTORY_KKK,deleteInventoryKKK);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình xóa yêu cầu trả hàng
export function* deleteRequestInventory(data) {
    try {
        // yield put({type: types.GET_VOUCHER_CONFIRM + '_SUCCESS', payload:null});
        yield delay(300);
        const delRequest = yield Api.put('/a54f2100/delete-request',data.params);
        if(delRequest && delRequest.code === 200 && delRequest.data){
            yield put({type: types.DELETE_REQUEST_INVENTORY_KKK + '_SUCCESS', payload: delRequest.data}); //đi qua lieu vao reducer
            // data.cb && data.cb(null, list.data);
            data.cb && data.cb(null, delRequest.data);
        }
        else{
            data.cb && data.cb(delRequest, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchDeleteRequestInventory() {
    while (true){
        const watcher = yield takeLatest(types.DELETE_REQUEST_INVENTORY_KKK,deleteRequestInventory);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình sửa kiểm kê
export function* editRequestInventory(data) {
    try {
        // yield put({type: types.GET_VOUCHER_CONFIRM + '_SUCCESS', payload:null});
        yield delay(300);
        const editRequest = yield Api.put('/a54f2100/update',data.params);
        if(editRequest && editRequest.code === 200 && editRequest.data){
            yield put({type: types.EDIT_REQUEST_INVENTORY_KKK + '_SUCCESS', payload: editRequest.data}); //đi qua lieu vao reducer
            // data.cb && data.cb(null, list.data);
            data.cb && data.cb(null, editRequest.data);
        }
        else{
            data.cb && data.cb(editRequest, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchEditRequestInventory() {
    while (true){
        const watcher = yield takeLatest(types.EDIT_REQUEST_INVENTORY_KKK,editRequestInventory);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Màn hình thêm kiểm kê
export function* addInventoryKKK(data) {
    try {
        // yield put({type: types.GET_VOUCHER_CONFIRM + '_SUCCESS', payload:null});
        yield delay(300);
        const addRequest = yield Api.put('/a54f2100/add',data.params);
        if(addRequest && addRequest.code === 200 && addRequest.data){
            yield put({type: types.ADD_INVENTORY_KKK + '_SUCCESS', payload: addRequest.data}); //đi qua lieu vao reducer
            // data.cb && data.cb(null, list.data);
            data.cb && data.cb(null, addRequest.data);
        }
        else{
            data.cb && data.cb(addRequest, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchAddInventoryKKK() {
    while (true){
        const watcher = yield takeLatest(types.ADD_INVENTORY_KKK,addInventoryKKK);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hinh vat tu của kiểm kê kho
export function* getInventory(data) {
    try {
        yield delay(300);
        const list = yield Api.put('/a54f2100/get-inventory',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_INVENTORY + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetInventory() {
    while (true){
        const watcher = yield takeLatest(types.GET_INVENTORY,getInventory);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}





