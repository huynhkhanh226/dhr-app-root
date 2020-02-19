// action types
export const types = {
    LIST_WAITING_WH: 'LIST_WAITING_WH',
    LIST_WAITING_WH_SUCCESS: 'LIST_WAITING_WH_SUCCESS',

    LIST_CONFIRM_WH: 'LIST_CONFIRM_WH',
    LIST_CONFIRM_WH_SUCCESS: 'LIST_CONFIRM_WH_SUCCESS',

    LIST_ALL_WH: 'LIST_ALL_WH',
    LIST_ALL_WH_SUCCESS: 'LIST_ALL_WH_SUCCESS',

    GET_DETAIL_CONFIRM_WH: 'GET_DETAIL_CONFIRM_WH',
    GET_DETAIL_CONFIRM_WH_SUCCESS: 'GET_DETAIL_CONFIRM_WH_SUCCESS',

    GET_VOUCHER_CONFIRM: 'GET_VOUCHER_CONFIRM',
    GET_VOUCHER_CONFIRM_SUCCESS: 'GET_VOUCHER_CONFIRM_SUCCESS',

    APPROVAL_VOUCHER_CONFIRM: 'APPROVAL_VOUCHER_CONFIRM',
    APPROVAL_VOUCHER_CONFIRM_SUCCESS: 'APPROVAL_VOUCHER_CONFIRM_SUCCESS',

    REMOVE_VOUCHER_CONFIRM: 'REMOVE_VOUCHER_CONFIRM',
    REMOVE_VOUCHER_CONFIRM_SUCCESS: 'REMOVE_VOUCHER_CONFIRM_SUCCESS',

};

export function getListWaitingWH(params, cb) {
    return {
        type: types.LIST_WAITING_WH,
        params,
        cb
    }
}

export function getListConfirmWH(params, cb) {
    return {
        type: types.LIST_CONFIRM_WH,
        params,
        cb
    }
}

export function getListAllWH(params, cb) {
    return {
        type: types.LIST_ALL_WH,
        params,
        cb
    }
}

export function getDetailConfirmWH(params, cb) {
    return {
        type: types.GET_DETAIL_CONFIRM_WH,
        params,
        cb
    }
}

export function getVoucherConfirm(params, cb) {
    return {
        type: types.GET_VOUCHER_CONFIRM,
        params,
        cb
    }
}

export function appVoucherConfirm(params, cb) {
    return {
        type: types.APPROVAL_VOUCHER_CONFIRM,
        params,
        cb
    }
}

export function RmVoucherConfirm(params, cb) {
    return {
        type: types.REMOVE_VOUCHER_CONFIRM,
        params,
        cb
    }
}


