import {types} from "./xnycth_actions";

const initialState = {
    getListWaitingRT: null,
    getListConfirmRT: null,
    getListAllRT: null,
    getDetailConfirmRT: null,
    getVoucherConfirmRT: null,
    RmVoucherConfirmRT: null,
};

//Nhan action type tu Put va luu data vao store
export default function (state = initialState, action = {}) {
    switch (action.type) {
        case types.LIST_WAITING_RT_SUCCESS:
            return {
                ...state,
                getListWaitingRT: action.payload
            };
        case types.LIST_CONFIRM_RT_SUCCESS:
            return {
                ...state,
                getListConfirmRT: action.payload
            };
        case types.LIST_ALL_RT_SUCCESS:
            return {
                ...state,
                getListAllRT: action.payload
            };
        case types.GET_DETAIL_CONFIRM_RT_SUCCESS:
            return {
                ...state,
                getDetailConfirmRT: action.payload
            };
        case types.GET_VOUCHER_CONFIRM_RT_SUCCESS:
            return {
                ...state,
                getVoucherConfirmRT: action.payload
            };
        case types.REMOVE_VOUCHER_CONFIRM_RT_SUCCESS:
            return {
                ...state,
                RmVoucherConfirmRT: action.payload
            };
        default:
            return state;
    }
}
