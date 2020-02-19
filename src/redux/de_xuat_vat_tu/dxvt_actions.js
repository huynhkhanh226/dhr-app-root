// action types
export const types = {
    LIST_PROPOSE_TYPE: 'LIST_PROPOSE_TYPE',
    LIST_PROPOSE_TYPE_SUCCESS: 'LIST_PROPOSE_TYPE_SUCCESS',

    LIST_DELIVERY_VOUCHER: 'LIST_DELIVERY_VOUCHER',
    LIST_DELIVERY_VOUCHER_SUCCESS: 'LIST_PROPOSE_TYPE_SUCCESS',

    LIST_INVENTORY_PROPOSE: 'LIST_INVENTORY_PROPOSE',
    LIST_INVENTORY_PROPOSE_SUCCESS: 'LIST_INVENTORY_PROPOSE_SUCCESS',

    LIST_EMPLOYEE: 'LIST_EMPLOYEE',
    LIST_EMPLOYEE_SUCCESS: 'LIST_EMPLOYEE_SUCCESS',

    GET_STATUS: 'GET_STATUS',
    GET_STATUS_SUCCESS: 'GET_STATUS_SUCCESS',

    GET_DETAIL_PROPOSE: 'GET_DETAIL_PROPOSE',
    GET_DETAIL_PROPOSE_SUCCESS: 'GET_DETAIL_PROPOSE_SUCCESS',

    LIST_PROPOSE: 'LIST_PROPOSE',
    LIST_PROPOSE_SUCCESS: 'LIST_PROPOSE_SUCCESS',

    EDIT_VOUCHER_PROPOSE: 'EDIT_VOUCHER_PROPOSE',
    EDIT_VOUCHER_PROPOSE_SUCCESS: 'EDIT_VOUCHER_PROPOSE_SUCCESS',

    ADD_VOUCHER_PROPOSE: 'ADD_VOUCHER_PROPOSE',
    ADD_VOUCHER_PROPOSE_SUCCESS: 'ADD_VOUCHER_PROPOSE_SUCCESS',

    DELETE_VOUCHER_PROPOSE: 'DELETE_VOUCHER_PROPOSE',
    DELETE_VOUCHER_PROPOSE_SUCCESS: 'DELETE_VOUCHER_PROPOSE_SUCCESS',

    GET_COMBO_DEFAULT_PROPOSE: 'GET_COMBO_DEFAULT_PROPOSE',
    GET_COMBO_DEFAULT_PROPOSE_SUCCESS: 'GET_COMBO_DEFAULT_PROPOSE_SUCCESS',


};

export function getListProposeType(params, cb) {
    return {
        type: types.LIST_PROPOSE_TYPE,
        params,
        cb
    }
}

export function getListDeliveryVoucher(params, cb) {
    return {
        type: types.LIST_DELIVERY_VOUCHER,
        params,
        cb
    }
}

export function getListEmployee(params, cb) {
    return {
        type: types.LIST_EMPLOYEE,
        params,
        cb
    }
}

export function getListInventoryPropose(params, cb) {
    return {
        type: types.LIST_INVENTORY_PROPOSE,
        params,
        cb
    }
}

export function getStatusName(params, cb) {
    return {
        type: types.GET_STATUS,
        params,
        cb
    }
}

export function getDetailPropose(params, cb) {
    return {
        type: types.GET_DETAIL_PROPOSE,
        params,
        cb
    }
}

export function getListPropose(params, cb) {
    return {
        type: types.LIST_PROPOSE,
        params,
        cb
    }
}

export function addVoucherPropose(params, cb) {
    return {
        type: types.ADD_VOUCHER_PROPOSE,
        params,
        cb
    }
}

export function editVoucherPropose(params, cb) {
    return {
        type: types.EDIT_VOUCHER_PROPOSE,
        params,
        cb
    }
}

export function deleteVoucherPropose(params, cb) {
    return {
        type: types.DELETE_VOUCHER_PROPOSE,
        params,
        cb
    }
}

export function getCbDefaultPropose(params, cb) {
    return {
        type: types.GET_COMBO_DEFAULT_PROPOSE,
        params,
        cb
    }
}
