import {types} from "./kiemkekho_actions";

const initialState = {
    getListProjects: null,
    getListInventoryKKK: null,
    getDetailInventoryKKK: null,
    getInventory: null,
};

//Nhan action type tu Put va luu data vao store
export default function (state = initialState, action = {}) {
    switch (action.type) {
        case types.GET_PROJECT_SUCCESS:
            return {
                ...state,
                getListProjects: action.payload
            };
        case types.GET_LIST_INVENTORY_KKK_SUCCESS:
            return {
                ...state,
                getListInventoryKKK: action.payload
            };
        case types.GET_DETAIL_INVENTORY_KKK_SUCCESS:
            return {
                ...state,
                getDetailInventoryKKK: action.payload
            };
        case types.GET_INVENTORY_SUCCESS:
            return {
                ...state,
                getInventory: action.payload
            };
        default:
            return state;
    }
}