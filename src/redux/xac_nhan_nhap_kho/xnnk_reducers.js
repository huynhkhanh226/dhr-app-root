import {types} from "./xnnk_actions";

const initialState = {
    getListWaitingWH: null,
    getListConfirmWH: null,
    getListAllWH: null,
    getDetailConfirmWH: null,
    getVoucherConfirm: null,
    RmVoucherConfirm: null,
};

//Nhan action type tu Put va luu data vao store
export default function (state = initialState, action = {}) {
    switch (action.type) {
        case types.LIST_WAITING_WH_SUCCESS:
            return {
                ...state,
                getListWaitingWH: action.payload
            };
        case types.LIST_CONFIRM_WH_SUCCESS:
            return {
                ...state,
                getListConfirmWH: action.payload
            };
        case types.LIST_ALL_WH_SUCCESS:
            return {
                ...state,
                getListAllWH: action.payload
            };
        case types.GET_DETAIL_CONFIRM_WH_SUCCESS:
            return {
                ...state,
                getDetailConfirmWH: action.payload
            };
        case types.GET_VOUCHER_CONFIRM_SUCCESS:
            return {
                ...state,
                getVoucherConfirm: action.payload
            };
        case types.REMOVE_VOUCHER_CONFIRM_SUCCESS:
            return {
                ...state,
                RmVoucherConfirm: action.payload
            };
        default:
            return state;
    }
}