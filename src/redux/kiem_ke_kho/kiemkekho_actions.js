// action types
export const types = {
    GET_PROJECT: 'GET_PROJECT',
    GET_PROJECT_SUCCESS: 'GET_PROJECT_SUCCESS',

    GET_LIST_INVENTORY_KKK: 'GET_LIST_INVENTORY_KKK',
    GET_LIST_INVENTORY_KKK_SUCCESS: 'GET_LIST_INVENTORY_KKK_SUCCESS',

    GET_DETAIL_INVENTORY_KKK: 'GET_DETAIL_INVENTORY_KKK',
    GET_DETAIL_INVENTORY_KKK_SUCCESS: 'GET_DETAIL_INVENTORY_KKK_SUCCESS',

    CREATE_REQUEST_INVENTORY_KKK: 'CREATE_REQUEST_INVENTORY_KKK',
    CREATE_REQUEST_INVENTORY_KKK_SUCCESS: 'CREATE_REQUEST_INVENTORY_KKK_SUCCESS',

    DELETE_INVENTORY_KKK: 'DELETE_INVENTORY_KKK',
    DELETE_INVENTORY_KKK_SUCCESS: 'DELETE_INVENTORY_KKK_SUCCESS',

    DELETE_REQUEST_INVENTORY_KKK: 'DELETE_REQUEST_INVENTORY_KKK',
    DELETE_REQUEST_INVENTORY_KKK_SUCCESS: 'DELETE_REQUEST_INVENTORY_KKK_SUCCESS',

    EDIT_REQUEST_INVENTORY_KKK: 'EDIT_REQUEST_INVENTORY_KKK',
    EDIT_REQUEST_INVENTORY_KKK_SUCCESS: 'EDIT_REQUEST_INVENTORY_KKK_SUCCESS',

    ADD_INVENTORY_KKK: 'ADD_INVENTORY_KKK',
    ADD_INVENTORY_KKK_SUCCESS: 'ADD_INVENTORY_KKK_SUCCESS',


    GET_INVENTORY: 'GET_INVENTORY',
    GET_INVENTORY_SUCCESS: 'GET_INVENTORY_SUCCESS',

};

export function getListProjects(params, cb) {
    return {
        type: types.GET_PROJECT,
        params,
        cb
    }
}

export function getListInventoryKKK(params, cb) {
    return {
        type: types.GET_LIST_INVENTORY_KKK,
        params,
        cb
    }
}

export function getDetailInventoryKKK(params, cb) {
    return {
        type: types.GET_DETAIL_INVENTORY_KKK,
        params,
        cb
    }
}

export function createRequestInventory(params, cb) {
    return {
        type: types.CREATE_REQUEST_INVENTORY_KKK,
        params,
        cb
    }
}

export function deleteInventoryKKK(params, cb) {
    return {
        type: types.DELETE_INVENTORY_KKK,
        params,
        cb
    }
}

export function deleteRequestInventory(params, cb) {
    return {
        type: types.DELETE_REQUEST_INVENTORY_KKK,
        params,
        cb
    }
}

export function editRequestInventory(params, cb) {
    return {
        type: types.EDIT_REQUEST_INVENTORY_KKK,
        params,
        cb
    }
}

export function addInventoryKKK(params, cb) {
    return {
        type: types.ADD_INVENTORY_KKK,
        params,
        cb
    }
}

export function getInventory(params, cb) {
    return {
        type: types.GET_INVENTORY,
        params,
        cb
    }
}




