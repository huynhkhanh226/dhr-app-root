import {types} from "./baohong_actions";

const initialState = {
    getListBroken: null,
    getDetailBroken: null,
    getPhenomenaBroken: null,
    getComboDefaultBroken: null,
    getListChoosePhenomenaBroken: null,
    getListInventoryBroken: null,
};

//Nhan action type tu Put va luu data vao store
export default function (state = initialState, action = {}) {
    switch (action.type) {
        case types.LIST_BROKEN_SUCCESS:
            return {
                ...state,
                getListBroken: action.payload
            };
        case types.LIST_INVENTORY_BROKEN_SUCCESS:
            return {
                ...state,
                getListInventoryBroken: action.payload
            };
        case types.DETAIL_BROKEN_SUCCESS:
            return {
                ...state,
                getDetailBroken: action.payload
            };
        case types.GET_PHENOMENA_BROKEN_SUCCESS:
            return {
                ...state,
                getPhenomenaBroken: action.payload
            };
        case types.GET_COMBO_DEFAULT_BROKEN_SUCCESS:
            return {
                ...state,
                getComboDefaultBroken: action.payload
            };
        case types.GET_LIST_CHOOSE_PHENOMENA_BROKEN_SUCCESS:
            return {
                ...state,
                getListChoosePhenomenaBroken: action.payload
            };
        default:
            return state;
    }
}
