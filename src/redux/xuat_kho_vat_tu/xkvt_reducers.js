import {types} from "./xkvt_actions";

const initialState = {
    getListInventory: null,
    getListProject: null,
    getListWareHouse: null,
    getListExportWH: null,
    getDetailExportWH: null,
    getEditDetailExportWH: null,
    getDefaultExportWH: null,
};

//Nhan action type tu Put va luu data vao store
export default function (state = initialState, action = {}) {
    switch (action.type) {
        case types.LIST_INVENTORY_SUCCESS:
            return {
                ...state,
                getListInventory: action.payload
            };
        case types.LIST_PROJECT_SUCCESS:
            return {
                ...state,
                getListProject: action.payload
            };
        case types.LIST_WAREHOUSE_SUCCESS:
            return {
                ...state,
                getListWareHouse: action.payload
            };
        case types.LIST_EXPORT_WAREHOUSE_SUCCESS:
            return {
                ...state,
                getListExportWH: action.payload
            };
        case types.LIST_DETAIL_EXPORT_WAREHOUSE_SUCCESS:
            return {
                ...state,
                getDetailExportWH: action.payload
            };
        case types.LIST_EDIT_DETAIL_EXPORT_WAREHOUSE_SUCCESS:
            return {
                ...state,
                getEditDetailExportWH: action.payload
            };
        case types.GET_DEFAULT_EXPORT_WAREHOUSE:
            return {
                ...state,
                getDefaultExportWH: action.payload
            };
        default:
            return state;
    }
}