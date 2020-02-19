// action types
export const types = {
    LIST_WAITING_RECEIVED: 'LIST_WAITING_RECEIVED',
    LIST_WAITING_RECEIVED_SUCCESS: 'LIST_WAITING_RECEIVED_SUCCESS',

    LIST_CONFIRM_RECEIVED: 'LIST_CONFIRM_RECEIVED',
    LIST_CONFIRM_RECEIVED_SUCCESS: 'LIST_CONFIRM_RECEIVED_SUCCESS',

    LIST_ALL_RECEIVED: 'LIST_ALL_RECEIVED',
    LIST_ALL_RECEIVED_SUCCESS: 'LIST_ALL_RECEIVED_SUCCESS',

    GET_DETAIL_CONFIRM_RECEIVED: 'GET_DETAIL_CONFIRM_RECEIVED',
    GET_DETAIL_CONFIRM_RECEIVED_SUCCESS: 'GET_DETAIL_CONFIRM_RECEIVED_SUCCESS',

    REMOVE_VOUCHER_RECEIVED: 'REMOVE_VOUCHER_RECEIVED',
    REMOVE_VOUCHER_RECEIVED_SUCCESS: 'REMOVE_VOUCHER_RECEIVED_SUCCESS',

    APPROVAL_VOUCHER_RECEIVED: 'APPROVAL_VOUCHER_RECEIVED',
    APPROVAL_VOUCHER_RECEIVED_SUCCESS: 'APPROVAL_VOUCHER_RECEIVED_SUCCESS',

};

export function getListWaitingReceived(params, cb) {
    return {
        type: types.LIST_WAITING_RECEIVED,
        params,
        cb
    }
}

export function getListConfirmReceived(params, cb) {
    return {
        type: types.LIST_CONFIRM_RECEIVED,
        params,
        cb
    }
}

export function getListAllReceived(params, cb) {
    return {
        type: types.LIST_ALL_RECEIVED,
        params,
        cb
    }
}

export function getDetailConfirmReceived(params, cb) {
    return {
        type: types.GET_DETAIL_CONFIRM_RECEIVED,
        params,
        cb
    }
}

export function RmVoucherReceived(params, cb) {
    return {
        type: types.REMOVE_VOUCHER_RECEIVED,
        params,
        cb
    }
}

export function AppRVoucherReceived(params, cb) {
    return {
        type: types.APPROVAL_VOUCHER_RECEIVED,
        params,
        cb
    }
}


