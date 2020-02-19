import {types} from "./dxvt_actions";

const initialState = {
    getListProposeType: null,
    getListDeliveryVoucher: null,
    getListEmployee: null,
    getListInventoryPropose: null,
    getStatusName: null,
    getDetailPropose: null,
    getListPropose: null,
    getCbDefaultPropose: null,
};

//Nhan action type tu Put va luu data vao store
export default function (state = initialState, action = {}) {
    switch (action.type) {
        case types.LIST_PROPOSE_TYPE_SUCCESS:
            return {
                ...state,
                getListProposeType: action.payload
            };
        case types.LIST_DELIVERY_VOUCHER_SUCCESS:
            return {
                ...state,
                getListDeliveryVoucher: action.payload
            };
        case types.LIST_EMPLOYEE_SUCCESS:
            return {
                ...state,
                getListEmployee: action.payload
            };
        case types.LIST_INVENTORY_PROPOSE_SUCCESS:
            return {
                ...state,
                getListInventoryPropose: action.payload
            };
        case types.GET_STATUS_SUCCESS:
            return {
                ...state,
                getStatusName: action.payload
            };
        case types.GET_DETAIL_PROPOSE_SUCCESS:
            return {
                ...state,
                getDetailPropose: action.payload
            };
        case types.LIST_PROPOSE_SUCCESS:
            return {
                ...state,
                getListPropose: action.payload
            };
        case types.GET_COMBO_DEFAULT_PROPOSE_SUCCESS:
            return {
                ...state,
                getCbDefaultPropose: action.payload
            };
        default:
            return state;
    }
}
