// action types
export const types = {
    LIST_BROKEN: 'LIST_BROKEN',
    LIST_BROKEN_SUCCESS: 'LIST_BROKEN_SUCCESS',

    LIST_INVENTORY_BROKEN: 'LIST_INVENTORY_BROKEN',
    LIST_INVENTORY_BROKEN_SUCCESS: 'LIST_INVENTORY_BROKEN_SUCCESS',

    DETAIL_BROKEN: 'DETAIL_BROKEN',
    DETAIL_BROKEN_SUCCESS: 'DETAIL_BROKEN_SUCCESS',

    GET_PHENOMENA_BROKEN: 'GET_PHENOMENA_BROKEN',
    GET_PHENOMENA_BROKEN_SUCCESS: 'GET_PHENOMENA_BROKEN_SUCCESS',

    GET_COMBO_DEFAULT_BROKEN: 'GET_COMBO_DEFAULT_BROKEN',
    GET_COMBO_DEFAULT_BROKEN_SUCCESS: 'GET_COMBO_DEFAULT_BROKEN_SUCCESS',

    GET_LIST_CHOOSE_PHENOMENA_BROKEN: 'GET_LIST_CHOOSE_PHENOMENA_BROKEN',
    GET_LIST_CHOOSE_PHENOMENA_BROKEN_SUCCESS: 'GET_LIST_CHOOSE_PHENOMENA_BROKEN_SUCCESS',

    DELETE_VOUCHER_BROKEN: 'DELETE_VOUCHER_BROKEN',
    DELETE_VOUCHER_BROKEN_SUCCESS: 'DELETE_VOUCHER_BROKEN_SUCCESS',

    ADD_VOUCHER_BROKEN: 'ADD_VOUCHER_BROKEN',
    ADD_VOUCHER_BROKEN_SUCCESS: 'ADD_VOUCHER_BROKEN_SUCCESS',

    EDIT_VOUCHER_BROKEN: 'EDIT_VOUCHER_BROKEN',
    EDIT_VOUCHER_BROKEN_SUCCESS: 'EDIT_VOUCHER_BROKEN_SUCCESS',

};

export function getListBroken(params, cb) {
    return {
        type: types.LIST_BROKEN,
        params,
        cb
    }
}

export function getListInventoryBroken(params, cb) {
    return {
        type: types.LIST_INVENTORY_BROKEN,
        params,
        cb
    }
}

export function getDetailBroken(params, cb) {
    return {
        type: types.DETAIL_BROKEN,
        params,
        cb
    }
}

export function getPhenomenaBroken(params, cb) {
    return {
        type: types.GET_PHENOMENA_BROKEN,
        params,
        cb
    }
}

export function getComboDefaultBroken(params, cb) {
    return {
        type: types.GET_COMBO_DEFAULT_BROKEN,
        params,
        cb
    }
}

export function getListChoosePhenomenaBroken(params, cb) {
    return {
        type: types.GET_LIST_CHOOSE_PHENOMENA_BROKEN,
        params,
        cb
    }
}

export function addVoucherBroken(params, cb) {
    return {
        type: types.ADD_VOUCHER_BROKEN,
        params,
        cb
    }
}

export function delVoucherBroken(params, cb) {
    return {
        type: types.DELETE_VOUCHER_BROKEN,
        params,
        cb
    }
}

export function editVoucherBroken(params, cb) {
    return {
        type: types.EDIT_VOUCHER_BROKEN,
        params,
        cb
    }
}

