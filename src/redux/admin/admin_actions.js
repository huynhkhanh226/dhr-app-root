
export const types = {
    SETTING_UPDATE: 'SETTING_UPDATE',
    SETTING_LIST: 'SETTING_LIST',
    TEST_CONNECT: 'TEST_CONNECT',
};

export function settingUpdate(params,cb) {
    return{
        type: types.SETTING_UPDATE,
        params,
        cb
    }
}

export function settingList(params, cb) {
    return{
        type: types.SETTING_LIST,
        params,
        cb
    }
}

export function testConnect(params, cb) {
    return{
        type: types.TEST_CONNECT,
        params,
        cb
    }
}