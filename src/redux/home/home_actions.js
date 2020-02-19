// action types
export const types = {
    LIST_MENU: 'LIST_MENU',
    LIST_MENU_SUCCESS: 'LIST_MENU_SUCCESS',
    LIST_NOTY: 'LIST_NOTY',
    CLEAR_LIST_NOTY: 'CLEAR_LIST_NOTY',
    LIST_NOTY_SUCCESS: 'LIST_NOTY_SUCCESS',
    UPDATE_STATUS_NOTY: 'UPDATE_STATUS_NOTY',
    CLEAR_LIST_MENU: 'CLEAR_LIST_MENU',
    GET_VOUCHER_NUM: 'GET_VOUCHER_NUM',
    GET_VOUCHER_NUM_SUCCESS: 'GET_VOUCHER_NUM_SUCCESS',
};

export function getListMenu(cb) {
    return {
        type: types.LIST_MENU,
        cb,
    }
}

export function getListNoty(params,cb) {
    return {
        type: types.LIST_NOTY,
        params,
        cb,
    }
}

export function clearListNoty() {
    return {
        type: types.CLEAR_LIST_NOTY,
    }
}

export function updateStatusNoty(params,cb) {
    return {
        type: types.UPDATE_STATUS_NOTY,
        params,
        cb,
    }
}

export function clearListMenu() {
    return {
        type: types.CLEAR_LIST_MENU,
    }
}

export function updateStatusMenu(params,cb) {
    return {
        type: types.UPDATE_STATUS_NOTY,
        params,
        cb,
    }
}

export function getVoucherNum(cb) {
    return {
        type: types.GET_VOUCHER_NUM,
        cb,
    }
}

