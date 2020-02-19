import {delay} from 'redux-saga';
import { put, takeLatest} from 'redux-saga/effects';
import { NavigationActions,StackActions } from 'react-navigation';
import {types} from "./navigation_actions";

//##############################
export function* changeScreen(data) {
    yield put(
        NavigationActions.navigate({ routeName: data.routeName,params: data.params})
    );
}

export function* watchChangeScreen() {
    yield takeLatest(types.CHANGE_SCREEN,changeScreen);
}
//##############################


//##############################
export function* resetScreen(data) {
    const resetAction = StackActions.reset({
        index: 0,
        // key: null,
        actions: [
            NavigationActions.navigate({ routeName: data.routeName})
        ]
    });

    yield put(resetAction);
}

export function* watchResetScreen() {
    yield takeLatest(types.RESET_SCREEN,resetScreen);
}
//##############################


//##############################
export function* backScreen() {
    yield delay(300);
    yield put(NavigationActions.back());
}

export function* watchBackScreen() {
    yield takeLatest(types.BACK_SCREEN,backScreen);
}
//##############################
