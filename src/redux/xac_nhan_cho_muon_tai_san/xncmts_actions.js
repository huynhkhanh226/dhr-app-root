// action types
export const types = {
    LIST_WAITING_BORROW: 'LIST_WAITING_BORROW',
    LIST_WAITING_BORROW_SUCCESS: 'LIST_WAITING_BORROW_SUCCESS',

    LIST_CONFIRM_BORROW: 'LIST_CONFIRM_BORROW',
    LIST_CONFIRM_BORROW_SUCCESS: 'LIST_CONFIRM_BORROW_SUCCESS',

    LIST_ALL_BORROW: 'LIST_ALL_BORROW',
    LIST_ALL_BORROW_SUCCESS: 'LIST_ALL_BORROW_SUCCESS',

    GET_DETAIL_CONFIRM_BORROW: 'GET_DETAIL_CONFIRM_BORROW',
    GET_DETAIL_CONFIRM_BORROW_SUCCESS: 'GET_DETAIL_CONFIRM_BORROW_SUCCESS',

    REMOVE_VOUCHER_BORROW: 'REMOVE_VOUCHER_BORROW',
    REMOVE_VOUCHER_BORROW_SUCCESS: 'REMOVE_VOUCHER_BORROW_SUCCESS',

    APPROVAL_VOUCHER_BORROW: 'APPROVAL_VOUCHER_BORROW',
    APPROVAL_VOUCHER_BORROW_SUCCESS: 'APPROVAL_VOUCHER_BORROW_SUCCESS',

    GET_CAPTION_CONFIRM_BORROW: 'GET_CAPTION_CONFIRM_BORROW',
    GET_CAPTION_CONFIRM_BORROW_SUCCESS: 'GET_CAPTION_CONFIRM_BORROW_SUCCESS',

    GET_NEW_ID_CONFIRM_BORROW: 'GET_NEW_ID_CONFIRM_BORROW',
    GET_NEW_ID_CONFIRM_BORROW_SUCCESS: 'GET_NEW_ID_CONFIRM_BORROW_SUCCESS',


};

export function getListWaitingBorrow(params, cb) {
    return {
        type: types.LIST_WAITING_BORROW,
        params,
        cb
    }
}

export function getListConfirmBorrow(params, cb) {
    return {
        type: types.LIST_CONFIRM_BORROW,
        params,
        cb
    }
}

export function getListAllBorrow(params, cb) {
    return {
        type: types.LIST_ALL_BORROW,
        params,
        cb
    }
}

export function getDetailConfirmBorrow(params, cb) {
    return {
        type: types.GET_DETAIL_CONFIRM_BORROW,
        params,
        cb
    }
}

export function RmVoucherBorrow(params, cb) {
    return {
        type: types.REMOVE_VOUCHER_BORROW,
        params,
        cb
    }
}

export function getCaptionBorrow(params, cb) {
    return {
        type: types.GET_CAPTION_CONFIRM_BORROW,
        params,
        cb
    }
}

export function getNewIDConfirmBorrow(params, cb) {
    return {
        type: types.GET_NEW_ID_CONFIRM_BORROW,
        params,
        cb
    }
}

export function AppRVoucherBorrow(params, cb) {
    return {
        type: types.APPROVAL_VOUCHER_BORROW,
        params,
        cb
    }
}


