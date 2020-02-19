import {delay} from 'redux-saga';
import {put, takeLatest, take, cancel} from 'redux-saga/effects';
import {types} from "./user_actions";
import AsyncStorage from '@react-native-community/async-storage';

//##############################
export function* login(data, cb) {
    try {
        yield delay(300);
        if(data){
            yield put({type: types.LOGIN + '_SUCCESS', payload: data.params}); //đi qua lieu vao reducer
            yield AsyncStorage.setItem('DEMOLOGINHR', JSON.stringify(data));
            data.cb && data.cb(null, data);
            return;
        }
        else{
            if(data.cb) data.cb(data, null);
        }
    }
    catch (e) {
        data.cb && data.cb(null,null);
    }
}

export function* watchLogin() {
    while (true){
        const watcher = yield takeLatest(types.LOGIN,login);
        yield take(['LOGOUT','NETWORK']);
        yield cancel(watcher);
    }
}
//##############################
