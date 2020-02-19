// action types
export const types = {
    LIST_INVENTORY: 'LIST_INVENTORY',
    LIST_INVENTORY_SUCCESS: 'LIST_INVENTORY_SUCCESS',

    LIST_PROJECT: 'LIST_PROJECT',
    LIST_PROJECT_SUCCESS: 'LIST_PROJECT_SUCCESS',

    LIST_WAREHOUSE: 'LIST_WAREHOUSE',
    LIST_WAREHOUSE_SUCCESS: 'LIST_WAREHOUSE_SUCCESS',

    LIST_EXPORT_WAREHOUSE: 'LIST_EXPORT_WAREHOUSE',
    LIST_EXPORT_WAREHOUSE_SUCCESS: 'LIST_EXPORT_WAREHOUSE_SUCCESS',

    LIST_DETAIL_EXPORT_WAREHOUSE: 'LIST_DETAIL_EXPORT_WAREHOUSE',
    LIST_DETAIL_EXPORT_WAREHOUSE_SUCCESS: 'LIST_DETAIL_EXPORT_WAREHOUSE_SUCCESS',

    LIST_EDIT_DETAIL_EXPORT_WAREHOUSE: 'LIST_EDIT_DETAIL_EXPORT_WAREHOUSE',
    LIST_EDIT_DETAIL_EXPORT_WAREHOUSE_SUCCESS: 'LIST_EDIT_DETAIL_EXPORT_WAREHOUSE_SUCCESS',

    ADD_EXPORT_WAREHOUSE: 'ADD_EXPORT_WAREHOUSE',
    ADD_EXPORT_WAREHOUSE_SUCCESS: 'ADD_EXPORT_WAREHOUSE_SUCCESS',

    EDIT_EXPORT_WAREHOUSE: 'EDIT_EXPORT_WAREHOUSE',
    EDIT_EXPORT_WAREHOUSE_SUCCESS: 'EDIT_EXPORT_WAREHOUSE_SUCCESS',

    REMOVE_EXPORT_WAREHOUSE: 'REMOVE_EXPORT_WAREHOUSE',
    REMOVE_EXPORT_WAREHOUSE_SUCCESS: 'REMOVE_EXPORT_WAREHOUSE_SUCCESS',

    GET_DEFAULT_EXPORT_WAREHOUSE: 'GET_DEFAULT_EXPORT_WAREHOUSE',
    GET_DEFAULT_EXPORT_WAREHOUSE_SUCCESS: 'GET_DEFAULT_EXPORT_WAREHOUSE_SUCCESS',
};

export function getListInventory(params, cb) {
    return {
        type: types.LIST_INVENTORY,
        params,
        cb
    }
}

export function getListProject(params, cb) {
    return {
        type: types.LIST_PROJECT,
        params,
        cb
    }
}

export function getListWareHouse(params, cb) {
    // console.log("action",params);
    return {
        type: types.LIST_WAREHOUSE,
        params,
        cb
    }
}

export function getListExportWH(params, cb) {
    // console.log("action",params);
    return {
        type: types.LIST_EXPORT_WAREHOUSE,
        params,
        cb
    }
}

export function getDetailExportWH(params, cb) {
    // console.log("action",params);
    return {
        type: types.LIST_DETAIL_EXPORT_WAREHOUSE,
        params,
        cb
    }
}

export function getEditDetailExportWH(params, cb) {
    // console.log("action",params);
    return {
        type: types.LIST_EDIT_DETAIL_EXPORT_WAREHOUSE,
        params,
        cb
    }
}

export function addExportWH(params, cb) {
    return {
        type: types.ADD_EXPORT_WAREHOUSE,
        params,
        cb
    }
}

export function editExportWH(params, cb) {
    return {
        type: types.EDIT_EXPORT_WAREHOUSE,
        params,
        cb
    }
}

export function removeExportWH(params, cb) {
    return {
        type: types.REMOVE_EXPORT_WAREHOUSE,
        params,
        cb
    }
}

export function getDefaultExportWH(params, cb) {
    return {
        type: types.GET_DEFAULT_EXPORT_WAREHOUSE,
        params,
        cb
    }
}
