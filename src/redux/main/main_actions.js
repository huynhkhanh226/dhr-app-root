
export const types = {
    NETWORK: 'NETWORK',
    LOGOUT: 'LOGOUT',
    TAB_BAR: 'TAB_BAR',
    GET_SETTING: 'GET_SETTING',
    TAB_BAR_SUCCESS: 'TAB_BAR_SUCCESS',
    GET_SETTING_COMPLETE: 'GET_SETTING_COMPLETE',
    UPLOAD: 'UPLOAD',
    UPLOAD_SUCCESS: 'UPLOAD_SUCCESS',
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    UPLOAD_FILE: 'UPLOAD_FILE',
    GET_TOKEN_CDN: 'GET_TOKEN_CDN',

    ATTACH_PROPOSE: 'ATTACH_PROPOSE',
    ATTACH_PROPOSE_SUCCESS: 'ATTACH_PROPOSE_SUCCESS',

    EDIT_ATTACH_PROPOSE: 'EDIT_ATTACH_PROPOSE',
    GET_TOKEN: 'GET_TOKEN',
    LIST_SETTING: 'LIST_SETTING',
    LIST_SETTING_COMPLETE: 'LIST_SETTING_COMPLETE',

    GET_MENU_HOME: 'GET_MENU_HOME',
    GET_MENU_HOME_SUCCESS: 'GET_MENU_HOME_SUCCESS',

    GET_MENU_MSS: 'GET_MENU_MSS',
    GET_MENU_MSS_SUCCESS: 'GET_MENU_MSS_SUCCESS',

    DEVICE_ADD: 'DEVICE_ADD',
    DEVICE_DEL: 'DEVICE_DEL',
    DEVICE_ADD_SUCCESS: 'DEVICE_ADD_SUCCESS',
    UPDATE_BADGE: 'UPDATE_BADGE',
    GET_BADGE: 'GET_BADGE',
    UPDATE_BADGE_COMPLETE: 'UPDATE_BADGE_COMPLETE',

    GET_COMPANY: 'GET_COMPANY',
};

export function loading(cb, flag) {
    return{
        type: types.GET_SETTING,
        cb,
        flag
    }
}

export function netWorkError() {
    return{
        type: types.NETWORK
    }
}

export function tabBar(params,cb) {
    return{
        type: types.TAB_BAR,
        params,
        cb
    }
}

export function upload(params, mode, cb) {
    return{
        type: types.UPLOAD,
        params,
        mode,
        cb
    }
}

export function login(params, cb) {
    return{
        type: types.LOGIN,
        params,
        cb
    }
}

export function uploadFile(params,mode,cb) {
    return{
        type: types.UPLOAD_FILE,
        params,
        mode,
        cb
    }
}

export function getTokenCDN(cb) {
    return{
        type: types.GET_TOKEN_CDN,
        cb
    }
}

export function attachPropose(params, cb) {
    return {
        type: types.ATTACH_PROPOSE,
        params,
        cb
    }
}

export function editAttachPropose(params, cb) {
    return {
        type: types.EDIT_ATTACH_PROPOSE,
        params,
        cb
    }
}

export function getToken(params,cb) {
    return{
        type: types.GET_TOKEN,
        params,
        cb
    }
}

export function getSetting(cb) {
    return{
        type: types.LIST_SETTING,
        cb
    }
}

export function getListMenuHome(cb, flag) {
    return{
        type: types.GET_MENU_HOME,
        cb,
    }
}

export function getListMenuMSS(cb, flag) {
    return{
        type: types.GET_MENU_MSS,
        cb,
    }
}

export function updateBadge(params,cb) {
    return{
        type: types.UPDATE_BADGE,
        params,
        cb
    }
}

export function getBadge() {
    return{
        type: types.GET_BADGE,
    }
}

export function addDevice(params,cb) {
    return{
        type: types.DEVICE_ADD,
        params,
        cb
    }
}

export function delDevice(params,cb) {
    return{
        type: types.DEVICE_DEL,
        params,
        cb
    }
}

export function getListCompany(cb) {
    return{
        type: types.GET_COMPANY,
        cb
    }
}
