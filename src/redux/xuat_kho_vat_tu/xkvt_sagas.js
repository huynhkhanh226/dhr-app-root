import {delay} from 'redux-saga';
import {put, takeLatest, take, cancel} from 'redux-saga/effects';
import {types} from "./xkvt_actions";
import Api from '../../services/api';

let paramsWareHouse = null;

// Man hinh Vat tu
export function* getListInventory(data) {
    try {
        yield delay(300);
        const list = yield Api.put('/a54f2010/get-list-inventory',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_INVENTORY + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchListInventory() {
    while (true){
        const watcher = yield takeLatest(types.LIST_INVENTORY,getListInventory);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hinh Du an
export function* getListProject(data) {
    try {
        yield delay(300);
        const list = yield Api.put('/a54f2010/get-list-project',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_PROJECT + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchListProject() {
    while (true){
        const watcher = yield takeLatest(types.LIST_PROJECT,getListProject);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hinh Kho
export function* getListWareHouse(data) {
    try {
        yield delay(300);
        const list = yield Api.put('/a54f2010/get-list-ware-house',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_WAREHOUSE + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchListWareHouse() {
    while (true){
        const watcher = yield takeLatest(types.LIST_WAREHOUSE,getListWareHouse);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

//Man hinh Danh sach xuat kho
export function* getListExportWH(data) {
    try {
        yield delay(300);
        const haveParams = !!data.params;
        if(!haveParams) {
            data.params = paramsWareHouse;
            data.params.skip=0;
        }
        else{
            paramsWareHouse = data.params;
        }
        const list = yield Api.put('/a54f2010/get-list-export-ware-house',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.LIST_EXPORT_WAREHOUSE + '_SUCCESS', payload: haveParams ? null: list.data.rows}); //đi qua lieu vao reducer
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

export function* watchListExportWH() {
    while (true){
        const watcher = yield takeLatest(types.LIST_EXPORT_WAREHOUSE,getListExportWH);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

//Man hinh chi tiet của danh sach xuat kho
export function* getDetailExportWH(data) {
    try {
        yield put({type: types.LIST_DETAIL_EXPORT_WAREHOUSE + '_SUCCESS', payload: null});
        yield delay(300);
        const list = yield Api.put('/a54f2010/get-detail-export-ware-house',data.params);
        if(list && list.code === 200 && list.data){
            // console.log("saga iff");
            yield put({type: types.LIST_DETAIL_EXPORT_WAREHOUSE + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchDetailExportWH() {
    while (true){
        const watcher = yield takeLatest(types.LIST_DETAIL_EXPORT_WAREHOUSE,getDetailExportWH);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

//Man hinh chi tiet khi chinh sua của danh sach xuat kho
export function* getEditDetailExportWH(data) {
    try {
        yield delay(300);
        const list = yield Api.post('/a54f2010/get-desktop-export-ware-house-when-edit',data.params);
        if(list && list.code === 200 && list.data){
            // console.log("saga iff");
            yield put({type: types.LIST_EDIT_DETAIL_EXPORT_WAREHOUSE + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchEditDetailExportWH() {
    while (true){
        const watcher = yield takeLatest(types.LIST_EDIT_DETAIL_EXPORT_WAREHOUSE,getEditDetailExportWH);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

//Man hinh chi tiet khi chinh sua của danh sach xuat kho
export function* addExportWH(data) {
    try {
        yield delay(300);
        const result = yield Api.put('/a54f2010/add-delivery-voucher',data.params);
        if(result && result.code === 200 && result.data){
            // console.log("saga iff");
            // yield put({type: types.ADD_EXPORT_WAREHOUSE + '_SUCCESS', payload: result.data}); //đi qua lieu vao reducer
            data.cb && data.cb(null, result.data);
        }
        else{
            data.cb && data.cb(result, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchAddExportWH() {
    while (true) {
        const watcher = yield takeLatest(types.ADD_EXPORT_WAREHOUSE, addExportWH);
        yield take(['LOGOUT', 'NETWORK']);
        yield cancel(watcher);
    }
}

//Man hinh chi tiet khi chinh sua của danh sach xuat kho
export function* removeExportWH(data) {
    try {
        yield delay(300);
        const result = yield Api.put('/a54f2010/del',data.params);
        if(result && result.code === 200 && result.data){
            // console.log("saga iff");
            // yield put({type: types.REMOVE_EXPORT_WAREHOUSE + '_SUCCESS', payload: result.data}); //đi qua lieu vao reducer
            data.cb && data.cb(null, result.data);
        }
        else{
            data.cb && data.cb(result, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchRemoveExportWH() {
    while (true){
        const watcher = yield takeLatest(types.REMOVE_EXPORT_WAREHOUSE,removeExportWH);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

//Man hinh chi tiet khi chinh sua của danh sach xuat kho
export function* editExportWH(data) {
    try {
        yield delay(300);
        const result = yield Api.put('/a54f2010/edit-delivery-voucher',data.params);
        if(result && result.code === 200 && result.data){
            // console.log("saga iff");
            // yield put({type: types.EDIT_EXPORT_WAREHOUSE + '_SUCCESS', payload: result.data}); //đi qua lieu vao reducer
            data.cb && data.cb(null, result.data);
        }
        else{
            data.cb && data.cb(result, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchEditExportWH() {
    while (true){
        const watcher = yield takeLatest(types.EDIT_EXPORT_WAREHOUSE,editExportWH);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}

// Man hinh mac dinh gia tri cua combo
export function* getDefaultExportWH(data) {
    try {
        yield delay(300);
        const list = yield Api.get('/a54f2010/get-default',data.params);
        if(list && list.code === 200 && list.data){
            yield put({type: types.GET_DEFAULT_EXPORT_WAREHOUSE + '_SUCCESS', payload: list.data}); //đi qua lieu vao reducer
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

export function* watchGetDefaultExportWHr() {
    while (true){
        const watcher = yield takeLatest(types.GET_DEFAULT_EXPORT_WAREHOUSE,getDefaultExportWH);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}
