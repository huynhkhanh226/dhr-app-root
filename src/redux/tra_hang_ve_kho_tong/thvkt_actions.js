// action types
export const types = {
    LIST_REASON: 'LIST_REASON',
    LIST_REASON_SUCCESS: 'LIST_REASON_SUCCESS',

    LIST_STATUS: 'LIST_STATUS',
    LIST_STATUS_SUCCESS: 'LIST_STATUS_SUCCESS',

    LIST_MDI_VOUCHER: 'LIST_MDI_VOUCHER',
    LIST_MDI_VOUCHER_SUCCESS: 'LIST_MDI_VOUCHER_SUCCESS',

    GET_DETAIL_MDI_VOUCHER: 'GET_DETAIL_MDI_VOUCHER',
    GET_DETAIL_MDI_VOUCHER_SUCCESS: 'GET_DETAIL_MDI_VOUCHER_SUCCESS',

    ADD_MDI_VOUCHER: 'ADD_MDI_VOUCHER',
    ADD_MDI_VOUCHER_SUCCESS: 'ADD_MDI_VOUCHER_SUCCESS',

    EDIT_MDI_VOUCHER: 'EDIT_MDI_VOUCHER',
    EDIT_MDI_VOUCHER_SUCCESS: 'EDIT_MDI_VOUCHER_SUCCESS',

    DELETE_MDI_VOUCHER: 'DELETE_MDI_VOUCHER',
    DELETE_MDI_VOUCHER_SUCCESS: 'DELETE_MDI_VOUCHER_SUCCESS',


    GET_COMBO_DEFAULT_MDI_VOUCHER: 'GET_COMBO_DEFAULT_MDI_VOUCHER',
    GET_COMBO_DEFAULT_MDI_VOUCHER_SUCCESS: 'GET_COMBO_DEFAULT_MDI_VOUCHER_SUCCESS',
};

export function getListReason(params, cb) {
    return {
        type: types.LIST_REASON,
        params,
        cb
    }
}

export function getListStatus(params, cb) {
    return {
        type: types.LIST_STATUS,
        params,
        cb
    }
}

export function getDetailMDIVoucher(params, cb) {
    return {
        type: types.GET_DETAIL_MDI_VOUCHER,
        params,
        cb
    }
}

export function getListMDIVoucher(params, cb) {
    return {
        type: types.LIST_MDI_VOUCHER,
        params,
        cb
    }
}

export function addMDIVoucher(params, cb) {
    return {
        type: types.ADD_MDI_VOUCHER,
        params,
        cb
    }
}

export function editMDIVoucher(params, cb) {
    return {
        type: types.EDIT_MDI_VOUCHER,
        params,
        cb
    }
}

export function deleteMDIVoucher(params, cb) {
    return {
        type: types.DELETE_MDI_VOUCHER,
        params,
        cb
    }
}

export function getCbDefaultMDIVoucher(params, cb) {
    return {
        type: types.GET_COMBO_DEFAULT_MDI_VOUCHER,
        params,
        cb
    }
}

