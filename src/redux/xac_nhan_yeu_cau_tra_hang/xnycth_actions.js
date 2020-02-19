// action types
export const types = {
    LIST_WAITING_RT: 'LIST_WAITING_RT',
    LIST_WAITING_RT_SUCCESS: 'LIST_WAITING_RT_SUCCESS',

    LIST_CONFIRM_RT: 'LIST_CONFIRM_RT',
    LIST_CONFIRM_RT_SUCCESS: 'LIST_CONFIRM_RT_SUCCESS',

    LIST_ALL_RT: 'LIST_ALL_RT',
    LIST_ALL_RT_SUCCESS: 'LIST_ALL_RT_SUCCESS',

    GET_DETAIL_CONFIRM_RT: 'GET_DETAIL_CONFIRM_RT',
    GET_DETAIL_CONFIRM_RT_SUCCESS: 'GET_DETAIL_CONFIRM_RT_SUCCESS',

    GET_VOUCHER_CONFIRM_RT: 'GET_VOUCHER_CONFIRM_RT',
    GET_VOUCHER_CONFIRM_RT_SUCCESS: 'GET_VOUCHER_CONFIRM_RT_SUCCESS',

    APPROVAL_VOUCHER_CONFIRM_RT: 'APPROVAL_VOUCHER_CONFIRM_RT',
    APPROVAL_VOUCHER_CONFIRM_RT_SUCCESS: 'APPROVAL_VOUCHER_CONFIRM_RT_SUCCESS',

    REMOVE_VOUCHER_CONFIRM_RT: 'REMOVE_VOUCHER_CONFIRM_RT',
    REMOVE_VOUCHER_CONFIRM_RT_SUCCESS: 'REMOVE_VOUCHER_CONFIRM_RT_SUCCESS',

};

export function getListWaitingRT(params, cb) {
    return {
        type: types.LIST_WAITING_RT,
        params,
        cb
    }
}

export function getListConfirmRT(params, cb) {
    return {
        type: types.LIST_CONFIRM_RT,
        params,
        cb
    }
}

export function getListAllRT(params, cb) {
    return {
        type: types.LIST_ALL_RT,
        params,
        cb
    }
}

export function getDetailConfirmRT(params, cb) {
    return {
        type: types.GET_DETAIL_CONFIRM_RT,
        params,
        cb
    }
}

export function getVoucherConfirmRT(params, cb) {
    return {
        type: types.GET_VOUCHER_CONFIRM_RT,
        params,
        cb
    }
}

export function appVoucherConfirmRT(params, cb) {
    return {
        type: types.APPROVAL_VOUCHER_CONFIRM_RT,
        params,
        cb
    }
}

export function RmVoucherConfirmRT(params, cb) {
    return {
        type: types.REMOVE_VOUCHER_CONFIRM_RT,
        params,
        cb
    }
}


